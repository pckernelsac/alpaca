# Entidades del Dominio — ALPACART Backend

## 1. Criterios de Clasificación

| Tipo | Definición | Ejemplo | ¿Tabla? |
|------|-----------|---------|---------|
| **Entidad** | Tiene identidad única, ciclo de vida, persiste en DB | `User`, `Product`, `Order` | Sí |
| **Value Object** | Inmutable, definido por sus atributos, sin ID propio | `Address`, `Money`, `Color` | No (embebido) |
| **Agregado** | Grupo de entidades con raíz y boundaries | `Order` (raíz) + `OrderItem` (parte) | Sí (varias tablas) |
| **Catálogo** | Lista de referencia estable, pocos cambios | `Material`, `Size`, `Category` | Sí |
| **Enum** | Conjunto fijo de valores, sin atributos extra | Order status, Payment status | ENUM de PostgreSQL |
| **Evento** | Ocurrió en el pasado, inmutable, para auditoría | `AuditLog`, `OrderEvent` | Sí |
| **Agregación** | Calculada a partir de otras tablas | KPIs, tendencias, promedios | No (vista/materialized view) |
| **DTO** | Transporte de datos entre capas | `OrderSummary`, `ProductCardData` | No |
| **Estado UI** | Solo relevante para el frontend | `sidebarOpen`, `menuOpen` | No |
| **Configuración** | Pares clave-valor del sistema | `CompanySettings` | Sí (1 registro) |

## 2. Entidades Confirmadas

### 2.1 Auth y Usuarios

#### `User` — Usuario del sistema (empleado)

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `users` |
| **Dominio** | IAM |
| **Descripción** | Empleado del sistema con acceso al dashboard |
| **Evidencia** | UserList (5 registros), UserCreate, MyProfile, AuthContext |
| **Identificador** | `id` (UUID o serial) |
| **Lifecycle** | Creado → Activo → Inactivo/Suspendido |
| **Auditable** | Sí |
| **Soft delete** | Sí (status = 'inactive') |
| **Seedable** | Sí (5 registros mock) |

**Campos preliminares:**

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `id` | UUID | Sí | PK |
| `name` | VARCHAR(255) | Sí | "Mateo Quispe" |
| `email` | VARCHAR(255) | Sí | Único, "mateo.q@alpacart.com" |
| `password` | VARCHAR(255) | Sí | Hash bcrypt |
| `phone` | VARCHAR(50) | No | "+51 900 000 000" |
| `employeeId` | VARCHAR(50) | No | "ALP-0000" |
| `position` | VARCHAR(255) | No | "Supervisor de Planta" |
| `departmentId` | INTEGER | No | FK → departments |
| `locationId` | INTEGER | No | FK → master_data (sede) |
| `roleId` | INTEGER | Sí | FK → roles |
| `avatar` | VARCHAR(500) | No | URL de imagen |
| `status` | user_status | Sí | 'active', 'inactive', 'suspended' |
| `lastAccessAt` | TIMESTAMP | No | |
| `forcePasswordChange` | BOOLEAN | No | Default false |
| `createdAt` | TIMESTAMP | Sí | |
| `updatedAt` | TIMESTAMP | Sí | |
| `deletedAt` | TIMESTAMP | No | Soft delete |

**Relaciones potenciales:** belongsTo Role, belongsTo Department, hasMany AuditLog, hasMany Session

---

#### `Role` — Rol de acceso

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `roles` |
| **Dominio** | IAM |
| **Descripción** | Define un nivel de acceso con conjunto de permisos |
| **Evidencia** | RoleList (4 registros), PermissionMatrix |
| **Identificador** | `id` |
| **Seedable** | Sí (4-5 registros) |

**Campos:** id, name, category ('critico','operativo','administrativo','externo'), description, status ('active','inactive'), createdAt, updatedAt

---

#### `Permission` — Permiso granular

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `permissions` |
| **Dominio** | IAM |
| **Descripción** | Permiso individual sobre una acción en un módulo |
| **Evidencia** | PermissionMatrix (7 permisos sobre 4 módulos) |
| **Identificador** | `id` |
| **Seedable** | Sí |

**Campos:** id, module (VARCHAR), action (VARCHAR), description, name, createdAt

---

