# AUDITORÍA DE LISTA DE DESEOS (WISHLIST) — TIENDA

## Evaluación de Lista de Deseos

Se auditaron las funciones de `useWishlist.js` y `wishlistRepository`.

---

## Resultados de Integración

| Operación | Método | Endpoint Backend | Requiere Auth | Persistencia | Estado |
|-----------|--------|------------------|---------------|--------------|--------|
| Obtener Wishlist | GET | `/api/v1/account/wishlist` | Sí | Base de Datos (PostgreSQL) | **API REAL** |
| Agregar/Quitar Ítem | POST | `/api/v1/account/wishlist` | Sí | Base de Datos (PostgreSQL) | **API REAL** |

---

## Hallazgos
1. **Requisito Estricto de Autenticación**: A diferencia del carrito, la wishlist **no utiliza fallback en localStorage**. Requiere sesión activa de cliente (`Customer`).
2. **Acción Toggle Única**: `POST /api/v1/account/wishlist` conmuta (agrega si no existe, elimina si existe) el ítem en la base de datos de manera atómica.
3. **Página Dedicada (`/wishlist`)**: La vista se encuentra protegida con `ProtectedRoute.jsx` e invoca `useWishlist().fetch()` al renderizarse.
