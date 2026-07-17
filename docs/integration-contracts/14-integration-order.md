# ICC-01 — Integration Contract Certification
# Integration Order — ALPACART

> **Orden contractual determinado para la integración progresiva**

---

## Decisión: Mantener orden R7.1 → R7.2 → R7.3

| Fase | Frontend | Contratos | Prioridad | Dependencias |
|------|----------|-----------|-----------|--------------|
| R7.1 | **Institucional** | CMS (hero, faq, gallery, testimonials, benefits, artisan), Contact, Newsletter, Settings | 1ª | Ninguna (sin auth) |
| R7.2 | **Tienda** | Auth (login, register), Catalog (products, categories), Cart, Checkout, Orders, Coupons, Payments, Wishlist | 2ª | R7.1 + Customer Auth |
| R7.3 | **Dashboard** | IAM (users, roles, permissions), Catalog (CRUD), Orders, CRM, Payments, Inventory, Logistics, Marketing, CMS (admin), Analytics, Audit, Settings, Storage | 3ª | R7.2 + Staff Auth |

---

## R7.1 — Institucional

### Estado: **READY WITH OBSERVATIONS**

#### Contratos Necesarios:
| Contrato | Estado | Gaps |
|----------|--------|------|
| GET /hero-slides | ✅ PASS | — |
| GET /faq | ✅ PASS | — |
| GET /testimonials | ✅ PASS | — |
| GET /gallery | ✅ PASS | Shared Type faltante (GalleryImage) |
| GET /benefits | ✅ PASS | Shared Type faltante (Benefit) |
| GET /artisan-processes | ✅ PASS | Shared Type faltante (ArtisanProcess) |
| GET /contents | ✅ PASS | — |
| GET /settings/company | ✅ PASS | — |
| POST /contact | ⚠️ PARTIAL | ContactDto no conectado (ICC-P1-05) |
| POST /newsletter/subscribe | ❌ FAIL | Sin DTO (ICC-P1-09) |
| API Versioning | ❌ FAIL | VITE_API_URL incorrecto (ICC-P0-01) |

#### Requisitos PRE-R7.1:
1. ✅ **Corregir VITE_API_URL** a `http://localhost:8000/api/v1` en institucional (ICC-P0-01)
2. ⚠️ Conectar ContactDto en SettingsController (ICC-P1-05) — opcional, el endpoint funciona con `b: any`
3. ⚠️ Crear NewsletterSubscribeDto (ICC-P1-09) — opcional, bajo riesgo
4. ⚠️ Crear shared types GalleryImage, Benefit, ArtisanProcess, FaqCategory (ICC-P1-06) — deseable

#### Riesgos:
- El frontend institucional tiene contenido mayormente estático
- Solo 2 endpoints son realmente llamados desde el frontend: POST /contact (ya en fetch) + POST /newsletter (no implementado en FE)
- Los endpoints GET de CMS ya devuelven datos correctos de los seeds

**Veredicto:** Puede comenzar integración inmediatamente después de corregir VITE_API_URL.

---

## R7.2 — Tienda

### Estado: **READY WITH OBSERVATIONS**

#### Contratos Necesarios:
| Contrato | Estado | Gaps |
|----------|--------|------|
| POST /auth/login | ✅ PASS | — |
| POST /auth/customer-login | ✅ PASS | — |
| POST /auth/register | ⚠️ PARTIAL | RegisterDto no conectado (ICC-P1-01) |
| GET /auth/me | ✅ PASS | — |
| GET /products | ✅ PASS | — |
| GET /products/:id | ✅ PASS | — |
| GET /categories | ✅ PASS | — |
| GET /collections | ✅ PASS | — |
| GET /cart | ⚠️ PARTIAL | Sin shared type Cart |
| POST /cart/items | ⚠️ PARTIAL | AddCartItemDto no conectado (ICC-P1-02) |
| POST /checkout | ⚠️ PARTIAL | CheckoutDto no conectado (ICC-P1-03) |
| POST /coupons/validate | ⚠️ PARTIAL | ValidateCouponDto no conectado (ICC-P1-04) |
| GET /orders | ✅ PASS | — |
| GET /orders/:id | ✅ PASS | — |
| POST /create-payment-intent | ⚠️ PARTIAL | Sin DTO |
| API Versioning | ❌ FAIL | VITE_API_URL incorrecto (ICC-P0-01) |

