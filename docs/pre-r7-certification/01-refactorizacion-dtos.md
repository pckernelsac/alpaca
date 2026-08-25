# 01 — Refactorización de DTOs

## Objetivo
Auditar el uso de tipos `any` vs DTOs con class-validator en todos los endpoints del backend ALPACART. Identificar puntos donde falta validación de entrada y documentar el estado actual hacia una API type-safe.

## Evidencias encontradas

### Total de controladores: 18

| # | Controlador | Archivo |
|---|-------------|---------|
| 1 | AppController | `src/app.controller.ts` |
| 2 | HealthController | `src/health/health.controller.ts` |
| 3 | StorageController | `src/shared/storage/storage.controller.ts` |
| 4 | AuthController | `src/modules/auth/auth.controller.ts` |
| 5 | IamController | `src/modules/iam/iam.controller.ts` |
| 6 | CatalogController | `src/modules/catalog/catalog.controller.ts` |
| 7 | TextileController | `src/modules/textile/textile.controller.ts` |
| 8 | CrmController | `src/modules/crm/crm.controller.ts` |
| 9 | CustomersController | `src/modules/customers/customers.controller.ts` |
| 10 | OrdersController | `src/modules/orders/orders.controller.ts` |
| 11 | PaymentsController | `src/modules/payments/payments.controller.ts` |
| 12 | InventoryController | `src/modules/inventory/inventory.controller.ts` |
| 13 | LogisticsController | `src/modules/logistics/logistics.controller.ts` |
| 14 | MarketingController | `src/modules/marketing/marketing.controller.ts` |
| 15 | CmsController | `src/modules/cms/cms.controller.ts` |
| 16 | AnalyticsController | `src/modules/analytics/analytics.controller.ts` |
| 17 | AuditController | `src/modules/audit/audit.controller.ts` |
| 18 | SettingsController | `src/modules/settings/settings.controller.ts` |

### Total de endpoints: ~124

### Uso de `any` vs DTOs tipados

| Categoría | Cantidad | % |
|-----------|----------|---|
| Endpoints con body:any | ~47 | ~73% de endpoints con body |
| Endpoints con query:any | ~13 | ~81% de endpoints con query |
| Endpoints con params tipados (string/number) | ~30 | 100% de params |
| Endpoints con DTO real (class-validator) | 1 | <1% |
| Endpoints con body inline tipado | 2 | ~2% |
| DTO files encontrados | 1 | — |

### Lista detallada de endpoints por controlador

#### AppController (1 endpoint)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET / | GET | — | — | — | No requiere |

#### HealthController (1 endpoint)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /health | GET | — | — | — | No requiere |

#### StorageController (3 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| POST /upload | POST | `Express.Multer.File` | `any` (folder, type) | — | No |
| POST /upload/public | POST | `Express.Multer.File` | — | — | No |
| DELETE /upload/:key | DELETE | — | `any` (bucket) | `string` key | No |

#### AuthController (2 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| POST /auth/login | POST | `LoginDto` ✅ | — | — | `login.dto.ts` |
| GET /auth/me | GET | — | — | — | No requiere |

#### IamController (12 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /users | GET | — | `any` | — | No |
| GET /users/:id | GET | — | — | `string` | No |
| POST /users | POST | `any` | — | — | No |
| PUT /users/:id | PUT | `any` | — | `string` | No |
| DELETE /users/:id | DELETE | — | — | `string` | No |
| PUT /users/:id/status | PUT | `any` | — | `string` | No |
| GET /roles | GET | — | — | — | No requiere |
| POST /roles | POST | `any` | — | — | No |
| PUT /roles/:id | PUT | `any` | — | `number` | No |
| DELETE /roles/:id | DELETE | — | — | `number` | No |
| GET /permissions | GET | — | — | — | No requiere |
| PUT /permissions/matrix | PUT | `any` | — | — | No |

#### CatalogController (11 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /products | GET | — | `any` | — | No |
| GET /products/:id | GET | — | — | `string` | No |
| GET /categories | GET | — | — | — | No requiere |
| GET /collections | GET | — | — | — | No requiere |
| POST /products | POST | `any` | — | — | No |
| PUT /products/:id | PUT | `any` | — | `string` | No |
| DELETE /products/:id | DELETE | — | — | `string` | No |
| POST /variants | POST | `any` | — | — | No |
| PUT /variants/:id | PUT | `any` | — | `string` | No |
| DELETE /variants/:id | DELETE | — | — | `string` | No |
| POST /products/:id/media | POST | `any` | — | `string` | No |

