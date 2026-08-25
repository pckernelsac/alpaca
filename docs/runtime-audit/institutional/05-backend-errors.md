# ERRORES DEL BACKEND — FRONTEND INSTITUCIONAL

## Monitoreo de Logs en Servidor NestJS

### 1. Registro de Peticiones y Logs Backend

| Pantalla | Request Realizado | Endpoint Backend | Logs Servidor NestJS | Resultado Backend |
|----------|-------------------|------------------|----------------------|-------------------|
| `/` (Home) | `GET /api/v1/hero-slides` | `CmsController.findHeroSlides()` | `GET /api/v1/hero-slides 200 OK` (Consulta 8 registros en DB) | **PASS** |
| `/preguntas` (FAQ) | `GET /api/v1/faq` | `CmsController.findFaq()` | `GET /api/v1/faq 200 OK` (Consulta categorías y preguntas en DB) | **PASS** |
| `/contacto` (Contacto) | `POST /api/v1/v1/contact` | N/A (Mismatched Route) | `POST /api/v1/v1/contact 404 - Cannot POST /api/v1/v1/contact` | **FAIL** (Ruta no coincide) |

---

## 2. Excepciones o Errores Internos
- **Sin Errores 500 / Database Errors**: No se registraron fallos de conexión a PostgreSQL ni errores de sintaxis en Sequelize ORM.
- **Sin Errores de Redis**: `CmsController` procesa las peticiones de consulta pública directamente contra PostgreSQL de forma estable.
