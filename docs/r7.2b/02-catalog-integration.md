# R7.2B — Catalog Integration

> **Productos, categorías, búsqueda, filtros y paginación**

---

## Endpoints

| Método | Endpoint | Propósito | DTO |
|--------|----------|-----------|-----|
| GET | /products | Listar productos | query: search, categoryId, collectionId, sort, order, page, perPage |
| GET | /products/:id | Detalle de producto | — |
| GET | /categories | Listar categorías | — |
| GET | /collections | Listar colecciones | — |

## Hooks

| Hook | Service | Repository | Endpoint |
|------|---------|------------|----------|
| `useCatalog(params)` | `catalogService.getAll(params)` | `catalogRepository.getAll(params)` | GET /products |
| `useProductDetail(id)` | `catalogService.getById(id)` | `catalogRepository.getById(id)` | GET /products/:id |

## Flujo

```
Component → useCatalog({ search, categoryId, page })
  → CatalogService.getAll(params)
    → CatalogRepository.getAll(params)
      → api.get('/products', { params })
```

## Pagination

Backend PaginationInterceptor transforma `findAndCountAll` a:
```json
{
  "success": true,
  "data": [...],
  "meta": { "page": 1, "perPage": 25, "total": 100, "totalPages": 4 }
}
```

## Estado

| Componente | Migrado | Hook |
|-----------|---------|------|
| Login | ✅ Sí | `useCatalog` |
| Register | ❌ No (usa mock inline) | — |
