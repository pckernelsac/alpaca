# Post Go-Live — Incidents

> **Registro de incidentes post-lanzamiento**

---

## Severidades

| Nivel | Definición | Tiempo Respuesta | Tiempo Resolución |
|-------|-----------|-----------------|-------------------|
| P1 | Servicio caído o degradación crítica | 15 min | 2h |
| P2 | Funcionalidad afectada sin bloqueo total | 30 min | 8h |
| P3 | Error menor sin impacto a usuarios | 2h | 48h |
| P4 | Cosmético, mejora | 1 semana | Próximo sprint |

## Formato de Registro

```yaml
incident:
  id: INC-2026-0001
  date: "2026-07-18T14:30:00Z"
  severity: P2
  service: backend
  summary: "500 error en GET /products con page=-1"
  cause: "Clamping de page negativa generaba OFFSET -1"
  impact: "Usuarios con page=-1 recibían 500 en lugar de 200"
  duration: "45 min"
  resolution: "Math.max(1, page) en PaginationInterceptor"
  status: resolved
  actions:
    - "Agregar test para page negativa"
    - "Monitorear 4xx/5xx rates"
```

## Incidentes Registrados

| ID | Fecha | Severidad | Servicio | Resumen | Estado |
|----|-------|-----------|----------|---------|--------|
| — | — | — | — | Sin incidentes en período de estabilización | — |
