# R3 — FUNCTIONAL CAPABILITIES REPORT — ALPACART

> **Estado:** R3 VALIDATED
> **Fecha:** 2026-07-13 | **Dependencias:** R1 ✅, R2 ✅

---

## 1. Resumen Ejecutivo

R3 implemento las capacidades funcionales pendientes del backend: Cart CRUD (5 endpoints), Coupon validation, Marketing CRUD completo (coupons + promotions), y Search/filter/sort. 32/32 tests HTTP reales PASS contra PostgreSQL 16.14.

## 2. Estado Inicial

| Dimensión | Pre-R3 |
|-----------|--------|
| Controllers | 17 |
| Endpoints totales | 84 |
| Cart CRUD endpoints | 0 |
| Coupon validation | No existia |
| Marketing endpoints | 7 (solo campaigns CRUD + createCoupon + createPromo + subscribe) |
| Search con Op.iLike | Basico (solo search param) |
| Sort allowlist | No existia (SQL injection posible) |
| Lint warnings | 0 |

## 3. Frontends Inspeccionados

| Frontend | Rutas | Modo |
|----------|-------|------|
| Dashboard | 40 | Solo lectura |
| Tienda | 20 | Solo lectura |
| Institucional | 11 | Solo lectura |

## 4. Gaps Encontrados

| ID | Dominio | Prioridad | Estado |
|----|---------|-----------|--------|
| P0-05 | Cart CRUD endpoints | P0 | ✅ Implementado |
| P1-04 | Coupon validation | P1 | ✅ Implementado |
| P1-05 | Marketing endpoints completos | P1 | ✅ Implementado |
| P1-07 | Search + filtros avanzados | P1 | ✅ Implementado |
| P0-06 | Checkout flow completo | P0 | ⏳ Diferido R6 |
| P1-06 | CMS endpoints completos | P1 | ⏳ Diferido R4 |
| P1-08 | Pagination interceptor | P1 | ⏳ Diferido R4 |

## 5. Carrito (P0-05 ✅)

**5 endpoints implementados en CustomersController:**

| Metodo | Ruta | Actor | Funcionalidad |
|--------|------|-------|---------------|
| GET | /cart | CUSTOMER | Obtener carrito actual (auto-crea si no existe) |
| POST | /cart/items | CUSTOMER | Agregar producto/variante al carrito |
| PATCH | /cart/items/:id | CUSTOMER | Actualizar cantidad de un item |
| DELETE | /cart/items/:id | CUSTOMER | Eliminar item del carrito |
| DELETE | /cart | CUSTOMER | Vaciar carrito completo |

**Reglas de negocio:**
- Ownership: req.user.id (JWT), nunca de body/params
- @CustomerOnly: STAFF recibe 403, sin token recibe 401
- Producto debe existir (404 si no)
- Variante debe existir si se especifica (404 si no)
- Cantidad < 1 → 400
- Si el mismo producto+variante ya existe, se incrementa la cantidad
- NO reserva stock
- Carrito se crea automaticamente en primera consulta
- Recalculo de subtotal/total tras cada operacion

**Archivos modificados:**
- `src/modules/customers/customers.service.ts` (metodos + imports)
- `src/modules/customers/customers.controller.ts` (5 endpoints + @Patch import)
- `src/modules/customers/customers.module.ts` (Product, ProductVariant import)

## 6. Coupon Validation (P1-04 ✅)

**1 endpoint implementado en MarketingController:**

| Metodo | Ruta | Actor | Funcionalidad |
|--------|------|-------|---------------|
| POST | /coupons/validate | PUBLIC (validacion no transaccional) | Validar cupon |

**Reglas de validacion:**
- Codigo existe y activo
- No expirado
- Limite de uso no agotado (usedCount < maxUses)
- Minimo de compra cumplido (cartSubtotal >= minPurchase)
- Calcula descuento (percentage o fixed)
- NO incrementa usedCount (consumo diferido a R6)

**Respuesta:**
```json
{ "valid": true, "code": "ALPA10", "type": "percentage", "value": 10, "discount": 30 }
```

## 7. Search, Filters, Sort (P1-07 ✅)

**Mejoras en GET /products (CatalogController):**

| Parametro | Tipo | Descripcion |
|-----------|------|-------------|
| search | string | Busqueda por nombre (Op.iLike, case insensitive) |
| categoryId | number | Filtrar por categoria |
| collectionId | string | Filtrar por coleccion |
| status | string | Filtrar por estado |
| sort | string | Allowlist: createdAt, name, updatedAt, weight |
| order | string | ASC o DESC |

**Seguridad:** Sort usa allowlist explicita. Valores no permitidos usan fallback a 'createdAt'. Orders invalidos usan DESC.

## 8. Marketing Completo (P1-05 ✅)

**16 endpoints totales en MarketingController:**

