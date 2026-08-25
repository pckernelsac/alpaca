# AUDITORÍA DE CARRITO DE COMPRAS — TIENDA

## Evaluación de Persistencia y Sincronización del Carrito

Se auditaron las operaciones del carrito gestionadas por el hook `useCart.js` y `cartRepository`.

---

## Integración y Endpoints Evaluados

| Operación | Método | Endpoint Backend | Hook / Función | Fuente de Verdad | Persistencia API Real |
|-----------|--------|------------------|----------------|------------------|-----------------------|
| `GET cart` | GET | `/api/v1/account/cart` | `useCart.fetch()` | Servidor DB / Redis | **Sí** (Si autenticado) |
| `POST item` | POST | `/api/v1/account/cart/items` | `useCart.addItem(data)` | Servidor DB / Redis | **Sí** (API real con sync local) |
| `PATCH item` | PATCH | `/api/v1/account/cart/items/:id` | `useCart.updateItem(id, data)` | Servidor DB / Redis | **Sí** |
| `DELETE item` | DELETE | `/api/v1/account/cart/items/:id` | `useCart.removeItem(id)` | Servidor DB / Redis | **Sí** |
| `DELETE cart` | DELETE | `/api/v1/account/cart` | `useCart.clearCart()` | Servidor DB / Redis | **Sí** |

---

## Mecanismo Híbrido y Fallback Local (`tienda_cart`)

### Lógica de `useCart.js`
1. **Usuarios Anónimos (No Autenticados)**:
   - Cuando un usuario sin sesión agrega productos al carrito, las peticiones HTTP contra `/api/v1/account/cart/items` devuelven `401 Unauthorized`.
   - `useCart.js` captura la excepción y guarda los ítems en `localStorage` bajo la clave `'tienda_cart'`.
2. **Proceso de Sincronización al Iniciar Sesión (`SYNC_KEY`)**:
   - Al iniciar sesión e invocar `fetch()`, `useCart.js` detecta los productos acumulados en `'tienda_cart'`.
   - Ejecuta un bucle `for...of` realizando `POST /api/v1/account/cart/items` por cada ítem local hacia la base de datos backend.
   - Una vez sincronizado, establece `tienda_cart_synced = '1'` y vacía `'tienda_cart'` de `localStorage`.
3. **Falta de Reactividad Global en Header**:
   - `StoreHeader.jsx` lee directamente `localStorage.getItem('tienda_cart')` en lugar de suscribirse a un store reactivo, lo que causa un desacople visual del contador del carrito si la sesión está activa y los ítems provienen únicamente de la API.
