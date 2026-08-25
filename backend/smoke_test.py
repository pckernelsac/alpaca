"""Prueba de humo end-to-end contra la API corriendo.

Uso: python smoke_test.py [base_url]
Recorre el flujo real de un cliente: login, catalogo, carrito, cupon y checkout.
"""

import json
import sys
import urllib.error
import urllib.request

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8010/api/v1"

passed = 0
failed = 0


def call(method, path, body=None, token=None, headers=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE + path, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    for key, value in (headers or {}).items():
        req.add_header(key, value)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read() or b"{}")
    except urllib.error.HTTPError as exc:
        raw = exc.read()
        try:
            return exc.code, json.loads(raw or b"{}")
        except json.JSONDecodeError:
            return exc.code, {"raw": raw.decode(errors="replace")[:200]}


def check(label, condition, detail=""):
    global passed, failed
    if condition:
        passed += 1
        print(f"  OK   {label}")
    else:
        failed += 1
        print(f"  FALLA {label} {detail}")


print(f"Smoke test contra {BASE}\n")

# --- Salud -----------------------------------------------------------------
code, body = call("GET", "/health")
check("health responde", code == 200 and body["data"]["status"] == "ok")
check("base de datos conectada", body["data"]["info"]["database"]["status"] == "up")

# --- Auth ------------------------------------------------------------------
code, body = call("POST", "/auth/login", {"email": "mateo.q@alpacart.com", "password": "Admin123!"})
check("login staff", code == 200, body)
staff_token = body["data"]["accessToken"] if code == 200 else None
check("staff trae rol", code == 200 and body["data"]["user"]["role"] == "Super Administrador")

code, body = call("POST", "/auth/login", {"email": "mateo.q@alpacart.com", "password": "malo"})
check("password incorrecto da 401", code == 401)

code, body = call(
    "POST", "/auth/customer-login", {"email": "camila.g@email.com", "password": "Cliente2024!"}
)
check("login customer", code == 200, body)
cust_token = body["data"]["accessToken"] if code == 200 else None

code, body = call("GET", "/auth/me", token=cust_token)
check("perfil de customer", code == 200 and body["data"]["type"] == "customer")

code, body = call("GET", "/auth/me")
check("sin token da 401", code == 401)

# --- Separacion de actores -------------------------------------------------
code, body = call("GET", "/users", token=cust_token)
check("customer no accede a /users", code == 403, f"(dio {code})")

code, body = call("GET", "/users", token=staff_token)
check("staff si accede a /users", code == 200)

code, body = call("GET", "/cart", token=staff_token)
check("staff no accede al carrito", code == 403, f"(dio {code})")

# --- Catalogo --------------------------------------------------------------
code, body = call("GET", "/products?limit=5")
check("listar productos", code == 200 and len(body["data"]) > 0)
products = body["data"]
check("producto trae price numerico", all(isinstance(p["price"], (int, float)) for p in products))
check("ningun price en NaN/cero", all(p["price"] > 0 for p in products))
# Algunas piezas no tienen fotografia a proposito: el frontend dibuja un
# respaldo de marca. Lo que importa es que el campo exista y sea coherente.
check("campo image presente y bien tipado",
      all(p["image"] is None or isinstance(p["image"], str) for p in products))
check("las piezas con foto la exponen resuelta",
      all(p["image"].startswith("http") for p in products if p["image"]))
check("producto trae nombre", all(p["name"] for p in products))
check("meta de paginacion", body["meta"]["total"] >= len(products))

code, body = call("GET", "/products?sort=price_asc&limit=3")
prices = [p["price"] for p in body["data"]]
check("orden por precio asc", prices == sorted(prices), prices)

code, body = call("GET", "/products?search=chompa")
check("busqueda por nombre", code == 200 and len(body["data"]) >= 1)

code, body = call("GET", "/categories")
check("listar categorias", code == 200 and len(body["data"]) == 12)

