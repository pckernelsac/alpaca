# AUDITORÍA DE STORES — TIENDA

## Evaluación de Estado y Gestión de Datos

Se evaluaron los mecanismos de estado de la Tienda (Custom Hooks con estado React + Context + Zustand UI Store).

---

## Matriz de Evaluación de Estado y Stores

| Store / Hook | Archivo | Consume API Real | Estado Local / Fallback | Clasificación | Invocado por UI |
|--------------|---------|------------------|-------------------------|---------------|-----------------|
| `uiStore` | `src/stores/uiStore.js` | No (Solo UI State) | Estado de Modales / Drawer | **STATIC / UI REAL** | Sí |
| `useAuth` | `src/hooks/useAuth.js` | Sí (`authRepository.getProfile`) | `localStorage` JWT Token | **API REAL** | Sí |
| `useCart` | `src/hooks/useCart.js` | Sí (`cartRepository.*`) | `localStorage` (`tienda_cart`) | **MIXTO** | Sí |
| `useWishlist` | `src/hooks/useWishlist.js` | Sí (`wishlistRepository.*`) | No (Requiere Auth) | **API REAL** | Sí |
| `useCatalog` | `src/hooks/useCatalog.js` | Sí (`catalogRepository.*`) | No | **API REAL** | Sí |
| `useOrders` | `src/hooks/useOrders.js` | Sí (`ordersRepository.*`) | No | **API REAL** | Sí |
| `useAddresses` | `src/hooks/useAddresses.js` | Sí (`authRepository.*`) | No | **API REAL** | Sí |
| `useCheckout` | `src/hooks/useCheckout.js` | Sí (`checkoutRepository.*`) | No | **API REAL** | Sí |
| `useCoupon` | `src/hooks/useCoupon.js` | Sí (`couponRepository.*`) | No | **API REAL** | Sí |

---

## Hallazgo Principal
Los Custom Hooks de la Tienda están **activamente conectados a la UI** y consumen la API Backend de NestJS. La gestión del carrito (`useCart.js`) opera en modo **MIXTO** garantizando funcionalidad tanto para usuarios anónimos como para clientes autenticados.
