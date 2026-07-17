# ICC-01 — Integration Contract Certification
# DTO Coverage — ALPACART

> **Auditoría:** Todos los Controllers — Endpoints que usan `body:any` vs DTOs

---

## 1. Resumen

| Métrica | Valor |
|---------|-------|
| Total endpoints con body | 52 |
| Endpoints CON DTO conectado | 2 (LoginDto en auth/login y auth/customer-login) |
| Endpoints CON DTO existente pero NO conectado | 6 |
| Endpoints SIN DTO | 44 |
| DTOs existentes total | 11 archivos, 23 clases |
| DTOs con validación decorators | 5 (LoginDto, RegisterDto, AddCartItemDto, CheckoutDto, ValidateCouponDto, ContactDto, UpdateCompanyDto, CreateHeroSlideDto) |
| DTOs sin validación decorators | 15 (CreateOrderDto, cms-admin.dto.ts x10, CreateCouponDto) |

---

## 2. Endpoints que REQUIEREN DTO para R7 (Clasificación P0/P1)

### P0 — BLOQUEA INTEGRACIÓN (debe resolverse antes de conectar ese frontend)

| Endpoint | Frontend | Riesgo | DTO Requerido |
|----------|----------|--------|---------------|
| POST /auth/register | Tienda | Registro de cliente sin validación | RegisterDto ✅ (existe, conectar) |
| POST /contact | Institucional | R7.1 bloqueado | ContactDto ✅ (existe, conectar) |
| POST /cart/items | Tienda | Agregar al carrito sin validación | AddCartItemDto ✅ (existe, conectar) |
| POST /checkout | Tienda | Checkout sin validación de payload | CheckoutDto ✅ (existe, conectar) |
| POST /coupons/validate | Tienda | Validar cupón sin DTO | ValidateCouponDto ✅ (existe, conectar) |
| POST /newsletter/subscribe | Institucional/Tienda | Suscripción sin validación | Crear DTO |

### P1 — DEBE RESOLVERSE ANTES DE INTEGRAR ESE MÓDULO

| Endpoint | Módulo | DTO Requerido |
|----------|--------|---------------|
| POST /account/addresses | Customers | Crear CreateAddressDto |
| PUT /account/profile | Customers | Crear UpdateProfileDto |
| PUT /account/password | Customers | Crear ChangePasswordDto |
| POST /orders | Orders | CreateOrderDto ✅ (existe pero sin validación — agregar decorators) |
| PUT /orders/:id/status | Orders | Crear UpdateOrderStatusDto |
| POST /orders/:id/notes | Orders | Crear AddOrderNoteDto |
| PUT /settings/company | Settings | UpdateCompanyDto ✅ (existe, conectar) |

### P2 — PUEDE DIFERIRSE

| Endpoint | Razón |
|----------|-------|
| POST /products | Staff-only, no afecta experiencia de cliente |
| PUT /products/:id | Staff-only |
| POST /variants | Staff-only |
| POST /products/:id/media | Staff-only |
| POST /stock/:id/adjust | Staff-only |
| POST /campaigns | Staff-only |
| POST /coupons | Staff-only |
| POST /promotions | Staff-only |
| POST /contents | Staff-only (CMS admin) |
| POST /admin/hero-slides | Staff-only |
| POST /admin/gallery | Staff-only |
| POST /admin/testimonials | Staff-only |
| POST /admin/benefits | Staff-only |
| POST /admin/artisan-processes | Staff-only |
| POST /crm/clients | Staff-only |
| POST /users | Staff-only |
| POST /roles | Staff-only |
| PUT /permissions/matrix | Staff-only |
| POST /shipments | Staff-only |
| PUT /shipments/:id/status | Staff-only |
| POST /create-payment-intent | Customer, pero usa Stripe SDK |
| POST /transactions/:id/refund | Staff-only |
| POST /wishlist/items | Customer, bajo riesgo |
| PATCH /cart/items/:id | Customer, bajo riesgo |

---

## 3. DTOs a Conectar o Crear para R7

### Conectar DTOs existentes (6 — P0):

| DTO | Endpoint | Archivo destino | Cambio |
|-----|----------|----------------|--------|
| RegisterDto | POST /auth/register | customers.controller.ts: `b: any` → `dto: RegisterDto` |
| AddCartItemDto | POST /cart/items | customers.controller.ts: `b: any` → `dto: AddCartItemDto` |
| CheckoutDto | POST /checkout | customers.controller.ts: `b: any` → `dto: CheckoutDto` |
| ValidateCouponDto | POST /coupons/validate | marketing.controller.ts: `b: any` → `dto: ValidateCouponDto` |
| ContactDto | POST /contact | settings.controller.ts: `b: any` → `dto: ContactDto` |
| UpdateCompanyDto | PUT /settings/company | settings.controller.ts: `b: any` → `dto: UpdateCompanyDto` |

### Crear DTOs nuevos necesarios antes de R7 (7 — P0/P1):

| DTO Propuesto | Endpoint | Campos |
|---------------|----------|--------|
| CreateAddressDto | POST /account/addresses | name, street, city, state?, zip?, country, phone?, isDefault? |
| UpdateProfileDto | PUT /account/profile | firstName?, lastName?, phone?, language? |
| ChangePasswordDto | PUT /account/password | currentPassword, newPassword |
| UpdateOrderStatusDto | PUT /orders/:id/status | status (enum), reason? |
| AddOrderNoteDto | POST /orders/:id/notes | content, visibility? |
| NewsletterSubscribeDto | POST /newsletter/subscribe | email (email), source? |
| CreateShipmentDto | POST /shipments | orderId, carrier, originCity?, destinationCity? |

---

## 4. Score DTO Coverage

| Categoría | Cantidad |
|-----------|----------|
| Endpoints con DTO conectado | 2 |
| Endpoints con DTO existente (conectar) | 6 |
| Endpoints que necesitan DTO nuevo (P0) | 1 |
| Endpoints que necesitan DTO nuevo (P1) | 6 |
| Endpoints staff-only (P2) | 23 |
| **Total endpoints con body** | **52** |

**DTO Coverage Score:** (2 + 6 + 0) / 52 = **15/100**
**DTO Coverage Score (solo P0/P1):** (2 + 6 + 7) / 15 = **100/100** si se completan
