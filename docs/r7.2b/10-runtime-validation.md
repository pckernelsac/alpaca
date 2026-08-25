# R7.2B — Runtime Validation

> **Verificación de la integración**

---

## Build

| Frontend | Módulos | Resultado |
|----------|---------|-----------|
| Tienda | 266 | ✅ PASS |
| Institucional | 270 | ✅ PASS |
| Dashboard | 157 | ✅ PASS |

## Validación Arquitectónica

| Regla | Estado |
|-------|--------|
| No hay fetch() en JSX | ✅ |
| No hay axios en JSX | ✅ |
| No hay URLs API en JSX | ✅ |
| No hay URLs API en Hooks | ✅ |
| Endpoints centralizados en `api/endpoints/` | ✅ |
| Hooks llaman Services | ✅ |
| Services llaman Repositories | ✅ |
| Repositories llaman ApiClient | ✅ |
| DTO pasa por Mapper | ⚠️ Pendiente (faltan mappers en tienda) |
| React consume Domain Model | ⚠️ Pendiente (faltan domain models en tienda) |

## Pruebas HTTP (Login)

| Test | Resultado |
|------|-----------|
| POST /auth/customer-login con credenciales válidas | ✅ (backend validado en R7.0V) |
| POST /auth/customer-login con credenciales inválidas | ✅ (backend retorna 401) |
| GET /products | ✅ (backend validado en R7.0V) |
| GET /categories | ✅ (backend validado en R7.0V) |

## Pendiente para R7.2BV

- Migrar Cart.jsx de `cartStore` a `useCart()`
- Migrar Checkout.jsx de `cartStore` a `useCheckout()`
- Migrar Wishlist.jsx de `wishlistStore` a `useWishlist()`
- Migrar OrderHistory.jsx de datos inline a `useOrders()`
- Migrar ProductDetail.jsx de `mocks` a `useProductDetail()`
- Agregar mappers y domain models para tienda
- Eliminar `cartStore.js`, `wishlistStore.js`, `mocks/index.js`
