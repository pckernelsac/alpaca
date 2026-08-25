# R7.2B — Customer Auth Integration

> **Login, registro, perfil y sesión JWT**

---

## Endpoints

| Método | Endpoint | Request | Response |
|--------|----------|---------|----------|
| POST | /auth/customer-login | `{ email, password }` | `{ accessToken, customer }` |
| POST | /auth/register | `{ email, firstName, lastName, password }` | Customer |
| GET | /auth/me | Bearer token | Customer |

## Servicios

| Service | Método | Endpoint |
|---------|--------|----------|
| `authService.login(email, password)` | POST /auth/customer-login |
| `authService.register(data)` | POST /auth/register |
| `authService.getProfile()` | GET /auth/me |

## Componentes Migrados

| Componente | Antes | Después |
|-----------|-------|---------|
| Login.jsx | Token simulado `simulated_token_` + Date.now() | `serviceProvider.auth.login(email, password)` → JWT real |
| AuthContext | `login(token, user)` almacena en localStorage | Sin cambios (compatible) |

## Flujo

```
Login.jsx → handleSubmit
  → serviceProvider.auth.login(email, password)
    → AuthService.login(email, password)
      → AuthRepository.login(email, password)
        → api.post('/auth/customer-login', { email, password })
          → Backend valida credenciales
            → Retorna { accessToken, customer }
  → AuthContext.login(accessToken, customer)
  → navigate('/account')
```

## Pendiente

| Funcionalidad | Estado | Impacto |
|--------------|--------|---------|
| Register | ⚠️ No migrado (Register.jsx usa mock) | P2 — Bajo impacto |
| GET /auth/me | ✅ Hook `authService.getProfile()` listo | — |
| Refresh Token | ❌ No implementado en backend | NON-BLOCKING |
| Logout endpoint | ❌ Solo frontend (localStorage) | NON-BLOCKING |
