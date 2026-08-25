# Dashboard Integration — Analytics

> **Módulo Analytics: KPIs, Reportes**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /analytics/kpis | `analyticsRepository.getKpis()` | `AnalyticsService.getKpis()` | `useDashboard()` |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| Dashboard | inline KPIs, orders, alerts | `useDashboard()` | ❌ |
| AnalyticsPage | inline KPIs | `useDashboard()` | ❌ |
