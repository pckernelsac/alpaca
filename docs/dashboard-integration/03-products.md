# Dashboard Integration — Products

> **Módulo Catálogo: Productos, Variantes, Categorías, Colecciones**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /products | `catalogRepository.getProducts(q)` | `CatalogService.getProducts(q)` | `useProducts(q)` |
| GET | /products/:id | `catalogRepository.getProduct(id)` | `CatalogService.getProduct(id)` | — |
| POST | /products | `catalogRepository.createProduct(d)` | `CatalogService.createProduct(d)` | — |
| PUT | /products/:id | `catalogRepository.updateProduct(id,d)` | `CatalogService.updateProduct(id,d)` | — |
| GET | /categories | `catalogRepository.getCategories()` | `CatalogService.getCategories()` | — |
| GET | /collections | `catalogRepository.getCollections()` | `CatalogService.getCollections()` | — |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| CatalogDashboard | inline KPIs | `useProducts()` | ❌ |
| ProductList | inline products | `useProducts()` | ❌ |
| ProductCreate | inline form | — | ❌ |
| VariantList | inline variants | — | ❌ |
