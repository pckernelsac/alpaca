# ICC-01 — Integration Contract Certification
# Shared Types Coverage — ALPACART

> **Análisis:** Shared Types actuales vs Contratos reales consumidos por frontends

---

## 1. Shared Types Actuales (20 interfaces)

| # | Shared Type | Usado por Frontend | Endpoint Backend | Estado |
|---|-------------|-------------------|------------------|--------|
| 1 | User | Dashboard (users list) | GET /users | ✅ |
| 2 | Role | Dashboard (roles) | GET /roles | ✅ |
| 3 | Customer | Tienda (profile) | GET /account/profile | ✅ |
| 4 | Product | Tienda (products) | GET /products | ✅ |
| 5 | ProductVariant | Dashboard (variants) | GET /products/:id/variants | ✅ |
| 6 | Category | Tienda/Dashboard | GET /categories | ✅ |
| 7 | Collection | Tienda/Dashboard | GET /collections | ✅ |
| 8 | Order | Dashboard/Tienda | GET /orders | ✅ |
| 9 | OrderItem | Dashboard/Tienda | GET /orders/:id | ✅ |
| 10 | Address | Tienda (addresses) | GET /account/addresses | ✅ |
| 11 | Coupon | Dashboard/Tienda | GET /coupons | ✅ |
| 12 | Campaign | Dashboard | GET /campaigns | ✅ |
| 13 | Client | Dashboard (CRM) | GET /crm/clients | ✅ |
| 14 | StockItem | Dashboard | GET /stock | ✅ |
| 15 | Warehouse | Dashboard | GET /stock | ✅ |
| 16 | Shipment | Dashboard | GET /shipments | ✅ |
| 17 | Content | Dashboard/CMS | GET /contents | ✅ |
| 18 | HeroSlide | Institucional | GET /hero-slides | ✅ |
| 19 | Testimonial | Institucional | GET /testimonials | ✅ |
| 20 | Notification | No usado por ningún FE | — | ⚠️ Sin uso |
| 21 | PaginatedResponse<T> | Todos (potencial) | GET /products?page= | ✅ |

---

## 2. Tipos Contractuales Faltantes

Tipos que CRUZAN la frontera Frontend ↔ Backend y NO tienen shared type:

| # | Tipo Necesario | Frontend | Endpoint | Prioridad |
|---|---------------|----------|----------|-----------|
| 1 | **Cart** | Tienda | GET /cart | **P1** — R7.2 Tienda |
| 2 | **CartItem** | Tienda | GET /cart | **P1** — R7.2 Tienda |
| 3 | **GalleryImage** | Institucional | GET /gallery | **P1** — R7.1 Institucional |
| 4 | **FaqCategory** (con items) | Institucional | GET /faq | **P1** — R7.1 Institucional |
| 5 | **Benefit** | Institucional | GET /benefits | **P1** — R7.1 Institucional |
| 6 | **ArtisanProcess** | Institucional | GET /artisan-processes | **P1** — R7.1 Institucional |
| 7 | **Transaction** | Dashboard | GET /transactions | **P2** — R7.3 Dashboard |
| 8 | **ContactInquiry** | Institucional/Backend | POST /contact | **P2** — No consumido por FE |
| 9 | **NewsletterSubscriber** | Institucional/Tienda | POST /newsletter/subscribe | **P2** |
| 10 | **AuditLog** | Dashboard | GET /audit/logs | **P2** |
| 11 | **CompanySetting** | Dashboard | GET /settings/company | **P2** |
| 12 | **DashboardKpi** | Dashboard | GET /analytics/kpis | **P2** |

**Total faltantes:** 12 tipos contractuales

---

## 3. Tipos que NO Cruzan la Frontera (NO necesarios en shared types)

| Tipo | Solo Backend | Razón |
|------|-------------|-------|
| IdempotencyKey | ✅ | Solo backend, header transparente |
| WebhookEvent | ✅ | Solo backend, Stripe |
| Session | ✅ | Solo backend, auth interna |
| PasswordReset | ✅ | Solo backend, auth interna |
| RolePermission | ✅ | Solo backend, junction table |
| Permission | ✅ | Solo backend, no expuesto directo |
| StockMovement | ✅ | Solo backend, consulta interna |
| WarehouseTransfer | ✅ | Solo backend, staff-only |
| WarehouseTransferItem | ✅ | Solo backend, parte de transfer |
| ShipmentEvent | ✅ | No expuesto como endpoint separado |
| OrderEvent | ✅ | Expuesto vía GET /orders/:id/events (podría tener type) |
| OrderDocument | ✅ | Staff-only, bajo demanda |

---

## 4. Score Shared Types

| Categoría | Cantidad |
|-----------|----------|
| Shared types existentes y usados | 20 |
| Shared types existentes NO usados | 1 (Notification) |
| Tipos contractuales faltantes | 12 |
| Tipos que NO deben estar en shared | ~12 |

**Coverage ratio:** 20 / (20 + 12) = **63%**
**Coverage funcional (solo R7.1 Institucional):** 4/6 = **67%**