#### Requisitos PRE-R7.2:
1. ✅ **Corregir VITE_API_URL** (ICC-P0-01)
2. ⚠️ Conectar 4 DTOs existentes: RegisterDto, AddCartItemDto, CheckoutDto, ValidateCouponDto
3. ⚠️ Crear shared types: Cart, CartItem, CheckoutResponse, Order (refinar existente)
4. ⚠️ Verificar ownership guard: customer solo ve sus propias órdenes/carrito

#### Riesgos:
- checkout, cart, y register son los 3 endpoints críticos sin DTO conectado
- Sin DTOs conectados, no hay validación de entrada (riesgo de datos inválidos)
- Ownership guard (customer ve solo sus datos) no está verificado contractualmente

**Veredicto:** Ready para comenzar preparación, requiere conectar 4 DTOs antes de integrar checkout.

---

## R7.3 — Dashboard

### Estado: **READY WITH OBSERVATIONS**

#### Contratos Necesarios:
| Contrato | Estado | Gaps |
|----------|--------|------|
| POST /auth/login | ✅ PASS | — |
| GET /auth/me | ✅ PASS | — |
| GET /users | ⚠️ PARTIAL | Sin DTO response |
| GET /roles | ⚠️ PARTIAL | Sin DTO response |
| CRUD /products | ❌ 6 endpoints sin DTO | Staff-only |
| CRUD /orders | ⚠️ 2 endpoints sin DTO | Staff-only |
| CRUD /crm/clients | ⚠️ 3 endpoints sin DTO | Staff-only |
| GET /analytics/kpis | ✅ PASS | — |
| GET /stock | ✅ PASS | — |
| CRUD /campaigns | ⚠️ 3 endpoints sin DTO | Staff-only |
| GET /audit/logs | ✅ PASS | — |
| PUT /settings/company | ⚠️ PARTIAL | UpdateCompanyDto no conectado |
| API Versioning | ❌ FAIL | VITE_API_URL incorrecto (ICC-P0-01) |

#### Requisitos PRE-R7.3:
1. ✅ **Corregir VITE_API_URL** (ICC-P0-01)
2. ⚠️ Conectar UpdateCompanyDto
3. ⚠️ Crear repositorios faltantes (textile.js, settings.js)
4. ⚠️ Migrar stores de inline mock data a llamadas API reales

#### Riesgos:
- Dashboard no tiene `services/api/` — necesita crear axios instance
- Repositorios actuales son puramente mock, necesitan reemplazo completo
- 39 páginas con mock data inline requieren migración progresiva
- Menor prioridad (R7.3), suficiente tiempo

**Veredicto:** Baja prioridad, comenzar después de R7.2.

---

## Orden de Prioridad de Correcciones

| # | Corrección | Fase | Gap ID | Esfuerzo |
|---|-----------|------|--------|----------|
| 1 | Unificar VITE_API_URL en 3 frontends | PRE-R7 | ICC-P0-01 | 10 min |
| 2 | Conectar ContactDto en SettingsController | PRE-R7.1 | ICC-P1-05 | 5 min |
| 3 | Crear NewsletterSubscribeDto + conectar | PRE-R7.1 | ICC-P1-09 | 10 min |
| 4 | Crear shared types CMS (GalleryImage, Benefit, ArtisanProcess, FaqCategory) | PRE-R7.1 | ICC-P1-06 | 15 min |
| 5 | Alinear PaginatedResponse (count → total) | PRE-R7.1 | ICC-P1-08 | 2 min |
| 6 | Conectar RegisterDto | PRE-R7.2 | ICC-P1-01 | 5 min |
| 7 | Conectar AddCartItemDto | PRE-R7.2 | ICC-P1-02 | 5 min |
| 8 | Conectar CheckoutDto | PRE-R7.2 | ICC-P1-03 | 5 min |
| 9 | Conectar ValidateCouponDto | PRE-R7.2 | ICC-P1-04 | 5 min |
| 10 | Crear shared types Cart, CartItem | PRE-R7.2 | ICC-P1-07 | 10 min |
| 11 | Conectar UpdateCompanyDto | PRE-R7.3 | ICC-P1-10 | 5 min |
| 12 | P2s restantes (18 gaps) | POST-INTEGRACIÓN | ICC-P2-* | Variable |
