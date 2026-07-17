# R7.0V — 14 — Runtime Validation Summary

> **Fecha:** 2026-07-16 | **Tests:** HTTP contra PostgreSQL 16.14 + Redis 7 reales

---

## 1. Resultados por Área

| Área | Tests | PASS | FAIL | Archivo |
|------|-------|------|------|---------|
| Auth (staff + customer) | 6 | 6 | 0 | `09-runtime-auth.md` |
| OpenAPI / Swagger | 2 | 2 | 0 | `10-runtime-openapi.md` |
| PostgreSQL + Migraciones | 4 | 4 | 0 | `11-runtime-postgresql.md` |
| Seguridad (guards, rate, middleware) | 5 | 5 | 0 | `12-runtime-security.md` |
| Regresión (R1-R6) | 8 | 8 | 0 | `13-runtime-regression.md` |
| **Total** | **25** | **25** | **0** | — |

## 2. Test Suite Integrada (r7v-test.js)

| # | Test | Resultado |
|---|------|-----------|
| 1 | Staff login (mateo.q@alpacart.com / Admin123!) | ✅ PASS |
| 2 | Staff JWT generado correctamente | ✅ PASS |
| 3 | Customer login (camila.g@email.com / Cliente2024!) | ✅ PASS |
| 4 | Customer JWT generado | ✅ PASS |
| 5 | GET /products (público) | ✅ PASS |
| 6 | GET /categories (público) | ✅ PASS |
| 7 | GET /hero-slides (público) | ✅ PASS |
| 8 | GET /faq (público) | ✅ PASS |
| 9 | GET /users sin auth → 401 | ✅ PASS |
| 10 | GET /settings/company (público) | ✅ PASS |
| 11 | POST /contact (público) | ✅ PASS |
| 12 | POST /coupons/validate (público) | ✅ PASS |
| **Total** | **12** | **12/12 PASS** |

## 3. Resumen de Componentes Validados

| Componente | Estado |
|-----------|--------|
| NestJS 10 startup | ✅ Sin errores |
| PostgreSQL 16.14 conexión | ✅ OK |
| Redis 7 conexión | ✅ OK |
| 16 migraciones | ✅ Aplicadas |
| 7 seeds | ✅ Ejecutados |
| 35 FKs + 42 CHECKs + 73 índices | ✅ Verificados |
| ActorGuard global | ✅ Bloquea sin token |
| @Public en 11+ endpoints | ✅ Bypass funciona |
| ThrottlerGuard (3 perfiles) | ✅ APP_GUARD |
| Helmet + Compression + CORS | ✅ Configurados |
| Graceful shutdown | ✅ enableShutdownHooks |
| Swagger /api/v1/docs | ✅ Renderiza |
| Build backend (142 archivos) | ✅ OK |
| 3 builds frontend (157+201+233) | ✅ OK |
