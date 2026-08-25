"""Cuenta del cliente: direcciones, carrito, favoritos y checkout."""

import hashlib
import json
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Header, HTTPException, status
from sqlalchemy import func, select

from app.core.coupons import motivo_de_rechazo
from app.core.deps import CustomerActor, DbSession
from app.models import (
    Cart,
    CartItem,
    Coupon,
    Customer,
    CustomerAddress,
    IdempotencyKey,
    Order,
    OrderEvent,
    OrderItem,
    Product,
    ProductVariant,
    WishlistItem,
)
from app.schemas.common import ok
from app.schemas.customers import (
    AddressCreate,
    AddressOut,
    CartItemCreate,
    CartItemUpdate,
    CheckoutRequest,
    ProfileUpdate,
    WishlistToggle,
)

router = APIRouter(tags=["Clientes"])

IGV = Decimal("0.18")
FREE_SHIPPING_FROM = Decimal("500.00")
FLAT_SHIPPING = Decimal("25.00")


# --------------------------------------------------------------------------
# Perfil y direcciones
# --------------------------------------------------------------------------
@router.put("/customers/me", summary="Actualizar mi perfil")
def update_profile(payload: ProfileUpdate, db: DbSession, actor: CustomerActor):
    customer = db.get(Customer, actor.id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(customer, field, value)
    db.commit()
    db.refresh(customer)
    return ok(
        {
            "id": str(customer.id),
            "firstName": customer.first_name,
            "lastName": customer.last_name,
            "email": customer.email,
            "phone": customer.phone,
        }
    )


@router.get("/customers/addresses", summary="Mis direcciones")
def list_addresses(db: DbSession, actor: CustomerActor):
    rows = db.scalars(
        select(CustomerAddress)
        .where(CustomerAddress.customer_id == actor.id)
        .order_by(CustomerAddress.is_default.desc(), CustomerAddress.id)
    ).all()
    return ok([AddressOut.model_validate(r).model_dump(mode="json") for r in rows])


@router.post(
    "/customers/addresses", status_code=status.HTTP_201_CREATED, summary="Crear direccion"
)
def create_address(payload: AddressCreate, db: DbSession, actor: CustomerActor):
    if payload.is_default:
        db.query(CustomerAddress).filter(CustomerAddress.customer_id == actor.id).update(
            {"is_default": False}
        )
    address = CustomerAddress(**payload.model_dump(), customer_id=actor.id)
    db.add(address)
    db.commit()
    db.refresh(address)
    return ok(AddressOut.model_validate(address).model_dump(mode="json"))


@router.delete("/customers/addresses/{address_id}", summary="Eliminar direccion")
def delete_address(address_id: int, db: DbSession, actor: CustomerActor):
    address = db.get(CustomerAddress, address_id)
    if not address or address.customer_id != actor.id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Direccion no encontrada")
    db.delete(address)
    db.commit()
    return ok({"deleted": True, "id": address_id})


# --------------------------------------------------------------------------
# Carrito
# --------------------------------------------------------------------------
def get_or_create_cart(db, customer_id: UUID) -> Cart:
    cart = db.scalar(select(Cart).where(Cart.customer_id == customer_id))
    if not cart:
        cart = Cart(customer_id=customer_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart


def recalculate(db, cart: Cart) -> None:
    """Recalcula totales del carrito desde sus items. Unica fuente de verdad."""
    subtotal = sum((item.total for item in cart.items), Decimal("0.00"))
    discount = Decimal("0.00")

    if cart.coupon_id:
        coupon = db.get(Coupon, cart.coupon_id)
        if coupon and coupon.active:
            if coupon.type == "percentage":
                discount = (subtotal * Decimal(coupon.value) / 100).quantize(Decimal("0.01"))
            else:
                discount = Decimal(coupon.value)
            discount = min(discount, subtotal)

    taxable = subtotal - discount
    cart.subtotal = subtotal
    cart.discount = discount
    cart.tax = (taxable * IGV).quantize(Decimal("0.01"))
    cart.shipping_fee = (
        Decimal("0.00") if taxable >= FREE_SHIPPING_FROM or taxable == 0 else FLAT_SHIPPING
    )
    cart.total = taxable + cart.tax + cart.shipping_fee


def serialize_cart(cart: Cart) -> dict:
    return {
        "id": str(cart.id),
        "items": [
            {
                "id": item.id,
                "productId": str(item.product_id) if item.product_id else None,
                "productSlug": item.product.slug if item.product else None,
                "variantId": str(item.variant_id) if item.variant_id else None,
                "name": item.name,
                "sku": item.sku,
                "variantLabel": item.variant_label,
                "image": item.image_url,
                "unitPrice": float(item.unit_price),
                "price": float(item.unit_price),
                "quantity": item.quantity,
                "total": float(item.total),
            }
            for item in sorted(cart.items, key=lambda i: i.id)
        ],
        "subtotal": float(cart.subtotal),
        "discount": float(cart.discount),
        "tax": float(cart.tax),
        "shippingFee": float(cart.shipping_fee),
        "total": float(cart.total),
        "couponId": cart.coupon_id,
    }


@router.get("/cart", summary="Ver mi carrito")
def get_cart(db: DbSession, actor: CustomerActor):
    cart = get_or_create_cart(db, actor.id)
    return ok(serialize_cart(cart))


@router.post("/cart/items", status_code=status.HTTP_201_CREATED, summary="Agregar al carrito")
def add_item(payload: CartItemCreate, db: DbSession, actor: CustomerActor):
    product = db.get(Product, payload.product_id)
    if not product or product.deleted_at is not None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Producto no encontrado")

    variant = None
    if payload.variant_id:
        variant = db.get(ProductVariant, payload.variant_id)
        if not variant or variant.product_id != product.id:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Variante invalida")
    else:
        actives = [v for v in product.variants if v.status == "active"]
        if not actives:
            raise HTTPException(status.HTTP_409_CONFLICT, "El producto no tiene variantes activas")
        variant = min(actives, key=lambda v: v.price)

    if variant.stock < payload.quantity:
        raise HTTPException(
            status.HTTP_409_CONFLICT, f"Stock insuficiente: quedan {variant.stock} unidades"
        )

    cart = get_or_create_cart(db, actor.id)
    existing = next((i for i in cart.items if i.variant_id == variant.id), None)

    if existing:
        existing.quantity += payload.quantity
        existing.total = Decimal(existing.unit_price) * existing.quantity
    else:
        image = next((m.url for m in product.media if m.is_principal), None)
        if not image and product.media:
            image = product.media[0].url
        db.add(
            CartItem(
                cart_id=cart.id,
                product_id=product.id,
                variant_id=variant.id,
                name=product.name,
                sku=variant.sku,
                variant_label=variant.color_name,
                image_url=image,
                unit_price=variant.price,
                quantity=payload.quantity,
                total=Decimal(variant.price) * payload.quantity,
            )
        )

    db.flush()
    db.refresh(cart)
    recalculate(db, cart)
    db.commit()
    db.refresh(cart)
    return ok(serialize_cart(cart))


@router.patch("/cart/items/{item_id}", summary="Cambiar cantidad")
def update_item(item_id: int, payload: CartItemUpdate, db: DbSession, actor: CustomerActor):
    cart = get_or_create_cart(db, actor.id)
    item = next((i for i in cart.items if i.id == item_id), None)
    if not item:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Item no encontrado en tu carrito")

    if payload.quantity <= 0:
        db.delete(item)
    else:
        if item.variant_id:
            variant = db.get(ProductVariant, item.variant_id)
            if variant and variant.stock < payload.quantity:
                raise HTTPException(
                    status.HTTP_409_CONFLICT,
                    f"Stock insuficiente: quedan {variant.stock} unidades",
                )
        item.quantity = payload.quantity
        item.total = Decimal(item.unit_price) * payload.quantity

    db.flush()
    db.refresh(cart)
    recalculate(db, cart)
    db.commit()
    db.refresh(cart)
    return ok(serialize_cart(cart))


@router.delete("/cart/items/{item_id}", summary="Quitar del carrito")
def remove_item(item_id: int, db: DbSession, actor: CustomerActor):
    cart = get_or_create_cart(db, actor.id)
    item = next((i for i in cart.items if i.id == item_id), None)
    if not item:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Item no encontrado en tu carrito")
    db.delete(item)
    db.flush()
    db.refresh(cart)
    recalculate(db, cart)
    db.commit()
    db.refresh(cart)
    return ok(serialize_cart(cart))


@router.delete("/cart", summary="Vaciar carrito")
def clear_cart(db: DbSession, actor: CustomerActor):
    cart = get_or_create_cart(db, actor.id)
    for item in list(cart.items):
        db.delete(item)
    cart.coupon_id = None
    db.flush()
    db.refresh(cart)
    recalculate(db, cart)
    db.commit()
    db.refresh(cart)
    return ok(serialize_cart(cart))


@router.post("/cart/coupon", summary="Aplicar cupon")
def apply_coupon(code: str, db: DbSession, actor: CustomerActor):
    coupon = db.scalar(select(Coupon).where(func.upper(Coupon.code) == code.upper()))
    if coupon is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Cupon invalido")

    cart = get_or_create_cart(db, actor.id)
    subtotal = sum((i.total for i in cart.items), Decimal("0.00"))

    # Mismas reglas que usa /coupons/validate: si validara distinto, un cupon
    # podria pasar la consulta previa y fallar recien al aplicarse.
    motivo = motivo_de_rechazo(coupon, subtotal)
    if motivo:
        codigo = (
            status.HTTP_404_NOT_FOUND
            if motivo == "El cupon esta desactivado"
            else status.HTTP_409_CONFLICT
        )
        raise HTTPException(codigo, motivo)

    cart.coupon_id = coupon.id
    recalculate(db, cart)
    db.commit()
    db.refresh(cart)
    return ok(serialize_cart(cart))


# --------------------------------------------------------------------------
# Favoritos
# --------------------------------------------------------------------------
@router.get("/wishlist", summary="Mis favoritos")
def get_wishlist(db: DbSession, actor: CustomerActor):
    rows = db.scalars(
        select(WishlistItem).where(WishlistItem.customer_id == actor.id)
    ).all()
    items = []
    for row in rows:
        product = db.get(Product, row.product_id)
        if not product or product.deleted_at is not None:
            continue
        prices = [float(v.price) for v in product.variants if v.status == "active"]
        image = next((m.url for m in product.media if m.is_principal), None)
        items.append(
            {
                "id": row.id,
                "productId": str(product.id),
                "productSlug": product.slug,
                "name": product.name,
                "sku": product.sku,
                "price": min(prices) if prices else 0.0,
                "image": image or (product.media[0].url if product.media else None),
            }
        )
    return ok(items)


@router.post("/wishlist/items", summary="Agregar o quitar de favoritos")
def toggle_wishlist(payload: WishlistToggle, db: DbSession, actor: CustomerActor):
    existing = db.scalar(
        select(WishlistItem).where(
            WishlistItem.customer_id == actor.id,
            WishlistItem.product_id == payload.product_id,
        )
    )
    if existing:
        db.delete(existing)
        db.commit()
        return ok({"added": False, "productId": str(payload.product_id)})

    if not db.get(Product, payload.product_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Producto no encontrado")

    db.add(WishlistItem(customer_id=actor.id, product_id=payload.product_id))
    db.commit()
    return ok({"added": True, "productId": str(payload.product_id)})


# --------------------------------------------------------------------------
# Checkout
# --------------------------------------------------------------------------
def next_order_number(db) -> str:
    year = datetime.now(timezone.utc).year
    prefix = f"ALP-{year}-"
    last = db.scalar(
        select(Order.order_number)
        .where(Order.order_number.like(f"{prefix}%"))
        .order_by(Order.order_number.desc())
        .limit(1)
    )
    seq = int(last.rsplit("-", 1)[1]) + 1 if last else 1
    return f"{prefix}{seq:04d}"


@router.post("/checkout", status_code=status.HTTP_201_CREATED, summary="Confirmar pedido")
def checkout(
    payload: CheckoutRequest,
    db: DbSession,
    actor: CustomerActor,
    idempotency_key: Annotated[str | None, Header(alias="Idempotency-Key")] = None,
):
    """Convierte el carrito en pedido.

    Descuenta stock con SELECT ... FOR UPDATE para que dos checkouts simultaneos
    no puedan vender la misma unidad. El header Idempotency-Key evita que un
    reintento del cliente genere un segundo pedido.
    """
    request_hash = hashlib.sha256(
        json.dumps(payload.model_dump(mode="json"), sort_keys=True).encode()
    ).hexdigest()

    if idempotency_key:
        record = db.scalar(
            select(IdempotencyKey).where(
                IdempotencyKey.customer_id == actor.id,
                IdempotencyKey.scope == "checkout",
                IdempotencyKey.idempotency_key == idempotency_key,
            )
        )
        if record:
            if record.request_hash != request_hash:
                raise HTTPException(
                    status.HTTP_409_CONFLICT,
                    "La clave de idempotencia ya se uso con otro contenido",
                )
            if record.status == "completed" and record.response_body:
                return record.response_body
            raise HTTPException(status.HTTP_409_CONFLICT, "Pedido en proceso, reintenta luego")

        db.add(
            IdempotencyKey(
                customer_id=actor.id,
                scope="checkout",
                idempotency_key=idempotency_key,
                request_hash=request_hash,
                status="processing",
                expires_at=datetime.now(timezone.utc) + timedelta(hours=24),
            )
        )
        db.commit()

    cart = get_or_create_cart(db, actor.id)
    if not cart.items:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "El carrito esta vacio")

    # Bloquea las variantes involucradas antes de validar y descontar.
    variant_ids = [i.variant_id for i in cart.items if i.variant_id]
    locked = {
        v.id: v
        for v in db.scalars(
            select(ProductVariant).where(ProductVariant.id.in_(variant_ids)).with_for_update()
        ).all()
    }

    for item in cart.items:
        variant = locked.get(item.variant_id)
        if variant and variant.stock < item.quantity:
            raise HTTPException(
                status.HTTP_409_CONFLICT,
                f"Stock insuficiente para {item.name}: quedan {variant.stock}",
            )

    recalculate(db, cart)
    now = datetime.now(timezone.utc)

    order = Order(
        order_number=next_order_number(db),
        customer_id=actor.id,
        status="pending",
        channel="web",
        subtotal=cart.subtotal,
        tax=cart.tax,
        shipping_fee=cart.shipping_fee,
        discount=cart.discount,
        total=cart.total,
        coupon_id=cart.coupon_id,
        notes=payload.notes,
        placed_at=now,
    )
    db.add(order)
    db.flush()

    for item in cart.items:
        db.add(
            OrderItem(
                order_id=order.id,
                product_id=item.product_id,
                variant_id=item.variant_id,
                product_name=item.name,
                sku=item.sku,
                variant_label=item.variant_label,
                image_url=item.image_url,
                unit_price=item.unit_price,
                quantity=item.quantity,
                total=item.total,
            )
        )
        variant = locked.get(item.variant_id)
        if variant:
            variant.stock -= item.quantity

    db.add(
        OrderEvent(
            order_id=order.id,
            type="created",
            title="Pedido creado",
            description=f"Pedido {order.order_number} generado desde el checkout.",
        )
    )

    if cart.coupon_id:
        coupon = db.get(Coupon, cart.coupon_id)
        if coupon:
            coupon.used_count += 1

    for item in list(cart.items):
        db.delete(item)
    cart.coupon_id = None
    db.flush()
    db.refresh(cart)
    recalculate(db, cart)

    response = ok(
        {
            "id": str(order.id),
            "orderNumber": order.order_number,
            "status": order.status,
            "subtotal": float(order.subtotal),
            "discount": float(order.discount),
            "tax": float(order.tax),
            "shippingFee": float(order.shipping_fee),
            "total": float(order.total),
            "placedAt": order.placed_at.isoformat(),
        }
    )

    if idempotency_key:
        record = db.scalar(
            select(IdempotencyKey).where(
                IdempotencyKey.customer_id == actor.id,
                IdempotencyKey.scope == "checkout",
                IdempotencyKey.idempotency_key == idempotency_key,
            )
        )
        if record:
            record.status = "completed"
            record.resource_id = order.id
            record.response_status = 201
            record.response_body = response

    db.commit()
    return response
