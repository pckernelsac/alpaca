# Architecture Decision Records — ALPACART Backend

## ADR-001: Carrito de Compras

**Estado:** Aceptada
**Contexto:** El frontend de Tienda (`frontend/tienda/src/stores/cartStore.js`) mantiene el carrito exclusivamente en localStorage con persistencia cliente. El Checkout envía datos al servidor para crear pedidos. No existe tabla `carts` ni `cart_items` en el blueprint original.

**Evidencia:**
- `cartStore.js`: `getItems()`, `addItem()`, `updateQuantity()`, `removeItem()`, `clear()`, `subscribe()` — store basado en localStorage con listeners
- `cartStore.js`: clave `tienda_cart` en localStorage
- `Cart.jsx`: renderiza desde `cartStore.getItems()`
- `Checkout.jsx`: usa `sampleItems` mock, no integrado con cartStore real
- `Payment.jsx`: mismo patrón
- No hay endpoints `GET /cart`, `POST /cart/items`, `PATCH /cart/items/:id` consumidos
- Los mocks no incluyen datos de carrito persistido en servidor

**Alternativas consideradas:**
| Alternativa | Descripción |
|-------------|-------------|
| A. Solo frontend | Carrito 100% en localStorage, sin servidor (estado actual) |
| B. Solo servidor | Carrito en PostgreSQL, requiere auth siempre |
| C. Híbrido | localStorage para invitados, servidor para autenticados |

**Decisión: Híbrido con servidor para autenticados**

- **Invitados:** carrito en localStorage (como hoy). Al hacer login, migrar al servidor.
- **Autenticados:** carrito en PostgreSQL (`carts` + `cart_items`), cacheado en Redis para respuesta rápida.
- **Checkout:** siempre persiste en servidor (`POST /checkout/place`).

**Nuevas tablas:**
```sql
carts (
  id UUID PK,
  customer_id UUID FK → customers (nullable para invitados),
  session_id VARCHAR(255) (nullable, para invitados),
  coupon_id INT FK → coupons (nullable),
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping_fee NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + '7 days',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_cart_owner CHECK ((customer_id IS NOT NULL) OR (session_id IS NOT NULL))
)

cart_items (
  id SERIAL PK,
  cart_id UUID FK → carts ON DELETE CASCADE,
  product_id UUID FK → products,
  variant_id UUID FK → product_variants (nullable),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(50) NOT NULL,
  variant_label VARCHAR(255),
  image_url VARCHAR(500),
  unit_price NUMERIC(12,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  total NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

**Consecuencias:**
- +2 tablas en PostgreSQL
- +6 endpoints REST (`GET /cart`, `POST /cart/items`, `PATCH /cart/items/:id`, `DELETE /cart/items/:id`, `POST /cart/coupon`, `DELETE /cart/coupon`)
- Lógica de migración localStorage → servidor en login
- Expiración automática: 7 días sin actividad
- Redis opcional para caché de carritos activos

**Riesgos:** Migración de carrito de invitado a autenticado (pérdida de items si no se implementa correctamente).

---

## ADR-002: Clientes B2B vs Customers B2C

**Estado:** Aceptada
**Contexto:** El Dashboard CRM gestiona clientes corporativos (B2B) con asignación de vendedor, condiciones comerciales y límite de crédito. La Tienda gestiona compradores finales (B2C) con registro propio, wishlist y direcciones de envío. Comparten el módulo de pedidos y pagos.

**Evidencia:**
- Dashboard: `ClientList.jsx` — 5 clientes con `company`, `documentType`, `type` (mayorista/minorista/corporativo), `assignedSellerId`
- Dashboard: `ClientCreate.jsx` — 6 tabs, campos específicos B2B
- Dashboard: `ClientProfile.jsx` — LTV, avg ticket, credit limit, payment terms
- Tienda: `Account.jsx` — loyalty tier, puntos, historial de pedidos personales
- Tienda: `ProfileSettings.jsx` — firstName, lastName, email, phone, language, currency
- Tienda: `Login.jsx` — registro propio con email+password
- Ambos pueden crear pedidos: `orders.client_id` (B2B) y `orders.customer_id` (B2C)

**Alternativas consideradas:**
| Alternativa | Descripción |
|-------------|-------------|
| A. Tabla única `users` con tipo | Una tabla, columna `type` ('b2b','b2c','staff'). Campos muy diferentes. |
| B. Tres tablas separadas | `users` (staff), `clients` (B2B), `customers` (B2C). Cada una con sus propios campos. |
| C. `users` + `clients` + `customers` | Staff en `users`. B2B en `clients`. B2C en `customers`. Sin herencia. |

**Decisión: Tres tablas separadas**

```sql
-- Staff del sistema (Dashboard)
users: id, name, email, password, role_id, department_id, position, employee_id, phone, avatar, status, force_password_change, last_access_at, created_at, updated_at, deleted_at

