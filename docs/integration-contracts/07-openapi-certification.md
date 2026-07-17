# ICC-01 — Integration Contract Certification
# OpenAPI Certification — ALPACART

> **Validación:** Swagger documenta el comportamiento real de la API

---

## 1. Swagger UI

| Aspecto | Resultado |
|---------|-----------|
| URL | http://localhost:8992/api/v1/docs |
| Accesible | ✅ Sí |
| Temas (tags) | ✅ 16 grupos: Auth, Iam, Catalog, Textile, Crm, Customers, Orders, Payments, Inventory, Logistics, Marketing, Cms, Audit, Settings, Analytics, Upload |

---

## 2. Endpoints Documentados vs Reales

| Módulo | Endpoints Reales | Documentados en Swagger | Cobertura |
|--------|-----------------|------------------------|-----------|
| Health | 1 | ✅ | 100% |
| Auth | 4 | ✅ | 100% |
| IAM | 12 | ✅ | 100% |
| Catalog | 11 | ✅ | 100% |
| Textile | 4 | ✅ | 100% |
| CRM | 5 | ✅ | 100% |
| Customers | 14 | ✅ | 100% |
| Orders | 6 | ✅ | 100% |
| Payments | 5 | ✅ | 100% |
| Inventory | 4 | ✅ | 100% |
| Logistics | 4 | ✅ | 100% |
| Marketing | 17 | ✅ | 100% |
| CMS | 30 | ✅ | 100% |
| Audit | 1 | ✅ | 100% |
| Settings | 3 | ✅ | 100% |
| Analytics | 1 | ✅ | 100% |
| Storage | 3 | ✅ | 100% |
| **Total** | **~125** | **~125** | **100%** |

---

## 3. Request Schemas en Swagger

| Endpoint | DTO Real | Schema en Swagger | Coincide |
|----------|----------|-------------------|----------|
| POST /auth/login | LoginDto | ✅ Documentado | ✅ |
| POST /auth/customer-login | LoginDto | ✅ Documentado | ✅ |
| POST /auth/register | body:any | ✅ (inferido) | ⚠️ Sin validación real |
| POST /cart/items | body:any | ✅ (inferido) | ⚠️ Sin validación real |
| POST /checkout | body:any | ✅ (inferido) | ⚠️ Sin validación real |
| POST /contact | body:any | ✅ (inferido) | ⚠️ Sin validación real |
| Todos los demás POST/PUT | body:any | ✅ (inferido) | ⚠️ Sin validación real |

---

## 4. Response Schemas en Swagger

| Aspecto | Estado |
|---------|--------|
| TransformInterceptor ({ success, data }) | ✅ Documentado implícitamente |
| PaginationInterceptor ({ data, meta }) | ✅ Documentado implícitamente |
| HttpExceptionFilter (errores) | ✅ Documentado |
| Auth requirements (Bearer) | ✅ @ApiBearerAuth() en endpoints protegidos |
| @Public endpoints | ✅ Sin lock icon en Swagger |

---

## 5. Auth Requirements Visibles

| Endpoint | Requiere Auth | Swagger Lock | Correcto |
|----------|--------------|--------------|----------|
| GET /products | No (@Public) | 🔓 Sin lock | ✅ |
| POST /auth/login | No (@Public) | 🔓 Sin lock | ✅ |
| GET /users | Sí (ActorGuard) | 🔒 Con lock | ✅ |
| GET /orders | Sí (ActorGuard) | 🔒 Con lock | ✅ |
| POST /checkout | Sí (@CustomerOnly) | 🔒 Con lock | ✅ |
| POST /stripe/webhook | No (@Public) | 🔓 Sin lock | ✅ |

---

## 6. Gap: Schemas sin Decorators

Swagger infiere request bodies de los parámetros TypeScript. Cuando un endpoint usa `b: any`, Swagger muestra un schema `{ }` sin propiedades, lo que NO representa el contrato real esperado.

**Ejemplo POST /products en Swagger:**
```json
// Schema actual (improductivo):
{ "type": "object" }

// Schema esperado:
{
  "type": "object",
  "properties": {
    "sku": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    ...
  },
  "required": ["sku", "name"]
}
```

## 7. Score OpenAPI

| Dimensión | Score |
|-----------|-------|
| Endpoints documentados | 100% |
| Request schemas con tipos reales | 15% |
| Response schemas estructurados | 70% |
| Auth requirements | 100% |
| Parámetros query/path | 90% |

**OpenAPI Score:** **75/100**
