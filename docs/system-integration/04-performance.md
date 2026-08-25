# System Integration — Performance

> **Métricas y optimizaciones**

---

## Bundle

| Frontend | Módulos | Lazy Loading | Code Splitting |
|----------|---------|-------------|----------------|
| Dashboard | 217 | ✅ React.lazy (42 rutas) | ✅ Por página |
| Tienda | 268 | ✅ React.lazy (27 rutas) | ✅ Por página |
| Institucional | 270 | ✅ React.lazy (11 rutas) | ✅ Por página |

## Backend

| Aspecto | Estado |
|---------|--------|
| Connection Pool | ✅ max:25, min:5, acquire:30000, idle:10000 |
| Índices DB | ✅ 73 índices (migración 014) |
| PaginationInterceptor | ✅ Global, clamping page negativa |
| Redis cache-aside | ⚠️ Parcial (solo catálogo productos) |
| N+1 queries | ⚠️ No auditado formalmente |

## Frontend

| Aspecto | Estado |
|---------|--------|
| useCallback en hooks | ✅ |
| Estado local en hooks | ✅ |
| Sin re-renders masivos | ✅ |
| Sin imports muertos | ✅ |
| Tree shaking | ✅ Vite nativo |

## Conclusión

Performance: ✅ Aceptable para MVP