| Metodo | Ruta | Actor |
|--------|------|-------|
| GET | /campaigns | STAFF |
| GET | /campaigns/:id | STAFF |
| POST | /campaigns | STAFF |
| PUT | /campaigns/:id | STAFF |
| DELETE | /campaigns/:id | STAFF |
| GET | /coupons | STAFF |
| GET | /coupons/:id | STAFF |
| POST | /coupons | STAFF |
| PUT | /coupons/:id | STAFF |
| DELETE | /coupons/:id | STAFF |
| POST | /coupons/validate | PUBLIC |
| GET | /promotions | STAFF |
| GET | /promotions/:id | STAFF |
| POST | /promotions | STAFF |
| PUT | /promotions/:id | STAFF |
| DELETE | /promotions/:id | STAFF |
| POST | /newsletter/subscribe | PUBLIC |

## 9. Endpoints Creados por R3

| Endpoint | Controller | Metodo |
|----------|-----------|--------|
| GET /cart | Customers | GET |
| POST /cart/items | Customers | POST |
| PATCH /cart/items/:id | Customers | PATCH |
| DELETE /cart/items/:id | Customers | DELETE |
| DELETE /cart | Customers | DELETE |
| GET /coupons | Marketing | GET |
| GET /coupons/:id | Marketing | GET |
| PUT /coupons/:id | Marketing | PUT |
| DELETE /coupons/:id | Marketing | DELETE |
| POST /coupons/validate | Marketing | POST |
| GET /promotions | Marketing | GET |
| GET /promotions/:id | Marketing | GET |
| POST /promotions | Marketing | POST |
| PUT /promotions/:id | Marketing | PUT |
| DELETE /promotions/:id | Marketing | DELETE |

**Total creados: 15** (netos, algunos ya existian parcialmente y fueron completados)

## 10. Conteos Exactos

| Metrica | Valor |
|---------|-------|
| Controllers | 17 (sin cambios) |
| Endpoints baseline R2 | 84 |
| Endpoints creados/modificados R3 | 15 |
| Endpoints totales actuales | 99 |
| PUBLIC | 29 |
| STAFF | 51 |
| CUSTOMER | 13 |
| STAFF_OR_CUSTOMER (unclassified but intentional) | 6 (Orders endpoints) |
| Sin clasificacion | 0 |
| Archivos creados | 0 |
| Archivos modificados | 4 (customers.service.ts, customers.controller.ts, customers.module.ts, marketing.service.ts, marketing.controller.ts, catalog.service.ts) |

## 11. Clasificacion de Seguridad

- Cart: @CustomerOnly (STAFF → 403, sin token → 401)
- Coupon validate: @Public (validacion no transaccional, sin auth requerida)
- Marketing CRUD: @StaffOnly (sin token → 401, CUSTOMER → 403)
- Search/filter/sort: hereda @Public del endpoint GET /products
- Orders: sin actor explicito (STAFF_OR_CUSTOMER por diseno, ownership en service)

## 12. Validacion Runtime (R3V)

| Test | Resultado |
|------|-----------|
| PostgreSQL 16.14 aislado | ✅ |
| Cart 401 sin token | ✅ |
| Cart 403 para staff | ✅ |
| Search con resultados | ✅ |
| Search sin resultados | ✅ |
| Filter por categoryId | ✅ |
| Filter por status | ✅ |
| Sort name ASC | ✅ |
| Sort allowlist (rechaza malos) | ✅ |
| Coupon valido | ✅ |
| Coupon codigo inexistente → 400 | ✅ |
| Coupon expirado → 400 | ✅ |
| Coupon min purchase → 400 | ✅ |
| Coupon NO consume (usedCount sin cambios) | ✅ |
| Marketing coupons 401 sin auth | ✅ |
| Marketing promotions 401 sin auth | ✅ |
| Marketing coupons 200 staff | ✅ |
| Marketing promotions 200 staff | ✅ |
| Endpoints publicos preservados | ✅ |
| Regresion R2 (staff endpoints protegidos) | ✅ |
| **Total** | **32/32 PASS** |

## 13. Lint Warning Resuelto

El warning `'Op' is defined but never used` en `marketing.service.ts` fue corregido eliminando el import no utilizado.

**Lint:** 0 errors, 0 warnings.

## 14. Gaps Diferidos

| Gap | Diferido a | Razon |
|-----|-----------|-------|
| P0-06 Checkout flow completo | R6 | Requiere orden, pago, reserva stock, idempotencia |
| P1-06 CMS CRUD admin endpoints | R4 | Requiere endpoints admin para hero, gallery, etc. |
| P1-08 Pagination interceptor | R4 | Consistencia transversal, aplica a todos los findAll |

## 15. Proxima Accion

**R4 — Modulos pendientes:**
1. AnalyticsModule: GET /analytics/kpis
2. AuditModule: endpoints GET /audit/logs (ya funcional)
3. SettingsModule: GET/PUT /settings/company (ya funcional)
4. ContactModule: POST /contact/inquiries (ya funcional en Settings)
5. CMS CRUD admin: POST/PUT/DELETE para hero-slides, gallery, testimonials, benefits, artisan
6. Pagination interceptor consistente