-- Cliente corporativo (Dashboard CRM)
clients: id, name, company, email, phone, website, document_type, document_number, type, status, assigned_seller_id FK→users, credit_limit, payment_terms, ltv, avg_ticket, internal_notes, created_at, updated_at, deleted_at

-- Cliente final (Tienda)
customers: id, first_name, last_name, email, password, phone, language, currency, comms, loyalty_tier, loyalty_points, email_verified_at, created_at, updated_at
```

**Pedidos:**
```sql
orders: customer_id FK→customers (nullable), client_id FK→clients (nullable), user_id FK→users (nullable, staff creator)
CONSTRAINT chk_order_owner CHECK (
  (customer_id IS NOT NULL)::int + (client_id IS NOT NULL)::int = 1
  -- Exactamente uno debe ser NOT NULL
)
```

**Transacciones:**
```sql
transactions: payable_id INT NOT NULL, payable_type VARCHAR(20) NOT NULL CHECK (payable_type IN ('client', 'customer'))
-- Sin FK real. Integridad vía aplicación.
```

**Consecuencias:**
- Modelo claro sin ambigüedad
- No necesita type discriminator
- CHECK constraint garantiza integridad en orders
- Transacciones usan payable polimórfico (único caso justificado)
- +1 fase de implementación (clientes B2B separada de customers B2C)

**Riesgos:** Bajo. La separación es clara en los frontends.

---

## ADR-003: Unidad de Inventario (Stock)

**Estado:** Aceptada
**Contexto:** El Dashboard gestiona stock a nivel de producto (`StockList.jsx` muestra stock agregado) y a nivel de variante (`VariantList.jsx` permite editar stock inline). La Tienda (`ProductDetail.jsx`) muestra disponibilidad por variante (color + talla). El frontend usa `stock_items` para control por almacén.

**Evidencia:**
- `StockList.jsx`: columnas Producto, SKU, Categoría, Almacén, Unidades (barra), Estado
- `VariantList.jsx`: stock editable inline por variante
- `InventoryDashboard.jsx`: stock por almacén (4 warehouses)
- `ProductDetail.jsx` (Tienda): selector de variante muestra stock disponible
- Mocks: `StockList.jsx` — 6 productos con `id, name, sku, category, units, reserved, min, max, warehouse, lastSync, status`
- Mocks: `VariantList.jsx` — 6 variantes con `id, color, talla, material, sku, price, stock, status`

**Decisión: Stock por variante, agregado por producto**

```sql
stock_items (
  id SERIAL PK,
  product_id UUID FK→products (nullable),
  variant_id UUID FK→product_variants (nullable),
  warehouse_id INT FK→warehouses NOT NULL,
  quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  reserved INT NOT NULL DEFAULT 0 CHECK (reserved >= 0 AND reserved <= quantity),
  min_stock INT DEFAULT 0,
  max_stock INT DEFAULT 0,
  version INT NOT NULL DEFAULT 1,  -- Optimistic locking
  last_movement_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_stock_owner CHECK ((product_id IS NOT NULL) OR (variant_id IS NOT NULL)),
  UNIQUE (variant_id, warehouse_id),  -- Una fila por variante+almacén
  UNIQUE (product_id, warehouse_id)   -- O una fila por producto+almacén (si no tiene variante)
)
```

**Reglas de negocio:**
- Stock se controla siempre a nivel de **variante** (cuando existe)
- Productos sin variantes usan `product_id` directamente
- `quantity - reserved` = stock disponible para la tienda
- `version` columna para optimistic locking en ajustes concurrentes
- Las consultas agregadas (`SUM(quantity) GROUP BY product_id`) dan el stock total de producto

**Consecuencias:**
- CHECK constraint previene estados inválidos
- Optimistic locking previene race conditions en ajustes de stock
- Consultas de tienda simples: `SELECT quantity - reserved FROM stock_items WHERE variant_id = :v`
- Consultas de dashboard: `SELECT SUM(quantity) FROM stock_items WHERE product_id = :p GROUP BY warehouse_id`

**Riesgos:** La concurrencia en `reserved` (reserva simultánea durante checkout) requiere transacciones SERIALIZABLE o advisory locks.

---

## ADR-004: Transferencias entre Almacenes

**Estado:** Aceptada
**Contexto:** `TransferList.jsx` muestra 8 transferencias con columnas ID, Fecha, Origen, Destino, Items, Responsable, Estado. La timeline muestra 5 pasos. Las transferencias pueden contener múltiples productos.

**Evidencia:**
- `TransferList.jsx`: columna "Items" muestra "45 Items" — evidencia de múltiples productos por transferencia
- `TransferList.jsx`: mock `{ id, date, origin, destination, items: "45 Items", ... }` — items es un string count, no un solo SKU
- Timeline: 5 pasos (Solicitada → Autorizada → En Tránsito → Recibida → Completada)

**Decisión: Una transferencia = múltiples SKU**

```sql
warehouse_transfers (
  id UUID PK DEFAULT gen_random_uuid(),
  transfer_number VARCHAR(30) NOT NULL UNIQUE,
  origin_warehouse_id INT FK→warehouses NOT NULL,
  destination_warehouse_id INT FK→warehouses NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','authorized','in_transit','received','completed','cancelled','archived')),
  responsible_id UUID FK→users,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

warehouse_transfer_items (
  id SERIAL PK,
  transfer_id UUID FK→warehouse_transfers ON DELETE CASCADE NOT NULL,
  product_id UUID FK→products (nullable),
  variant_id UUID FK→product_variants (nullable),
  quantity INT NOT NULL CHECK (quantity > 0),
  lot_number VARCHAR(100),
  CONSTRAINT chk_transfer_item_owner CHECK ((product_id IS NOT NULL) OR (variant_id IS NOT NULL))
)
```

**Flujo de ejecución:**
```
1. POST /transfers { origin, destination, items: [{productId, variantId, quantity}] }
2. → Crea warehouse_transfer + warehouse_transfer_items
3. Al autorizar (status='authorized'): valida stock suficiente en origen
4. Al enviar (status='in_transit'): decrementa stock_items.origen, crea stock_movements (type='transfer', negative)
5. Al recibir (status='received'): incrementa stock_items.destino, crea stock_movements (type='transfer', positive)
6. Al completar (status='completed'): cierra transferencia
```

**Consecuencias:**
- +1 tabla (`warehouse_transfer_items`)
- Soporte nativo para múltiples SKU por transferencia
- Integridad transaccional: TODO o NOTHING en los movimientos de stock

**Riesgos:** Si una transferencia con 45 items falla a mitad del proceso, requiere rollback completo. Implementar con transacciones de base de datos.

---

## ADR-005: Pagos — Eliminación de Polimorfismo

**Estado:** Aceptada
**Contexto:** El blueprint original usa `transactions.payable_id` polimórfico para soportar pagos de clientes B2B y customers B2C. Sin embargo, el polimorfismo en PostgreSQL no tiene soporte nativo de FK.

**Evidencia:**
- `TransactionList.jsx`: columna "Cliente" puede ser "Textiles Cusco S.A.C" (B2B) o "Juan Pérez" (B2C)
- `PaymentDashboard.jsx`: transacciones asociadas a pedidos, no directamente a clientes
- `OrderDetail.jsx`: el pago se muestra dentro del contexto del pedido
- `Order.jsx` (Tienda): el pago es del customer que hizo el pedido
- `ClientProfile.jsx`: muestra transacciones del cliente vía `client_id → orders → transactions`

**Análisis de relación real:**
```
Order → Transaction (1:N)
Order → Client (N:1, nullable)
Order → Customer (N:1, nullable)
```

La relación real es: **Transaction → Order → (Client|Customer)**. No es necesario que Transaction tenga payable_id. Basta con:

```
transactions.order_id FK→orders
```

**Decisión: Eliminar payable_id polimórfico. Usar order_id como única FK.**

```sql
transactions (
  id UUID PK DEFAULT gen_random_uuid(),
  transaction_id VARCHAR(50) NOT NULL UNIQUE,
  order_id UUID FK→orders NOT NULL,
  stripe_id VARCHAR(100),
  method VARCHAR(30) NOT NULL CHECK (method IN ('visa','mastercard','amex','paypal','bank_transfer','cash')),
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(5) NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD','PEN','EUR')),
  status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','succeeded','failed','refunded')),
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

**Para consultar pagos por cliente:**
```sql
-- B2B
SELECT t.* FROM transactions t
JOIN orders o ON t.order_id = o.id
WHERE o.client_id = :clientId

-- B2C
SELECT t.* FROM transactions t
JOIN orders o ON t.order_id = o.id
WHERE o.customer_id = :customerId
```

**Consecuencias:**
- FK real a orders (integridad referencial garantizada por PostgreSQL)
- Sin polimorfismo
- Consultas ligeramente más largas (JOIN a orders), pero correctas
- El frontend de TransactionList necesitará JOIN: `transactions → orders → (clients|customers)` para mostrar el nombre del cliente

**Riesgos:** Ninguno. Es un modelo relacional puro.

---

## ADR-006: Snapshots Históricos en Order Items

**Estado:** Aceptada
**Contexto:** Cuando se genera una factura meses después de un pedido, los precios y nombres de productos pueden haber cambiado. Los order_items deben conservar los valores del momento de la compra.

**Evidencia:**
- `OrderDetail.jsx` (Dashboard): items con `name, variant, sku, qty, unitPrice, total, img` — todos valores históricos
- `Thanks.jsx` (Tienda): items con `title, variant, qty, price` — valores al momento de la compra
- `OrderList.jsx`: total del pedido, no necesita detalle histórico
- No hay evidencia de que se actualicen order_items después de creados

**Decisión: Snapshot completo en cada order_item**

```sql
order_items (
  id SERIAL PK,
  order_id UUID FK→orders ON DELETE CASCADE NOT NULL,
  product_id UUID FK→products ON DELETE SET NULL,  -- preservar histórico si se elimina producto
  variant_id UUID FK→product_variants ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,           -- Snapshot: nombre al momento de la compra
  sku VARCHAR(50) NOT NULL,             -- Snapshot: SKU al momento de la compra
  variant_label VARCHAR(255),           -- Snapshot: "Color: Sand | Size: M"
  image_url VARCHAR(500),               -- Snapshot: imagen del producto
  unit_price NUMERIC(12,2) NOT NULL,    -- Snapshot: precio unitario
  quantity INT NOT NULL CHECK (quantity > 0),
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,  -- Snapshot: descuento aplicado al ítem
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,        -- Snapshot: impuesto del ítem
  total NUMERIC(12,2) NOT NULL,         -- Snapshot: total del ítem
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

**Consecuencias:**
- `name`, `sku`, `unit_price`, `discount_amount`, `tax_amount` se copian de product/variant al momento de crear el pedido
- Si el producto se elimina o modifica después, la factura histórica es correcta
- +2 campos vs el blueprint original (discount, tax por ítem)
- Los datos de productos actuales se consultan desde `products`/`product_variants` para la tienda; los históricos desde `order_items` para facturación

**Riesgos:** Ninguno. Práctica estándar en ecommerce.

---

## ADR-007: Cupones, Promociones y Campañas

**Estado:** Aceptada
**Contexto:** El módulo de Marketing tiene 3 conceptos que se mezclan en el frontend: campañas (agrupación), cupones (códigos de descuento), promociones (descuentos automáticos). CampaignList.jsx tiene tabs: Campañas, Promociones, Cupones, Descuentos, Landing Pages, Segmentos.

**Evidencia:**
- `CampaignList.jsx`: 3 tabs principales (Campañas, Cupones, Descuentos/Landing Pages)
- `MarketingDashboard.jsx`: "Nuevo cupón", "Nueva promoción", "Nueva campaña"
- `Cart.jsx` (Tienda): `CouponBox` aplica código de cupón
- `Cart.jsx`: descuento mostrado en el resumen (cupón aplicado)
- No hay evidencia de campañas aplicando descuentos directos a productos

**Decisión:**
```sql
-- Campaña: agrupación temporal con presupuesto y ROI
campaigns (
  id UUID PK,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) CHECK (type IN ('seasonal','promotional','recurring','professional')),
  channel VARCHAR(50),
  budget NUMERIC(12,2),
  spent NUMERIC(12,2) DEFAULT 0,
  roi VARCHAR(20),
  conversions INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'draft' CHECK (status IN ('draft','scheduled','active','paused','closing','finished')),
  image VARCHAR(500),
  start_date DATE,
  end_date DATE,
  created_by UUID FK→users NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

-- Cupón: código promocional aplicable en checkout
coupons (
  id SERIAL PK,
  code VARCHAR(50) NOT NULL UNIQUE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage','fixed')),
  value NUMERIC(8,2) NOT NULL CHECK (value > 0),
  min_purchase NUMERIC(12,2),
  max_uses INT,
  used_count INT NOT NULL DEFAULT 0,
  campaign_id UUID FK→campaigns,  -- opcional: cupón puede pertenecer a campaña
  active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_by UUID FK→users NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

-- Promoción: descuento automático sobre productos/categorías
promotions (
  id SERIAL PK,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(30) NOT NULL CHECK (type IN ('percentage','fixed','bogo')),
  discount_value NUMERIC(8,2) NOT NULL CHECK (discount_value > 0),
  applies_to VARCHAR(30) NOT NULL CHECK (applies_to IN ('product','category','collection','order')),
  product_ids INT[] DEFAULT '{}',  -- Array de IDs si applies_to='product'
  category_id INT FK→categories,   -- Si applies_to='category'
  collection_id VARCHAR(20) FK→collections,  -- Si applies_to='collection'
  campaign_id UUID FK→campaigns,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID FK→users NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

-- Rastreo de cupón usado en pedido: columna en orders
ALTER TABLE orders ADD COLUMN coupon_id INT FK→coupons;
```

**Consecuencias:**
- Campañas agrupan cupones y promociones (relación opcional)
- Cupones aplicados se rastrean en `orders.coupon_id`
- Promociones pueden aplicar a productos específicos (array de IDs), categorías o colecciones
- Sin tabla puente (el modelo es lo suficientemente flexible con JSONB + FKs opcionales)

**Riesgos:** El uso de `INT[]` para `product_ids` en promociones no es normalizado. Alternativa futura: `promotion_products` si se necesita consultar eficientemente "qué promociones aplican a este producto".

---

## ADR-008: Almacenamiento de Multimedia

**Estado:** Aceptada
**Contexto:** Los tres frontends usan imágenes de productos, avatares, banners, galerías institucionales y documentos PDF. Actualmente todas las imágenes referencian un bucket público de Google (`lh3.googleusercontent.com`). No hay un sistema propio de almacenamiento.

**Evidencia:**
- Todas las imágenes mock usan `https://lh3.googleusercontent.com/aida-public/...` (Google Cloud Storage público)
- `ProductMedia.jsx`: upload de JPG, PNG, MP4 hasta 50MB
- `UserCreate.jsx`, `MyProfile.jsx`: upload de avatar JPG, PNG, WEBP hasta 2MB
- `Settings.jsx`: upload de logo SVG, PNG, JPG hasta 5MB
- `OrderDetail.jsx`: descarga de documentos PDF
- `utils/format.js` en tienda: no hay funciones de transformación de imágenes (sin CDN)

**Alternativas consideradas:**
| Alternativa | Local | Producción | Costo | Transformaciones |
|-------------|-------|------------|-------|-----------------|
| A. S3 + MinIO local + Sharp | MinIO (Docker) | S3 | Bajo ($) | Custom (Sharp) |
| B. Cloudinary | No (solo cloud) | Cloudinary | Medio ($$) | Built-in (URL params) |
| C. S3 + CloudFront + Sharp | LocalStack | S3 + CF | Medio ($$) | Custom (Sharp Lambda) |

**Decisión: S3 + MinIO (local) con Sharp para transformaciones**

- **Local:** MinIO vía Docker (`docker run minio/minio`)
- **Producción:** AWS S3 + CloudFront
- **Transformaciones:** Sharp (Node.js, procesamiento on-the-fly o batch)
- **Portabilidad:** Misma interfaz S3 (AWS SDK), cambiar endpoint vía env vars

```typescript
// config/storage.config.ts
const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 's3',  // 's3' | 'minio'
  endpoint: process.env.S3_ENDPOINT,            // http://localhost:9000 (MinIO)
  region: process.env.S3_REGION,
  bucket: process.env.S3_BUCKET,
  privateBucket: process.env.S3_PRIVATE_BUCKET,
  accessKey: process.env.S3_KEY,
  secretKey: process.env.S3_SECRET,
};
```

**Consecuencias:**
- Portabilidad total (mismo código, diferente endpoint)
- Sin dependencia de servicios externos (Cloudinary) para funcionamiento local
- Sharp permite redimensionar, convertir a WEBP, comprimir
- Las URLs públicas van por CloudFront en producción
- Los documentos privados (facturas) usan pre-signed URLs con expiración

**Riesgos:** Implementación de transformaciones con Sharp requiere un worker/microservicio separado o integración en el API. Costo de desarrollo inicial mayor que Cloudinary.

---

## ADR-009: Autenticación y Sesiones

**Estado:** Aceptada
**Contexto:** Los tres frontends usan JWT almacenado en localStorage. No hay refresh token. El token se configura con expiración de 24h (o 30d con "Recordarme"). La sesión se invalida solo con logout explícito.

**Evidencia:**
- `AuthContext.jsx` (Dashboard y Tienda): `login(token, userData)` → almacena en localStorage
- `services/auth/index.js`: `getToken()`, `setToken()`, `removeToken()`, `isAuthenticated()`
- `services/api/interceptors.js`: interceptor agrega `Authorization: Bearer <token>`
- `services/api/interceptors.js`: 401 → limpia token y redirige a `/login`
- `Login.jsx`: checkbox "Recordarme" → expiración extendida
- `MyProfile.jsx`: muestra sesiones activas (2 dispositivos)

**Decisión: Access token (JWT) + Refresh token (httpOnly cookie)**

```typescript
// Estrategia
// Access token: JWT, 15min de vida, almacenado en memoria (variable JS)
// Refresh token: JWT, 7 días (30 días con remember), httpOnly cookie, almacenado en DB
// Rotación de refresh token: cada vez que se usa, se emite uno nuevo (invalida el anterior)

// Login
POST /auth/login → { accessToken, expiresIn }
  Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict; Path=/api/v1/auth; Max-Age=2592000

// Refresh
POST /auth/refresh → { accessToken, expiresIn }
  (lee refreshToken de cookie, emite nuevo par)

// Logout
POST /auth/logout → invalida refresh token en DB
  Clear-Cookie: refreshToken
```

**Base de datos:**
```sql
sessions (
  id UUID PK,
  user_id UUID FK→users NOT NULL,
  refresh_token VARCHAR(500) NOT NULL UNIQUE,
  device_name VARCHAR(255),
  platform VARCHAR(50),
  browser VARCHAR(100),
  ip_address VARCHAR(45),
  last_activity_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

**Flujo de integración con frontend:**
```
1. POST /auth/login → response: { accessToken, user } + Set-Cookie (refresh)
2. Frontend guarda accessToken en memoria (variable, no localStorage)
3. Axios interceptor agrega Bearer token desde memoria
4. Si 401, intenta POST /auth/refresh (cookie automática)
5. Si refresh falla (cookie expirada), redirige a /login
```

**Consecuencias:**
- Mayor seguridad: access token dura 15 minutos, no en localStorage
- Refresh token httpOnly: inmune a XSS
- Rotación de refresh token previene reuso
- Sesiones visibles en MyProfile (dispositivos activos)
- Logout remoto posible (DELETE /auth/sessions/:id)

**Riesgos:**
- Cambio significativo en el frontend: pasar de localStorage a memoria
- Los fetch requests cross-origin entre frontends (dashboard:3102, tienda:3100, api:3000) requieren configuración CORS con credentials: include
- El refresh token rotado requiere que el frontend maneje race conditions (múltiples requests 401 simultáneos → un solo refresh)

---

## ADR-010: Enums — Estrategia de Persistencia

**Estado:** Aceptada
**Contexto:** El sistema tiene 26 conjuntos de estados identificados (06-estados-enums.md). La decisión es cómo persistirlos: PostgreSQL ENUM, VARCHAR + CHECK, o tabla catálogo.

**Evidencia:**
- 26 enums identificados, ~120 valores únicos
- `StatusBadge.jsx`: mapea 18 estados a colores
- Varios enums tienen valores que cambian (roles, categorías)
- Los status como `order_status` son fijos (no cambian sin cambiar el negocio)
- Los valores como `roles` pueden ser creados por el usuario (Admin)

**Decisión: Tres estrategias según tipo**

| Tipo | Estrategia | Cuándo usar | Ejemplos |
|------|-----------|-------------|----------|
| **Fijo** (inmutable) | VARCHAR + CHECK | Valores que no cambiarán | `order_status`, `payment_status`, `movement_type`, `severity`, `audit_action` |
| **Semi-fijo** (cambia raramente) | Tabla catálogo + seed | Valores que pueden editarse vía seed | `carriers`, `warehouses`, `departments`, `document_types`, `campaign_channels` |
| **Dinámico** (CRUD por usuario) | Tabla de negocio | Valores creados por usuarios | `roles`, `categories`, `collections`, `tags` |

**Implementación:**

```sql
-- Estrategia 1: VARCHAR + CHECK (22 enums fijos)
CHECK (status IN ('active', 'inactive', 'suspended'))
CHECK (order_status IN ('pending','confirmed','paid','preparing','shipped','in_transit','delivered','cancelled','returned'))
CHECK (payment_status IN ('pending','processing','succeeded','failed','refunded'))
CHECK (shipment_status IN ('pending','preparing','ready','transit','delayed','delivered','returned'))
CHECK (product_status IN ('draft','active','hidden','discontinued'))
CHECK (variant_status IN ('active','hidden','out_of_stock','discontinued','coming_soon'))
CHECK (movement_type IN ('receipt','issue','transfer','adjustment','reservation'))
CHECK (transfer_status IN ('requested','authorized','in_transit','received','completed','cancelled','archived'))
CHECK (content_status IN ('draft','review','scheduled','published'))
CHECK (content_type IN ('page','blog','banner','collection','promo','faq'))
CHECK (campaign_status IN ('draft','scheduled','active','paused','closing','finished'))
CHECK (client_type IN ('wholesale','retail','corporate'))
CHECK (client_status IN ('active','inactive','vip'))
CHECK (document_type IN ('ruc','dni','passport','foreigner_card'))
CHECK (severity IN ('success','info','warning','error','critical'))
CHECK (audit_action IN ('create','update','delete','login'))
CHECK (media_type IN ('image','video'))
CHECK (media_format IN ('jpg','png','mp4','webp','svg'))
CHECK (campaign_channel IN ('email','social','ads','automation'))
CHECK (warehouse_type IN ('principal','secondary','production'))
CHECK (address_type IN ('principal','billing','shipping'))
CHECK (contact_status IN ('pending','read','replied','archived'))

-- Estrategia 2: Tabla catálogo con seed (4 tablas)
carriers, departments, document_types (maestro), campaign_channels

-- Estrategia 3: Tabla de negocio (ya existen)
roles, categories, collections, tags
```

**Consecuencias:**
- 22 CHECK constraints en las tablas correspondientes
- 4 tablas catálogo con seeds (carriers, departments, etc.)
- 4 tablas de negocio que ya existen en el modelo
- Sin dependency hell de ENUMs de PostgreSQL (que no se pueden alterar fácilmente)
- CHECK constraints son alterables con `ALTER TABLE ... DROP CONSTRAINT ... ADD CONSTRAINT ...`

**Riesgos:** Las CHECK constraints con muchos valores pueden ser difíciles de mantener. Para >10 valores, considerar tabla catálogo.

---

## Resumen de Decisiones

| ADR | Decisión | Impacto |
|-----|----------|---------|
| 001 | Carrito híbrido: localStorage + PostgreSQL (carts + cart_items) | +2 tablas, +6 endpoints |
| 002 | B2B (clients) y B2C (customers) en tablas separadas | Claridad del modelo |
| 003 | Stock por variante, agregado por producto | CHECK constraint + version column |
| 004 | Transferencias multi-SKU con `warehouse_transfer_items` | +1 tabla |
| 005 | Eliminar polimorfismo en pagos. FK directa a orders | Integridad referencial |
| 006 | Snapshot completo en order_items (name, sku, price, tax, discount) | Historial de facturación |
| 007 | Campañas, cupones, promociones como entidades separadas | Claridad del modelo |
| 008 | S3 + MinIO local + Sharp para transformaciones | Portabilidad |
| 009 | JWT (15min) + Refresh token (httpOnly cookie, 7-30d) | Seguridad |
| 010 | VARCHAR + CHECK para enums fijos, tabla para dinámicos | Mantenibilidad |

---

*Documento generado el 2026-07-10. 10 ADRs resueltos. Backend blueprint listo para implementación.*