#### `RolePermission` — Permisos por rol (N:N)

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `role_permissions` |
| **Dominio** | IAM |
| **Descripción** | Asignación de permisos a roles |
| **Evidencia** | PermissionMatrix (checkbox matrix 5 roles × 7 permisos) |

**Campos:** roleId (FK), permissionId (FK), createdAt

---

#### `Session` — Sesión activa de usuario

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `sessions` |
| **Dominio** | Auth |
| **Descripción** | Sesión JWT activa con metadatos del dispositivo |
| **Evidencia** | MyProfile (2 sesiones: MacBook + iPhone) |
| **Seedable** | No (se crean en runtime) |

**Campos:** id, userId (FK), token, device, platform, browser, ipAddress, location, lastActivityAt, createdAt, expiresAt

---

### 2.2 Catálogo

#### `Product` — Producto del catálogo

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `products` |
| **Dominio** | Catálogo |
| **Descripción** | Producto textil con variantes |
| **Evidencia** | ProductList (8 registros), ProductCreate, ProductDetail, CatalogDashboard |
| **Identificador** | `id` |
| **Lifecycle** | Borrador → Activo → Oculto → Descontinuado |
| **Auditable** | Sí |
| **Soft delete** | Sí |
| **Seedable** | Sí (8+ registros) |

**Campos:** id, name, sku (único), description, material, categoryId (FK), collectionId (FK), weight, status, tags[], createdById (FK → users), publishedAt, createdAt, updatedAt, deletedAt

---

#### `ProductVariant` — Variante de producto (SKU)

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `product_variants` |
| **Dominio** | Catálogo |
| **Descripción** | Variante específica por color/talla con precio y stock propio |
| **Evidencia** | VariantList (6 registros), VariantCreate, ProductDetail (VariantSelector) |
| **Identificador** | `id` |
| **Seedable** | Sí (6+ registros) |

**Campos:** id, productId (FK), sku (único), code, colorHex, colorName, sizeId (FK), materialId (FK), price, stock, status ('active','hidden','out_of_stock','discontinued'), createdAt, updatedAt

---

#### `Category` — Categoría de producto

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `categories` |
| **Dominio** | Catálogo |
| **Descripción** | Categoría para agrupar productos |
| **Evidencia** | Category (12 slugs), ProductList (filtro), CategoryBento (4 categorías) |
| **Tipo** | Catálogo |
| **Seedable** | Sí (12+ registros) |

**Campos:** id, name, slug (único), description, image, parentId? (auto-referencia), order, createdAt

---

#### `Collection` — Colección comercial

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `collections` |
| **Dominio** | Catálogo |
| **Descripción** | Agrupación editorial de productos con identidad de marketing |
| **Evidencia** | CollectionGrid (4 colecciones), CatalogDashboard, ProductCreate |
| **Tipo** | Catálogo |
| **Seedable** | Sí (4+ registros) |

**Campos:** id, name, slug, description, image, pieceCount?, catalogId, seasonId? (FK), active, createdAt

---

#### `ProductMedia` — Asset multimedia de producto

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `product_media` |
| **Dominio** | Catálogo |
| **Descripción** | Imagen o video asociado a producto/variante |
| **Evidencia** | ProductMedia (4 assets), ProductCreate (upload zone) |
| **Identificador** | `id` |
| **Seedable** | Sí |

**Campos:** id, productId (FK), variantId? (FK), url, type ('image','video'), format ('jpg','png','mp4'), fileSize, dimensions, altText, description, isPrincipal, visible, optimized, createdAt

---

#### `Tag` — Etiqueta de producto

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `tags` |
| **Dominio** | Catálogo |
| **Descripción** | Etiqueta textual para filtrado y SEO |
| **Evidencia** | ProductCreate (tag input con chips) |
| **Tipo** | Catálogo |
| **Seedable** | Sí |

**Campos:** id, name, slug

---

### 2.3 Clientes (CRM)

#### `Client` — Cliente corporativo (B2B)

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `clients` |
| **Dominio** | CRM |
| **Descripción** | Cliente mayorista, minorista o corporativo |
| **Evidencia** | ClientList (5 registros), ClientCreate, ClientProfile, CrmDashboard |
| **Identificador** | `id` |
| **Lifecycle** | Potencial → Activo → Inactivo → VIP |
| **Auditable** | Sí |
| **Soft delete** | Sí |
| **Seedable** | Sí (5 registros) |

