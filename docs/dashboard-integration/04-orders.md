# Dashboard Integration — Orders

> **Módulo Órdenes: Listado, Detalle, Eventos**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /orders | `ordersRepository.getAll(q)` | `OrdersService.getAll(q)` | `useOrders(q)` |
| GET | /orders/:id | `ordersRepository.getById(id)` | `OrdersService.getById(id)` | — |
| PUT | /orders/:id/status | `ordersRepository.updateStatus(id,d)` | `OrdersService.updateStatus(id,d)` | — |
| GET | /orders/:id/events | `ordersRepository.getEvents(id)` | `OrdersService.getEvents(id)` | — |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| OrderDashboard | inline KPIs + orders | `useOrders()` | ❌ |
| OrderList | inline orders | `useOrders()` | ❌ |
| OrderDetail | inline order data | — | ❌ |
| OrderTimeline | inline events | — | ❌ |