#### TextileController (4 endpoints) — todos GET sin body/query params
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /textile/materials | GET | — | — | — | No requiere |
| GET /textile/colors | GET | — | — | — | No requiere |
| GET /textile/sizes | GET | — | — | — | No requiere |
| GET /textile/seasons | GET | — | — | — | No requiere |

#### CrmController (5 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /crm/clients | GET | — | `any` | — | No |
| GET /crm/clients/:id | GET | — | — | `string` | No |
| POST /crm/clients | POST | `any` | — | — | No |
| PUT /crm/clients/:id | PUT | `any` | — | `string` | No |
| POST /crm/clients/:id/notes | POST | `any` | — | `string` | No |

#### CustomersController (15 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| POST /auth/register | POST | `any` | — | — | No |
| GET /account/profile | GET | — | — | — | No requiere |
| PUT /account/profile | PUT | `any` | — | — | No |
| PUT /account/password | PUT | `any` | — | — | No |
| GET /account/addresses | GET | — | — | — | No requiere |
| POST /account/addresses | POST | `any` | — | — | No |
| DELETE /account/addresses/:id | DELETE | — | — | `number` | No |
| GET /wishlist | GET | — | — | — | No requiere |
| POST /wishlist/items | POST | `any` | — | — | No |
| GET /cart | GET | — | — | — | No requiere |
| POST /cart/items | POST | `any` | — | — | No |
| PATCH /cart/items/:id | PATCH | `any` | — | `number` | No |
| DELETE /cart/items/:id | DELETE | — | — | `number` | No |
| DELETE /cart | DELETE | — | — | — | No requiere |
| POST /checkout | POST | `any` | — | — | No |

#### OrdersController (6 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /orders | GET | — | `any` | — | No |
| GET /orders/:id | GET | — | — | `string` | No |
| POST /orders | POST | `any` | — | — | No |
| PUT /orders/:id/status | PUT | `any` | — | `string` | No |
| POST /orders/:id/notes | POST | `any` | — | `string` | No |
| GET /orders/:id/events | GET | — | — | `string` | No |

#### PaymentsController (5 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /transactions | GET | — | `any` | — | No |
| POST /create-payment-intent | POST | `inline { orderId, amount, currency, customerEmail? }` | — | — | Inline (parcial) |
| POST /transactions/:id/refund | POST | `inline { amount, reason }` | — | `string` | Inline (parcial) |
| POST /stripe/webhook | POST | raw body | — | — | No requiere |
| POST /reservations/release-expired | POST | — | — | — | No requiere |

#### InventoryController (4 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /stock | GET | — | `any` | — | No |
| POST /stock/:id/adjust | POST | `any` | — | `string` | No |
| GET /movements | GET | — | `any` | — | No |
| GET /transfers | GET | — | `any` | — | No |

#### LogisticsController (4 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /shipments | GET | — | `any` | — | No |
| POST /shipments | POST | `any` | — | — | No |
| PUT /shipments/:id/status | PUT | `any` | — | `string` | No |
| GET /carriers | GET | — | — | — | No requiere |

#### MarketingController (17 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /campaigns | GET | — | `any` | — | No |
| GET /campaigns/:id | GET | — | — | `string` | No |
| POST /campaigns | POST | `any` | — | — | No |
| PUT /campaigns/:id | PUT | `any` | — | `string` | No |
| DELETE /campaigns/:id | DELETE | — | — | `string` | No |
| GET /coupons | GET | — | — | — | No requiere |
| GET /coupons/:id | GET | — | — | `number` | No |
| POST /coupons | POST | `any` | — | — | No |
| PUT /coupons/:id | PUT | `any` | — | `number` | No |
| DELETE /coupons/:id | DELETE | — | — | `number` | No |
| POST /coupons/validate | POST | `any` | — | — | No |
| GET /promotions | GET | — | — | — | No requiere |
| GET /promotions/:id | GET | — | — | `number` | No |
| POST /promotions | POST | `any` | — | — | No |
| PUT /promotions/:id | PUT | `any` | — | `number` | No |
| DELETE /promotions/:id | DELETE | — | — | `number` | No |
| POST /newsletter/subscribe | POST | `any` | — | — | No |

