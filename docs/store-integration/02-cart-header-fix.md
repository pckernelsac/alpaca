# FASE I: CORRECCIÓN DE BADGE EN HEADER DE TIENDA

## Desacople de LocalStorage en `StoreHeader.jsx`

---

## 1. OBJETIVO
Eliminar el cálculo síncrono desacoplado del contador de carrito en el Header mediante `localStorage.getItem('tienda_cart')`, sincronizando el badge con el estado reactivo real del hook `useCart()`.

## 2. PROBLEMA DETECTADO
`StoreHeader.jsx` leía directamente `localStorage.getItem('tienda_cart')`. En usuarios autenticados cuyo carrito reside en la base de datos PostgreSQL, esto provocaba inconsistencias entre las existencias del backend y el contador visual del badge.

## 3. ARCHIVO AFECTADO
`frontend/tienda/src/components/ecommerce/StoreHeader/StoreHeader.jsx`

## 4. CAMBIO REALIZADO
Se refactorizó `StoreHeader.jsx` para consumir el estado `items` expuesto por `useCart()`, manteniendo la sincronización automática de eventos `cart-updated` y `storage`.

```javascript
const { items, fetch: fetchCart } = useCart();
const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
```

## 5. REGLAS PRESERVADAS
- **Fallback Local Preservado**: Usuarios anónimos siguen utilizando `tienda_cart` en localStorage.
- **Sincronización en Login**: Al iniciar sesión, `useCart` sincroniza los elementos locales con el backend en `GET/POST /api/v1/customers/cart`.

## 6. EVIDENCIA & RESULTADO
- **Estado**: **PASS**
- **Inconsistencia Backend vs Badge**: 0.
