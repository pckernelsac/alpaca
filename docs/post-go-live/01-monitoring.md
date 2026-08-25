# Post Go-Live — Operational Monitoring

> **Monitoreo diario de servicios**

---

## Servicios Monitoreados

| Servicio | Puerto | Health Check | Frecuencia | Alertas |
|----------|--------|-------------|------------|---------|
| Backend NestJS | 8000 | GET /health | 30s | 3 fallos → P1 |
| PostgreSQL | 5446 | pg_isready | 30s | 3 fallos → P1 |
| Redis | 6387 | redis-cli ping | 60s | 3 fallos → P2 |
| MinIO/S3 | 9000 | mc admin info | 5min | 3 fallos → P2 |
| Institucional FE | 3101 | HTTP 200 | 60s | 3 fallos → P2 |
| Tienda FE | 3102 | HTTP 200 | 60s | 3 fallos → P1 |
| Dashboard FE | 5173 | HTTP 200 | 60s | 3 fallos → P1 |

## Métricas Diarias

```yaml
backend:
  cpu: "XX%"
  ram: "XX MB / XXXX MB"
  requests_5m: "XX req/s"
  p50_latency: "XXms"
  p99_latency: "XXms"
  errors_5m: "XX"

database:
  connections_active: "XX"
  connections_idle: "XX"
  queries_5m: "XX"
  slow_queries: "XX"
  cache_hit_ratio: "XX%"

redis:
  memory: "XX MB / XXXX MB"
  cache_hit_ratio: "XX%"
  connected_clients: "XX"

storage:
  used: "XX GB / XXXX GB"
  objects: "XX"
```

## Dashboard Grafana Sugerido

| Panel | Query | Tipo |
|-------|-------|------|
| Request Rate | rate(http_requests_total[5m]) | Time series |
| Error Rate | rate(http_errors_total[5m]) | Time series |
| P50/P99 Latency | histogram_quantile(0.99, ..) | Time series |
| DB Connections | pg_stat_activity | Gauge |
| Cache Hit Ratio | rate(redis_hits[5m]) / rate(redis_misses[5m]) | Time series |
| Services Uptime | up | Stat |
