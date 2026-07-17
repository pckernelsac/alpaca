# Frontend Freeze Tienda — Refactor de Mocks

## Mocks Centralizados

Creado `src/mocks/index.js` con todos los datos mock del frontend:

- `products` — 8 productos con id, title, subtitle, price, image, badge, category, description, colors, sizes
- `categoryNames` — mapping de slugs a nombres/descripciones
- `categoryProducts(slug)` — helper para filtrar productos por categoría
- `orders` — 3 órdenes hardcodeadas
- `sampleUser` — perfil de usuario mock
- `sampleAddresses` — 2 direcciones mock
- `trackingSteps` — 4 pasos de tracking

## Archivos que ahora importan desde mocks (en lugar de arrays inline):

| Archivo | Antes | Después |
|---------|-------|---------|
| ProductDetail.jsx | sampleProduct inline | `products.find(p => p.id === Number(id))` |
| CategoryGrid.jsx | 6 products inline | `products.filter(p => p.category === slug)` |
| SearchResults.jsx | 3 products inline | `allProducts.filter(p => ...)` |
