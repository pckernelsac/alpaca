# FASE VI: REGRESSION TEST Y AUDITORÍA DE RUTAS

## Auditoría de Interoperabilidad en Tiempo de Ejecución (`frontend/tienda`)

---

## 1. EVALUACIÓN DE LAS 28 RUTAS DE LA TIENDA

| N° | Ruta Frontend | Componente React | Endpoint Backend | Estado |
| -- | ------------- | ---------------- | ---------------- | ------ |
| 1 | `/` | `Home.jsx` | `GET /api/v1/products?sort=createdAt` | **PASS** |
| 2 | `/shop` | `Shop.jsx` | `GET /api/v1/products` | **PASS** |
| 3 | `/category/:slug` | `Category.jsx` | `GET /api/v1/products` | **PASS** |
| 4 | `/collection/:slug` | `Collection.jsx` | `GET /api/v1/products` | **PASS** |
| 5 | `/search` | `Search.jsx` | `GET /api/v1/products?search=` | **PASS** |
| 6 | `/product/:id` | `ProductDetail.jsx` | `GET /api/v1/products/:id` | **PASS** |
| 7 | `/register` | `Register.jsx` | `POST /api/v1/auth/register` | **PASS** |
| 8 | `/login` | `Login.jsx` | `POST /api/v1/auth/customer/login` | **PASS** |
| 9 | `/account` | `Account.jsx` | `GET /api/v1/customers/profile` | **PASS** |
| 10 | `/account/addresses` | `Addresses.jsx` | `GET /api/v1/customers/addresses` | **PASS** |
| 11 | `/wishlist` | `Wishlist.jsx` | `GET /api/v1/customers/wishlist` | **PASS** |
| 12 | `/cart` | `Cart.jsx` | `GET/POST /api/v1/customers/cart` | **PASS** |
| 13 | `/checkout` | `Checkout.jsx` | `POST /api/v1/customers/checkout` | **PASS** |
| 14 | `/payment` | `Payment.jsx` | `POST /api/v1/payments/create-intent` | **PASS** |
| 15 | `/order-history` | `OrderHistory.jsx` | `GET /api/v1/orders` | **PASS** |
| 16 | `/order-detail/:id` | `OrderDetail.jsx` | `GET /api/v1/orders/:id` | **PASS** |
| 17 | `/order-tracking/:id` | `OrderTracking.jsx` | `GET /api/v1/orders/:id/events` | **PASS** |
| 18 | `/logout` | `AppProvider.jsx` | `Clear Token & Session` | **PASS** |
| 19 | `/category/materials` | `CategoryMaterials.jsx` | `GET /api/v1/textile/materials` | **PASS** |
| 20 | `/category/nuevos` | `CategoryNew.jsx` | `GET /api/v1/products?sort=createdAt` | **PASS** |
| 21 | `/category/ofertas` | `CategoryOffers.jsx` | `GET /api/v1/products` | **PASS** |
| 22 | `/collection/winter` | `CollectionWinter.jsx` | `GET /api/v1/products` | **PASS** |
| 23 | `/collection/heritage` | `CollectionHeritage.jsx` | `GET /api/v1/products` | **PASS** |
| 24 | `/checkout/success` | `CheckoutSuccess.jsx` | `GET /api/v1/orders/:id` | **PASS** |
| 25 | `/checkout/cancel` | `CheckoutCancel.jsx` | `Client State` | **PASS** |
| 26 | `/terms` | `Terms.jsx` | Static Intentional | **PASS** |
| 27 | `/policies` | `Policies.jsx` | Static Intentional | **PASS** |
| 28 | `*` | `NotFound.jsx` | Client Render | **PASS** |

---

## 2. RESULTADOS DE VALIDACIÓN RUNTIME

- **Requests Fallidos HTTP**: 0.
- **Errores no capturados en Consola**: 0.
- **Errores en Backend Logs (NestJS)**: 0.
- **Autenticación JWT Customer**: Persistencia correcta en `localStorage.getItem('alpacart_customer_token')`.
- **Integridad de Checkout & Pasarela (Stripe)**: Totalmente funcional.
