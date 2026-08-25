# Monitoring Setup

> **Observabilidad y monitoreo**

---

## Health Checks

| Endpoint | Descripción | Frecuencia |
|----------|-------------|------------|
| GET /health | DB ping + Redis ping | 30s |
| GET /api/v1/health | DB ping vía API | 30s |

```json
{ "status": "ok", "info": { "database": { "status": "up" } }, "timestamp": "..." }
```

## Logging

Backend: NestJS Logger con formato estructurado

```json
{ "level": "info", "message": "Server started", "timestamp": "2026-07-17T...", "module": "NestApplication" }
```

Frontend: `@alpacart/shared-observability`

```js
logger.info('User logged in', { userId: '...' });
```

## Métricas Pendientes

| Métrica | Estado | Herramienta Propuesta |
|---------|--------|----------------------|
| CPU/Memoria | ❌ | Prometheus + node_exporter |
| Request rate | ❌ | Prometheus + NestJS metrics |
| Latencia API | ❌ | Prometheus + Grafana |
| Errores HTTP | ❌ | Grafana dashboard |
| Uso de BD | ❌ | pg_stat_statements |
| Cache hit ratio | ❌ | Redis INFO |

## Dashboard Operacional Propuesto

```yaml
panels:
  - title: "Request Rate"
    type: graph
    target: "rate(http_requests_total[5m])"
  - title: "Error Rate"
    type: graph
    target: "rate(http_errors_total[5m])"
  - title: "DB Connections"
    type: gauge
    target: "pg_stat_activity_count"
```
