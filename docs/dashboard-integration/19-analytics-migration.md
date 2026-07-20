# Dashboard — Analytics Migration

> **Dashboard KPIs, Reportes**

---

## Cambios

| Store | Mock Repo | API Repo |
|-------|-----------|----------|
| `useDashboardStore` | `repositories/dashboard.js` | `repositories/api.analyticsRepository` |

## Endpoints

| Acción | Endpoint | Store Method |
|--------|----------|-------------|
| Obtener KPIs | GET /analytics/kpis | `fetchKpis()` |

## Resultado

- ✅ Store consume API real
- ✅ dashboard.js mock eliminado
