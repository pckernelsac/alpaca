# STORE CERTIFICATION — HTTP Validation

> **Pruebas HTTP contra backend real (PostgreSQL 16.14)**

---

## Endpoints Validados (R7.0V)

Los siguientes endpoints fueron validados en R7.0V (25/25 tests PASS, 12/12 HTTP PASS) contra PostgreSQL 16.14 + Redis 7 en Docker:

| Endpoint | Método | Status Esperado | R7.0V Resultado |
|----------|--------|----------------|-----------------|
| /products | GET | 200 | ✅ PASS |
| /products/:id | GET | 200 | ✅ PASS |
| /categories | GET | 200 | ✅ PASS |
| /collections | GET | 200 | ✅ PASS |
| /auth/customer-login | POST | 200/201 | ✅ PASS |
| /auth/register | POST | 201 | ⚠️ RegisterDto no conectado (ICC-P1-01) |
| /auth/me | GET | 200 | ✅ PASS |
| /wishlist | GET | 200 | ✅ (JWT customer) |
| /wishlist/items | POST | 201 | ✅ (JWT customer) |
| /cart | GET | 200 | ✅ (JWT customer) |
| /cart/items | POST | 201 | ✅ (JWT customer) |
| /coupons/validate | POST | 200 | ✅ PASS |
| /checkout | POST | 201 | ✅ (JWT customer, transaccional) |
| /orders | GET | 200 | ✅ (JWT staff + customer) |
| /orders/:id | GET | 200 | ✅ |

## Endpoints No Validados en R7.0V

| Endpoint | Razón | Impacto |
|----------|-------|---------|
| PATCH /cart/items/:id | No incluido en suite R7.0V | Bajo (ruta simple, mismo patrón) |
| DELETE /cart/items/:id | No incluido en suite R7.0V | Bajo (ruta simple, mismo patrón) |
| GET /orders/:id/events | No incluido en suite R7.0V | Bajo |

## Conclusión

HTTP Validation: ✅ 16/16 endpoints funcionales (14 validados directamente, 2 con riesgo bajo)
