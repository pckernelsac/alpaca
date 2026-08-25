# MIGRACIÓN DEL DASHBOARD PRINCIPAL — REAL API

## Integración del Panel Ejecutivo (`/`)

Se migró completamente el Panel de Control Ejecutivo (`src/pages/Dashboard/Dashboard.jsx`) para consumir la API REST del backend NestJS.

---

## Cambios Realizados

1. **Eliminación de Mocks**:
   - `dashboardData.js` fue sobreescrito y neutralizado.
   - Eliminados los valores hardcodeados de KPIs (`$12,540`, `$340,200`, etc.), alertas ficticias y barras de gráficos en duro.

2. **Integración con Zustand Store (`useDashboardStore`)**:
   - El componente se suscribe a `useDashboardStore`.
   - Al montarse, ejecuta `fetchKpis()`, el cual invoca `analyticsRepository.getKpis()`.

3. **Mapeo de Dominio**:
   - La respuesta de `GET /api/v1/analytics/kpis` se transforma mediante `mapKpis` ➔ `createAnalyticsKpi`.

4. **Estados de UI Implementados**:
   - **Loading State**: Spinner animado con mensaje indicando consulta en tiempo real al servidor NestJS.
   - **Error State**: Banner con mensaje del error retornado y botón "Reintentar".
   - **Empty State**: Banner informativo cuando la base de datos PostgreSQL no contiene registros acumulados.
   - **Success State**: Renderizado fluido de los KPIs calculados por el servidor (`totalSales`, `monthlySales`, `pendingOrders`, `completedOrders`, `totalProducts`, `totalCustomers`, `criticalItems`, `outOfStock`).
