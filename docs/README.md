# ALPACART Docs

Documentación del proyecto ALPACART — marca peruana de alpaca premium.

## Directorios

| Directorio | Contenido |
|-----------|-----------|
| `api/` | Estándares de API |
| `architecture/` | Arquitectura general, frontends, infraestructura |
| `auditoria-backend/` | BCA-01: Auditoría de backend (13 dimensiones) |
| `backend-discovery/` | Blueprint y certificación pre-implementación (18 docs) |
| `backend-implementation/` | Plan maestro + reportes R0-R6 (12 docs) |
| `backend-readiness/` | Readiness R7.0: login, DTOs, OpenAPI, auth, validación |
| `desarrollo/` | Guía de desarrollo |
| `enterprice/` | Modelo de dominio empresarial |
| `especificaciones/` | Especificaciones funcionales (16 docs) |
| `frontend-freeze/` | Freeze de frontends: dashboard (33), tienda (12), institucional (4) |
| `integration-readiness/` | IRC-01: readiness de integración (12 docs) |
| `openapi/` | Especificación OpenAPI |
| `postgresql/` | Estándares PostgreSQL |
| `pre-r7-certification/` | PRE-R7: certificación pre-integración (5 docs) |
| `shared-foundation/` | F4: paquetes compartidos (20 docs) |

## Estado del Proyecto

| Fase | Estado |
|------|--------|
| R0-R6 Backend | ✅ COMPLETED (16 migraciones, 7 seeds, 57 tablas) |
| BCA-01 Audit | ✅ COMPLETED (72.5/100) |
| PRE-R7 Certification | ✅ COMPLETED (72/100) |
| IRC-01 | ✅ COMPLETED (57/100) |
| F4 Shared Foundation | ✅ COMPLETED (85/100) |
| IRA-01 | ✅ COMPLETED (87% compatibilidad) |
| **R7 Frontend Integration** | ⏳ PENDING |

## Stack

```
Backend:  NestJS 10 + TypeScript 5 + Sequelize 6
Base:     PostgreSQL 16.14
Cache:    Redis 7 (rate limiting + cache-aside)
Storage:  MinIO / S3
Frontend: React 19 (Dashboard:5173, Tienda:3102, Institucional:3101)
```

## Próxima acción

R7 — Integración progresiva de los tres frontends:
1. ICC (Integration Compatibility Check) — institucional primero
2. Conectar institucional → API real (hero, FAQ, testimonios, contacto)
3. Conectar tienda (productos, carrito, checkout, auth)
4. Conectar dashboard (login, catálogo, órdenes, inventario)
