# Backend Blueprint — ALPACART

## 1. Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| Módulos NestJS | 14 |
| Tablas PostgreSQL | 48 |
| Endpoints REST | 171 |
| Seeds desde mocks | ~85 |
| DTOs estimados | ~120 |
| Guards | 3 (Auth, Role, Ownership) |
| Interceptors | 3 (Transform, Audit, Pagination) |

---

## 2. Módulos NestJS

```
src/
├── main.ts
├── app.module.ts
├── config/
│   ├── database.config.ts
│   ├── jwt.config.ts
│   ├── storage.config.ts
│   └── env.validation.ts
├── common/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   └── ownership.guard.ts
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   ├── roles.decorator.ts
│   │   └── permissions.decorator.ts
│   ├── interceptors/
│   │   ├── transform.interceptor.ts
│   │   ├── audit.interceptor.ts
│   │   └── pagination.interceptor.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
│   └── dto/
│       ├── pagination.dto.ts
│       └── api-response.dto.ts
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── roles/
│   ├── catalog/
│   ├── clients/
│   ├── customers/
│   ├── orders/
│   ├── payments/
│   ├── inventory/
│   ├── logistics/
│   ├── marketing/
│   ├── cms/
│   ├── textile/
│   └── audit/
│
├── database/
│   ├── migrations/
│   └── seeds/
│       ├── 01-roles.ts
│       ├── 02-departments.ts
│       ├── 03-permissions.ts
│       ├── 04-users.ts
│       ├── 05-categories.ts
│       ├── 06-collections.ts
│       ├── 07-products.ts
│       ├── 08-variants.ts
│       ├── 09-clients.ts
│       ├── 10-orders.ts
│       ├── 11-warehouses.ts
│       ├── 12-carriers.ts
│       ├── 13-contents.ts
│       ├── 14-faq.ts
│       └── 15-master-data.ts
│
└── shared/
    ├── uploads/
    ├── notifications/
    └── reports/
```

---

## 3. Estructura de Cada Módulo

Cada módulo NestJS sigue esta convención:

```
modules/orders/
├── orders.module.ts
├── orders.controller.ts
├── orders.service.ts
├── entities/
│   ├── order.entity.ts
│   ├── order-item.entity.ts
│   ├── order-event.entity.ts
│   └── order-document.entity.ts
├── dto/
│   ├── create-order.dto.ts
│   ├── update-order-status.dto.ts
│   ├── order-query.dto.ts
│   └── order-response.dto.ts
├── guards/           (solo si específicos del módulo)
├── interceptors/     (solo si específicos)
└── tests/
    ├── orders.controller.spec.ts
    └── orders.service.spec.ts
```

---

## 4. Modelo de Datos — 48 Tablas

### 4.1 IAM (5 tablas)

| # | Tabla | PK | FKs | Unique | Seed |
|---|-------|----|-----|--------|------|
| 1 | `users` | UUID | role_id → roles, department_id → departments, created_by → users | email, employee_id | 5 |
| 2 | `roles` | INTEGER | — | name | 4 |
| 3 | `role_permissions` | INTEGER | role_id → roles, permission_id → permissions | (role_id, permission_id) | 35 |
| 4 | `permissions` | INTEGER | — | name | 7 |
| 5 | `departments` | INTEGER | — | name | 5 |
| 6 | `sessions` | UUID | user_id → users | token | — |
| 7 | `password_resets` | INTEGER | — | email | — |

### 4.2 Catálogo (6 tablas)

| # | Tabla | PK | FKs | Unique | Seed |
|---|-------|----|-----|--------|------|
| 8 | `products` | UUID | category_id → categories, collection_id → collections, created_by → users | sku | 8 |
| 9 | `product_variants` | UUID | product_id → products, material_id → fiber_materials, size_id → sizes | sku | 12 |
| 10 | `categories` | INTEGER | parent_id → categories | slug | 12 |
| 11 | `collections` | VARCHAR(20) | — | name | 4 |
| 12 | `product_media` | UUID | product_id → products, variant_id → variants | — | 4 |
| 13 | `tags` | INTEGER | — | name | 10 |
| — | `product_tags` | INTEGER | product_id → products, tag_id → tags | (product_id, tag_id) | — |

