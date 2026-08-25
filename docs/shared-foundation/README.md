# Shared Foundation — ALPACART

Documentación de los paquetes compartidos entre los 3 frontends (Dashboard, Tienda, Institucional).

## Paquetes

| Paquete | Descripción | Docs |
|---------|-------------|------|
| shared-types | 20 interfaces TypeScript para entidades del backend | `04-shared-types.md` |
| shared-utils | 8 funciones utilitarias (formatCurrency, slugify, debounce, etc.) | `05-shared-utils.md` |
| shared-constants | 6 grupos de constantes (ROUTES, THEME, BREAKPOINTS, etc.) | `06-shared-constants.md` |

## Documentos

| # | Archivo | Contenido |
|---|---------|-----------|
| 01 | `01-arquitectura.md` | Arquitectura general de shared foundation |
| 02 | `02-shared-ui.md` | Componentes UI compartidos |
| 03 | `03-shared-hooks.md` | Hooks compartidos |
| 04 | `04-shared-types.md` | Interfaces TypeScript |
| 05 | `05-shared-utils.md` | Funciones utilitarias |
| 06 | `06-shared-constants.md` | Constantes compartidas |
| 07 | `07-shared-assets.md` | Assets compartidos |
| 08 | `08-migracion.md` | Plan de migración |
| 09 | `09-componentes-extraidos.md` | Componentes extraídos |
| 10 | `10-resumen-final.md` | Resumen final F4.1 |
| 11 | `11-import-migration.md` | Migración de imports |
| 12 | `12-alias-validation.md` | Validación de aliases Vite |
| 13 | `13-package-architecture.md` | Arquitectura de paquetes |
| 14 | `14-integration-guide.md` | Guía de integración |
| 15 | `15-final-shared-foundation.md` | Estado final |
| 16 | `16-certification.md` | Certificación |
| 17 | `17-dependency-audit.md` | Auditoría de dependencias |
| 18 | `18-monorepo-validation.md` | Validación del monorepo |
| 19 | `19-final-score.md` | Score final |
| 20 | `20-ready-for-icc.md` | Ready for ICC |

## Estado

| Componente | Estado |
|------------|--------|
| 3 packages creados | ✅ |
| Aliases Vite configurados | ✅ |
| Dashboard build | ✅ (157 módulos) |
| Tienda build | ✅ (201 módulos) |
| Institucional build | ✅ (233 módulos) |
| Score general | 85/100 |

## Aliases

```
@alpacart/shared-types    → packages/shared-types/src
@alpacart/shared-utils     → packages/shared-utils/src
@alpacart/shared-constants → packages/shared-constants/src
```
