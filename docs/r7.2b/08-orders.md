# R7.2B — Orders Integration

> **Historial y detalle de pedidos**

---

## Endpoints

| Método | Endpoint | Propósito |
|--------|----------|-----------|
| GET | /orders | Listar órdenes del customer |
| GET | /orders/:id | Detalle de orden |
| GET | /orders/:id/events | Eventos/timeline de la orden |

## Hooks

| Hook | Método | Endpoint |
|------|--------|----------|
| `useOrders(params)` | `.fetch(params)` | GET /orders |
| `useOrders()` (indirecto) | `ordersRepository.getById(id)` | GET /orders/:id |
| `useOrders()` (indirecto) | `ordersRepository.getEvents(id)` | GET /orders/:id/events |

## Response GET /orders
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "orderNumber": "ORD-001",
      "status": "shipped",
      "subtotal": 100,
      "total": 100,
      "paid": true,
      "items": [...],
      "createdAt": "2026-07-17T..."
    }
  ]
}
```

## Estados de Orden

| Estado | Significado |
|--------|-------------|
| pending | Pendiente de pago |
| paid | Pagada |
| confirmed | Confirmada |
| shipped | Enviada |
| delivered | Entregada |
| cancelled | Cancelada |

## Auth

OrdersController usa `@Actor('staff', 'customer')`. Customer autenticado solo ve sus propias órdenes (filtro por `req.user.id` en service).

## Estado Actual

| Componente | Datos | Hook Disponible | Migrado |
|-----------|-------|----------------|---------|
| OrderHistory.jsx | Inline mock (3 órdenes) | `useOrders` | ❌ No |
| OrderTracking.jsx | Inline mock (trackingSteps) | `ordersRepository.getEvents` | ❌ No |
