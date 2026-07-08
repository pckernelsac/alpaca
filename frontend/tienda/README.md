# ALPACART — Tienda

Frontend de comercio electrónico para la marca premium de alpaca peruana.

## Rutas principales

| Ruta | Página |
|---|---|
| `/` | Home |
| `/collection` | Colecciones |
| `/category/:slug` | Categoría (ponchos, chompas, bufandas, accesorios, etc.) |
| `/product/:id` | Detalle de producto |
| `/cart` | Carrito |
| `/checkout` | Checkout |
| `/order/payment` | Pago |
| `/order/confirmed` | Pedido confirmado |
| `/order/tracking/:id` | Seguimiento |
| `/order/history` | Historial de pedidos |
| `/search` | Buscador |
| `/search/:query` | Resultados de búsqueda |
| `/wishlist` | Lista de deseos |
| `/account` | Mi cuenta |
| `/addresses` | Direcciones |
| `/settings` | Configuración de perfil |
| `/login` | Iniciar sesión |
| `/register` | Registro |

## Scripts

```bash
npm run dev      # http://localhost:3102
npm run build
npm run preview
```

## Stack
- React 19 + Vite 6
- CSS Modules
- Tema claro/oscuro con `data-theme`
- Sin TypeScript
