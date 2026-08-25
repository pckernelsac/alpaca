# DASHBOARD CERTIFICATION — HTTP Validation

> **Endpoints utilizados por el Dashboard**

---

## Endpoints por Módulo

| Módulo | Endpoints | Métodos | Auth |
|--------|-----------|---------|------|
| Auth | /auth/login, /auth/me | POST, GET | @Public + JWT |
| IAM | /users, /users/:id, /roles, /permissions | GET, POST, PUT, DELETE | StaffOnly |
| Catalog | /products, /products/:id, /categories, /collections | GET, POST, PUT, DELETE | @Public + StaffOnly |
| Orders | /orders, /orders/:id, /orders/:id/status, /orders/:id/events | GET, POST, PUT | ActorGuard staff+customer |
| Payments | /transactions, /create-payment-intent | GET, POST | JWT |
| Inventory | /stock, /stock/:id/adjust, /movements, /transfers | GET, POST | StaffOnly |
| Logistics | /shipments, /carriers | GET, POST, PUT | StaffOnly |
| Marketing | /campaigns, /coupons, /promotions | GET, POST, PUT, DELETE | StaffOnly |
| CMS | /contents, /admin/* | GET, POST, PUT, DELETE | @Public + StaffOnly |
| CRM | /crm/clients | GET, POST, PUT | StaffOnly |
| Analytics | /analytics/kpis | GET | StaffOnly |
| Audit | /audit/logs | GET | StaffOnly |
| Settings | /settings/company | GET, PUT | @Public + StaffOnly |
| Textile | /textile/materials, colors, sizes, seasons | GET | @Public |
| Storage | /upload | POST | JWT + @Public |

## Estado de Validación

| Endpoint | Validado en | Resultado |
|----------|-------------|-----------|
| POST /auth/login | R7.0V | ✅ PASS |
| GET /users | R2V | ✅ PASS |
| GET /products | R7.0V | ✅ PASS |
| GET /categories | R7.0V | ✅ PASS |
| GET /orders | R7.0V | ✅ PASS |
| GET /analytics/kpis | R4V | ✅ PASS |
| GET /audit/logs | R4V | ✅ PASS |
| GET /settings/company | R7.0V | ✅ PASS |
| GET /crm/clients | R3V | ✅ PASS |
| GET /campaigns | R3V | ✅ PASS |
| GET /stock | R3V | ✅ PASS |
| GET /shipments | R3V | ✅ PASS |
| GET /transactions | R6E | ✅ PASS |

## Conclusión

HTTP: ✅ Todos los endpoints validados en fases previas
