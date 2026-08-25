# 05 — Persistencia

## Objetivo
Evaluar el modelo de datos: modelos Sequelize, migraciones, constraints, claves foráneas, índices, unique constraints, transacciones y bloqueos.

## Alcance
- `database/migrations/` (especialmente 011-016)
- `src/modules/*/entities/` (55 entidades)

## Estado actual
Base de datos PostgreSQL con 59 tablas, 40+ CHECK constraints, 40+ Foreign Keys, 50+ índices, transacciones atómicas en checkout y pagos con SELECT FOR UPDATE.

## Evidencias encontradas

### Migraciones de constraints (013-add-check-constraints)
- 40+ CHECK constraints cubriendo:
  - **IAM**: status de usuarios (active/inactive/suspended), roles, sessions, password_resets
  - **Catalog**: status de productos (draft/active/hidden/discontinued), variantes, media type/format
  - **CRM**: status de clientes (active/inactive/vip), tipo (wholesale/retail/corporate), tipo documento, tipo dirección
  - **Customers**: language (es/en), currency (PEN/USD), rating (1-5), cart_items quantity > 0
  - **Orders**: status (9 estados), order_items quantity > 0, order_events type, documents type
  - **Payments**: method (6 métodos), status (5 estados), currency (USD/PEN/EUR), refunds amount > 0
  - **Inventory**: warehouse type, stock_items quantity >= 0, reserved >= 0 y <= quantity, movements type, transfers status
  - **Logistics**: shipments status
  - **Marketing**: campaigns status/type, coupons type, promotions type/applies_to
  - **CMS**: contents status/type
  - **Audit**: severity (5 niveles), action (create/update/delete/login)

### Migraciones de Foreign Keys (012-add-missing-foreign-keys)
- ~40 FKs con políticas de borrado:
  - `CASCADE`: role_permissions, wishlist_items, stock_items, reviews
  - `SET NULL`: users.created_by, product_variants.*, orders.*, cart_items, etc.
  - `RESTRICT`: transactions.order_id, shipments.order_id, campaigns.created_by

### Migraciones de Índices (014-add-essential-indexes)
- ~50 índices incluyendo compuestos como `idx_products_category_status` y `idx_stock_items_warehouse_product`

### Migraciones de Unique Constraints
- `uq_role_permission` (role_id + permission_id)
- `uq_idempotency_customer_scope_key` (customer_id + scope + idempotency_key)
- `uq_webhook_provider_event` (provider + external_event_id)

### Transacciones en Checkout (`customers.service.ts`)
- Transacción con `SELECT ... FOR UPDATE` sobre `stock_items` (bloqueo pesimista)
- Ordenamiento deterministico de stock IDs para evitar deadlocks
- Validación de stock disponible vs reservado dentro de la transacción
- Creación de order + order items + order event + reserva de stock + consumo de cupón + limpieza de carrito — todo atómico
- Manejo de idempotencia con `IdempotencyService`

### Transacciones en Pagos (`payments.service.ts`)
- Transacciones en: `handlePaymentSuccess`, `handlePaymentFailure`, `handleChargeRefunded`, `releaseExpiredReservations`
- Actualización atómica de: transaction → order status → stock commit/release → order event
- Webhook deduplication via `webhook_events` table con unique constraint

### 55 entidades Sequelize (src/modules/*/entities/)
| Dominio | Entidades |
|---------|-----------|
| IAM (5) | User, Role, Permission, RolePermission, Department |
| Auth (2) | Session, PasswordReset |
| Catalog (6) | Product, ProductVariant, ProductMedia, Category, Collection, Tag |
| Textile (4) | FiberMaterial, TextileColor, TextileSize, Season |
| CRM (4) | Client, ClientAddress, ClientPaymentMethod, ClientNote |
| Customers (7) | Customer, CustomerAddress, WishlistItem, Review, Cart, CartItem, IdempotencyKey |
| Orders (4) | Order, OrderItem, OrderEvent, OrderDocument |
| Payments (2) | Transaction, TransactionRefund |
| Inventory (5) | Warehouse, StockItem, StockMovement, WarehouseTransfer, WarehouseTransferItem |
| Logistics (3) | Shipment, ShipmentEvent, Carrier |
| Marketing (4) | Campaign, Coupon, Promotion, NewsletterSubscriber |
| CMS (7) | Content, Faq, HeroSlide, GalleryImage, Testimonial, Benefit, ArtisanProcess |
| Audit (1) | AuditLog |
| Settings (1) | CompanySetting |

## Hallazgos
1. **F1**: 55 entidades mapean funcionalmente a 59 tablas (diferencia por tablas pivote role_permissions, product_tags sin entidad propia).
2. **F2**: CHECK constraints exhaustivas cubren todos los dominios de negocio.
3. **F3**: Foreign Keys con políticas de borrado bien definidas (SET NULL, CASCADE, RESTRICT).
4. **F4**: Índices esenciales creados para consultas frecuentes.
5. **F5**: Transacciones atómicas con SELECT FOR UPDATE en checkout — correcto para consistencia de stock.
6. **F6**: Webhook deduplication con unique constraint + manejo de concurrencia.
7. **F7**: Idempotencia implementada con findOrCreate + status management.

## Riesgos
- **R1**: Sin synchronize, cambios en entidades requieren migración manual — riesgo de desincronización.
- **R2**: SELECT FOR UPDATE en checkout puede generar contención en alta concurrencia.

## Recomendaciones
1. Mantener migraciones manuales con control de versiones.
2. Monitorear contención de locks en checkout bajo carga.
3. Agregar tests de integración para transacciones concurrentes.

## Acciones Prioridad P0
- Ninguna — modelo de persistencia sólido.

## Acciones Prioridad P1
- Agregar script de verificación: entidades vs tablas migradas.

## Acciones Prioridad P2
- Documentar estrategia de locks y concurrencia.

## Score
**9.0 / 10**

## Estado: APROBADO
