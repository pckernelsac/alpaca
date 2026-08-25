# Dashboard — Orders Migration

> **Órdenes, Detalle, Eventos**

---

## Cambios

| Store | Mock Repo | API Repo |
|-------|-----------|----------|
| `useOrdersStore` | `repositories/orders.js` | `repositories/api.ordersRepository` |

## Endpoints

| Acción | Endpoint | Store Method |
|--------|----------|-------------|
| Listar órdenes | GET /orders | `fetchAll()` |
| Obtener orden | GET /orders/:id | `ordersRepository.getById(id)` |
| Actualizar estado | PUT /orders/:id/status | `ordersRepository.updateStatus(id,d)` |

## Resultado

- ✅ Store consume API real
- ✅ orders.js mock eliminado
