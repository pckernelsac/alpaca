# AUDITORÍA DE ERRORES DE RUNTIME — TIENDA

## Clasificación de Problemas Detectados

Se priorizaron los hallazgos según su nivel de severidad:

---

## Problemas Priorizados

### P0 — Críticos / Bloqueantes
*Sin hallazgos P0 en la Tienda.* (Los flujos de autenticación, carrito, catálogo, checkout y órdenes operan contra el backend real).

---

### P1 — Alta Severidad
1. **Desacople de Lectura en Badge del Carrito (`StoreHeader.jsx`)**:
   - **Descripción**: `StoreHeader.jsx` calcula la cantidad total de productos leídos directamente de `localStorage.getItem('tienda_cart')` en lugar de suscribirse al estado reactivo provisto por `useCart.js`. En usuarios autenticados donde el carrito proviene exclusivamente del servidor backend NestJS, el badge del encabezado puede mostrar `0` a pesar de existir productos en el carrito.
   - **Ubicación**: `src/components/ecommerce/StoreHeader/StoreHeader.jsx`

2. **Secciones de Home (`NewArrivals`, `BestSellers`) Desconectadas de API**:
   - **Descripción**: Las secciones de nuevos lanzamientos y más vendidos en la página principal utilizan arreglos hardcodeados (`const products = [...]`) en lugar de invocar `useCatalog({ limit: 4 })`.
   - **Ubicación**: `src/pages/Home/sections/NewArrivals/NewArrivals.jsx` y `src/pages/Home/sections/BestSellers/BestSellers.jsx`

3. **Vista `/shop` Incompleta / Placeholder**:
   - **Descripción**: La ruta `/shop` renderiza un componente estático simple sin catálogo de productos ni paginación.
   - **Ubicación**: `src/pages/Shop/Shop.jsx`

---

### P2 — Media Severidad
1. **Dependencia External CDN para Iconos**:
   - **Descripción**: Dependencia de Google Fonts CDN para Material Symbols.
   - **Ubicación**: `index.html` y hojas de estilos CSS.