code, body = call("GET", "/collections")
check("listar colecciones", code == 200 and len(body["data"]) == 4)

product = products[0]
code, body = call("GET", f"/products/{product['id']}")
check("detalle de producto", code == 200 and body["data"]["sku"] == product["sku"])

# La URL publica va por slug; el id tiene que seguir resolviendo para los
# links viejos y para lo que guarda el carrito.
code, body = call("GET", f"/products/{product['slug']}")
check(
    "detalle por slug",
    code == 200 and body["data"]["id"] == product["id"],
    f"(/{product['slug']})",
)

code, body = call("GET", "/products/no-existe-este-slug")
check("slug inexistente da 404", code == 404)

# --- Variantes, fotos y catalogos textiles ---------------------------------
code, body = call("GET", "/textile/materials")
check("fibras", code == 200 and len(body["data"]) >= 4)

code, body = call("GET", "/textile/colors")
check("colores textiles", code == 200 and len(body["data"]) >= 4)

code, body = call("GET", "/textile/sizes")
tallas = body["data"] if code == 200 else []
# Vienen por `order` y no alfabeticas: S, M, L no siguen el abecedario.
check("talles ordenados", code == 200 and tallas == sorted(tallas, key=lambda t: t["order"]))

code, body = call("GET", "/textile/seasons")
check("temporadas", code == 200 and len(body["data"]) >= 1)

code, body = call("POST", "/variants", {
    "product_id": product["id"],
    "sku": "SMOKE-VAR-001",
    "color_name": "Verde Prueba",
    "color_hex": "#2E7D32",
    "price": "199.90",
    "stock": 7,
    "min_stock": 2,
}, token=staff_token)
check("crear variante", code == 201, body)
variant_id = body["data"]["id"] if code == 201 else None

code, body = call("POST", "/variants", {
    "product_id": product["id"], "sku": "SMOKE-VAR-001", "price": "10.00",
}, token=staff_token)
check("SKU de variante duplicado da 409", code == 409)

code, body = call("GET", "/stock?limit=100", token=staff_token)
fila = next((r for r in body["data"] if r["variantId"] == variant_id), None)
check("la variante nace con su fila de stock", fila is not None and fila["quantity"] == 7)

code, body = call("GET", "/stock/movements?limit=5", token=staff_token)
check("el alta deja movimiento", any("SMOKE-VAR-001" in (m["reason"] or "") for m in body["data"]))

code, body = call("PUT", f"/variants/{variant_id}", {"price": "249.90"}, token=staff_token)
check("actualizar variante", code == 200 and body["data"]["price"] == 249.9)

code, body = call("POST", f"/products/{product['id']}/media", {
    "url": "https://example.com/smoke.jpg", "alt_text": "Foto de humo", "is_principal": True,
}, token=staff_token)
check("agregar foto", code == 201)
media_id = body["data"]["id"] if code == 201 else None

code, body = call("GET", f"/products/{product['id']}")
principales = [m for m in body["data"]["media"] if m["is_principal"]]
check("queda una sola foto principal", len(principales) == 1 and principales[0]["id"] == media_id)

code, body = call("DELETE", f"/media/{media_id}", token=staff_token)
check("borrar foto", code == 200)

code, body = call("GET", f"/products/{product['id']}")
principales = [m for m in body["data"]["media"] if m["is_principal"]]
check("al borrar la principal otra toma su lugar", len(principales) == 1)

code, body = call("DELETE", f"/variants/{variant_id}", token=staff_token)
check("borrar variante sin ventas", code == 200 and body["data"]["deleted"])

code, body = call("GET", "/stock?limit=100", token=staff_token)
check("se llevo su fila de stock", not any(r["variantId"] == variant_id for r in body["data"]))

code, body = call("POST", "/variants", {
    "product_id": product["id"], "sku": "SMOKE-VAR-002", "price": "1.00",
})
check("crear variante sin token da 401", code == 401)

