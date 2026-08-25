# Changelog — AlpacaRT

## [1.0.0-rc.1] — 2026-07-17

### Added
- Backend NestJS 10 con 15 módulos (Auth, IAM, Catalog, Customers, Orders, Payments, Inventory, Logistics, Marketing, CMS, Settings, Analytics, Audit, CRM, Textile)
- ActorGuard global con JWT dual (staff/customer)
- ThrottlerGuard con 3 perfiles + Redis storage
- 16 migraciones PostgreSQL (59 tablas)
- 8 seeds con ~301 registros
- Idempotencia con tabla order_idempotency_keys
- Webhook Stripe con deduplicación
- Checkout transaccional con SELECT FOR UPDATE
- Swagger/OpenAPI en /api/v1/docs

### Frontend Institucional (v1.0.0)
- 11 páginas integradas con API real
- Hero slider, FAQ, galería, testimonios, beneficios desde GET CMS
- Formulario de contacto con POST /contact
- Newsletter con POST /newsletter/subscribe

### Frontend Tienda (v1.0.0)
- 27 rutas con lazy loading
- Catálogo con useCatalog() hook
- Carrito con useCart() hook (GET/POST/PATCH/DELETE /cart)
- Checkout con useCheckout() + idempotencia
- Wishlist con useWishlist()
- Órdenes con useOrders()
- Login customer con POST /auth/customer-login
- Registro con POST /auth/register

### Frontend Dashboard (v1.0.0)
- 42 rutas administrativas con lazy loading
- 12 Zustand stores migradas a API real
- Login staff con POST /auth/login
- CRUD usuarios, productos, clientes, campañas, contenidos
- KPIs, analytics, auditoría desde API real

### Shared Packages (v1.0.0)
- 8 paquetes: shared-types, shared-utils, shared-constants, shared-api-client, shared-ui, shared-hooks, shared-domain, shared-observability

### Infrastructure
- Docker Compose con PostgreSQL 16, Redis 7, MinIO
- ApiClient con interceptors + error mapping
- Composition Root con ServiceProvider
- Domain models + mappers en 3 frontends

### Security
- Helmet, Compression, CORS
- Rate limiting distribuido
- JWT con type staff/customer
- Stripe webhook con replay protection

### Documentation
- 321+ archivos .md en docs/
- ICC-01 Contract Certification
- BCA-01 Backend Audit (72.5/100)
- PRE-R7 Certification (72/100)
- IRC-01 Integration Readiness (57/100)
- IRA-01 Integration Audit (87%)
- Certificación Store + Dashboard

### Known Issues
- ~40 DTOs pendientes de conectar
- Sin refresh token (NON-BLOCKING)
- Sin structured logging (Winston/Pino)
- Sin CI/CD pipeline automatizado
- Sin backups automatizados
- Sin tests automatizados (coverage < 10%)