**Campos:** id, name, company, email, phone, website, documentType, documentNumber, type ('mayorista','minorista','corporativo'), status ('active','inactive','vip'), assignedSellerId (FK → users), creditLimit, paymentTerms, internalNotes, createdById (FK → users), createdAt, updatedAt, deletedAt

---

#### `ClientAddress` — Dirección de cliente B2B

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `client_addresses` |
| **Dominio** | CRM |
| **Descripción** | Direcciones de facturación y envío del cliente |
| **Evidencia** | ClientProfile (2 direcciones) |
| **Tipo** | Entidad (child de Client) |

**Campos:** id, clientId (FK), type ('billing','shipping','principal'), street, city, state, country, postalCode, isDefault

---

#### `ClientPaymentMethod` — Método de pago del cliente

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `client_payment_methods` |
| **Dominio** | CRM |
| **Descripción** | Medio de pago registrado del cliente |
| **Evidencia** | ClientProfile (VISA, MC) |
| **Tipo** | Entidad (child de Client) |

**Campos:** id, clientId (FK), brand, last4, expMonth, expYear, isDefault, createdAt

---

### 2.4 Ecommerce (B2C)

#### `Customer` — Cliente de tienda (B2C)

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `customers` |
| **Dominio** | Ecommerce |
| **Descripción** | Comprador final registrado en la tienda |
| **Evidencia** | AuthContext (Tienda), Account, ProfileSettings, OrderHistory |
| **Identificador** | `id` |
| **Seedable** | No (se crean en runtime) |

**Campos:** id, userId (FK → users? o independiente), firstName, lastName, email, password, phone, language ('es','en'), currency ('PEN','USD'), comms (BOOLEAN), loyaltyTier, loyaltyPoints, emailVerifiedAt, createdAt, updatedAt

**Nota:** Customer y User podrían ser la misma tabla con role=client, o tablas separadas. El negocio B2B usa `Client`, el B2C usa `Customer`. Se recomienda mantener separados por diferencias de atributos.

---

#### `CustomerAddress` — Dirección del cliente B2C

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `customer_addresses` |
| **Dominio** | Ecommerce |
| **Descripción** | Dirección de envío del comprador |
| **Evidencia** | Addresses (2 registros), Checkout (AddressForm) |
| **Seedable** | Sí (2 registros) |

**Campos:** id, customerId (FK), name, street, city, state, zip, country, phone, isDefault

---

#### `WishlistItem` — Item de lista de deseos

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `wishlist_items` |
| **Dominio** | Ecommerce |
| **Descripción** | Producto guardado por el cliente para después |
| **Evidencia** | Wishlist (4 items), WishlistGrid, wishlistStore |
| **Seedable** | No (runtime) |

**Campos:** id, customerId (FK), productId (FK), variantId? (FK), createdAt

---

### 2.5 Pedidos

#### `Order` — Pedido / Orden de compra

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `orders` |
| **Dominio** | Pedidos |
| **Descripción** | Agregado raíz que contiene items, pagos y envíos |
| **Evidencia** | OrderList (6), OrderDetail, OrderDashboard (7 statuses), Tienda: OrderHistory (3), Thanks |
| **Identificador** | `id` (formato: APC-XXXXX) |
| **Lifecycle** | Pendiente → Confirmado → Pagado → Preparado → Enviado → Entregado / Cancelado |
| **Auditable** | Sí |
| **Soft delete** | No |
| **Seedable** | Sí (6+ registros) |

**Campos:** id, orderNumber (VARCHAR único "ORD-2024-0892"), customerId? (FK), clientId? (FK), userId (FK → creador), status, channel ('online','showroom','wholesale'), agent, subtotal, tax, shippingFee, discount, total, paid (BOOLEAN), paidAt, notes, createdAt, updatedAt, placedAt, deliveredAt

**Nota:** Support both B2B (clientId) and B2C (customerId) — one of them is required.

---

#### `OrderItem` — Línea de pedido

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `order_items` |
| **Dominio** | Pedidos |
| **Descripción** | Producto individual dentro de un pedido |
| **Evidencia** | OrderDetail (2 items), Thanks (2 items) |
| **Tipo** | Entidad (child de Order) |
| **Seedable** | Sí |