# --- CMS -------------------------------------------------------------------
code, body = call("GET", "/cms/hero")
check("hero slides", code == 200 and len(body["data"]) == 3)

code, body = call("GET", "/faq")
total_faq = sum(len(c["items"]) for c in body["data"])
check("FAQ agrupada", code == 200 and total_faq == 12, f"({total_faq} items)")

code, body = call("GET", "/cms/testimonials")
check("testimonios", code == 200 and len(body["data"]) == 4)

code, body = call("GET", "/contents/nosotros")
check("contenido por slug", code == 200 and body["data"]["title"] == "Nosotros")

# --- Carrito ---------------------------------------------------------------
call("DELETE", "/cart", token=cust_token)

code, body = call("GET", "/cart", token=cust_token)
check("carrito arranca vacio", code == 200 and body["data"]["items"] == [])

code, body = call(
    "POST", "/cart/items", {"product_id": product["id"], "quantity": 2}, token=cust_token
)
check("agregar al carrito", code == 201, body)
cart = body["data"] if code == 201 else {}
check("carrito con 1 linea", len(cart.get("items", [])) == 1)
check("subtotal correcto", cart.get("subtotal") == product["price"] * 2,
      f"({cart.get('subtotal')} vs {product['price'] * 2})")
check("IGV 18% aplicado", abs(cart.get("tax", 0) - round(cart["subtotal"] * 0.18, 2)) < 0.02)

expected_ship = 0 if cart["subtotal"] >= 500 else 25
check("envio segun umbral", cart.get("shippingFee") == expected_ship)

code, body = call(
    "POST", "/cart/items", {"product_id": product["id"], "quantity": 1}, token=cust_token
)
check("reagregar acumula cantidad", body["data"]["items"][0]["quantity"] == 3)

item_id = body["data"]["items"][0]["id"]
code, body = call("PATCH", f"/cart/items/{item_id}", {"quantity": 2}, token=cust_token)
check("cambiar cantidad", code == 200 and body["data"]["items"][0]["quantity"] == 2)

# 99 esta dentro del limite del schema (le=99), asi que llega a la validacion
# de stock real en vez de cortar en el 422 de Pydantic.
code, body = call(
    "POST", "/cart/items", {"product_id": product["id"], "quantity": 99}, token=cust_token
)
check("rechaza cantidad sobre stock", code == 409, f"(dio {code})")

code, body = call(
    "POST", "/cart/items", {"product_id": product["id"], "quantity": 999}, token=cust_token
)
check("cantidad fuera de rango da 422", code == 422, f"(dio {code})")

# --- Cupon -----------------------------------------------------------------
code, body = call("POST", "/cart/coupon?code=BIENVENIDO10", token=cust_token)
check("aplicar cupon 10%", code == 200, body)
if code == 200:
    cart = body["data"]
    check("descuento calculado", cart["discount"] > 0)
    check("total refleja descuento",
          abs(cart["total"] - (cart["subtotal"] - cart["discount"] + cart["tax"] + cart["shippingFee"])) < 0.02)

code, body = call("POST", "/cart/coupon?code=NOEXISTE", token=cust_token)
check("cupon invalido da 404", code == 404)

# --- Favoritos -------------------------------------------------------------
code, body = call("POST", "/wishlist/items", {"product_id": product["id"]}, token=cust_token)
check("agregar a favoritos", code == 200 and body["data"]["added"] is True)

code, body = call("GET", "/wishlist", token=cust_token)
check("favoritos lista el producto", len(body["data"]) == 1)

code, body = call("POST", "/wishlist/items", {"product_id": product["id"]}, token=cust_token)
check("toggle quita de favoritos", body["data"]["added"] is False)

# --- Checkout con idempotencia --------------------------------------------
key = "smoke-test-key-001"
code, body = call("POST", "/checkout", {"payment_method": "card"}, token=cust_token,
                  headers={"Idempotency-Key": key})
check("checkout crea pedido", code == 201, body)
order = body["data"] if code == 201 else {}
check("pedido trae numero", order.get("orderNumber", "").startswith("ALP-"))

