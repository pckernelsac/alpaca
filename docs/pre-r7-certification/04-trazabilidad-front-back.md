# 04 — Trazabilidad Frontend / Backend

## Objetivo
Documentar el estado de integración entre los 3 frontends (dashboard, tienda, página institucional) y el backend NestJS. Identificar el gap entre lo que los frontend esperan y lo que el backend provee.

## Evidencias encontradas

### Frontends: estado de conexión

| Frontend | Rutas (React Router) | Llamadas API reales | Conexión al backend |
|----------|---------------------|---------------------|---------------------|
| `frontend/dashboard/` | ~41 rutas | 0 | ❌ No conectado |
| `frontend/tienda/` | ~32 rutas | 0 | ❌ No conectado |
| `frontend/pagina-institucional/` | ~11 rutas | 0 | ❌ No conectado |

**Total: ~84 rutas, 0 llamadas API reales. 0% conectado.**

### Dashboard (41 rutas)
- **No tiene servicios HTTP**: No usa `fetch`, `axios` ni ningún cliente HTTP.
- **Datos mock/localStorage**: `services/auth/index.js` maneja tokens en localStorage. `services/storage/index.js` es un wrapper de localStorage.
- **Archivos revisados**: `src/services/`, `src/hooks/`, `src/constants/`
- **URL configurada**: `http://localhost:8000/api/dashboard` (backend real: `http://localhost:8000/api/v1`)

### Tienda (32 rutas)
- **Tiene axios instalado**: `src/services/api/axios.js` apunta a `http://localhost:8000/api/tienda`.
- **Tiene useFetch hook**: Configurado para usar `api.get()`, pero no hay evidencia de uso real.
- **URL incorrecta**: Backend expone `/api/v1/`, no `/api/tienda/`.
- **No hay datos mock detectados**: Las llamadas fallarían por desajuste de URL.

### Página Institucional (11 rutas)
- **Tiene axios instalado**: Apunta a `http://localhost:8000/api`.
- **Tiene useFetch hook**: Similar a tienda.
- **URL incorrecta**: Backend expone `/api/v1/`, no `/api/`.
- **No hay datos mock detectados**: Las llamadas fallarían por desajuste de URL.

### .env de frontends

| Frontend | VITE_API_URL | Backend real | Match |
|----------|-------------|--------------|-------|
| Dashboard | `http://localhost:8000/api/dashboard` | `http://localhost:8000/api/v1` | ❌ |
| Tienda | `http://localhost:8000/api/tienda` | `http://localhost:8000/api/v1` | ❌ |
| Página Institucional | `http://localhost:8000/api` | `http://localhost:8000/api/v1` | ❌ |

### Matriz de trazabilidad funcional

