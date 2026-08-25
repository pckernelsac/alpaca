# ERRORES DEL BACKEND — AUDITORÍA DASHBOARD

## Monitoreo de Server Logs (NestJS Backend)

### 1. Estado de Endpoints y Controladores Backend
El backend NestJS en `backend/src/modules/` cuenta con controladores para todos los dominios:
- `@Controller('auth')` (`AuthModule`)
- `@Controller('analytics')` (`AnalyticsModule`)
- `@Controller('audit')` (`AuditModule`)
- `@Controller()` -> `/products`, `/variants` (`CatalogModule`)
- `@Controller()` -> `/contents`, `/admin/hero-slides` (`CmsModule`)
- `@Controller('crm')` (`CrmModule`)
- `@Controller()` -> `/users`, `/roles`, `/permissions` (`IamModule`)
- `@Controller()` -> `/stock`, `/movements` (`InventoryModule`)
- `@Controller()` -> `/shipments` (`LogisticsModule`)
- `@Controller()` -> `/campaigns` (`MarketingModule`)
- `@Controller()` -> `/orders` (`OrdersModule`)
- `@Controller()` -> `/transactions` (`PaymentsModule`)
- `@Controller()` -> `/settings` (`SettingsModule`)
- `@Controller('textile')` (`TextileModule`)

### 2. Logs en Ejecución Durante Uso del Dashboard
- **Login Request (`POST /api/v1/auth/login`)**:
  - `POST /api/v1/auth/login 200 OK` — Autenticación correcta de staff (`mateo.q@alpacart.com`).
  - `POST /api/v1/auth/login 401 Unauthorized` — Cuando se proveen credenciales erróneas.
- **Navegación por Pantallas (`/`, `/catalog/productos`, `/orders/list`, etc.)**:
  - **Zero Logs / Zero Queries**: Al estar los componentes frontend desacoplados de los stores de Zustand, la navegación por las 40 pantallas administrativas **no genera ningún log**, no ejecuta consultas SQL en PostgreSQL ni lecturas de cache en Redis.

### 3. Excepciones o Fallos Registrados
- No se registraron 5xx, DB connection drops ni Redis errors producidos por la interacción con el Dashboard, debido a la ausencia de tráfico entrante desde el cliente web.
