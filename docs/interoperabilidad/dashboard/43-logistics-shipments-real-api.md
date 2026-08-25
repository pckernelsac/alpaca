# INTEGRACIÓN DE GUÍAS Y LOGÍSTICA — REAL API

## Migración de Envíos (`/logistics/envios`)

Se migró `ShipmentList.jsx` para consumir el endpoint real NestJS `GET /api/v1/logistics/shipments`.

---

## Cambios Realizados

1. **Eliminación de Arreglos Inline**:
   - Removidos los envíos estáticos ficticios (`ALPC-TR-88294`, etc.).

2. **Integración con Zustand Store (`useLogisticsStore`)**:
   - `ShipmentList.jsx` consume `shipments`, `carriers`, `meta`, `loading` y `error`.

3. **Trazabilidad Real de Guías**:
   - Renderiza guías de remisión (waybills), transportistas (DHL, FedEx), ciudades de origen/destino y estado del despacho.