code2, body2 = call("POST", "/checkout", {"payment_method": "card"}, token=cust_token,
                    headers={"Idempotency-Key": key})
check("reintento devuelve el mismo pedido",
      body2.get("data", {}).get("orderNumber") == order.get("orderNumber"),
      f"({body2.get('data', {}).get('orderNumber')} vs {order.get('orderNumber')})")

code, body = call("GET", "/cart", token=cust_token)
check("carrito queda vacio tras checkout", body["data"]["items"] == [])

code, body = call("POST", "/checkout", {"payment_method": "card"}, token=cust_token)
check("checkout con carrito vacio da 400", code == 400, f"(dio {code})")

# --- Stock descontado ------------------------------------------------------
code, body = call("GET", f"/products/{product['id']}")
new_stock = body["data"]["stock"]
check("stock se descuenta tras la compra", new_stock == product["stock"] - 2,
      f"({new_stock} vs {product['stock'] - 2})")

# --- Cupones, campanias y promociones -------------------------------------
code, body = call("POST", "/coupons", {
    "code": "SMOKE10", "type": "percentage", "value": "10", "min_purchase": "100", "max_uses": 5,
}, token=staff_token)
check("crear cupón", code == 201, body)
coupon_id = body["data"]["id"] if code == 201 else None

code, body = call("GET", f"/coupons/{coupon_id}", token=staff_token)
check("detalle de cupón", code == 200 and body["data"]["code"] == "SMOKE10")

code, body = call("POST", "/coupons/validate", {"code": "SMOKE10", "subtotal": "500"})
check("validar cupón sirve sin login", code == 200 and body["data"]["valid"])
check("calcula el descuento", body["data"]["discount"] == 50.0)

code, body = call("POST", "/coupons/validate", {"code": "SMOKE10", "subtotal": "50"})
check("rechaza por compra mínima", code == 200 and not body["data"]["valid"], body)

code, body = call("POST", "/coupons/validate", {"code": "NO-EXISTE"})
check("cupón inexistente no es válido", code == 200 and not body["data"]["valid"])

code, body = call("PUT", f"/coupons/{coupon_id}", {"active": False}, token=staff_token)
check("desactivar cupón", code == 200 and not body["data"]["active"])
check("editar por partes no pisa el resto", body["data"]["code"] == "SMOKE10")

code, body = call("POST", "/coupons/validate", {"code": "SMOKE10", "subtotal": "500"})
check("un cupón desactivado no valida", code == 200 and not body["data"]["valid"])

code, body = call("DELETE", f"/coupons/{coupon_id}", token=staff_token)
check("borrar cupón sin usos", code == 200 and body["data"]["deleted"])

code, body = call("POST", "/campaigns", {
    "name": "Campaña de humo", "channel": "email", "budget": "1000", "status": "draft",
}, token=staff_token)
check("crear campaña", code == 201)
campaign_id = body["data"]["id"] if code == 201 else None

code, body = call("PUT", f"/campaigns/{campaign_id}", {"status": "active"}, token=staff_token)
check("actualizar campaña", code == 200 and body["data"]["status"] == "active")

code, body = call("POST", "/promotions", {
    "name": "Promo de humo", "type": "percentage", "discount_value": "15",
    "applies_to": "all", "starts_at": "2026-01-01T00:00:00Z", "ends_at": "2027-01-01T00:00:00Z",
    "campaign_id": campaign_id,
}, token=staff_token)
check("crear promoción", code == 201, body)
promotion_id = body["data"]["id"] if code == 201 else None

code, body = call("POST", "/promotions", {
    "name": "Al revés", "type": "percentage", "discount_value": "5", "applies_to": "all",
    "starts_at": "2027-01-01T00:00:00Z", "ends_at": "2026-01-01T00:00:00Z",
}, token=staff_token)
check("promoción que termina antes de empezar da 400", code == 400)

