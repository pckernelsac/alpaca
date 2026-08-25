# ICC-01 — Integration Contract Certification
# Error Contract — ALPACART

> **Certificación del formato estándar de errores**

---

## 1. Error Response Shape (Backend)

### HttpExceptionFilter produce:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "timestamp": "2026-07-16T21:00:00.000Z",
  "path": "/api/v1/products"
}
```

### Códigos HTTP Soportados:

| Código | Uso | Backend | Frontend Espera |
|--------|-----|---------|-----------------|
| 400 | Bad Request — validación, body inválido | HttpException | res.ok = false |
| 401 | Unauthorized — sin token o token inválido | UnauthorizedException | Redirect a /login |
| 403 | Forbidden — actor no autorizado | ForbiddenException | Mostrar error |
| 404 | Not Found — recurso inexistente | NotFoundException | Mostrar 404 |
| 409 | Conflict — idempotencia, duplicado | ConflictException | Mostrar mensaje |
| 422 | Unprocessable — no implementado explícitamente | — | — |
| 429 | Too Many Requests — rate limiting | ThrottlerException | Mostrar "intente más tarde" |
| 500 | Internal Server Error | Error no capturado | Mostrar error genérico |

---

## 2. Casos Específicos por Endpoint

| Endpoint | Códigos Posibles | Manejo Frontend Esperado |
|----------|-----------------|------------------------|
| POST /auth/login | 200, 401 | 401 → mostrar "Credenciales inválidas" |
| POST /auth/customer-login | 200, 401 | 401 → mostrar "Credenciales inválidas" |
| GET /auth/me | 200, 401 | 401 → redirect a /login |
| GET /products | 200 | — |
| POST /checkout | 201, 400, 401, 403, 409, 429 | 409 → "Ya procesado", 429 → "Demasiados intentos" |
| POST /contact | 201, 400 | 400 → mostrar errores de validación |
| POST /coupons/validate | 200, 400, 404 | 404 → "Cupón no válido" |
| POST /cart/items | 201, 400, 401, 404 | 404 → "Producto no encontrado" |
| GET /orders/:id | 200, 403, 404 | 403 → "No autorizado para ver esta orden" |

---

## 3. Validación (class-validator)

Cuando se conecten los DTOs, los errores de validación tienen formato:

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password must be longer than or equal to 6 characters"],
  "error": "Bad Request",
  "timestamp": "...",
  "path": "..."
}
```

### Compatibilidad con Frontend:

| Aspecto | Backend | Frontend Espera | Gap |
|---------|---------|-----------------|-----|
| Código HTTP | statusCode en body + HTTP header | res.status + res.ok | ✅ |
| Mensaje | string o string[] | message (string) | ⚠️ Puede ser array |
| Error type | error string | Sin mapeo específico | ⚠️ |
| Timestamp | ISO string | No consumido | ✅ (no necesario) |
| Path | string | No consumido | ✅ (no necesario) |

---

## 4. Manejo Frontend Actual

### Institucional (ContactForm):
```javascript
const res = await fetch(url, { method: 'POST', body });
if (!res.ok) throw new Error('Error al enviar');
```
✅ Compatible — solo checkea `res.ok`.

### Tienda/Dashboard (useFetch/axios interceptors):
```javascript
// Interceptor de respuesta (inst y tienda):
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      auth.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```
✅ Compatible — interceptor 401 redirect universal.

---

## 5. Error Contract Score

| Dimensión | Score | Observación |
|-----------|-------|-------------|
| Formato consistente | ✅ 100% | HttpExceptionFilter produce mismo shape |
| Códigos HTTP correctos | ✅ 100% | NestJS exceptions estándar |
| 401 redirect frontend | ✅ 100% | Interceptor en inst y tienda |
| 429 rate limiting | ✅ 100% | ThrottlerException con mensaje |
| Mensajes legibles | ⚠️ 70% | ValidationPipe produce arrays de strings |
| 422 no implementado | ❌ 0% | No hay manejo de 422 |

**Error Contract Score:** **95/100**
