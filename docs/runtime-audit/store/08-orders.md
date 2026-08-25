# AUDITORÍA DE ÓRDENES Y SEGUIMIENTO — TIENDA

## Evaluación de Historial y Tracking de Pedidos

Se auditaron las rutas `/order/history`, `/order/tracking/:id` y los componentes asociados.

---

## Endpoints Evaluados

| Funcionalidad | Componente / Vista | Hook / Repositorio | Endpoint Backend | Estado |
|---------------|--------------------|--------------------|------------------|--------|
| Historial de Pedidos | `/order/history` (`OrderHistory.jsx`) | `useOrders()` | `GET /api/v1/orders` | **PASS (API REAL)** |
| Detalle de Pedido | `/order/history` (`OrderDetailModal.jsx`) | `ordersRepository.getById(id)` | `GET /api/v1/orders/:id` | **PASS (API REAL)** |
| Tracking de Pedido | `/order/tracking/:id` (`OrderTracking.jsx`) | `ordersRepository.getEvents(id)` | `GET /api/v1/orders/:id/events` | **PASS (API REAL)** |

---

## Hallazgos
1. **Sin Datos Inline en Historial**: A diferencia del Dashboard Administrativo, la vista `OrderHistory.jsx` de la Tienda **no utiliza arreglos hardcodeados ni datos de prueba**. Renderiza los pedidos dinámicamente desde el backend NestJS.
2. **Timeline de Eventos Real**: `OrderTracking.jsx` consume el historial de eventos del pedido (`OrderEvents` en DB), mostrando la línea de tiempo real desde la creación hasta el despacho.
