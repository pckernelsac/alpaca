# ICC-01 — Integration Contract Certification
# Contract Gaps — ALPACART

> **Registro único de gaps contractuales**

---

## Gaps P0 — BLOQUEAN ICC

| ID | Dominio | Frontend | Contrato | Problema | Impacto | Corrección | Fase |
|----|---------|----------|----------|----------|---------|------------|------|
| ICC-P0-01 | API Versioning | Todos | VITE_API_URL | Institucional: `/api`, Tienda: `/api/tienda`, Dashboard: `/api/dashboard`. Ninguno apunta a `/api/v1` | Los 3 frontends apuntan a rutas incorrectas | Unificar a `http://localhost:8000/api/v1` en los 3 .env | PRE-R7.1 |

**Total P0: 1 gap**

---

## Gaps P1 — BLOQUEAN INTEGRACIÓN DEL MÓDULO

| ID | Dominio | Frontend | Contrato | Problema | Impacto | Corrección | Fase Objetivo |
|----|---------|----------|----------|----------|---------|------------|---------------|
| ICC-P1-01 | Auth | Tienda | POST /auth/register | RegisterDto existe pero NO conectado | Registro de cliente sin validación | Conectar RegisterDto en CustomersController | R7.2 (Tienda) |
| ICC-P1-02 | Cart | Tienda | POST /cart/items | AddCartItemDto existe pero NO conectado | Add to cart sin validación | Conectar AddCartItemDto en CustomersController | R7.2 (Tienda) |
| ICC-P1-03 | Checkout | Tienda | POST /checkout | CheckoutDto existe pero NO conectado | Checkout sin validación de payload | Conectar CheckoutDto en CustomersController | R7.2 (Tienda) |
| ICC-P1-04 | Coupons | Tienda | POST /coupons/validate | ValidateCouponDto existe pero NO conectado | Validación de cupón sin typing | Conectar ValidateCouponDto en MarketingController | R7.2 (Tienda) |
| ICC-P1-05 | Contact | Institucional | POST /contact | ContactDto existe pero NO conectado | Formulario contacto sin validación backend | Conectar ContactDto en SettingsController | R7.1 (Institucional) |
| ICC-P1-06 | Shared Types | Institucional | CMS responses | Faltan GalleryImage, FaqCategory, Benefit, ArtisanProcess | Frontend no tiene tipos para consumir CMS | Crear 4 shared types | R7.1 (Institucional) |
| ICC-P1-07 | Shared Types | Tienda | Cart/Checkout | Faltan Cart, CartItem, Checkout response types | Frontend no tiene tipos para carrito/checkout | Crear 3 shared types | R7.2 (Tienda) |
| ICC-P1-08 | Pagination | Todos | PaginatedResponse | Shared Type usa `count`, backend usa `meta.total` | Inconsistencia en contrato de paginación | Alinear shared type a `total` (cambiar `count` → `total`) | PRE-R7.1 |
| ICC-P1-09 | Newsletter | Institucional/Tienda | POST /newsletter/subscribe | Sin DTO, sin validación | Suscripción sin validación de email | Crear NewsletterSubscribeDto | R7.1 (Institucional) |
| ICC-P1-10 | Settings | Dashboard | PUT /settings/company | UpdateCompanyDto existe pero NO conectado | Actualización de config sin validación | Conectar UpdateCompanyDto en SettingsController | R7.3 (Dashboard) |

**Total P1: 10 gaps**

---

## Gaps P2 — NO BLOQUEANTES

| ID | Dominio | Frontend | Contrato | Problema | Corrección | Fase |
|----|---------|----------|----------|----------|------------|------|
| ICC-P2-01 | Auth | Todos | Refresh Token | No implementado | Post-MVP | — |
| ICC-P2-02 | Auth | Todos | Logout endpoint | No implementado (logout es frontend-only) | Post-MVP | — |
| ICC-P2-03 | Customers | Tienda | PUT /account/profile | Sin DTO | Crear UpdateProfileDto | R7.2 |
| ICC-P2-04 | Customers | Tienda | PUT /account/password | Sin DTO | Crear ChangePasswordDto | R7.2 |
| ICC-P2-05 | Customers | Tienda | POST /account/addresses | Sin DTO | Crear CreateAddressDto | R7.2 |
| ICC-P2-06 | Orders | Dashboard | POST /orders | CreateOrderDto existe pero sin validación decorators | Agregar decorators | R7.3 |
| ICC-P2-07 | Orders | Dashboard | PUT /orders/:id/status | Sin DTO | Crear UpdateOrderStatusDto | R7.3 |
| ICC-P2-08 | Catalog | Dashboard | POST /products | Sin DTO | Crear CreateProductDto | R7.3 |
| ICC-P2-09 | Catalog | Dashboard | POST /variants | Sin DTO | Crear CreateVariantDto | R7.3 |
| ICC-P2-10 | Marketing | Dashboard | POST /campaigns | Sin DTO | Crear CreateCampaignDto | R7.3 |
| ICC-P2-11 | CMS | Dashboard | POST /admin/* (8 endpoints) | Sin DTO (cms-admin.dto.ts existe pero sin validación) | Agregar decorators a cms-admin.dto.ts | R7.3 |
| ICC-P2-12 | IAM | Dashboard | POST /users, POST /roles | Sin DTO | Crear DTOs | R7.3 |
| ICC-P2-13 | Logistics | Dashboard | POST /shipments | Sin DTO | Crear CreateShipmentDto | R7.3 |
| ICC-P2-14 | Inventory | Dashboard | POST /stock/:id/adjust | Sin DTO | Crear AdjustStockDto | R7.3 |
| ICC-P2-15 | Analytics | Dashboard | GET /analytics/kpis | Sin shared type DashboardKpi | Crear shared type | R7.3 |
| ICC-P2-16 | Shared Types | Dashboard | Transaction, AuditLog, CompanySetting, Content | Faltan shared types | Crear 4 tipos | R7.3 |
| ICC-P2-17 | Response | Todos | { success, data } envelope | Frontend no consume `success` ni `meta` | Cosumir envelope o extraer data en interceptor | POST-R7 |
| ICC-P2-18 | Dashboard | Dashboard | repositories/textile.js, settings.js | Archivos referenciados pero faltantes | Crear repositorios faltantes | R7.3 |

**Total P2: 18 gaps**

---

## Resumen de Gaps

| Severidad | Cantidad | Bloquea |
|-----------|----------|---------|
| P0 | 1 | ❌ ICC certification |
| P1 | 10 | ❌ Integración del módulo |
| P2 | 18 | ✅ No bloquea |
| **Total** | **29** | — |
