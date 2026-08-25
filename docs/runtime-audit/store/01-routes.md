# AUDITORÍA DE RUTAS — FRONTEND TIENDA

## Resumen Ejecutivo de Rutas
Se auditaron las **28 rutas** registradas en `src/routes/routes.jsx` de la Tienda B2C (`frontend/tienda`).

---

## Inventario Completo de Rutas

| # | Ruta | Componente Página | Layout | Protegida | Integración API / Estado Real |
|---|------|-------------------|--------|-----------|-------------------------------|
| 1 | `/` | `Home` | MainLayout | No | HÍBRIDO (Banners estáticos + Secciones con arrays inline) |
| 2 | `/cart` | `Cart` | MainLayout | No | API REAL + MIXTO (Invocaciones a `cartRepository` con fallback en `localStorage`) |
| 3 | `/checkout` | `Checkout` | MainLayout | No | API REAL (Invoca `checkoutRepository`, `couponRepository`, `paymentsRepository`) |
| 4 | `/product/:id` | `ProductDetail` | MainLayout | No | API REAL (Invoca `catalogRepository.getById(id)`) |
| 5 | `/collection` | `Collection` | MainLayout | No | API REAL (Invoca `catalogRepository.getCollections()`) |
| 6 | `/category/:slug` | `Category` | MainLayout | No | API REAL (Invoca `catalogRepository.getAll({ category: slug })`) |
| 7 | `/account` | `Account` | MainLayout | Sí | API REAL (Invoca `authRepository.getProfile()`) |
| 8 | `/addresses` | `Addresses` | MainLayout | Sí | API REAL (Invoca `authRepository.getAddresses()`, `createAddress()`, `deleteAddress()`) |
| 9 | `/wishlist` | `Wishlist` | MainLayout | Sí | API REAL (Invoca `wishlistRepository.getItems()`, `toggleItem()`) |
| 10 | `/search/:query` | `SearchResults` | MainLayout | No | API REAL (Invoca `catalogRepository.getAll({ q: query })`) |
| 11 | `/order/thanks` | `Thanks` | MainLayout | No | STATIC INTENTIONAL (Pantalla de agradecimiento) |
| 12 | `/order/payment` | `Payment` | MainLayout | No | API REAL (Integración con Stripe Intent) |
| 13 | `/order/tracking/:id` | `OrderTracking` | MainLayout | No | API REAL (Invoca `ordersRepository.getEvents(id)`) |
| 14 | `/order/confirmed` | `OrderConfirmed` | MainLayout | No | STATIC INTENTIONAL (Confirmación de compra) |
| 15 | `/order/history` | `OrderHistory` | MainLayout | Sí | API REAL (Invoca `ordersRepository.getAll()`) |
| 16 | `/settings` | `ProfileSettings` | MainLayout | Sí | API REAL (Invoca `authRepository.getProfile()`) |
| 17 | `/login` | `Login` | No Layout | No | API REAL (Invoca `authRepository.login` ➔ `POST /api/v1/auth/customer/login`) |
| 18 | `/register` | `Register` | No Layout | No | API REAL (Invoca `authRepository.register` ➔ `POST /api/v1/auth/register`) |
| 19 | `/about` | `About` | MainLayout | No | STATIC INTENTIONAL (Historia corporativa B2C) |
| 20 | `/contact` | `Contact` | MainLayout | No | STATIC INTENTIONAL (Información de contacto cliente) |
| 21 | `/shipping` | `Shipping` | MainLayout | No | STATIC INTENTIONAL (Políticas de envío y entregas) |
| 22 | `/care` | `Care` | MainLayout | No | STATIC INTENTIONAL (Guía de cuidado de prendas de alpaca) |
| 23 | `/politicas` | `Politicas` | MainLayout | No | STATIC INTENTIONAL (Términos legales B2C) |
| 24 | `/shop` | `Shop` | MainLayout | No | HARDCODED / PLACEHOLDER (Texto estático de prueba) |
| 25 | `/sustainability` | `Sustainability` | MainLayout | No | STATIC INTENTIONAL (Iniciativas de sostenibilidad) |
| 26 | `/artisans` | `Artisans` | MainLayout | No | STATIC INTENTIONAL (Comunidades tejedoras andinas) |
| 27 | `/search` | `Search` | No Layout | No | UI STATIC (Modal de búsqueda rápido) |
| 28 | `*` | `NotFound` | MainLayout | No | UI STATIC (Página 404) |

---

## Hallazgos Principales
1. **Integración API Funcional**: A diferencia del Dashboard, la Tienda presenta **integración API real funcional** en los flujos principales: Login Customer, Registro, Perfil, Direcciones, Detalle de Producto, Carrito API, Lista de Deseos, Historial de Pedidos y Tracking de Pedidos.
2. **Fallbacks Híbridos**: El Carrito (`useCart.js`) opera de manera híbrida entre API Backend y `localStorage` (`tienda_cart`), sincronizando ítems pendientes al autenticarse.
