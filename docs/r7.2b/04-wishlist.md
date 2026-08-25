# R7.2B — Wishlist Integration

> **Lista de deseos del cliente**

---

## Endpoints

| Método | Endpoint | Propósito |
|--------|----------|-----------|
| GET | /wishlist | Obtener wishlist del customer autenticado |
| POST | /wishlist/items | Agregar/quitar producto (toggle) |

## Body POST /wishlist/items
```json
{ "productId": "uuid", "variantId": "uuid (opcional)" }
```

## Hooks

| Hook | Método | Repository |
|------|--------|------------|
| `useWishlist()` | `.fetch()` | GET /wishlist |
| | `.toggle(productId, variantId)` | POST /wishlist/items |

## Estado Actual

| Componente | Store | Hook Disponible | Migrado |
|-----------|-------|----------------|---------|
| Wishlist.jsx | wishlistStore (localStorage) | `useWishlist` | ❌ No |

## Migración Requerida

```jsx
// Antes (Wishlist.jsx)
import { wishlistStore } from '@/stores/wishlistStore';
const items = wishlistStore.getItems();

// Después
import { useWishlist } from '@/hooks';
const { items, toggle, fetch } = useWishlist();
useEffect(() => { fetch(); }, []);
```

## Ownership

Backend usa `req.user.id` (extraído del JWT customer) para asociar wishlist items al customer autenticado. Un customer no puede ver wishlist de otro.