**Campos:** id, orderId (FK), productId (FK), variantId (FK), name, sku, qty, unitPrice, total, createdAt

---

#### `OrderEvent` — Evento de timeline del pedido

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `order_events` |
| **Dominio** | Pedidos |
| **Descripción** | Evento individual en la línea de tiempo del pedido |
| **Evidencia** | OrderTimeline (9 eventos), OrderDetail (4 eventos) |
| **Tipo** | Evento |
| **Seedable** | Sí |

**Campos:** id, orderId (FK), type ('created','confirmed','paid','preparing','shipped','transit','delivered','returned','cancelled'), title, description, actorId (FK → users), metadata (JSONB), createdAt

---

#### `OrderDocument` — Documento del pedido

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `order_documents` |
| **Dominio** | Pedidos |
| **Descripción** | Factura, guía de remisión, packing list |
| **Evidencia** | OrderDetail (2 documentos: invoice.pdf, packing.pdf) |

**Campos:** id, orderId (FK), type ('invoice','packing_list','label','other'), name, url, createdAt

---

### 2.6 Pagos

#### `Transaction` — Transacción financiera

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `transactions` |
| **Dominio** | Pagos |
| **Descripción** | Movimiento financiero asociado a un pedido |
| **Evidencia** | TransactionList (10 registros), PaymentDashboard, OrderDetail |
| **Identificador** | `id` (payId: "#PAY-9921") |
| **Seedable** | Sí (10 registros) |

**Campos:** id, transactionId (VARCHAR único), orderId (FK), clientId? (FK), stripeId?, method ('visa','mastercard','amex','paypal','bank_transfer','cash'), amount, currency ('USD','PEN','EUR'), status ('pending','succeeded','failed','refunded'), metadata (JSONB), createdAt

---

#### `TransactionRefund` — Reembolso

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `transaction_refunds` |
| **Dominio** | Pagos |
| **Descripción** | Reembolso parcial o total de una transacción |
| **Evidencia** | TransactionList (botón refund) |
| **Tipo** | Evento |

**Campos:** id, transactionId (FK), amount, reason, createdBy (FK → users), createdAt

---

### 2.7 Inventario

#### `Warehouse` — Almacén

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `warehouses` |
| **Dominio** | Inventario |
| **Descripción** | Ubicación física de almacenamiento |
| **Evidencia** | InventoryDashboard (4 almacenes), StockList (filtro) |
| **Tipo** | Catálogo |
| **Seedable** | Sí (4-6 registros) |

**Campos:** id, name, code, address, city, country, type ('principal','secundario','produccion'), active, createdAt

---

#### `StockItem` — Stock de producto por almacén

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `stock_items` |
| **Dominio** | Inventario |
| **Descripción** | Cantidad de un producto/variante en un almacén |
| **Evidencia** | StockList (6 registros), ProductList (stock bar) |
| **Tipo** | Entidad |
| **Seedable** | Sí (6+ registros) |

**Campos:** id, productId (FK), variantId? (FK), warehouseId (FK), quantity, reserved, minStock, maxStock, lastMovementAt, createdAt, updatedAt

---

#### `StockMovement` — Movimiento de kardex

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `stock_movements` |
| **Dominio** | Inventario |
| **Descripción** | Registro individual de entrada/salida/ajuste/transferencia |
| **Evidencia** | KardexPage (5 registros), MovementList (5 registros) |
| **Tipo** | Evento |
| **Seedable** | Sí (10 registros) |

**Campos:** id, movementNumber (VARCHAR), productId (FK), variantId? (FK), warehouseId (FK), type ('ingreso','salida','ajuste','transferencia','reserva'), quantity, balance, reference (documentRef), reason, personId (FK → users), metadata (JSONB), createdAt

---

#### `WarehouseTransfer` — Transferencia entre almacenes

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `warehouse_transfers` |
| **Dominio** | Inventario |
| **Descripción** | Traslado de productos entre almacenes |
| **Evidencia** | TransferList (8 registros), TransferTimeline |
| **Tipo** | Entidad (Agregado) |
| **Seedable** | Sí (8 registros) |

