# 02 — Refactorización de Servicios

## Objetivo
Analizar los servicios del backend ALPACART para detectar violaciones del Principio de Responsabilidad Única (SRP), identificar servicios sobrecargados y documentar la distribución actual de responsabilidades.

## Evidencias encontradas

### Resumen de servicios (16 services en módulos)

| Servicio | Archivo | Líneas | Métodos | Responsabilidades |
|----------|---------|--------|---------|-------------------|
| CustomersService | `customers.service.ts` | 326 | 17 | Customer CRUD, cart CRUD, checkout (orden+stock+cupón) |
| PaymentsService | `payments.service.ts` | 294 | 10 | Transacciones, webhooks Stripe, stock lifecycle (commit/release/refund), order state machine |
| CmsService | `cms.service.ts` | 137 | 23 | CRUD contents, FAQ, hero-slides, gallery, testimonials, benefits, artisan-processes |
| MarketingService | `marketing.service.ts` | 103 | 17 | CRUD campaigns, coupons, promotions + validate coupon + subscribe newsletter |
| CatalogService | `catalog.service.ts` | 101 | 12 | CRUD products, variants, media + cache Redis + categorías/colecciones |
| IamService | `iam.service.ts` | 87 | 11 | CRUD users, roles, permissions + password management |
| InventoryService | `inventory.service.ts` | 65 | 5 | CRUD stock, movements, transfers |
| OrdersService | `orders.service.ts` | 65 | 6 | CRUD orders, order events, status transitions |
| AnalyticsService | `analytics.service.ts` | 51 | 1 | KPIs del dashboard |
| StripeService | `stripe.service.ts` | 49 | 5 | PaymentIntents, webhooks, refunds (wrapper Stripe API) |
| AuthService | `auth.service.ts` | 43 | 3 | Login, getProfile, JWT + refresh token |
| CrmService | `crm.service.ts` | 43 | 5 | CRUD clients + notes |
| TextileService | `textile.service.ts` | 27 | 4 | Listar materials, colors, sizes, seasons |
| LogisticsService | `logistics.service.ts` | 26 | 4 | CRUD shipments + carriers |
| SettingsService | `settings.service.ts` | 23 | 3 | Get/update company settings + contact |
| AuditService | `audit.service.ts` | 14 | 1 | Listar audit logs |

### Análisis detallado de servicios críticos

#### 1. CustomersService (326 líneas, 17 métodos)
**SRP Violation: ALTA**

| Responsabilidad | Métodos | Líneas |
|-----------------|---------|--------|
| Customer CRUD | `register`, `getProfile`, `updateProfile`, `changePassword` | ~45 |
| Address management | `getAddresses`, `createAddress`, `deleteAddress` | ~12 |
| Wishlist | `getWishlist`, `toggleWishlist` | ~12 |
| Cart CRUD | `getOrCreateCart`, `getCart`, `addCartItem`, `updateCartItem`, `removeCartItem`, `clearCart`, `recalcCart` | ~85 |
| **Checkout** | `checkout` | **~170** (50% del archivo) |

El método `checkout` (líneas 179-361) maneja:
- Idempotency (llama a `IdempotencyService`)
- Validación de carrito
- Server-side pricing (carga productos y variantes desde DB)
- Validación de cupones
- Transacción con FOR UPDATE locks
- Validación de stock
- Creación de orden + order items + order events
- Reserva de stock
- Consumo atómico de cupones
- Limpieza de carrito

Inyecta **11 modelos** (Customer, CustomerAddress, WishlistItem, Cart, CartItem, Product, ProductVariant, Order, OrderItem, OrderEvent, StockItem, Coupon) + `Sequelize` + `IdempotencyService`.

#### 2. PaymentsService (294 líneas, 10 métodos)
**SRP Violation: ALTA**

| Responsabilidad | Métodos | Líneas |
|-----------------|---------|--------|
| Transaction management | `findAll`, `createPaymentIntent`, `refund` | ~70 |
| **Webhook handler** | `handleWebhook` | ~75 |
| Payment success flow | `handlePaymentSuccess` | ~45 |
| Payment failure flow | `handlePaymentFailure` | ~45 |
| Refund flow | `handleChargeRefunded` | ~40 |
| Expired reservations | `releaseExpiredReservations` | ~30 |

El webhook handler maneja:
- Desduplicación de eventos (tabla `webhook_events`)
- Replay protection (eventos >5min)
- State machine de orden (transiciones vía `ORDER_TRANSITIONS`)
- Commit de stock (descontar inventario)
- Liberación de stock en fallo/reembolso
- Creación de order events

