# Dashboard — Auth Migration

> **Login, Logout, Protected Routes**

---

## Cambios Realizados

| Archivo | Antes | Después |
|---------|-------|---------|
| `Login.jsx` | `setTimeout` + error simulado | `serviceProvider.auth.login()` real |
| `AuthContext.jsx` | login(token, user) compatible | Sin cambios (compatible) |

## Flujo Nuevo

```
Login.jsx → handleSubmit
  → serviceProvider.auth.login(email, password)
    → AuthRepository.login(email, password)
      → POST /auth/login (staff login)
        → { accessToken, user }
  → AuthContext.login(accessToken, user)
  → navigate('/')
```

## Resultado

- ✅ Login real con backend
- ✅ JWT almacenado en localStorage
- ✅ Redirect a dashboard tras login exitoso
- ✅ Manejo de errores (credenciales inválidas, network error)
- ✅ ProtectedRoute redirect a /login si no hay token
