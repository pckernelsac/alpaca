# AUDITORÍA DE CATÁLOGO Y PRODUCTOS — TIENDA

## Evaluación de Integración del Catálogo

### 1. Búsqueda y Navegación Dinámica
- **Detalle de Producto (`/product/:id`)**:
  - **Componente**: `ProductDetail.jsx`
  - **Hook**: `useProductDetail(id)`
  - **Llamada API**: `GET /api/v1/products/:id`
  - **Estado**: **API REAL**. Muestra imágenes, variantes, precios por variante, stock, SKU y tabla de especificaciones.
- **Categorías (`/category/:slug`)**:
  - **Componente**: `Category.jsx`
  - **Hook**: `useCatalog({ category: slug })`
  - **Llamada API**: `GET /api/v1/products?category=:slug`
  - **Estado**: **API REAL**.
- **Colecciones (`/collection`)**:
  - **Componente**: `Collection.jsx`
  - **Hook**: `useCatalog()`
  - **Llamada API**: `GET /api/v1/collections`
  - **Estado**: **API REAL**.
- **Búsqueda (`/search/:query`)**:
  - **Componente**: `SearchResults.jsx`
  - **Hook**: `useCatalog({ q: query })`
  - **Llamada API**: `GET /api/v1/products?q=:query`
  - **Estado**: **API REAL**.

---

## 2. Hallazgos Mocks / Hardcoded en Secciones del Home

A pesar de que las páginas de detalle, categorías y búsqueda consumen la API real, **varias secciones visuales de la Home (`/`) utilizan arreglos locales estáticos con imágenes fijas**:
- `src/pages/Home/sections/NewArrivals/NewArrivals.jsx`: Define `const products = [...]` con 4 productos y URLs estáticas de Google UserContent.
- `src/pages/Home/sections/BestSellers/BestSellers.jsx`: Define `const products = [...]` con 4 productos fijos.
- `src/pages/Shop/Shop.jsx`: Es un componente placeholder estático sin llamada API.
