# 09 — Contratos Frontend / Backend

## Objetivo
Evaluar la integración entre frontend y backend: cómo los frontends consumen la API y si existe un contrato de interfaz definido.

## Alcance
- `frontend/dashboard/` — Panel de administración
- `frontend/tienda/` — Tienda online B2C
- `frontend/pagina-institucional/` — Página corporativa

## Estado actual
Ninguno de los 3 frontends realiza llamadas reales a la API del backend. Todos los datos se manejan con datos mock/ficticios o localStorage. No existe un contrato front-back formal.

## Evidencias encontradas

### Dashboard (frontend/dashboard/)
- **No tiene servicios API** — solo tiene `services/auth/index.js` (manejo de tokens en localStorage) y `services/storage/index.js` (wrapper de localStorage)
- **No usa fetch, axios ni ningún cliente HTTP**
- El hook `useAuth.js` consume contexto de `AuthContext` — no hace llamadas HTTP
- Los datos se obtienen de manera local (mock/estática)
- Archivos revisados: `src/services/`, `src/hooks/`, `src/constants/`

### Tienda (frontend/tienda/)
- **Tiene axios configurado** (`src/services/api/axios.js`) apuntando a `http://localhost:8000/api/tienda`
- **Tiene useFetch hook** que usa `api.get()` para obtener datos
- **Sin embargo**, no se encontraron referencias a datos mock, lo que sugiere que las llamadas fallarían al no haber endpoint `/api/tienda` en el backend (el backend expone `/api/v1/`)
- El backend no tiene un prefijo `/api/tienda` — el único prefijo es `api/v1`
- **Potencial desajuste de URL**: backend usa `api/v1`, tienda apunta a `api`

### Página Institucional (frontend/pagina-institucional/)
- **Tiene axios configurado** apuntando a `http://localhost:8000/api`
- **Tiene useFetch hook** similar a tienda
- Misma situación: backend expone `api/v1`, no `api`

### .env de frontends
| Frontend | VITE_API_URL | Backend real |
|----------|-------------|--------------|
| Dashboard | `http://localhost:8000/api/dashboard` | `http://localhost:8000/api/v1` |
| Tienda | `http://localhost:8000/api/tienda` | `http://localhost:8000/api/v1` |
| Página Institucional | `http://localhost:8000/api` | `http://localhost:8000/api/v1` |

Ninguna de las URLs coincide con el prefijo real del backend (`/api/v1`).

### Swagger / OpenAPI
- El backend tiene Swagger configurado en `http://localhost:8000/api/v1/docs`
- Esto podría generar el contrato OpenAPI para los frontends
- Sin embargo, Swagger está habilitado sin restricción de entorno

## Hallazgos
1. **F1**: Dashboard no hace llamadas API — usa datos mock/localStorage 100%.
2. **F2**: Tienda y Página Institucional tienen axios configurado pero apuntan a URLs incorrectas (`/api/tienda`, `/api` vs `/api/v1`).
3. **F3**: No existe un contrato OpenAPI generado que los frontends puedan consumir.
4. **F4**: Los frontends no implementan los interceptors de autenticación JWT completamente (dashboard solo maneja tokens localmente).
5. **F5**: No hay typescript types compartidos entre frontend y backend.

## Riesgos
- **R1**: La integración front-back requerirá cambios significativos en las URLs y adaptación de los frontends.
- **R2**: Sin tipos compartidos, los frontends pueden enviar payloads incorrectos.
- **R3**: Dashboard al no tener servicios API, necesita una reescritura completa de la capa de datos.

## Recomendaciones
1. Generar contrato OpenAPI desde Swagger y compartirlo con los equipos frontend.
2. Crear SDK/cliente API para los frontends con tipos compartidos.
3. Corregir URLs en los .env de los frontends a `/api/v1`.
4. Implementar servicios API en dashboard.

## Acciones Prioridad P0
- Corregir VITE_API_URL en los 3 frontends para que apunten a `/api/v1`.

## Acciones Prioridad P1
- Generar SDK/cliente API con tipos compartidos desde Swagger.
- Implementar servicios API reales en dashboard.

## Acciones Prioridad P2
- Implementar interceptors de autenticación JWT en todos los frontends.

## Score
**3.5 / 10**

## Estado: NO APROBADO

**Justificación**: No existe integración real entre frontend y backend. Los frontends actualmente no pueden consumir la API por desajuste de rutas y falta de implementación. Se requiere trabajo significativo para conectar ambas capas.
