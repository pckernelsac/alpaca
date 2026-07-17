# Shared Foundation — Package Architecture

## Estructura

```
packages/
├── shared-types/         # 20 interfaces TypeScript
│   ├── package.json
│   └── src/index.ts
├── shared-utils/         # 8 funciones utilitarias
│   ├── package.json
│   └── src/index.ts
└── shared-constants/     # 6 grupos de constantes
    ├── package.json
    └── src/index.ts
```

## shared-types (20 interfaces)

| Interfaz | Entidad Backend | Propiedades |
|----------|----------------|-------------|
| User | users | id, name, email, role, status |
| Role | roles | id, name, category, permissions |
| Customer | customers | id, firstName, lastName, email, phone, language, currency |
| Product | products | id, sku, name, description, price, material, images, status |
| Category | categories | id, name, slug, parentId |
| Collection | collections | id, name, seasonId, pieceCount |
| Variant | product_variants | id, productId, size, color, stock |
| Order | orders | id, customerId, status, total, items |
| OrderItem | order_items | id, orderId, productId, variantId, quantity, price |
| Cart | carts | id, customerId, items, couponId |
| CartItem | cart_items | id, cartId, productId, variantId, quantity |
| Address | addresses | id, customerId, type, line1, city, country |
| Payment | transactions | id, orderId, amount, status, method |
| Shipment | shipments | id, orderId, carrier, tracking, status |
| Coupon | coupons | id, code, type, value, minPurchase, active |
| Campaign | campaigns | id, name, type, startDate, endDate |
| HeroSlide | hero_slides | id, title, subtitle, image, cta, order |
| Testimonial | testimonials | id, name, text, image, rating |
| FaqCategory | faq_categories | id, name, icon, items |
| FaqItem | faq_items | id, question, answer, order |

## shared-utils (8 funciones)

| Función | Propósito |
|---------|-----------|
| formatCurrency(value, currency) | Formatea moneda (S/ 123.45) |
| slugify(text) | Convierte texto a URL slug |
| debounce(fn, delay) | Debounce para búsqueda |
| truncate(text, length) | Corta texto con "..." |
| generateSku(name, categoryId) | Genera SKU único |
| validateEmail(email) | Valida email regex |
| parseQueryParams(params) | Parsea query params a objeto |
| buildApiUrl(base, path, params) | Construye URL con query string |

## shared-constants (6 grupos)

| Grupo | Constantes |
|-------|-----------|
| ROUTES | API_BASE, DASHBOARD, TIENDA, INSTITUCIONAL paths |
| STORAGE_KEYS | TOKEN, USER, CART, THEME localStorage keys |
| THEME | COLORS (primary, secondary, accent), FONTS |
| BREAKPOINTS | MOBILE, TABLET, DESKTOP, WIDE en px |
| ROLES | ADMIN, STAFF, CUSTOMER |
| ORDER_STATUS | PENDING, PAID, CONFIRMED, SHIPPED, DELIVERED, CANCELLED |

## Aliases configurados

| Alias | Resuelve a | Dashboard | Tienda | Institucional |
|-------|-----------|-----------|--------|---------------|
| @alpacart/shared-types | ../../packages/shared-types/src | ✅ | ✅ | ✅ |
| @alpacart/shared-utils | ../../packages/shared-utils/src | ✅ | ✅ | ✅ |
| @alpacart/shared-constants | ../../packages/shared-constants/src | ✅ | ✅ | ✅ |

## Dependencias entre paquetes

```
shared-types (sin dependencias)
shared-utils → shared-types (opcional, para typing)
shared-constants → shared-types (opcional, para typing)
```

## Build

| Frontend | Módulos | Estado |
|----------|---------|--------|
| Dashboard | 157 | ✅ Build exitoso |
| Tienda | 201 | ✅ Build exitoso |
| Institucional | 233 | ✅ Build exitoso |