**Campos:** id, transferNumber (VARCHAR), originWarehouseId (FK), destinationWarehouseId (FK), status ('requested','authorized','transit','received','completed','cancelled','archived'), responsibleId (FK → users), notes, createdAt, updatedAt

---

### 2.8 Logística

#### `Shipment` — Envío

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `shipments` |
| **Dominio** | Logística |
| **Descripción** | Envío físico de un pedido |
| **Evidencia** | ShipmentList (6 registros), LogisticsDashboard, OrderDetail |
| **Identificador** | `id` (waybill) |
| **Seedable** | Sí (6 registros) |

**Campos:** id, waybill (VARCHAR único), orderId (FK), carrier, carrierAccount, status ('pending','transit','delayed','ready','delivered','returned'), originCity, destinationCity, dispatchedAt, estimatedAt, deliveredAt, trackingData (JSONB), createdAt, updatedAt

---

#### `ShipmentEvent` — Evento de tracking

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `shipment_events` |
| **Dominio** | Logística |
| **Descripción** | Actualización de tracking del envío |
| **Evidencia** | LogisticsDashboard (activity feed) |
| **Tipo** | Evento |

**Campos:** id, shipmentId (FK), status, location, description, timestamp, createdAt

---

### 2.9 Marketing

#### `Campaign` — Campaña de marketing

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `campaigns` |
| **Dominio** | Marketing |
| **Descripción** | Campaña comercial con presupuesto y ROI |
| **Evidencia** | CampaignList (5 registros), MarketingDashboard |
| **Identificador** | `id` |
| **Lifecycle** | Borrador → Programada → Activa → Pausada → Finalizada |
| **Seedable** | Sí (5+ registros) |

**Campos:** id, name, description, type ('seasonal','promotional','recurring','professional'), channel ('email','social','ads','automation'), budget, spent, roi, conversions, status ('draft','scheduled','active','paused','finished'), image, startDate, endDate, createdById (FK → users), createdAt, updatedAt

---

#### `Coupon` — Cupón de descuento

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `coupons` |
| **Dominio** | Marketing |
| **Descripción** | Código promocional para descuentos |
| **Evidencia** | MarketingDashboard (156 cupones), Cart (CouponBox) |

**Campos:** id, code (único), type ('percentage','fixed'), value, minPurchase, maxUses, usedCount, active, expiresAt, createdById (FK → users), createdAt

---

#### `Promotion` — Promoción

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `promotions` |
| **Dominio** | Marketing |
| **Descripción** | Promoción temporal sobre productos |
| **Evidencia** | MarketingDashboard (8 promociones), CampaignList (tab) |

**Campos:** id, name, description, type, discountType, discountValue, productIds[], startsAt, endsAt, active, createdById (FK → users), createdAt

---

### 2.10 CMS

#### `Content` — Contenido del sitio

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `contents` |
| **Dominio** | CMS |
| **Descripción** | Página, blog, banner o artículo del sitio |
| **Evidencia** | ContentList (7 registros), CmsDashboard |
| **Identificador** | `id` |
| **Lifecycle** | Borrador → Revisión → Publicado/Programado |
| **Seedable** | Sí (7 registros) |

**Campos:** id, title, slug (único), type ('page','blog','banner','collection','promo','faq'), body (TEXT), image, authorId (FK → users), status ('published','draft','scheduled','review'), publishedAt, createdAt, updatedAt

---

### 2.11 Textil

#### `FiberMaterial` — Tipo de fibra textil

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `fiber_materials` |
| **Dominio** | Textil |
| **Descripción** | Fibra o material textil (Alpaca Baby, Vicuña, etc.) |
| **Evidencia** | TextileDashboard (4 tipos), CatalogFilters (4 filtros), TextileVariantList |
| **Tipo** | Catálogo |
| **Seedable** | Sí (6-24 registros) |

**Campos:** id, name, category, slug, micronRating, origin, certification, description, active

---

#### `TextileColor` — Color textil

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `textile_colors` |
| **Dominio** | Textil |
| **Descripción** | Color con código hexadecimal y nombre comercial |
| **Evidencia** | TextileDashboard (156 colores), VariantCreate (color picker) |
| **Tipo** | Catálogo |
| **Seedable** | Sí (156 registros posibles) |

