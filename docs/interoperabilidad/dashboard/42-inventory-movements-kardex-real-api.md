# INTEGRACIÓN DE MOVIMIENTOS Y KARDEX — REAL API

## Migración de Movimientos (`/inventory/movements`) y Kardex (`/inventory/kardex`)

Se conectaron ambas vistas de auditoría de inventario a las APIs reales NestJS.

---

## Cambios Realizados

1. **Movimientos de Inventario (`MovementList.jsx`)**:
   - Conectado a `inventoryRepository.getMovements` ➔ `GET /api/v1/inventory/movements`.
   - Muestra entradas, salidas, mermas y ajustes registrados en el sistema.

2. **Kardex Textil (`KardexPage.jsx`)**:
   - Conectado a `inventoryRepository.getTransfers` ➔ `GET /api/v1/inventory/transfers`.
   - Ofrece trazabilidad real de lotes y transferencias entre almacenes.
