# INTEGRACIÓN DE INVENTARIO DE STOCK — REAL API

## Migración del Módulo de Existencias (`/inventory/stock`)

Se migró `StockList.jsx` para consumir el endpoint real de la API NestJS `GET /api/v1/inventory/stock`.

---

## Cambios Realizados

1. **Eliminación de Mocks**:
   - Se removieron las existencias estáticas hardcodeadas (`ALP-VIC-CAM-001`, etc.).

2. **Integración con Zustand Store (`useInventoryStore`)**:
   - Conectado a `useInventoryStore` (`items`, `meta`, `loading`, `error`, `fetchAll`).

3. **Renderizado en Tiempo Real**:
   - Muestra cantidades físicas, stock reservado, niveles críticos de existencia y alertas de reposición registradas en PostgreSQL.
