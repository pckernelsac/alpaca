# R7.2B — Mock Removal Status

> **Progreso de eliminación de mocks**

---

## Regla

Mock → API real validada → eliminar Mock

## Mocks Eliminados

| Archivo | Reemplazo | Estado |
|---------|-----------|--------|
| Login.jsx (token simulado) | `serviceProvider.auth.login()` → API real | ✅ |

## Mocks Pendientes

| Archivo | Uso actual | Reemplazo | Prioridad |
|---------|-----------|-----------|-----------|
| `mocks/index.js` (products) | Shop, Category, ProductDetail, SearchResults | `useCatalog()` | P1 |
| `mocks/index.js` (orders) | OrderHistory | `useOrders()` | P1 |
| `mocks/index.js` (trackingSteps) | OrderTracking | `ordersRepository.getEvents()` | P1 |
| `mocks/index.js` (sampleAddresses) | Addresses | GET /account/addresses | P2 |
| `mocks/index.js` (sampleUser) | Account, ProfileSettings | GET /auth/me | P2 |
| `stores/cartStore.js` | Cart, Checkout | `useCart()` + `useCheckout()` | P1 |
| `stores/wishlistStore.js` | Wishlist | `useWishlist()` | P1 |

## Estrategia de Reemplazo

1. **Catalog**: Reemplazar `import { products } from '@/mocks'` por `useCatalog()` en Shop, Category, ProductDetail
2. **Cart**: Reemplazar `cartStore` por `useCart()` en Cart.jsx
3. **Checkout**: Reemplazar `cartStore` por `useCheckout()` en Checkout.jsx
4. **Wishlist**: Reemplazar `wishlistStore` por `useWishlist()` en Wishlist.jsx
5. **Orders**: Reemplazar datos inline por `useOrders()` en OrderHistory.jsx
6. **Eliminar `mocks/index.js`** solo cuando todos los consumidores hayan migrado
7. **Eliminar `cartStore.js`** y **`wishlistStore.js`** solo cuando Cart y Wishlist ya no los importen
