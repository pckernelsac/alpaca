# R7.2A — Shared Domain

> **Clases de error, validación y utilidades de dominio**

---

## Package: `@alpacart/shared-domain`

**Ubicación:** `packages/shared-domain/src/`

### Error Classes

| Clase | Constructor | Uso |
|-------|------------|-----|
| `ApiError` | `(status, message, details)` | Errores HTTP con código |
| `ValidationError` | `(errors[])` | Errores de validación |
| `NetworkError` | `(message)` | Error de conexión |
| `BusinessError` | `(message, code)` | Error de regla de negocio |
| `NotFoundError` | `(resource)` | Recurso no encontrado |
| `UnauthorizedError` | `(message)` | No autorizado |

### Pagination

```js
mapPaginatedResponse(raw)
// { data: [...], meta: { page, perPage, total, totalPages } }
// → retorna con defaults si raw es null/undefined
```

### Validation

```js
import { required, isEmail, isUUID, minLength } from '@alpacart/shared-domain';

required(value, 'email');       // throws if null/undefined/empty
isEmail('user@example.com');    // → true
isUUID('550e8400-...');         // → true
minLength('abc', 3);            // → true
```
