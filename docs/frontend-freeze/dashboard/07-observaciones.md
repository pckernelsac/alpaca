# Dashboard — Observaciones

## Preview Mode
- ✅ Implementado: `VITE_DASHBOARD_PREVIEW=true` en `.env.development`
- ✅ ProtectedRoute salta verificación en preview
- ✅ PreviewProvider auto-autentica con rol Super Administrador
- ✅ En producción (sin la variable) el login funciona normalmente

## Problemas detectados (no corregir, documentar para F3-B)

| # | Problema | Tipo | Impacto |
|---|----------|------|---------|
| 1 | Login simulado con setTimeout 1.5s (no backend) | Mock | Bajo |
| 2 | 100% datos inline en cada página (no centralizados) | Refactor | Medio |
| 3 | Sin lazy loading en imágenes | Performance | Bajo |
| 4 | Sin skeleton/loader en componentes (solo páginas) | UX | Bajo |
| 5 | Sin paginación real en tablas (todo hardcodeado) | Mock | Bajo |
| 6 | Sin acceso a datos desde stores/context | Mock | Bajo |
| 7 | Sidebar colapsable pero sin estado persistente | UX | Bajo |

## Build
- ✅ 157 modules
- ✅ Build exitoso

## Estado
**Dashboard listo para comenzar correcciones (F3-B)**
