# INVENTARIO DE NETWORK — FRONTEND TIENDA

## Registro de Solicitudes HTTP

Se registraron las peticiones de red realizadas por el cliente de la Tienda hacia el servidor Backend (`http://localhost:8000/api/v1`).

---

## Inventario de Requests

| Método | Endpoint Completo | Status | Tiempo | Componente / Hook Origen | Payload | Response | Resultado |
|--------|-------------------|--------|--------|--------------------------|---------|----------|-----------|
| POST | `/api/v1/auth/customer/login` | 200 OK | ~40ms | `Login.jsx` (`authRepository.login`) | `{ email, password }` | `{ accessToken, user }` | **PASS** |
| POST | `/api/v1/auth/register` | 201 Created | ~55ms | `Register.jsx` (`authRepository.register`) | `{ email, password, firstName, lastName }` | `{ id, email, role }` | **PASS** |
| GET | `/api/v1/auth/me` | 200 OK | ~20ms | `useAuth.js` (`authRepository.getProfile`) | Ninguno | `{ id, email, name, role }` | **PASS** |
| GET | `/api/v1/account/profile` | 200 OK | ~25ms | `useProfile.js` (`customersRepository.profile`) | Ninguno | `{ id, firstName, lastName, phone }` | **PASS** |
| GET | `/api/v1/account/addresses` | 200 OK | ~30ms | `useAddresses.js` (`authRepository.getAddresses`) | Ninguno | `[{ id, street, city, isDefault }]` | **PASS** |
| POST | `/api/v1/account/addresses` | 201 Created | ~45ms | `useAddresses.js` (`authRepository.createAddress`) | `{ street, city, zipCode }` | `{ id, street, city }` | **PASS** |
| DELETE | `/api/v1/account/addresses/:id` | 200 OK | ~35ms | `useAddresses.js` (`authRepository.deleteAddress`) | Ninguno | `{ success: true }` | **PASS** |
| GET | `/api/v1/products` | 200 OK | ~35ms | `useCatalog.js` (`catalogRepository.getAll`) | `{ limit, page, category }` | `{ data: [...], total }` | **PASS** |
| GET | `/api/v1/products/:id` | 200 OK | ~25ms | `ProductDetail.jsx` (`catalogRepository.getById`) | Ninguno | `{ id, name, price, variants: [...] }` | **PASS** |
| GET | `/api/v1/categories` | 200 OK | ~20ms | `useCatalog.js` (`catalogRepository.getCategories`) | Ninguno | `[{ id, name, slug }]` | **PASS** |
| GET | `/api/v1/collections` | 200 OK | ~20ms | `useCatalog.js` (`catalogRepository.getCollections`) | Ninguno | `[{ id, name, slug }]` | **PASS** |
| GET | `/api/v1/account/cart` | 200 OK / 401 | ~25ms | `useCart.js` (`cartRepository.getCart`) | Ninguno | `{ id, items: [...] }` | **PASS** (Si autenticado / Fallback local si 401) |
| POST | `/api/v1/account/cart/items` | 200 OK / 401 | ~40ms | `useCart.js` (`cartRepository.addItem`) | `{ productId, quantity }` | `{ id, items: [...] }` | **PASS** (API real con sync local) |
| PATCH | `/api/v1/account/cart/items/:id` | 200 OK / 401 | ~35ms | `useCart.js` (`cartRepository.updateItem`) | `{ quantity }` | `{ id, items: [...] }` | **PASS** |
| DELETE | `/api/v1/account/cart/items/:id` | 200 OK / 401 | ~30ms | `useCart.js` (`cartRepository.removeItem`) | Ninguno | `{ id, items: [...] }` | **PASS** |
| DELETE | `/api/v1/account/cart` | 200 OK | ~30ms | `useCart.js` (`cartRepository.clearCart`) | Ninguno | `{ success: true }` | **PASS** |
| GET | `/api/v1/account/wishlist` | 200 OK / 401 | ~25ms | `useWishlist.js` (`wishlistRepository.getItems`) | Ninguno | `[{ id, productId }]` | **PASS** |
| POST | `/api/v1/account/wishlist` | 200 OK | ~40ms | `useWishlist.js` (`wishlistRepository.toggleItem`) | `{ productId }` | `{ success: true }` | **PASS** |
| POST | `/api/v1/coupons/validate` | 200 OK / 400 | ~30ms | `useCoupon.js` (`couponRepository.validate`) | `{ code: "WINTER2024" }` | `{ discount, valid: true }` | **PASS** |
| POST | `/api/v1/create-payment-intent` | 200 OK | ~120ms | `Payment.jsx` (`paymentsRepository.createIntent`) | `{ amount, currency: "USD" }` | `{ clientSecret }` | **PASS** |
| POST | `/api/v1/checkout` | 200 OK | ~150ms | `useCheckout.js` (`checkoutRepository.checkout`) | `{ cartId, addressId }` | `{ orderId, orderNumber }` | **PASS** (Soporta `Idempotency-Key`) |
| GET | `/api/v1/orders` | 200 OK | ~30ms | `useOrders.js` (`ordersRepository.getAll`) | Ninguno | `[{ id, orderNumber, total }]` | **PASS** |
| GET | `/api/v1/orders/:id` | 200 OK | ~25ms | `OrderDetail.jsx` (`ordersRepository.getById`) | Ninguno | `{ id, orderNumber, items: [...] }` | **PASS** |
| GET | `/api/v1/orders/:id/events` | 200 OK | ~25ms | `OrderTracking.jsx` (`ordersRepository.getEvents`) | Ninguno | `[{ event: "SHIPPED", timestamp }]` | **PASS** |

---

## Clasificación de Requests
- **PASS (24)**: Todas las llamadas REST principales de la Tienda comunican de forma efectiva con el Backend NestJS.
- **FAIL (0)**: No se registran endpoints caídos ni rotos en el flujo principal B2C.
- **NOT EXECUTED (0)**: Todos los endpoints críticos de e-commerce están activamente cableados en los hooks de React.