Inyecta **7 modelos** (Transaction, TransactionRefund, Order, OrderItem, OrderEvent, StockItem) + `StripeService` + `Sequelize`.

#### 3. CatalogService (101 líneas, 12 métodos)
**SRP Violation: BAJA (aceptable)**

Product CRUD con cache-aside Redis. Cada método tiene una responsabilidad clara. La inyección de Redis podria separarse a un decorador/interceptor, pero no es crítica.

#### 4. MarketingService (103 líneas, 17 métodos)
**SRP Violation: MEDIA**

| Responsabilidad | Métodos |
|-----------------|---------|
| Campaigns CRUD | 5 |
| Coupons CRUD | 6 |
| Promotions CRUD | 5 |
| Newsletter | 1 |

Son 4 dominios (campañas, cupones, promociones, newsletter) en un solo servicio. Cada uno comparte el mismo patrón CRUD pero pertenecen a subdominios distintos.

### Análisis de dependencias inyectadas

| Servicio | Modelos inyectados | Servicios externos |
|----------|-------------------|-------------------|
| CustomersService | 11 (incluyendo de otros módulos) | IdempotencyService, Sequelize |
| PaymentsService | 7 | StripeService, Sequelize |
| CatalogService | 5 | RedisService |
| MarketingService | 4 | — |
| CmsService | 9 | — |
| OrdersService | 4 | Sequelize |

### Patrón repetido: CRUD boilerplate

La mayoría de servicios siguen el mismo patrón sin abstracción:
```
async findAll(query: any) → model.findAll()
async findById(id) → model.findByPk(id); if (!r) throw NotFoundException(); return r
async create(data: any) → model.create(data as any)
async update(id, data: any) → model.findByPk(id); if (!r) throw NotFoundException(); return r.update(data)
async delete(id) → model.findByPk(id); if (!r) throw NotFoundException(); return r.destroy()
```

Este patrón se repite ~40 veces en IamService, CrmService, MarketingService, CmsService, LogisticsService, etc.

## Hallazgos

1. **F1 — CustomersService es un "God Service"**: Con 326 líneas y 11 modelos inyectados (incluyendo de otros módulos), viola SRP. El método `checkout` solo representa ~170 líneas y cruza 5 dominios (carrito, productos, stock, órdenes, cupones).

2. **F2 — PaymentsService maneja el lifecycle de stock**: Un servicio de pagos no debería hacer commit/release de stock. Esta lógica debería estar en un servicio de Inventory o un saga orchestrator.

3. **F3 — CmsService es un "CRUD Service" hinchado**: 23 métodos para 7 entidades. Cada entidad (hero_slides, gallery, testimonials, benefits, artisan_processes) comparte el mismo patrón CRUD sin abstracción.

4. **F4 — Sin capa de repositorio**: Todos los servicios acceden directamente a los modelos Sequelize. No hay una capa de repositorio que abstraiga la persistencia.

5. **F5 — Duplicación de patrón CRUD**: ~40 métodos CRUD idénticos en 7 servicios. Esto podría abstraerse en un `BaseService<T>` o un `CrudFactory`.

6. **F6 — Servicios pequeños ok**: TextileService (27 líneas), LogisticsService (26), SettingsService (23), AuditService (14) son ejemplos de servicios con responsabilidad única.

## Score: 55/100

### Criterios de puntuación
- Servicios con SRP respetado: 20 pts (4 de 16 servicios medianos/pequeños respetan SRP parcialmente)
- Inyección de dependencias moderada: 10 pts (algunos servicios inyectan demasiados modelos)
- Código sin duplicación: 10 pts (CRUD boilerplate repetido ~40 veces)
- Separación de dominios en CustomersService: 0 pts (violación grave)
- Separación de dominios en PaymentsService: 5 pts (mezcla pagos + stock)
- Servicios pequeños bien factorizados: 10 pts (Textile, Settings, Audit, Logistics)

**Justificación**: El backend tiene 2 servicios críticos (CustomersService y PaymentsService) que violan SRP significativamente. El patrón CRUD se repite sin abstracción en la mayoría de servicios. Sin embargo, los servicios pequeños están bien factorizados y la funcionalidad es completa. Se recomienda refactorizar antes de R7 para separar checkout en un servicio propio y mover el stock lifecycle fuera de PaymentsService.