### 4.3 CRM (4 tablas)

| # | Tabla | PK | FKs | Seed |
|---|-------|----|-----|------|
| 14 | `clients` | UUID | assigned_seller_id → users | 5 |
| 15 | `client_addresses` | INTEGER | client_id → clients | 2 |
| 16 | `client_payment_methods` | INTEGER | client_id → clients | 2 |
| 17 | `client_notes` | INTEGER | client_id → clients, user_id → users | 3 |

### 4.4 Ecommerce B2C (4 tablas)

| # | Tabla | PK | FKs | Seed |
|---|-------|----|-----|------|
| 18 | `customers` | UUID | — | — |
| 19 | `customer_addresses` | INTEGER | customer_id → customers | 2 |
| 20 | `wishlist_items` | INTEGER | customer_id → customers, product_id → products | — |
| 21 | `reviews` | INTEGER | product_id → products, customer_id → customers | 2 |

### 4.5 Pedidos (4 tablas)

| # | Tabla | PK | FKs | Unique | Seed |
|---|-------|----|-----|--------|------|
| 22 | `orders` | UUID | customer_id → customers, client_id → clients, user_id → users | order_number | 6 |
| 23 | `order_items` | INTEGER | order_id → orders, product_id → products, variant_id → variants | — | 10 |
| 24 | `order_events` | INTEGER | order_id → orders, actor_id → users | — | 15 |
| 25 | `order_documents` | INTEGER | order_id → orders | — | 5 |

### 4.6 Pagos (2 tablas)

| # | Tabla | PK | FKs | Seed |
|---|-------|----|-----|------|
| 26 | `transactions` | UUID | order_id → orders, payable_id (polymorphic) | 10 |
| 27 | `transaction_refunds` | INTEGER | transaction_id → transactions | 2 |

### 4.7 Inventario (4 tablas)

| # | Tabla | PK | FKs | Unique | Seed |
|---|-------|----|-----|--------|------|
| 28 | `warehouses` | INTEGER | — | name | 4 |
| 29 | `stock_items` | INTEGER | product_id → products, variant_id → variants, warehouse_id → warehouses | (product_id/variant_id, warehouse_id) | 10 |
| 30 | `stock_movements` | BIGINT | product_id → products, warehouse_id → warehouses, person_id → users | — | 10 |
| 31 | `warehouse_transfers` | UUID | origin_warehouse_id → warehouses, destination_warehouse_id → warehouses, responsible_id → users | transfer_number | 8 |

### 4.8 Logística (3 tablas)

| # | Tabla | PK | FKs | Unique | Seed |
|---|-------|----|-----|--------|------|
| 32 | `shipments` | UUID | order_id → orders | waybill | 6 |
| 33 | `shipment_events` | INTEGER | shipment_id → shipments | — | 10 |
| 34 | `carriers` | INTEGER | — | code | 3 |

### 4.9 Marketing (3 tablas)

| # | Tabla | PK | FKs | Seed |
|---|-------|----|-----|------|
| 35 | `campaigns` | UUID | created_by → users | 9 |
| 36 | `coupons` | INTEGER | — | — |
| 37 | `promotions` | INTEGER | — | 3 |

### 4.10 CMS (4 tablas)

| # | Tabla | PK | FKs | Seed |
|---|-------|----|-----|------|
| 38 | `contents` | UUID | author_id → users | 7 |
| 39 | `faq_categories` | INTEGER | — | 4 |
| 40 | `faq_items` | INTEGER | category_id → faq_categories | 15 |
| 41 | `hero_slides` | INTEGER | — | 3 |
| 42 | `gallery_images` | INTEGER | — | 4 |