code, body = call("GET", "/promotions")
check("la promoción vigente es pública", any(p["id"] == promotion_id for p in body["data"]))

code, body = call("PUT", f"/promotions/{promotion_id}", {
    "starts_at": "2030-01-01T00:00:00Z", "ends_at": "2031-01-01T00:00:00Z",
}, token=staff_token)
check("programar la promoción a futuro", code == 200)

code, body = call("GET", "/promotions")
check("una promoción futura no se publica", not any(p["id"] == promotion_id for p in body["data"]))

code, body = call("GET", "/promotions?include_hidden=true", token=staff_token)
check("el staff ve las programadas", any(p["id"] == promotion_id for p in body["data"]))

code, body = call("DELETE", f"/campaigns/{campaign_id}", token=staff_token)
check("borrar campaña suelta sus piezas", code == 200 and body["data"]["unlinked"] >= 1)

code, body = call("GET", f"/promotions/{promotion_id}", token=staff_token)
check("la promoción sobrevive a su campaña",
      code == 200 and body["data"]["campaignId"] is None)

code, body = call("DELETE", f"/promotions/{promotion_id}", token=staff_token)
check("borrar promoción", code == 200)

code, body = call("GET", "/promotions", token=cust_token)
check("un cliente no ve promociones ocultas", code == 200)

code, body = call("POST", "/promotions", {
    "name": "Sin permiso", "type": "percentage", "discount_value": "5", "applies_to": "all",
    "starts_at": "2026-01-01T00:00:00Z", "ends_at": "2027-01-01T00:00:00Z",
}, token=cust_token)
check("un cliente no crea promociones", code == 403)

# --- Edicion del CMS -------------------------------------------------------
code, body = call("POST", "/cms/hero", {
    "title": "Slide de humo", "subtitle": "Se borra al final",
    "cta_text": "Ver", "cta_link": "/tienda", "order": 99, "active": False,
}, token=staff_token)
check("crear slide del hero", code == 201, body)
slide_id = body["data"]["id"] if code == 201 else None

code, body = call("GET", "/cms/hero")
check("el slide inactivo no sale en la web", not any(s["id"] == slide_id for s in body["data"]))

code, body = call("GET", "/cms/hero?include_hidden=true", token=staff_token)
check("el staff sí lo ve", any(s["id"] == slide_id for s in body["data"]))

code, body = call("GET", "/cms/hero?include_hidden=true")
check("include_hidden sin staff no muestra ocultos",
      not any(s["id"] == slide_id for s in body["data"]))

code, body = call("PUT", f"/cms/hero/{slide_id}", {"active": True}, token=staff_token)
check("publicar el slide", code == 200 and body["data"]["active"])
check("editar por partes no pisa lo demás", body["data"]["title"] == "Slide de humo")

code, body = call("GET", "/cms/hero")
check("ya aparece en la web", any(s["id"] == slide_id for s in body["data"]))

code, body = call("POST", "/cms/hero", {"title": ""}, token=staff_token)
check("título vacío da 422", code == 422)

code, body = call("POST", "/cms/hero", {"title": "Sin permiso"})
check("crear slide sin token da 401", code == 401)

code, body = call("DELETE", f"/cms/hero/{slide_id}", token=staff_token)
check("borrar slide", code == 200 and body["data"]["deleted"])

code, body = call("DELETE", f"/cms/hero/{slide_id}", token=staff_token)
check("borrar dos veces da 404", code == 404)

code, body = call("POST", "/cms/testimonials", {
    "author": "Prueba de humo", "text": "Testimonio de prueba", "rating": 5,
}, token=staff_token)
check("crear testimonio", code == 201)
testimonial_id = body["data"]["id"] if code == 201 else None

code, body = call("POST", "/cms/testimonials", {
    "author": "Prueba", "text": "x", "rating": 9,
}, token=staff_token)
check("rating fuera de escala da 422", code == 422)

