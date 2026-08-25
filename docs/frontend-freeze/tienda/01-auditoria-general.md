# Auditoría General — ALPACART Tienda (Frontend)

## Resumen

- **30 page components** en `src/pages/` (30 directorios)
- **10 páginas placeholder** (solo un `<h1>` sin funcionalidad):
  - `About`, `Artisans`, `Blog` (directorio vacío), `Care`, `Contact`, `Politicas`, `Profile`, `Shipping`, `Shop`, `Sustainability`
- **100% datos mock hardcodeados** — no se consume ninguna API real
- **0 llamadas a API activas** — `useFetch` hook existe pero nunca se usa; Axios está configurado pero `setupInterceptors` nunca se invoca
- **Cart** usa `localStorage` vía `cartStore` — totalmente client-side
- **Wishlist** usa `localStorage` vía `wishlistStore`
- **Login** simula autenticación con `setTimeout` implícito (llamada síncrona a `login()` con token simulado)
- **Register** es un placeholder absoluto (solo título)
- **Checkout** NO usa datos del carrito — usa `sampleItems` hardcodeados
- **ProductDetail** ignora `useParams` — siempre muestra el mismo producto (`sampleProduct`)
- **SearchResults** ignora `query` param para filtrar — siempre muestra los mismos 3 productos hardcodeados
- **Category** mapea slugs a nombres con un objeto `categoryNames` hardcodeado
- **OrderConfirmed**, **OrderTracking**, **Thanks**, **Payment** usan datos mock fijos (órdenes, items, seguimiento)

## Stack

- React 18 + Vite + React Router v6
- Estado: Context API + stores manuales (pub/sub sobre `localStorage`)
- CSS Modules + CSS custom properties para theming
- Axios configurado pero no activado

## Cobertura funcional estimada

| Aspecto | Estado |
|---|---|
| Páginas con UI completa | 20/30 (67%) |
| Páginas funcionales | ~12/30 (40%) |
| Backend conectado | 0% |
| Datos dinámicos | 0% |
| Autenticación real | 0% |
