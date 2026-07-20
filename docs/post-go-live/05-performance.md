# Post Go-Live — Performance

> **Monitoreo y optimización de rendimiento**

---

## Consultas Lentas

```sql
-- Top 5 consultas lentas (requiere pg_stat_statements)
SELECT query, mean_time, calls, rows
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 5;
```

## Puntos de Optimización Identificados

| # | Issue | Impacto | Prioridad | Estado |
|---|-------|---------|-----------|--------|
| 1 | Cache-aside solo en catálogo | CMS lento | P2 | ⚠️ Parcial |
| 2 | Sin índices compuestos en orders(customer_id, status) | Consultas lentas | P3 | ❌ Pendiente |
| 3 | N+1 en GET /products (include category + collection) | Latencia alta | P2 | ⚠️ Revisar |
| 4 | Bundles frontend sin code splitting fino | Carga lenta | P3 | ❌ Pendiente |

## Redis Cache Hit Ratio

```bash
redis-cli INFO stats | grep hits
redis-cli INFO stats | grep misses
```

## Recomendaciones

1. Implementar cache-aside para CMS (GET /contents, GET /faq, etc.)
2. Agregar índice compuesto `orders(customer_id, status)`
3. Verificar eager loading en consultas Sequelize (include)
4. Implementar lazy loading en rutas del Dashboard (ya implementado)
5. Comprimir assets estáticos con CDN
