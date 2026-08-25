# 01 — Arquitectura General

## Objetivo
Evaluar la estructura arquitectónica del backend ALPACART: módulos, controladores, servicios, detección de dependencias circulares, dead modules y dead code.

## Alcance
- Directorio `src/modules/` (15 módulos funcionales)
- `src/app.module.ts`
- `src/common/` (guards, decorators, filters, interceptors, utils)
- `src/shared/` (redis, storage, idempotency)
- `src/config/`, `src/health/`, `src/database/`

## Estado actual
Backend NestJS con 15 módulos funcionales, 3 módulos compartidos, 18 controladores, 20 servicios, 55 entidades. Arquitectura modular limpia sin dependencias circulares evidentes.

## Evidencias encontradas

### Módulos registrados en AppModule
| Módulo | Estado | Controlador | Servicio(s) |
|--------|--------|-------------|-------------|
| IamModule | Activo | iam.controller.ts | iam.service.ts |
| AuthModule | Activo | auth.controller.ts | auth.service.ts, JwtStrategy |
| CatalogModule | Activo | catalog.controller.ts | catalog.service.ts |
| TextileModule | Activo | textile.controller.ts | textile.service.ts |
| CrmModule | Activo | crm.controller.ts | crm.service.ts |
| CustomersModule | Activo | customers.controller.ts | customers.service.ts |
| OrdersModule | Activo | orders.controller.ts | orders.service.ts |
| PaymentsModule | Activo | payments.controller.ts | payments.service.ts, stripe.service.ts |
| InventoryModule | Activo | inventory.controller.ts | inventory.service.ts |
| LogisticsModule | Activo | logistics.controller.ts | logistics.service.ts |
| MarketingModule | Activo | marketing.controller.ts | marketing.service.ts |
| CmsModule | Activo | cms.controller.ts | cms.service.ts |
| AuditModule | Activo | audit.controller.ts | audit.service.ts |
| SettingsModule | Activo | settings.controller.ts | settings.service.ts |
| AnalyticsModule | Activo | analytics.controller.ts | analytics.service.ts |
| StorageModule | Activo | storage.controller.ts | storage.service.ts |
| RedisModule | Activo | — | redis.service.ts |
| IdempotencyModule | Activo | — | idempotency.service.ts |

### Módulos compartidos (src/shared/)
- `redis/` — RedisService (Global), RedisThrottlerStorage
- `storage/` — StorageService (S3-compatible), StorageController
- `idempotency/` — IdempotencyService

### Common layer (src/common/)
- `guards/` — ActorGuard, JwtAuthGuard, RolesGuard
- `decorators/` — @Public, @StaffOnly, @CustomerOnly, @CurrentUser, @Roles, @Actor
- `filters/` — HttpExceptionFilter (global)
- `interceptors/` — TransformInterceptor (global), PaginationInterceptor
- `utils/` — pagination.ts
- `dto/` — vacío

### Config (src/config/)
- `index.ts` — AppConfigModule
- `env.validation.ts` — EnvironmentVariables class-validator

### Health (src/health/)
- `health.controller.ts` — Endpoint GET /health con SequelizeHealthIndicator

### Database (src/database/)
- `database.module.ts` — Módulo de base de datos

### Entidades por módulo (55 total)
| Módulo | Entidades |
|--------|-----------|
| IAM | user, role, permission, role-permission, department |
| Auth | session, password-reset |
| Catalog | product, product-variant, product-media, category, collection, tag |
| Textile | fiber-material, textile-color, textile-size, season |
| CRM | client, client-address, client-payment-method, client-note |
| Customers | customer, customer-address, wishlist-item, review, cart, cart-item, idempotency-key |
| Orders | order, order-item, order-event, order-document |
| Payments | transaction, transaction-refund |
| Inventory | warehouse, stock-item, stock-movement, warehouse-transfer, warehouse-transfer-item |
| Logistics | shipment, shipment-event, carrier |
| Marketing | campaign, coupon, promotion, newsletter-subscriber |
| CMS | content, faq, hero-slide, gallery-image, testimonial, benefit, artisan-process |
| Audit | audit-log |
| Settings | company-setting |

### Dependencias circulares
No se detectaron dependencias circulares entre módulos. La inyección es unidireccional: Shared → Modules. Los módulos funcionales no se importan entre sí directamente; todas las importaciones cruzadas se resuelven vía Sequelize (entidades referenciadas por FK).

### Dead modules
Ninguno. Los 15 módulos funcionales están registrados en AppModule y tienen controladores y servicios funcionales.

### Dead code potencial
- `RolesGuard` definido pero no usado en ningún controlador (se usa ActorGuard en su lugar)
- `PaginationInterceptor` definido pero no registrado globalmente ni usado por controladores (la paginación se maneja inline en servicios)
- `common/dto/` está vacío
- `@CurrentUser` decorator definido pero no usado en controladores (se usa `@Request() req` en su lugar)

## Hallazgos
1. **F1**: RolesGuard está definido pero no referenciado en ningún controlador — dead code.
2. **F2**: PaginationInterceptor está implementado pero no registrado ni usado — dead code.
3. **F3**: @CurrentUser decorator definido pero no utilizado en la base de código.
4. **F4**: common/dto/ directorio vacío.
5. **F5**: No hay dependencias circulares — arquitectura limpia.
6. **F6**: 55 entidades Sequelize mapean correctamente a 59 tablas de migraciones.

## Riesgos
- **R1**: Si la aplicación escala, la ausencia de un bus de eventos/mensajes entre módulos podría generar acoplamiento a través de Sequelize (importaciones de entidades cruzadas).
- **R2**: La falta de uso de DTOs tipados en controladores (mayoría usa `any`) puede generar problemas de validación y mantenibilidad.

## Recomendaciones
1. Eliminar RolesGuard si no se va a usar (redundante con ActorGuard).
2. Eliminar PaginationInterceptor si no se usa, o registrarlo globalmente.
3. Eliminar common/dto/ vacío.
4. Migrar controladores a DTOs tipados en lugar de `any`.

## Acciones Prioridad P0
- Migrar endpoints críticos (checkout, login, payments) a DTOs con class-validator.

## Acciones Prioridad P1
- Eliminar dead code: RolesGuard, PaginationInterceptor, common/dto/ vacío.

## Acciones Prioridad P2
- Evaluar implementación de bus de eventos para desacoplar módulos.
- Usar @CurrentUser decorator en lugar de @Request() req.

## Score
**8.5 / 10**

## Estado: APROBADO CON OBSERVACIONES
