# Dashboard — Catalog Migration

> **Productos, Variantes, Categorías, Colecciones**

---

## Cambios

| Store | Mock Repo | API Repo |
|-------|-----------|----------|
| `useCatalogStore` | `repositories/catalog.js` | `repositories/api.catalogRepository` |
| — | `repositories/base.js` | Eliminado |

## Endpoints

| Acción | Endpoint | Store Method |
|--------|----------|-------------|
| Listar productos | GET /products | `fetchAll()` |
| Crear producto | POST /products | `createProduct(d)` |
| Actualizar producto | PUT /products/:id | `updateProduct(id, d)` |
| Eliminar producto | DELETE /products/:id | `deleteProduct(id)` |

## Resultado

- ✅ Store consume API real
- ✅ catalog.js mock eliminado