#### CmsController (30 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /contents | GET | — | — | — | No requiere |
| GET /faq | GET | — | — | — | No requiere |
| GET /hero-slides | GET | — | — | — | No requiere |
| GET /gallery | GET | — | — | — | No requiere |
| GET /testimonials | GET | — | — | — | No requiere |
| GET /benefits | GET | — | — | — | No requiere |
| GET /artisan-processes | GET | — | — | — | No requiere |
| POST /contents | POST | `any` | — | — | No |
| PUT /contents/:id | PUT | `any` | — | `string` | No |
| DELETE /contents/:id | DELETE | — | — | `string` | No |
| GET /admin/hero-slides | GET | — | — | — | No requiere |
| POST /admin/hero-slides | POST | `any` | — | — | No |
| PUT /admin/hero-slides/:id | PUT | `any` | — | `number` | No |
| DELETE /admin/hero-slides/:id | DELETE | — | — | `number` | No |
| GET /admin/gallery | GET | — | — | — | No requiere |
| POST /admin/gallery | POST | `any` | — | — | No |
| PUT /admin/gallery/:id | PUT | `any` | — | `number` | No |
| DELETE /admin/gallery/:id | DELETE | — | — | `number` | No |
| GET /admin/testimonials | GET | — | — | — | No requiere |
| POST /admin/testimonials | POST | `any` | — | — | No |
| PUT /admin/testimonials/:id | PUT | `any` | — | `number` | No |
| DELETE /admin/testimonials/:id | DELETE | — | — | `number` | No |
| GET /admin/benefits | GET | — | — | — | No requiere |
| POST /admin/benefits | POST | `any` | — | — | No |
| PUT /admin/benefits/:id | PUT | `any` | — | `number` | No |
| DELETE /admin/benefits/:id | DELETE | — | — | `number` | No |
| GET /admin/artisan-processes | GET | — | — | — | No requiere |
| POST /admin/artisan-processes | POST | `any` | — | — | No |
| PUT /admin/artisan-processes/:id | PUT | `any` | — | `number` | No |
| DELETE /admin/artisan-processes/:id | DELETE | — | — | `number` | No |

#### AnalyticsController (1 endpoint)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /analytics/kpis | GET | — | — | — | No requiere |

#### AuditController (1 endpoint)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /audit/logs | GET | — | `any` | — | No |

#### SettingsController (3 endpoints)
| Ruta | Método | Body | Query | Params | DTO |
|------|--------|------|-------|--------|-----|
| GET /settings/company | GET | — | — | — | No requiere |
| PUT /settings/company | PUT | `any` | — | — | No |
| POST /contact | POST | `any` | — | — | No |

### DTO files encontrados

| Archivo | Ubicación | Props con class-validator |
|---------|-----------|--------------------------|
| `login.dto.ts` | `src/modules/auth/dto/login.dto.ts` | `email` (IsEmail), `password` (IsString), `remember` (IsOptional, IsBoolean) |

**Solo existe 1 DTO en todo el backend.**

## Hallazgos

1. **F1 — Body `any` generalizado**: ~47 endpoints que reciben body usan tipo `any`. Esto significa que no hay validación de entrada en el 73% de los endpoints POST/PUT/PATCH. Cualquier payload malformado pasa directamente al servicio.

2. **F2 — Query params sin tipo**: ~13 endpoints con query params tipados como `any`. No hay validación de filtros, paginación ni ordenamiento.

3. **F3 — Único DTO real**: Solo `LoginDto` tiene decoradores `class-validator`. PaymentsController tiene 2 bodies inline tipados pero sin validación (no usan DTOs con class-validator).

4. **F4 — Riesgo de seguridad**: Sin DTOs no hay `ValidationPipe` efectivo. Un payload con campos extraños o maliciosos (SQL injection, mass assignment) puede llegar a los servicios. Aunque los servicios hacen algunas validaciones internas, la capa de transporte no filtra.

5. **F5 — Sin documentación OpenAPI de schemas**: Swagger no puede generar schemas de request body porque no hay DTOs. La documentación actual solo muestra "any" como tipo de entrada.

6. **F6 — Parámetros de ruta OK**: Todos los `@Param()` están tipados correctamente como `string` o `number`.

## Score: 15/100

### Criterios de puntuación
- DTOs existentes: 5 pts (solo 1 DTO de ~50 necesarios: 2%)
- Parámetros de ruta tipados: 20 pts (100% OK)
- Query params validados: 0 pts (0%)
- Bodies validados: 0 pts (0%)
- Documentación Swagger generable: 0 pts (sin DTOs no hay schemas)
- Penalización por `any` masivo: -10 pts

**Justificación**: El backend tiene solo 1 DTO real de los ~50 necesarios. La gran mayoría de endpoints usan `any` para body y query, lo que hace que la API carezca de validación formal en la capa de transporte. Esto representa un riesgo de seguridad y calidad importante que debe abordarse antes de R7.