**Campos:** id, name, hex (#C79A4B), pantone?, active

---

#### `TextileSize` — Talla

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `textile_sizes` |
| **Dominio** | Textil |
| **Descripción** | Talla o medida estandarizada |
| **Evidencia** | TextileDashboard (12 tallas), ProductDetail (VariantSelector) |
| **Tipo** | Catálogo |
| **Seedable** | Sí (12 registros) |

**Campos:** id, name ('XS','S','M','L','XL','XXL','OS','KIDS'), category ('adult','kids'), order

---

#### `Season` — Temporada

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `seasons` |
| **Dominio** | Textil |
| **Descripción** | Temporada de colección |
| **Evidencia** | TextileDashboard (4 temporadas), VariantCreate |
| **Tipo** | Catálogo |
| **Seedable** | Sí (4-12 registros) |

**Campos:** id, name, startMonth, endMonth, active

---

### 2.12 Auditoría

#### `AuditLog` — Registro de auditoría

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `audit_logs` |
| **Dominio** | Auditoría |
| **Descripción** | Evento de auditoría del sistema |
| **Evidencia** | AuditLog (6 registros) |
| **Tipo** | Evento |
| **Seedable** | Sí (6 registros) |

**Campos:** id, userId (FK), action, module, description, ipAddress, device, severity ('exitosa','fallo','advertencia','info','critico'), metadata (JSONB), createdAt

---

### 2.13 Configuración

#### `CompanySetting` — Configuración de empresa

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `company_settings` |
| **Dominio** | Configuración |
| **Descripción** | Configuración global de la empresa (una fila) |
| **Evidencia** | Settings (1 registro) |
| **Tipo** | Configuración |
| **Seedable** | Sí (1 registro) |

**Campos:** id, logo (URL), legalName, taxId, industry, website, email, phone, address, primaryCurrency ('USD','PEN','EUR'), defaultTimezone, systemLanguage, createdAt, updatedAt

---

### 2.14 Master Data

#### `MasterEntity` — Entidad de datos maestros

| Aspecto | Detalle |
|---------|---------|
| **Tabla** | `master_entities` |
| **Dominio** | Master Data |
| **Descripción** | Registro genérico en un catálogo maestro |
| **Evidencia** | MasterData (10 tipos: categories, brands, materials, colors, sizes, seasons, countries, cities, currencies, taxes) |

Propuesta: tabla polimórfica `master_entity_type` + `master_entities`, o tablas separadas por tipo.

---

## 3. Entidades Probables

| Entidad | Justificación | Prioridad |
|---------|--------------|-----------|
| `Department` | UserList (5 departamentos), UserCreate (select departamento) | Alta |
| `Location` / `Sede` | UserCreate (select sede: Arequipa, Puno, Lima, Cusco) | Media |
| `Review` | ProductReviews (2 reseñas con rating, autor, tag) | Alta |
| `Cart` | Cart page, cartStore, Checkout | Alta |
| `ContactInquiry` | Contacto (formulario + validación) | Alta |
| `NewsletterSubscriber` | Newsletter (Institucional y Tienda) | Media |
| `InventoryAlert` | InventoryDashboard (3 alertas de stock) | Baja (evento derivado) |
| `KpiDefinition` | Todos los dashboards (configuración de KPIs) | Baja |
| `Carrier` | ShipmentList (DHL, FedEx, Local), LogisticsDashboard | Media |
| `BrandInfo` | About (misión, visión, historia) | Baja |
| `FAQItem` | FAQ (4 categorías, ~15 preguntas) | Alta |
| `GalleryImage` | Gallery (varios frontends) | Baja |

---

## 4. Elementos Descartados como Entidades

| Elemento | Motivo | Clasificación correcta |
|----------|--------|----------------------|
| `PageHeader` | Solo presentacional | Componente UI |
| `MenuSection` / Sidebar | Solo navegación | Config frontend |
| `KPI Card` | Métrica calculada en runtime | Aggregation query |
| `BarChart` / `DonutChart` | Visualización de datos | Componente UI |
| `Toast` / `Alert` / `Modal` | Estado de UI transitorio | Componente UI |
| `Loader` / `Skeleton` | Estado de carga | Componente UI |
| `Breadcrumb` | Navegación derivada de ruta | Componente UI |
| `Pagination` | Control de UI | Componente UI |
| `SearchInput` | Control de UI | Componente UI |
| `FilterBar` / `FilterSelect` | Control de UI | Componente UI |
| `OrderSummary` / `OrderTotal` | Proyección calculada | DTO / Query |
| `ProductCard` / `ProductGrid` | Presentación de producto | Componente UI |
| `KpiTrend` / `TrendIndicator` | Indicador visual de tendencia | Componente UI |
| `StatusBadge` | Presentación de estado | Componente UI |
| `ColorSwatch` / `SizeButton` | Selector visual | Componente UI |
| `AddressForm` / `PaymentForm` | Formulario compuesto | Componente UI |
| `CheckoutStepper` | Control de flujo multi-paso | Componente UI |
| `couponApplied/remember` | Estado local de formulario | Estado UI transitorio |
| `NotificationBell/dot` | Indicador visual | Componente UI |
| `Avatar initials` | Derivado de user.name | Presentacional |
| `StockProgress/Bar` | Indicador visual de nivel | Componente UI |
| `Timeline visual` | Representación de eventos | Componente UI |
| `SuccessMessage` | Estado post-acción | Componente UI |
| `HeroBanner/Slider` | Banner promocional | Componente UI |
| `Testimonial card` | Cita de cliente | Value Object (incrustado en Content) |
| `SocialGrid/Instagram` | Feed social externo | Integración externa |
| `Artisan card` | Perfil de artesano | Podría ser Content type |
| `FAQ accordion` | UI de preguntas | Componente UI |
| `MapWidget` | Placeholder geográfico | Componente UI (integración Google Maps) |
| `FAB (FloatingActionButton)` | Acción rápida | Componente UI |

## 5. Resumen de Tablas Propuestas

| # | Tabla | Dominio | Tipo | Seed | Registros |
|---|-------|---------|------|------|-----------|
| 1 | `users` | IAM | Entidad | ✓ | 5 |
| 2 | `roles` | IAM | Catálogo | ✓ | 4 |
| 3 | `permissions` | IAM | Catálogo | ✓ | 7 |
| 4 | `role_permissions` | IAM | Relación | ✓ | 35 |
| 5 | `departments` | IAM | Catálogo | ✓ | 5 |
| 6 | `sessions` | Auth | Evento | ✗ | — |
| 7 | `products` | Catálogo | Entidad | ✓ | 8 |
| 8 | `product_variants` | Catálogo | Entidad | ✓ | 12 |
| 9 | `categories` | Catálogo | Catálogo | ✓ | 12 |
| 10 | `collections` | Catálogo | Catálogo | ✓ | 4 |
| 11 | `product_media` | Catálogo | Entidad | ✓ | 4 |
| 12 | `tags` | Catálogo | Catálogo | ✓ | 10 |
| 13 | `clients` | CRM | Entidad | ✓ | 5 |
| 14 | `client_addresses` | CRM | Entidad | ✓ | 2 |
| 15 | `client_payment_methods` | CRM | Entidad | ✓ | 2 |
| 16 | `client_notes` | CRM | Evento | ✓ | 3 |
| 17 | `customers` | Ecommerce | Entidad | ✗ | — |
| 18 | `customer_addresses` | Ecommerce | Entidad | ✓ | 2 |
| 19 | `wishlist_items` | Ecommerce | Entidad | ✗ | — |
| 20 | `orders` | Pedidos | Entidad (Agregado) | ✓ | 6 |
| 21 | `order_items` | Pedidos | Entidad (child) | ✓ | 10 |
| 22 | `order_events` | Pedidos | Evento | ✓ | 15 |
| 23 | `order_documents` | Pedidos | Entidad | ✓ | 5 |
| 24 | `transactions` | Pagos | Entidad | ✓ | 10 |
| 25 | `transaction_refunds` | Pagos | Evento | ✓ | 2 |
| 26 | `warehouses` | Inventario | Catálogo | ✓ | 4 |
| 27 | `stock_items` | Inventario | Entidad | ✓ | 10 |
| 28 | `stock_movements` | Inventario | Evento | ✓ | 10 |
| 29 | `warehouse_transfers` | Inventario | Entidad (Agregado) | ✓ | 8 |
| 30 | `shipments` | Logística | Entidad | ✓ | 6 |
| 31 | `shipment_events` | Logística | Evento | ✓ | 10 |
| 32 | `carriers` | Logística | Catálogo | ✓ | 3 |
| 33 | `campaigns` | Marketing | Entidad | ✓ | 9 |
| 34 | `coupons` | Marketing | Entidad | ✗ | — |
| 35 | `promotions` | Marketing | Entidad | ✓ | 3 |
| 36 | `contents` | CMS | Entidad | ✓ | 7 |
| 37 | `fiber_materials` | Textil | Catálogo | ✓ | 6 |
| 38 | `textile_colors` | Textil | Catálogo | ✓ | 10 |
| 39 | `textile_sizes` | Textil | Catálogo | ✓ | 8 |
| 40 | `seasons` | Textil | Catálogo | ✓ | 4 |
| 41 | `audit_logs` | Auditoría | Evento | ✓ | 6 |
| 42 | `company_settings` | Config | Config | ✓ | 1 |
| 43 | `contact_inquiries` | Leads | Entidad | ✓ | 3 |
| 44 | `newsletter_subscribers` | Marketing | Entidad | ✓ | 3 |
| 45 | `faq_categories` | CMS | Catálogo | ✓ | 4 |
| 46 | `faq_items` | CMS | Entidad | ✓ | 15 |
| 47 | `reviews` | Ecommerce | Entidad | ✓ | 2 |
| 48 | `master_entity_types` | Master Data | Catálogo | ✓ | 10 |

## 6. Matriz de Trazabilidad Frontend → Entidad

| Componente/Página | Frontend | Entidad(es) relacionada(s) |
|-------------------|----------|---------------------------|
| Login | Dashboard, Tienda | User, Session |
| UserList, UserCreate | Dashboard | User, Role, Department, Location |
| RoleList, PermissionMatrix | Dashboard | Role, Permission, RolePermission |
| ProductList, ProductCreate | Dashboard, Tienda | Product, Category, Collection, Tag |
| VariantList, VariantCreate | Dashboard, Tienda | ProductVariant, TextileColor, TextileSize, FiberMaterial |
| ProductMedia | Dashboard | ProductMedia |
| OrderList, OrderDetail, OrderDashboard | Dashboard | Order, OrderItem, OrderEvent, OrderDocument |
| OrderTimeline | Dashboard | OrderEvent |
| ClientList, ClientCreate, ClientProfile | Dashboard | Client, ClientAddress, ClientPaymentMethod, ClientNote |
| TransactionList, PaymentDashboard | Dashboard | Transaction, TransactionRefund |
| StockList, KardexPage, MovementList | Dashboard | StockItem, StockMovement, Warehouse |
| TransferList | Dashboard | WarehouseTransfer |
| ShipmentList, LogisticsDashboard | Dashboard | Shipment, ShipmentEvent, Carrier |
| CampaignList, MarketingDashboard | Dashboard | Campaign, Coupon, Promotion |
| ContentList, CmsDashboard | Dashboard | Content |
| TextileDashboard, TextileVariantList | Dashboard | FiberMaterial, TextileColor, TextileSize, Season |
| AuditLog | Dashboard | AuditLog |
| Settings | Dashboard | CompanySetting |
| MasterData | Dashboard | MasterEntityType + MasterEntity |
| MyProfile | Dashboard, Tienda | User, Session |
| Login, Register | Tienda | Customer |
| Account, ProfileSettings | Tienda | Customer |
| Addresses | Tienda | CustomerAddress |
| Cart, Checkout | Tienda | Order (en progreso), CartItem (transitorio) |
| Wishlist | Tienda | WishlistItem |
| ProductDetail | Tienda | Product, ProductVariant, Review |
| Category, Collection | Tienda | Category, Collection, Product |
| SearchResults | Tienda | Product |
| OrderHistory, OrderTracking, Thanks | Tienda | Order, OrderEvent, Shipment |
| Contact | Institucional | ContactInquiry |
| Newsletter | Institucional, Tienda | NewsletterSubscriber |
| FAQ | Institucional | FaqCategory, FaqItem |
| Terms, Policies | Institucional | Content (type=page) |
| About, Catalog, Promotions | Institucional | Content, Product, Campaign |

---

*Documento generado el 2026-07-10. 48 tablas identificadas, 12 dominios de negocio.*
