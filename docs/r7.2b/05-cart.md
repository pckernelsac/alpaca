# R7.2B — Cart Integration

> **Carrito de compras CRUD**

---

## Endpoints

| Método | Endpoint | Propósito | DTO |
|--------|----------|-----------|-----|
| GET | /cart | Obtener carrito del customer | — |
| POST | /cart/items | Agregar item | AddCartItemDto (productId, variantId?, quantity) |
| PATCH | /cart/items/:id | Actualizar cantidad | — |
| DELETE | /cart/items/:id | Eliminar item | — |
| DELETE | /cart | Limpiar carrito | — |

## Body POST /cart/items
```json
{ "productId": "uuid", "variantId": "uuid (opcional)", "quantity": 1 }
```

## Hooks

| Hook | Método | Endpoint |
|------|--------|----------|
| `useCart()` | `.fetch()` | GET /cart |
| | `.addItem(data)` | POST /cart/items |
| | `.updateItem(id, data)` | PATCH /cart/items/:id |
| | `.removeItem(id)` | DELETE /cart/items/:id |
| | `.clearCart()` | DELETE /cart |

## Estado Actual

| Componente | Store | Hook Disponible | Migrado |
|-----------|-------|----------------|---------|
| Cart.jsx | cartStore (localStorage) | `useCart` | ❌ No |
| Checkout.jsx | cartStore (localStorage) | `useCheckout` | ❌ No |

## Migración Requerida

```jsx
// Antes (Cart.jsx)
import { cartStore } from '@/stores/cartStore';
const [items, setItems] = useState(cartStore.getItems());

// Después
import { useCart } from '@/hooks';
const { items, loading, fetch, updateItem, removeItem } = useCart();
useEffect(() => { fetch(); }, []);
```

## Observaciones

- Backend usa `req.user.id` para asociar carrito al customer autenticado
- AddCartItemDto existe pero no está conectado al controller (usa `b: any`)
- Precios son server-side (el checkout calcula totales, no el cliente)