code, body = call("DELETE", f"/cms/testimonials/{testimonial_id}", token=staff_token)
check("borrar testimonio", code == 200)

code, body = call("POST", "/cms/gallery", {
    "url": "https://example.com/smoke.jpg", "caption": "Prueba", "visible": True,
}, token=staff_token)
check("agregar imagen a la galería", code == 201)
image_id = body["data"]["id"] if code == 201 else None

code, body = call("DELETE", f"/cms/gallery/{image_id}", token=staff_token)
check("borrar imagen de la galería", code == 200)

code, body = call("POST", "/cms/processes", {
    "title": "Proceso de humo", "step_order": 99,
}, token=staff_token)
check("crear proceso artesanal", code == 201)
process_id = body["data"]["id"] if code == 201 else None

code, body = call("DELETE", f"/cms/processes/{process_id}", token=staff_token)
check("borrar proceso artesanal", code == 200)

code, body = call("POST", "/cms/benefits", {"title": "Beneficio de humo"}, token=staff_token)
check("crear beneficio", code == 201)
benefit_id = body["data"]["id"] if code == 201 else None

code, body = call("DELETE", f"/cms/benefits/{benefit_id}", token=staff_token)
check("borrar beneficio", code == 200)

# --- Pedidos ---------------------------------------------------------------
code, body = call("GET", "/orders", token=cust_token)
check("cliente lista sus pedidos", code == 200 and len(body["data"]) >= 1)

code, body = call("GET", f"/orders/{order['id']}", token=cust_token)
check("detalle de pedido", code == 200 and len(body["data"]["items"]) >= 1)
check("pedido registra eventos", len(body["data"]["events"]) >= 1)

code, body = call("GET", "/orders", token=staff_token)
check("staff ve todos los pedidos", code == 200 and body["meta"]["total"] >= 4)

code, body = call("PUT", f"/orders/{order['id']}/status",
                  {"status": "confirmed", "note": "Validado"}, token=staff_token)
check("staff cambia estado", code == 200 and body["data"]["status"] == "confirmed")

code, body = call("PUT", f"/orders/{order['id']}/status", {"status": "inventado"}, token=staff_token)
check("estado invalido da 400", code == 400)

code, body = call("PUT", f"/orders/{order['id']}/status", {"status": "shipped"}, token=cust_token)
check("cliente no cambia estados", code == 403, f"(dio {code})")

# --- Dashboard -------------------------------------------------------------
code, body = call("GET", "/analytics/kpis", token=staff_token)
check("KPIs del dashboard", code == 200 and body["data"]["ordersTotal"] >= 4)
check("KPI de ingresos", body["data"]["revenue"] > 0)

code, body = call("GET", "/analytics/top-products", token=staff_token)
check("top productos", code == 200 and len(body["data"]) >= 1)

code, body = call("GET", "/stock", token=staff_token)
check("listar stock", code == 200 and body["meta"]["total"] > 0)

code, body = call("GET", "/customers", token=staff_token)
check("listar clientes", code == 200 and body["meta"]["total"] == 2)

code, body = call("GET", "/settings/company", token=staff_token)
check("datos de la empresa", code == 200 and "Alpacart" in body["data"]["legalName"])

# --- Validaciones ----------------------------------------------------------
code, body = call("POST", "/auth/register", {"first_name": "X", "last_name": "Y",
                                             "email": "no-es-mail", "password": "12345678"})
check("email invalido da 422", code == 422)

code, body = call("POST", "/auth/register", {"first_name": "X", "last_name": "Y",
                                             "email": "nuevo@test.com", "password": "corta"})
check("password corta da 422", code == 422)

code, body = call("POST", "/contact", {"name": "Test User", "email": "t@test.com",
                                       "subject": "Consulta", "message": "Hola, quiero info."})
check("formulario de contacto", code == 201)

print(f"\n{'=' * 46}")
print(f"  {passed} OK / {failed} fallas")
print(f"{'=' * 46}")
sys.exit(1 if failed else 0)
