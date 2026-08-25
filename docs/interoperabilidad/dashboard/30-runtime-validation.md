# VALIDACIÓN EN TIEMPO DE EJECUCIÓN — DASHBOARD

## Evidencia de Red y Runtime

---

## Solicitudes HTTP en Tiempo de Ejecución

| Método | Endpoint Backend | Status Code | Componente / Store Origen | Resultado |
|--------|------------------|-------------|---------------------------|-----------|
| POST | `/api/v1/auth/login` | 200 OK | `Login.jsx` (`authRepository.login`) | **PASS** (Token JWT real emitido) |
| GET | `/api/v1/auth/me` | 200 OK | `useAuth.js` (`authRepository.getProfile`) | **PASS** (Perfil validado) |
| GET | `/api/v1/analytics/kpis` | 200 OK | `useDashboardStore` (`analyticsRepository.getKpis`) | **PASS** (Métricas de DB agregadas) |
| GET | `/api/v1/products` | 200 OK | `useCatalogStore` (`catalogRepository.getProducts`) | **PASS** (Productos paginados con Mappers) |

---

## Verificación de Consola y Backend Logs

1. **Consola del Navegador**:
   - 0 Errores JavaScript / React exceptions.
   - 0 Preview warnings (Preview Mode completamente removido).
   - 0 Respuestas 401 / 403 / 500 inesperadas.

2. **Logs del Servidor NestJS**:
   - `POST /api/v1/auth/login 200`
   - `GET /api/v1/auth/me 200`
   - `GET /api/v1/analytics/kpis 200` (Queries a tablas `orders`, `stock_items`, `products`, `customers`)
   - `GET /api/v1/products 200` (Consulta paginada a la tabla `products`)
