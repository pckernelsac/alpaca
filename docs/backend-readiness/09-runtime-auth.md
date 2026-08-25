# R7.0V — 09 — Runtime Auth Validation

> **Fecha:** 2026-07-16 | **Entorno:** PostgreSQL 16.14 + Redis 7 | **Puerto:** 8992

---

## 1. Staff Login

| Acción | Resultado |
|--------|-----------|
| POST /api/v1/auth/login (email: mateo.q@alpacart.com, password: Admin123!) | ✅ 200 OK |
| JWT accessToken devuelto | ✅ Token de 148 chars |
| Token decodificado: type=staff, sub=UUID, role=admin | ✅ type correcto |
| POST /api/v1/auth/login (credenciales inválidas) | ✅ 401 Unauthorized |

## 2. Customer Login

| Acción | Resultado |
|--------|-----------|
| POST /api/v1/auth/customer-login (email: camila.g@email.com, password: Cliente2024!) | ✅ 200 OK |
| JWT accessToken devuelto | ✅ Token válido |
| Token decodificado: type=customer, sub=UUID | ✅ type correcto |
| POST /api/v1/auth/customer-login (credenciales inválidas) | ✅ 401 Unauthorized |

## 3. GET /auth/me

| Token | Resultado |
|-------|-----------|
| Staff JWT | ✅ 200 — datos de usuario con role |
| Customer JWT | ✅ 200 — datos de cliente sin role |
| Sin token | ✅ 401 Unauthorized |
| Token inválido | ✅ 401 Unauthorized |

## 4. JWT Dual Type

| Propiedad | Staff | Customer |
|-----------|-------|----------|
| type | `staff` | `customer` |
| sub | user.id | customer.id |
| role | admin/manager/staff | N/A |
| iat/exp | ✅ | ✅ |

## 5. Conclusión

| Criterio | Estado |
|----------|--------|
| Staff login funcional | ✅ PASS |
| Customer login funcional | ✅ PASS |
| Auth guard bloquea sin token | ✅ PASS |
| Dual JWT type diferenciado | ✅ PASS |
| GET /me con ambos tipos | ✅ PASS |
