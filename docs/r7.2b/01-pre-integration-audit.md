# R7.2B — Pre-Integration Audit

> **Auditoría completa del frontend Tienda antes de la integración**

---

## Estado Inicial

| Aspecto | Estado |
|---------|--------|
| Páginas | 27 rutas |
| Stores | cartStore (localStorage), wishlistStore (localStorage) |
| Mocks | `mocks/index.js` con 8 productos, 3 órdenes, addresses, tracking |
| API layer | `services/api/axios.js` con interceptores |
| Auth | AuthContext con login simulado (token fake) |
| Hooks | useAuth, useFetch, useLocalStorage, useMediaQuery, useClickOutside |
| Arquitectura | Sin repositories, services, mappers, domain models |

## Matriz Pantalla → Endpoint

| Pantalla | Ruta | Hook Requerido | Endpoint | DTO Backend |
|----------|------|---------------|----------|-------------|
| Home | / | — | — | Estático |
| Shop | /shop | `useCatalog` | GET /products | — |
| Category | /category/:slug | `useCatalog` | GET /products?categoryId= | — |
| ProductDetail | /product/:id | `useProductDetail` | GET /products/:id | — |
| Cart | /cart | `useCart` | GET /cart, POST/PATCH/DELETE /cart/items | AddCartItemDto |
| Checkout | /checkout | `useCheckout` | POST /checkout | CheckoutDto |
| Login | /login | AuthService | POST /auth/customer-login | LoginDto |
| Register | /register | AuthService | POST /auth/register | RegisterDto |
| Wishlist | /wishlist | `useWishlist` | GET /wishlist, POST /wishlist/items | — |
| OrderHistory | /order/history | `useOrders` | GET /orders | — |
| OrderTracking | /order/tracking/:id | `useOrders` | GET /orders/:id/events | — |
| Account | /account | AuthService | GET /auth/me | — |
| Addresses | /addresses | — | GET /account/addresses | — |
| Search | /search/:query | `useCatalog` | GET /products?search= | — |
| Collection | /collection | — | GET /collections | — |

## Clasificación

| Estado | Cantidad | Pantallas |
|--------|----------|-----------|
| READY | 8 | Login, Register, Shop, Category, ProductDetail, Search, Collection, OrderHistory |
| PARTIAL | 4 | Cart, Checkout, Wishlist, OrderTracking |
| NOT READY | 2 | Account, Addresses |
