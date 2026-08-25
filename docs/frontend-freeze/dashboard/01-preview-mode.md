# Dashboard Preview Mode

## Implementación

Se agregó un modo de previsualización que permite navegar todo el Dashboard sin autenticación.

### Activación
`VITE_DASHBOARD_PREVIEW=true` en `.env.development`

### Componentes creados
1. `src/preview/PreviewProvider.jsx` — Auto-login al montar la app
2. Modificado `src/guards/ProtectedRoute.jsx` — Salta verificación en preview
3. Modificado `src/providers/AppProvider.jsx` — Integra PreviewProvider

### Comportamiento
- **Preview activo**: Login se salta, usuario simulado con rol Super Administrador
- **Preview inactivo** (producción): Login funciona exactamente como antes
- Todos los datos continúan siendo MOCK
- Sin llamadas HTTP, sin backend

### Variables de entorno
| Variable | Desarrollo | Producción |
|----------|-----------|------------|
| VITE_DASHBOARD_PREVIEW | true | (no definida) |
