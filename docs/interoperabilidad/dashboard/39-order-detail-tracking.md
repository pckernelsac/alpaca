# DETALLE Y TRACKING DE PEDIDOS (GET BY ID) — REAL API

## Integración de Detalle (`/pedidos/detalle`) y Seguimiento (`/pedidos/seguimiento`)

Se conectaron las vistas detalladas de pedidos a la API REST NestJS por identificador único.

---

## Cambios Realizados

1. **Detalle de Pedido (`OrderDetail.jsx`)**:
   - Invocación a `ordersRepository.getById(id)` ➔ `GET /api/v1/orders/:id`.
   - Carga el desglose financiero, lista de ítems, datos del cliente y estado de pago/envío reales.

2. **Seguimiento y Línea de Tiempo (`OrderTimeline.jsx`)**:
   - Invocación a `ordersRepository.getEvents(id)` ➔ `GET /api/v1/orders/:id/events`.
   - Renderiza la secuencia cronológica de hitos de auditoría procesados por el backend.