### 4.11 Textil (4 tablas)

| # | Tabla | PK | FKs | Seed |
|---|-------|----|-----|------|
| 43 | `fiber_materials` | INTEGER | — | 6 |
| 44 | `textile_colors` | INTEGER | — | 10 |
| 45 | `textile_sizes` | INTEGER | — | 8 |
| 46 | `seasons` | INTEGER | — | 4 |

### 4.12 Configuración y Auditoría (3 tablas)

| # | Tabla | PK | FKs | Seed |
|---|-------|----|-----|------|
| 47 | `company_settings` | INTEGER | — | 1 |
| 48 | `audit_logs` | BIGINT | user_id → users | 6 |
| 49 | `contact_inquiries` | INTEGER | — | 3 |
| 50 | `newsletter_subscribers` | INTEGER | — | 3 |

---

## 5. Diagrama de Módulos NestJS

```
┌──────────────────────────────────────────────────────────────────────┐
│                        app.module.ts                                 │
│  imports: [AuthModule, UsersModule, CatalogModule, OrdersModule, ...]│
└──────────────────────────────────────────────────────────────────────┘

  AuthModule
  ├── JwtStrategy
  ├── LocalStrategy
  ├── AuthController    POST /auth/login, /register, /logout, /me
  └── AuthService

  UsersModule
  ├── UsersController   CRUD /users
  ├── UsersService
  ├── RolesController   CRUD /roles
  ├── RolesService
  └── PermissionsController  GET/PUT /permissions/matrix

  CatalogModule
  ├── ProductsController   CRUD + batch /products
  ├── VariantsController   CRUD + generate /variants
  ├── MediaController      CRUD + upload /products/:id/media
  ├── CategoriesController GET /categories
  ├── CollectionsController GET /collections
  └── CatalogService

  OrdersModule
  ├── OrdersController     CRUD + status + notify /orders
  ├── OrderItemsService
  ├── OrderEventsController GET /orders/:id/events
  ├── OrderDocumentsController GET /orders/:id/documents
  └── OrdersService

  PaymentsModule
  ├── TransactionsController  GET + refund /transactions
  └── PaymentsService

  InventoryModule
  ├── StockController     GET + adjust /stock
  ├── KardexController    GET /kardex
  ├── MovementsController CRUD /movements
  ├── TransfersController CRUD + status /transfers
  ├── WarehousesController GET /warehouses
  └── InventoryService

  LogisticsModule
  ├── ShipmentsController   CRUD + events /shipments
  └── LogisticsService

  CrmModule
  ├── ClientsController   CRUD + notes + activity /clients
  ├── ClientAddressesController CRUD addresses
  └── CrmService

  CustomersModule
  ├── CustomersController  GET/PUT profile /account
  ├── AddressesController  CRUD /account/addresses
  ├── WishlistController   CRUD /wishlist
  ├── CartController       CRUD + coupon /cart
  ├── CheckoutController   POST place + payment /checkout
  └── CustomerService

  MarketingModule
  ├── CampaignsController  CRUD + analytics /campaigns
  ├── CouponsController    CRUD /coupons
  ├── PromotionsController CRUD /promotions
  └── MarketingService

  CmsModule
  ├── ContentsController   CRUD + publish /contents
  ├── FaqController        GET /faq
  ├── HeroSlidesController CRUD /hero
  ├── GalleryController    CRUD /gallery
  └── CmsService

  TextileModule
  ├── TextileVariantsController CRUD /textile/variants
  ├── MaterialsController  GET /textile/materials
  ├── ColorsController     GET /textile/colors
  ├── SizesController      GET /textile/sizes
  ├── SeasonsController    GET /textile/seasons
  └── TextileService

  AuditModule
  ├── AuditController      GET + export /audit/logs
  └── AuditService

  AnalyticsModule
  ├── AnalyticsController  GET /analytics
  └── AnalyticsService

  SettingsModule
  ├── CompanyController    GET/PUT /settings/company
  ├── MasterDataController CRUD /master-data
  └── SettingsService
```

