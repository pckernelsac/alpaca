# 08 — API REST

## Objetivo
Enumerar todos los endpoints REST de la API, agrupados por controlador, con método, ruta, guards, decoradores de acceso y uso de DTOs.

## Alcance
- Todos los controladores en `src/modules/*/*.controller.ts`
- `src/app.controller.ts`
- `src/health/health.controller.ts`
- `src/shared/storage/storage.controller.ts`

## Estado actual
**124 endpoints REST** distribuidos en 18 controladores. Todos bajo el prefijo `/api/v1`. La API está documentada con Swagger en `/api/v1/docs`.

---

## AppController (1 endpoint)
| Método | Ruta | Acceso | DTO | Descripción |
|--------|------|--------|-----|-------------|
| GET | `/` | @Public | No | Status de la API |

## HealthController (1 endpoint)
| Método | Ruta | Acceso | DTO | Descripción |
|--------|------|--------|-----|-------------|
| GET | `/health` | @Public | No | Health check con BD |

## StorageController (3 endpoints)
| Método | Ruta | Acceso | DTO | Descripción |
|--------|------|--------|-----|-------------|
| POST | `/upload` | JwtAuthGuard | No | Subir archivo (auth) |
| POST | `/upload/public` | @Public | No | Subir archivo público |
| DELETE | `/upload/:key` | JwtAuthGuard | No | Eliminar archivo |

## AuthController (2 endpoints)
| Método | Ruta | Acceso | DTO | Descripción |
|--------|------|--------|-----|-------------|
| POST | `/auth/login` | @Public | LoginDto | Iniciar sesión |
| GET | `/auth/me` | JwtAuthGuard | No | Perfil autenticado |

## IamController (12 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/users` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/users/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/users` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/users/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/users/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/users/:id/status` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/roles` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/roles` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/roles/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/roles/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/permissions` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/permissions/matrix` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## CatalogController (11 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/products` | @Public | No |
| GET | `/products/:id` | @Public | No |
| GET | `/categories` | @Public | No |
| GET | `/collections` | @Public | No |
| POST | `/products` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/products/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/products/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/variants` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/variants/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/variants/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/products/:id/media` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## TextileController (4 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/textile/materials` | @Public | No |
| GET | `/textile/colors` | @Public | No |
| GET | `/textile/sizes` | @Public | No |
| GET | `/textile/seasons` | @Public | No |

## CrmController (5 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/crm/clients` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/crm/clients/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/crm/clients` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/crm/clients/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/crm/clients/:id/notes` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## CustomersController (15 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| POST | `/auth/register` | @Public | No |
| GET | `/account/profile` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| PUT | `/account/profile` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| PUT | `/account/password` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| GET | `/account/addresses` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| POST | `/account/addresses` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| DELETE | `/account/addresses/:id` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| GET | `/wishlist` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| POST | `/wishlist/items` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| GET | `/cart` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| POST | `/cart/items` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| PATCH | `/cart/items/:id` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| DELETE | `/cart/items/:id` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| DELETE | `/cart` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |
| POST | `/checkout` | JwtAuthGuard + ActorGuard + @CustomerOnly | No |

## OrdersController (6 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/orders` | JwtAuthGuard + ActorGuard + @Actor('staff','customer') | No |
| GET | `/orders/:id` | JwtAuthGuard + ActorGuard + @Actor('staff','customer') | No |
| POST | `/orders` | JwtAuthGuard + ActorGuard + @Actor('staff','customer') | No |
| PUT | `/orders/:id/status` | JwtAuthGuard + ActorGuard + @Actor('staff','customer') | No |
| POST | `/orders/:id/notes` | JwtAuthGuard + ActorGuard + @Actor('staff','customer') | No |
| GET | `/orders/:id/events` | JwtAuthGuard + ActorGuard + @Actor('staff','customer') | No |

