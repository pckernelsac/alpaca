# Release Notes — AlpacaRT v1.0.0-rc.1

> **Fecha:** 2026-07-17 | **Versión:** 1.0.0-rc.1 | **Estado:** RELEASE CANDIDATE

---

## Componentes

| Componente | Versión | Modules |
|-----------|---------|---------|
| Backend (NestJS 10) | 1.0.0 | 15 módulos |
| Frontend Institucional | 1.0.0 | 270 |
| Frontend Tienda | 1.0.0 | 268 |
| Frontend Dashboard | 1.0.0 | 217 |

## Cambios desde último release

- N/A (primer release candidate)

## Known Issues

| ID | Descripción | Severidad | Estado |
|----|------------|-----------|--------|
| KNOWN-01 | ~40 DTOs pendientes de conectar al backend | Media | Documentado ICC-P1 |
| KNOWN-02 | Sin refresh token (JWT expira a las 24h/7d) | Baja | NON-BLOCKING |
| KNOWN-03 | Sin structured logging (Winston/Pino) | Baja | P2 |
| KNOWN-04 | Sin CI/CD pipeline automatizado | Media | P2 |
| KNOWN-05 | Coverage tests < 10% | Media | P2 |

## Assets

- Backend: `alpacart-backend:1.0.0`
- Frontend: `alpacart-institucional:1.0.0`, `alpacart-tienda:1.0.0`, `alpacart-dashboard:1.0.0`
