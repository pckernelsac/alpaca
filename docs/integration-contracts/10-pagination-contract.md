# ICC-01 — Integration Contract Certification
# Pagination Contract — ALPACART

> **Certificación del contrato único de paginación**

---

## 1. Contrato Definido (Backend)

### PaginationInterceptor

**Query params de entrada:**
```typescript
// Tomados de query string por PaginationInterceptor
{
  page: number;      // default: 1, min: 1
  perPage: number;   // default: 25, min: 1, max: 200
  sort: string;      // default: 'createdAt'
  order: 'ASC' | 'DESC'; // default: 'DESC'
}
```

**Response (output):**
```typescript
{
  data: T[];         // Los resultados de esta página
  meta: {
    page: number;     // Página actual
    perPage: number;  // Items por página
    total: number;    // Total de registros
    totalPages: number; // Total de páginas
  }
}
```

**Envuelto por TransformInterceptor:**
```typescript
{
  success: true,
  data: T[],
  meta: {
    page: number,
    perPage: number,
    total: number,
    totalPages: number
  }
}
```

---

## 2. Endpoints que Usan PaginationInterceptor

| Endpoint | Paginación | `request.pagination` disponible |
|----------|-----------|-------------------------------|
| GET /products | ✅ Sí | ✅ page, perPage, sort, order |
| GET /users | ✅ Sí | ✅ |
| GET /orders | ✅ Sí | ✅ |
| GET /crm/clients | ✅ Sí | ✅ |
| GET /stock | ✅ Sí | ✅ |
| GET /movements | ✅ Sí | ✅ |
| GET /transfers | ✅ Sí | ✅ |
| GET /shipments | ✅ Sí | ✅ |
| GET /campaigns | ✅ Sí | ✅ |
| GET /coupons | ✅ Sí | ✅ |
| GET /promotions | ✅ Sí | ✅ |
| GET /contents | ✅ Sí | ✅ |
| GET /audit/logs | ✅ Sí | ✅ |
| GET /transactions | ⚠️ Sin paginación explícita | ❌ |

---

## 3. Shared Type de Paginación

```typescript
// shared-types/src/index.ts
export interface PaginatedResponse<T> {
  data: T[];
  count: number;        // ❌ Backend usa "total", no "count"
  page: number;
  perPage: number;
  totalPages: number;
}
```

### Gap:
| Campo | Backend Response | Shared Type | Coincide |
|-------|-----------------|-------------|----------|
| data | ✅ data: T[] | data: T[] | ✅ |
| count / total | ❌ meta.total | count | ❌ **INCONSISTENTE** |
| page | ✅ meta.page | page | ✅ |
| perPage | ✅ meta.perPage | perPage | ✅ |
| totalPages | ✅ meta.totalPages | totalPages | ✅ |

**Gap:** Backend retorna `meta.total`, Shared Type espera `count`.

---

## 4. Frontend Esperado

### Tienda useFetch:
```javascript
const { data } = await api.get('/products?page=1&perPage=25');
// data = backend response (con success wrapper)
// El frontend no procesa meta actualmente
```

### Dashboard stores (futuro):
```javascript
// Cuando se conecten, las stores deberán consumir:
const response = await api.get('/products?page=1');
// response.data = array de productos
// response.meta = { page, perPage, total, totalPages }
```

---

## 5. Pagination Contract Score

| Dimensión | Score | Observación |
|-----------|-------|-------------|
| Input params consistentes | ✅ 100% | page, perPage, sort, order |
| Output shape consistente | ✅ 100% | { data, meta } structure |
| Interceptor global | ✅ 100% | Aplicado en bootstrap |
| Clamping (page negativa) | ✅ 100% | Math.max(1, ...) fix aplicado en R5V |
| Límite máximo (200) | ✅ 100% | Math.min(200, ...) |
| Shared Type match | ❌ 0% | `count` vs `total` mismatch |
| Endpoints sin paginación | ⚠️ 1/14 | GET /transactions |

**Pagination Contract Score:** **85/100**