---

## 6. Guards y Seguridad

| Guard | Propósito | Aplica a |
|-------|-----------|----------|
| `JwtAuthGuard` | Verifica token JWT valido | Todas las rutas protegidas |
| `RolesGuard` | Verifica rol del usuario | Rutas admin (dashboard) |
| `PermissionsGuard` | Verifica permiso específico | Rutas sensibles |
| `OwnershipGuard` | Verifica que el recurso pertenece al usuario | Tienda: /account/*, /orders (propias) |
| `ThrottlerGuard` | Rate limiting | /auth/login, /contact, /newsletter |

**Decoradores personalizados:**
```typescript
@Roles('super_admin', 'admin')
@Permissions('catalog.products.write')
@CurrentUser() user
@Public()  // skip JWT auth
```

---

## 7. Interceptores

| Interceptor | Función |
|-------------|---------|
| `TransformInterceptor` | Envuelve response en `{ success, data, meta }` |
| `AuditInterceptor` | Registra automáticamente operaciones CREATE/UPDATE/DELETE en audit_logs |
| `PaginationInterceptor` | Extrae query params de paginación y calcula meta |
| `LoggingInterceptor` | Log de request/response (tiempo, status, usuario) |

---

## 8. Exception Filters

| Excepción | HTTP | Descripción |
|-----------|------|-------------|
| `NotFoundException` | 404 | Recurso no encontrado |
| `UnauthorizedException` | 401 | Token inválido/expirado |
| `ForbiddenException` | 403 | Sin permisos suficientes |
| `BadRequestException` | 400 | Validación fallida |
| `ConflictException` | 409 | Duplicado (SKU, email, etc.) |
| `UnprocessableEntityException` | 422 | Error de negocio (stock insuficiente) |
| `TooManyRequestsException` | 429 | Rate limit excedido |

---

## 9. Validación

| Herramienta | Uso |
|-------------|-----|
| `class-validator` | DTOs (decoradores @IsString, @IsEmail, @Min, etc.) |
| `class-transformer` | Serialización/deserialización de DTOs |
| `ValidationPipe` | Global pipe en main.ts |

---

## 10. Variables de Entorno

```
# App
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=alpacart
DB_PASSWORD=
DB_NAME=alpacart

# JWT
JWT_SECRET=
JWT_EXPIRATION=24h
JWT_REMEMBER_EXPIRATION=30d

# Storage (S3-compatible)
STORAGE_DRIVER=s3
S3_BUCKET=alpacart-public
S3_PRIVATE_BUCKET=alpacart-private
S3_REGION=us-east-1
S3_KEY=
S3_SECRET=
S3_ENDPOINT=                        # MinIO URL si aplica

# Email
MAIL_DRIVER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USER=
MAIL_PASS=
MAIL_FROM=noreply@alpacart.com

# Stripe (opcional para payments)
STRIPE_KEY=
STRIPE_WEBHOOK_SECRET=

# Frontend URLs
DASHBOARD_URL=http://localhost:3102
TIENDA_URL=http://localhost:3100
INSTITUCIONAL_URL=http://localhost:3101
```

---

## 11. Seeds — Mocks Convertibles

| Orden | Seed | Entidad | Fuente mock | Registros | Depende de |
|-------|------|---------|-------------|-----------|------------|
| 1 | `01-roles` | roles | RoleList | 4 | — |
| 2 | `02-departments` | departments | UserList | 5 | — |
| 3 | `03-permissions` | permissions | PermissionMatrix | 7 | — |
| 4 | `04-role-permissions` | role_permissions | PermissionMatrix | 35 | 1, 3 |
| 5 | `05-users` | users | UserList | 5 | 1, 2 |
| 6 | `06-carriers` | carriers | ShipmentList | 3 | — |
| 7 | `07-warehouses` | warehouses | InventoryDashboard | 4 | — |
| 8 | `08-seasons` | seasons | TextileDashboard | 4 | — |
| 9 | `09-materials` | fiber_materials | TextileDashboard | 6 | — |
| 10 | `10-colors` | textile_colors | VariantList | 10 | — |
| 11 | `11-sizes` | textile_sizes | TextileDashboard | 8 | — |
| 12 | `12-categories` | categories | Category | 12 | — |
| 13 | `13-collections` | collections | CollectionGrid | 4 | 8 |
| 14 | `14-products` | products | ProductList | 8 | 12, 13 |
| 15 | `15-variants` | product_variants | VariantList | 12 | 14, 9, 10, 11 |
| 16 | `16-media` | product_media | ProductMedia | 4 | 14 |
| 17 | `17-clients` | clients | ClientList | 5 | 5 |
| 18 | `18-client-addresses` | client_addresses | ClientProfile | 2 | 17 |
| 19 | `19-orders` | orders | OrderList | 6 | 17, 5 |
| 20 | `20-order-items` | order_items | OrderDetail | 10 | 19 |
| 21 | `21-order-events` | order_events | OrderTimeline | 15 | 19 |
| 22 | `22-transactions` | transactions | TransactionList | 10 | 19 |
| 23 | `23-shipments` | shipments | ShipmentList | 6 | 19, 6 |
| 24 | `24-campaigns` | campaigns | CampaignList | 5 | 5 |
| 25 | `25-contents` | contents | ContentList | 7 | 5 |
| 26 | `26-faq` | faq_categories + faq_items | FAQ | 4+15 | — |
| 27 | `27-reviews` | reviews | ProductReviews | 2 | 14 |
| 28 | `28-audit-logs` | audit_logs | AuditLog | 6 | 5 |
| 29 | `29-company-settings` | company_settings | Settings | 1 | — |

**Total seeds: ~29 archivos, ~85 registros.**

---

## 12. Migraciones

| Orden | Migración | Tablas | Descripción |
|-------|-----------|--------|-------------|
| 1 | `000-create-enums.sql` | — | Tipos personalizados PostgreSQL (status enums) |
| 2 | `001-create-iam.sql` | 7 | users, roles, permissions, role_permissions, departments, sessions, password_resets |
| 3 | `002-create-catalog.sql` | 8 | products, product_variants, categories, collections, tags, product_tags, product_media |
| 4 | `003-create-textile.sql` | 4 | fiber_materials, textile_colors, textile_sizes, seasons |
| 5 | `004-create-clients.sql` | 4 | clients, client_addresses, client_payment_methods, client_notes |
| 6 | `005-create-customers.sql` | 4 | customers, customer_addresses, wishlist_items, reviews |
| 7 | `006-create-orders.sql` | 4 | orders, order_items, order_events, order_documents |
| 8 | `007-create-payments.sql` | 2 | transactions, transaction_refunds |
| 9 | `008-create-inventory.sql` | 4 | warehouses, stock_items, stock_movements, warehouse_transfers |
| 10 | `009-create-logistics.sql` | 3 | shipments, shipment_events, carriers |
| 11 | `010-create-marketing.sql` | 3 | campaigns, coupons, promotions |
| 12 | `011-create-cms.sql` | 5 | contents, faq_categories, faq_items, hero_slides, gallery_images |
| 13 | `012-create-settings.sql` | 4 | company_settings, audit_logs, contact_inquiries, newsletter_subscribers |
| 14 | `013-create-indexes.sql` | — | Índices de performance |

---

## 13. Orden de Implementación Recomendado

| Fase | Módulos | Semanas | Depende de |
|------|---------|---------|------------|
| **1. Base** | Config, Database, Auth, Common (guards, interceptors, filters) | 2 | — |
| **2. IAM** | Users, Roles, Permissions | 1 | Fase 1 |
| **3. Catálogo** | Products, Variants, Categories, Collections, Media | 2 | Fase 2 |
| **4. Textil** | Materials, Colors, Sizes, Seasons, TextileVariants | 1 | Fase 3 |
| **5. Clientes** | Clients (B2B), Addresses, Notes | 1 | Fase 2 |
| **6. Ecommerce** | Customers, Addresses, Wishlist, Cart, Checkout | 2 | Fase 3, 5 |
| **7. Pedidos** | Orders, Items, Events, Documents | 2 | Fase 3, 5, 6 |
| **8. Pagos** | Transactions, Refunds | 1 | Fase 7 |
| **9. Inventario** | Warehouses, Stock, Movements, Transfers, Kardex | 2 | Fase 3, 7 |
| **10. Logística** | Shipments, Events, Carriers | 1 | Fase 7 |
| **11. Marketing** | Campaigns, Coupons, Promotions | 1 | Fase 3 |
| **12. CMS** | Contents, FAQ, Hero, Gallery | 1 | Fase 2 |
| **13. Auditoría + Settings** | AuditLogs, Company, MasterData, Contact, Newsletter | 1 | Fase 2 |
| **14. Analytics** | Dashboard KPIs, Reports | 1 | Fase 3-10 |
| **15. Uploads + Archivos** | Media processing, S3 integration | 1 | Fase 3 |

**Total estimado: ~20 semanas**

---

## 14. Riesgos y Decisiones Pendientes

| # | Riesgo | Impacto | Mitigación |
|---|--------|---------|------------|
| R01 | Volumen de datos: 12,450 órdenes, 4,200 productos | Performance | Paginación forzada, índices compuestos, caché de KPIs |
| R02 | Stock consistency en concurrencia | Integridad | Optimistic locking (version column), transacciones serializables para ajustes |
| R03 | Payments: integración con Stripe | Complejidad | Webhook handler, idempotency keys, tabla de eventos |
| R04 | B2B y B2C coexistiendo en orders con payable polimórfico | Modelado | Dos columnas (customer_id nullable, client_id nullable) + CHECK |
| R05 | Sin refresh tokens (frontend usa solo access token) | Seguridad | Implementar refresh token con httpOnly cookie |
| R06 | Múltiples frontends → posible CORS | Config | Configurar CORS dinámico desde env vars |
| R07 | Traducción de enums a español en frontend | UX | Response incluye `label` en español + `value` canónico |

| # | Decisión Pendiente | Opciones | Recomendación |
|---|-------------------|----------|---------------|
| D01 | Storage: Cloudinary vs S3 directo | Cloudinary (transformaciones built-in) vs S3 + Sharp | Cloudinary por CDN + transformaciones |
| D02 | Pagos: Stripe vs Culqi vs Izipay | Stripe (internacional) vs Izipay/Culqi (Perú) | Stripe + Izipay (dual) |
| D03 | Search: PostgreSQL full-text vs Elasticsearch | PG tsvector suficiente para <10k products, ES para escalar | PG tsvector inicial, ES después |
| D04 | Notificaciones: email + push? | Email transaccional (SendGrid) + push (WebSocket opcional) | SendGrid vía NestJS mailer |
| D05 | Refresh token strategy | Cookie httpOnly vs localStorage | Cookie httpOnly (más seguro) |

---

## 15. Resumen Final

| Métrica | Valor |
|---------|-------|
| Módulos NestJS | 14 |
| Tablas PostgreSQL | 48 |
| Endpoints REST | 171 |
| Seeds desde mocks | ~29 archivos, ~85 registros |
| DTOs estimados | ~120 |
| Guards | 5 |
| Interceptors | 4 |
| Exception filters | 6 |
| Variables de entorno | ~30 |
| Fases de implementación | 15 |
| Estimación total | ~20 semanas |
| Riesgos identificados | 7 |
| Decisiones pendientes | 5 |

---
*Documento generado el 2026-07-10. Blueprint completo listo para implementación.*
