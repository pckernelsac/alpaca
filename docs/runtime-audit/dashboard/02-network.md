# INVENTARIO DE REQUESTS — DASHBOARD FRONTEND

## Resumen Ejecutivo de Red
Se auditaron las llamadas HTTP emitidas por el Dashboard al interactuar con el backend (`http://localhost:8000/api/v1`).

---

## Registro de Solicitudes HTTP

| Método | URL / Endpoint | Status | Tiempo | Componente Origen | Payload | Response | Resultado |
|--------|----------------|--------|--------|-------------------|---------|----------|-----------|
| POST | `/api/v1/auth/login` | 200 / 401 | ~45ms | `Login.jsx` | `{ email, password }` | `{ accessToken, user }` | **PASS** (Al enviar credenciales desde el formulario de login) |
| GET | `/api/v1/auth/me` | N/A | N/A | `ApiClient` | Ninguno | N/A | **NOT EXECUTED** (No es invocado tras recarga de página) |
| GET | `/api/v1/analytics/kpis` | N/A | N/A | `useDashboardStore` | Ninguno | N/A | **NOT EXECUTED** (`Dashboard.jsx` no invoca al store) |
| GET | `/api/v1/products` | N/A | N/A | `useCatalogStore` | Ninguno | N/A | **NOT EXECUTED** (`ProductList.jsx` utiliza array de 8 productos inline) |
| GET | `/api/v1/orders` | N/A | N/A | `useOrdersStore` | Ninguno | N/A | **NOT EXECUTED** (`OrderList.jsx` utiliza array de pedidos inline) |
| GET | `/api/v1/crm/clients` | N/A | N/A | `useClientsStore` | Ninguno | N/A | **NOT EXECUTED** (`ClientList.jsx` utiliza datos locales) |
| GET | `/api/v1/users` | N/A | N/A | `useUsersStore` | Ninguno | N/A | **NOT EXECUTED** (`UserList.jsx` utiliza datos locales) |
| GET | `/api/v1/stock` | N/A | N/A | `useInventoryStore` | Ninguno | N/A | **NOT EXECUTED** (`StockList.jsx` utiliza datos locales) |
| GET | `/api/v1/shipments` | N/A | N/A | `useLogisticsStore` | Ninguno | N/A | **NOT EXECUTED** (`ShipmentList.jsx` utiliza datos locales) |
| GET | `/api/v1/campaigns` | N/A | N/A | `useMarketingStore` | Ninguno | N/A | **NOT EXECUTED** (`CampaignList.jsx` utiliza datos locales) |
| GET | `/api/v1/contents` | N/A | N/A | `useCmsStore` | Ninguno | N/A | **NOT EXECUTED** (`ContentList.jsx` utiliza datos locales) |
| GET | `/api/v1/transactions` | N/A | N/A | `usePaymentsStore` | Ninguno | N/A | **NOT EXECUTED** (`TransactionList.jsx` utiliza datos locales) |
| GET | `/api/v1/settings/company` | N/A | N/A | `useSettingsStore` | Ninguno | N/A | **NOT EXECUTED** (`Settings.jsx` utiliza datos locales) |
| GET | `/api/v1/textile/materials` | N/A | N/A | `useTextileStore` | Ninguno | N/A | **NOT EXECUTED** (`TextileVariantList.jsx` utiliza datos locales) |
| GET | `/api/v1/audit/logs` | N/A | N/A | `useAuditStore` | Ninguno | N/A | **NOT EXECUTED** (`AuditLog.jsx` utiliza datos locales) |

---

## Análisis de Red
1. **Petición PASS Única**: El único endpoint que efectivamente se comunica con el servidor es `POST /api/v1/auth/login` cuando el usuario ingresa sus credenciales en la pantalla de Login.
2. **Endpoints No Ejecutados**: Todos los endpoints REST del backend declarados en `src/api/endpoints/index.js` permanecen en estado **NOT EXECUTED** debido a la falta de suscripción/invocación en los componentes de página React.
