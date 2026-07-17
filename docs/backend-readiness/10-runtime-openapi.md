# R7.0V — 10 — Runtime OpenAPI Validation

> **Fecha:** 2026-07-16 | **Entorno:** PostgreSQL 16.14 + Redis 7

---

## 1. Swagger UI

| Acción | Resultado |
|--------|-----------|
| GET /api/v1/docs | ✅ 200 — Swagger UI se renderiza |
| OpenAPI JSON /api/v1/docs-json | ✅ 200 — JSON válido |

## 2. Endpoints Documentados (por módulo)

| Módulo | Endpoints documentados | Visible en Swagger |
|--------|----------------------|-------------------|
| Health | GET /health | ✅ |
| Auth | POST login, POST customer-login, GET me, POST register | ✅ |
| IAM | CRUD users, roles, permissions, matrix | ✅ |
| Catalog | CRUD products, variants, media; GET categories, collections | ✅ |
| Textile | GET materials, colors, sizes, seasons | ✅ |
| CRM | CRUD clients, POST notes | ✅ |
| Customers | POST register, profile, addresses, wishlist, cart, checkout | ✅ |
| Orders | CRUD orders, status, events, notes | ✅ |
| Payments | GET transactions, createPaymentIntent, refund, webhook | ✅ |
| Inventory | GET stock, adjust, movements, transfers | ✅ |
| Logistics | GET/POST shipments, carriers, updateStatus | ✅ |
| Marketing | CRUD campaigns, coupons, promotions, subscribe, validate | ✅ |
| CMS | CRUD contents, faq, hero, gallery, testimonials, benefits, artisan | ✅ |
| Audit | GET logs | ✅ |
| Settings | GET/PUT company, POST contact | ✅ |
| Analytics | GET kpis | ✅ |
| Storage | POST upload, DELETE | ✅ |

## 3. Conclusión

| Criterio | Estado |
|----------|--------|
| Swagger UI accesible | ✅ PASS |
| ~170 endpoints documentados | ✅ PASS |
| Schemas (DTOs) visibles | ✅ PASS |