## PaymentsController (5 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/transactions` | JwtAuthGuard | No |
| POST | `/create-payment-intent` | JwtAuthGuard | Parcial (body tipado inline) |
| POST | `/transactions/:id/refund` | JwtAuthGuard | No |
| POST | `/stripe/webhook` | @Public | No |
| POST | `/reservations/release-expired` | JwtAuthGuard | No |

## InventoryController (4 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/stock` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/stock/:id/adjust` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/movements` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/transfers` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## LogisticsController (4 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/shipments` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/shipments` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/shipments/:id/status` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/carriers` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## MarketingController (17 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/campaigns` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/campaigns/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/campaigns` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/campaigns/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/campaigns/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/coupons` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/coupons/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/coupons` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/coupons/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/coupons/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/coupons/validate` | @Public | No |
| GET | `/promotions` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/promotions/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/promotions` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/promotions/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/promotions/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/newsletter/subscribe` | @Public | No |

## CmsController (29 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/contents` | @Public | No |
| GET | `/faq` | @Public | No |
| GET | `/hero-slides` | @Public | No |
| GET | `/gallery` | @Public | No |
| GET | `/testimonials` | @Public | No |
| GET | `/benefits` | @Public | No |
| GET | `/artisan-processes` | @Public | No |
| POST | `/contents` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/contents/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/contents/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/admin/hero-slides` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/admin/hero-slides` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/admin/hero-slides/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/admin/hero-slides/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/admin/gallery` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/admin/gallery` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/admin/gallery/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/admin/gallery/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/admin/testimonials` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/admin/testimonials` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/admin/testimonials/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/admin/testimonials/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/admin/benefits` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/admin/benefits` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/admin/benefits/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/admin/benefits/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| GET | `/admin/artisan-processes` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/admin/artisan-processes` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| PUT | `/admin/artisan-processes/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| DELETE | `/admin/artisan-processes/:id` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## AuditController (1 endpoint)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/audit/logs` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## AnalyticsController (1 endpoint)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/analytics/kpis` | JwtAuthGuard + ActorGuard + @StaffOnly | No |

## SettingsController (3 endpoints)
| Método | Ruta | Acceso | DTO |
|--------|------|--------|-----|
| GET | `/settings/company` | @Public | No |
| PUT | `/settings/company` | JwtAuthGuard + ActorGuard + @StaffOnly | No |
| POST | `/contact` | @Public | No |

---

## Resumen de Endpoints por Controlador

| Controlador | Endpoints | Públicos | Requieren Auth |
|-------------|-----------|----------|----------------|
| AppController | 1 | 1 | 0 |
| HealthController | 1 | 1 | 0 |
| StorageController | 3 | 1 | 2 |
| AuthController | 2 | 1 | 1 |
| IamController | 12 | 0 | 12 |
| CatalogController | 11 | 4 | 7 |
| TextileController | 4 | 4 | 0 |
| CrmController | 5 | 0 | 5 |
| CustomersController | 15 | 1 | 14 |
| OrdersController | 6 | 0 | 6 |
| PaymentsController | 5 | 1 | 4 |
| InventoryController | 4 | 0 | 4 |
| LogisticsController | 4 | 0 | 4 |
| MarketingController | 17 | 2 | 15 |
| CmsController | 29 | 7 | 22 |
| AuditController | 1 | 0 | 1 |
| AnalyticsController | 1 | 0 | 1 |
| SettingsController | 3 | 2 | 1 |
| **TOTAL** | **124** | **25** | **99** |

**25 endpoints públicos** (20%), **99 requieren autenticación** (80%).

## Hallazgos
1. **F1**: Solo 1 DTO tipado en toda la API (LoginDto). El resto usa `any` como tipo de body.
2. **F2**: 124 endpoints bien organizados con Swagger documentation.
3. **F3**: La mayoría de endpoints staff-only están correctamente protegidos.
4. **F4**: El endpoint `POST /checkout` acepta `Idempotency-Key` header — buena práctica.

## Score
**8.0 / 10**

## Estado: APROBADO CON OBSERVACIONES
