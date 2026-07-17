# R7.1BV — Production Checklist

> **Verificación de producción para frontend Institucional**

---

| # | Ítem | Estado |
|---|------|--------|
| 1 | No hay fetch() directo en componentes | ✅ |
| 2 | No hay axios directo en componentes | ✅ |
| 3 | No hay API_URL hardcodeado | ✅ (VITE_API_URL en .env) |
| 4 | No hay datos mock inline | ✅ (reemplazados por hooks) |
| 5 | Todo pasa por ServiceProvider | ✅ (8 hooks unificados) |
| 6 | Todo pasa por Repository | ✅ |
| 7 | Todo pasa por Mapper | ✅ (6 mappers) |
| 8 | Todo pasa por Domain Model | ✅ (6 domain factories) |
| 9 | Sin dead code | ✅ (slides.js eliminado) |
| 10 | Sin imports muertos | ✅ |
| 11 | Sin assets sin uso | ✅ |
| 12 | Hooks consistentes | ✅ (mismo patrón) |
| 13 | Services consistentes | ✅ (clases con DI) |
| 14 | Repositories consistentes | ✅ (solo HTTP) |
| 15 | Mappers consistentes | ✅ (raw → domain) |
| 16 | Domain models consistentes | ✅ (create* factories) |
| 17 | Build PASS | ✅ (270 modules) |
| 18 | Sin dependencias circulares | ✅ |
