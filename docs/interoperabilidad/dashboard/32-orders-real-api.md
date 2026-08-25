# MIGRACIÓN DE PEDIDOS — REAL API

## Integración del Módulo de Pedidos (`/orders/list`)

Se migró la vista `OrderList.jsx` para consumir el endpoint real de la API NestJS `GET /api/v1/orders`.

---

## Cambios Realizados

1. **Eliminación de Mocks**:
   - Se removió el arreglo estático `orders` de 6 pedidos ficticios y los KPI cards en duro.

2. **Integración con Zustand Store (`useOrdersStore`)**:
   - `OrderList.jsx` consume `orders`, `meta`, `loading`, `error` y `fetchAll` desde `useOrdersStore`.
   - Soporta parámetros de paginación (`page`, `perPage`).

3. **Mappers y Modelos de Dominio**:
   - `ordersRepository.getAll` ejecuta `mapOrders`, transformando cada DTO en `createOrder`.
   - Se procesan los items de cada orden, montos totales, cliente asociado y estado de pago/envío.

4. **Estados de UI Implementados**:
   - **Loading**: Spinner animado interactivo.
   - **Error**: Alerta estilizada en caso de error de servidor.
   - **Empty State**: Vista vacía cuando no existen órdenes registradas.
   - **Success Table**: Tabla interactiva conectada a datos de la base de datos PostgreSQL.