| Funcionalidad | Frontend espera | Backend provee | Gap |
|---------------|----------------|----------------|-----|
| **Product listing** | Dashboard: mock data. Tienda: espera `/api/tienda/products` | `/api/v1/products` (GET) | URL mismatch + dashboard no llama API |
| **Product detail** | Tienda: espera `/api/tienda/products/:id` | `/api/v1/products/:id` (GET) | URL mismatch |
| **Categories** | Dashboard: mock. Tienda: espera categorías | `/api/v1/categories` (GET) | No integrado |
| **Collections** | Dashboard: mock | `/api/v1/collections` (GET) | No integrado |
| **Auth (staff login)** | Dashboard: `services/auth` (localStorage) | `/api/v1/auth/login` (POST) | Dashboard no conecta |
| **Auth (customer register)** | Tienda: espera registro | `/api/v1/auth/register` (POST) | No integrado |
| **Customer profile** | Dashboard: no implementado. Tienda: espera perfil | `/api/v1/account/profile` (GET/PUT) | No integrado |
| **Cart** | Tienda: espera carrito | `/api/v1/cart/items` (GET/POST/PATCH/DELETE) | No integrado |
| **Checkout** | Tienda: espera checkout | `/api/v1/checkout` (POST) | No integrado |
| **Wishlist** | Tienda: espera wishlist | `/api/v1/wishlist/items` (GET/POST) | No integrado |
| **Orders** | Dashboard: mock. Tienda: espera pedidos | `/api/v1/orders` (GET/POST) | No integrado |
| **Payments** | Tienda: espera payment intent | `/api/v1/create-payment-intent` (POST) | No integrado |
| **CMS (contents, FAQ)** | Página institucional: espera contenido | `/api/v1/contents`, `/api/v1/faq` (GET) | URL mismatch |
| **Hero slides** | Página institucional: espera slides | `/api/v1/hero-slides` (GET) | URL mismatch |
| **Gallery** | Página institucional: espera galería | `/api/v1/gallery` (GET) | URL mismatch |
| **Testimonials** | Página institucional: espera testimonios | `/api/v1/testimonials` (GET) | URL mismatch |
| **Benefits** | Página institucional: espera beneficios | `/api/v1/benefits` (GET) | URL mismatch |
| **Artisan processes** | Página institucional: espera procesos | `/api/v1/artisan-processes` (GET) | URL mismatch |
| **Company settings** | Dashboard: espera settings | `/api/v1/settings/company` (GET) | No integrado |
| **Contact form** | Página institucional: espera contacto | `/api/v1/contact` (POST) | URL mismatch |
| **Newsletter** | Página institucional: espera suscripción | `/api/v1/newsletter/subscribe` (POST) | URL mismatch |
| **CRM (clients B2B)** | Dashboard: espera clientes | `/api/v1/crm/clients` (GET/POST/PUT) | No integrado |
| **Inventory** | Dashboard: espera stock | `/api/v1/stock` (GET) | No integrado |
| **Logistics** | Dashboard: espera shipments | `/api/v1/shipments` (GET/POST) | No integrado |
| **Marketing** | Dashboard: espera campañas/cupones | `/api/v1/campaigns`, `/api/v1/coupons` | No integrado |
| **Users/Roles** | Dashboard: espera gestión IAM | `/api/v1/users`, `/api/v1/roles` | No integrado |
| **Analytics** | Dashboard: espera KPIs | `/api/v1/analytics/kpis` (GET) | No integrado |
| **Audit logs** | Dashboard: espera logs | `/api/v1/audit/logs` (GET) | No integrado |

### Swagger / OpenAPI
- El backend tiene Swagger configurado en `http://localhost:8000/api/v1/docs`
- No hay un contrato OpenAPI generado que los frontends puedan consumir
- Sin DTOs, Swagger no puede generar schemas de request body completos

### Tipos compartidos
- No existen typescript types compartidos entre frontend y backend
- Los frontends no tienen tipado de las respuestas del backend

## Hallazgos

1. **F1 — Dashboard 100% desconectado**: 41 rutas, 0 llamadas API. Todos los datos son mock/localStorage. Requiere reescritura completa de la capa de datos.

2. **F2 — Tienda y Página Institucional con URLs incorrectas**: Tienen axios configurado pero apuntan a `/api/tienda` y `/api` en vez de `/api/v1`. Las llamadas existentes fallarían.

3. **F3 — Sin contrato API formal**: No existe un OpenAPI spec generado ni SDK compartido. Cada frontend tendría que descubrir la API manualmente.

4. **F4 — Sin tipos compartidos**: Los frontends no tienen typings de las entidades del backend. Esto aumenta el riesgo de payloads incorrectos.

5. **F5 — Autenticación no integrada**: Dashboard solo maneja tokens en localStorage. No hay interceptors JWT funcionando en ningún frontend.

6. **F6 — Cobertura funcional completa del backend**: A pesar del gap, el backend tiene endpoints para TODAS las funcionalidades que los frontends necesitan. No hay missing endpoints críticos.

## Score: 35/100

### Criterios de puntuación
- Frontend conectados al backend: 0 pts (0 de 3)
- URLs correctas: 5 pts (0 de 3)
- Contrato API existente (OpenAPI): 0 pts (no generado)
- Tipos compartidos: 0 pts (no existen)
- Cobertura funcional del backend: 20 pts (100% de funcionalidades cubiertas)
- Autenticación JWT implementada en frontends: 0 pts (no implementada)
- Documentación Swagger disponible: 10 pts (disponible pero sin schemas de request)

**Justificación**: Los 3 frontends están completamente desconectados del backend. Dashboard usa mock data 100%. Tienda y Página Institucional tienen infraestructura axios pero con URLs incorrectas y sin uso real. El backend tiene todos los endpoints necesarios, pero el bridge front-back no existe. Este es el principal blocker para R7 (integración frontend).

### Estado: NO APROBADO — Se requiere trabajo de integración significativo
