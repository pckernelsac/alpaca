# Problemas Identificados — ALPACART Tienda

## P0 — Bloqueantes
- **(ninguno)** — No hay bloqueantes reales. La falta de conexión a backend es esperada en un frontend freeze.

## P1 — Críticos (6)

| # | Problema | Archivo | Descripción |
|---|----------|---------|-------------|
| 1 | **Cart/Checkout data disconnect** | `Checkout.jsx:8-12` vs `Cart.jsx` | Checkout usa `sampleItems` hardcodeados en lugar de leer del `cartStore`. El usuario pierde su selección del carrito al llegar a checkout. |
| 2 | **ProductDetail ignora route params** | `ProductDetail.jsx:7-34` | Siempre muestra el mismo producto (`sampleProduct: "Abrigo Heritage"`) sin importar el `:id` del URL. |
| 3 | **Register es placeholder** | `Register.jsx` | Solo muestra `<h1>Registro</h1>` — no hay formulario, no hay lógica de registro. |
| 4 | **9 orphan pages sin registrar** | `routes.jsx` | `About`, `Artisans`, `Care`, `Contact`, `Politicas`, `Profile`, `Shipping`, `Shop`, `Sustainability` existen como directorios con componentes pero no tienen ruta registrada. Footer links a `/about`, `/sustainability`, `/contact`, `/shipping`, `/care`, `/politicas` llevan a páginas no encontradas. |
| 5 | **GuestRoute no usado** | `Login.jsx`, `Register.jsx` | `GuestRoute` existe en `src/guards/GuestRoute.jsx` pero nunca se aplica. Usuarios autenticados pueden acceder a `/login` y `/register`. |
| 6 | **useFetch hook sin uso** | `src/hooks/useFetch.js` | Hook completo de fetching con Axios, pero **ninguna página lo usa**. |

## P2 — Moderados (7)

| # | Problema | Archivo | Descripción |
|---|----------|---------|-------------|
| 1 | **setupInterceptors nunca llamado** | `services/api/interceptors.js` | `setupInterceptors()` se exporta pero nunca se invoca. No hay interceptors de auth token ni manejo de 401. |
| 2 | **Breadcrumb infrautilizado** | 4 páginas lo usan | De 20 páginas con layout, solo 4 usan Breadcrumb. |
| 3 | **Pagination componente sin uso** | `components/ecommerce/Pagination/` | Componente de paginación completo pero no usado en ninguna página. |
| 4 | **Skeleton componente sin uso** | `components/ui/Skeleton/` | Componente de skeleton loading no usado en ninguna página. |
| 5 | **Category filters hardcodeados** | `Category/sections/CategoryGrid.jsx:27` | Los filtros de categoría están hardcodeados inline en lugar de usar el componente `Filters`. |
| 6 | **SearchResults ignora query param** | `SearchResults.jsx` | El array `products` es fijo (3 items) sin importar el query. El `decodedQuery` solo se usa para mostrar el título. |
| 7 | **Account muestra órdenes hardcodeadas** | `Account.jsx:5-8` | `sampleOrders` es fijo, no hay conexión con API ni con orden real del usuario. |

## P3 — Menores (5)

| # | Problema | Archivo | Descripción |
|---|----------|---------|-------------|
| 1 | **Toda la API infrastructure existe pero no se usa** | `services/api/`, `hooks/useFetch.js` | Axios configurado, interceptors definidos, hook useFetch listo — pero 0 llamadas a backend en toda la app. |
| 2 | **Checkout/Payment comparten sampleItems duplicados** | `Checkout.jsx:8-12`, `Payment.jsx:6-10` | El mismo array mock copiado en ambos archivos. Sin compartir estado entre pasos del checkout. |
| 3 | **Thanks no recibe datos reales** | `Thanks.jsx:4-7` | Los items de agradecimiento son hardcodeados, no vienen del checkout ni de la orden real. |
| 4 | **OrderConfirmed muestra ref hardcodeada** | `OrderConfirmed.jsx:9` | `#APC-98234102` es un string fijo. |
| 5 | **OrderTracking ignora route param :id** | `OrderTracking.jsx` | No usa `useParams` — siempre muestra el mismo pedido. |
