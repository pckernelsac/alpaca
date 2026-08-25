# AUDITORÍA DE RUTAS — DASHBOARD FRONTEND

## Resumen Ejecutivo de Rutas
Se auditaron las **42 rutas** registradas en `src/routes/routes.jsx` del Dashboard Administrativo.

---

## Inventario Completo de Rutas

| # | Ruta | Componente Página | Layout | Protegida | Integración API / Estado Real |
|---|------|-------------------|--------|-----------|-------------------------------|
| 1 | `/login` | `Login` | AuthLayout | No | API REAL (invoca `authRepository.login`) |
| 2 | `/` | `Dashboard` | AdminLayout | Sí | MOCK (Carga `dashboardData.js` estático, ignora `useDashboardStore`) |
| 3 | `/catalog` | `CatalogDashboard` | AdminLayout | Sí | MOCK / Estático |
| 4 | `/catalog/productos` | `ProductList` | AdminLayout | Sí | MOCK (Array de 8 productos inline, ignora `useCatalogStore`) |
| 5 | `/catalog/productos/nuevo` | `ProductCreate` | AdminLayout | Sí | MOCK / Formulario Local |
| 6 | `/catalog/productos/multimedia` | `ProductMedia` | AdminLayout | Sí | MOCK / Formulario Local |
| 7 | `/catalog/variantes` | `VariantList` | AdminLayout | Sí | MOCK (Datos locales) |
| 8 | `/catalog/variantes/nueva` | `VariantCreate` | AdminLayout | Sí | MOCK / Formulario Local |
| 9 | `/orders` | `OrderDashboard` | AdminLayout | Sí | MOCK / Estático |
| 10 | `/orders/list` | `OrderList` | AdminLayout | Sí | MOCK (Array de pedidos inline, ignora `useOrdersStore`) |
| 11 | `/pedidos/detalle` | `OrderDetail` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 12 | `/pedidos/seguimiento` | `OrderTimeline` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 13 | `/crm` | `CrmDashboard` | AdminLayout | Sí | MOCK / Estático |
| 14 | `/crm/clientes` | `ClientList` | AdminLayout | Sí | MOCK (Array de clientes inline, ignora `useClientsStore`) |
| 15 | `/crm/clientes/nuevo` | `ClientCreate` | AdminLayout | Sí | MOCK / Formulario Local |
| 16 | `/crm/clientes/perfil` | `ClientProfile` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 17 | `/payments` | `PaymentDashboard` | AdminLayout | Sí | MOCK / Estático |
| 18 | `/payments/transactions` | `TransactionList` | AdminLayout | Sí | MOCK (Array de transacciones inline, ignora `usePaymentsStore`) |
| 19 | `/inventory` | `InventoryDashboard` | AdminLayout | Sí | MOCK / Estático |
| 20 | `/inventory/stock` | `StockList` | AdminLayout | Sí | MOCK (Array de stock inline, ignora `useInventoryStore`) |
| 21 | `/inventory/kardex` | `KardexPage` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 22 | `/inventory/movements` | `MovementList` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 23 | `/logistics` | `LogisticsDashboard` | AdminLayout | Sí | MOCK / Estático |
| 24 | `/logistics/envios` | `ShipmentList` | AdminLayout | Sí | MOCK (Array de envíos inline, ignora `useLogisticsStore`) |
| 25 | `/marketing` | `MarketingDashboard` | AdminLayout | Sí | MOCK / Estático |
| 26 | `/marketing/campanas` | `CampaignList` | AdminLayout | Sí | MOCK (Array de campañas inline, ignora `useMarketingStore`) |
| 27 | `/cms` | `CmsDashboard` | AdminLayout | Sí | MOCK / Estático |
| 28 | `/cms/contenido` | `ContentList` | AdminLayout | Sí | MOCK (Array de contenidos inline, ignora `useCmsStore`) |
| 29 | `/textile` | `TextileDashboard` | AdminLayout | Sí | MOCK / Estático |
| 30 | `/textile/transferencias` | `TransferList` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 31 | `/textil/variantes` | `TextileVariantList` | AdminLayout | Sí | MOCK (Array de variantes inline, ignora `useTextileStore`) |
| 32 | `/usuarios` | `UserList` | AdminLayout | Sí | MOCK (Array de usuarios inline, ignora `useUsersStore`) |
| 33 | `/usuarios/nuevo` | `UserCreate` | AdminLayout | Sí | MOCK / Formulario Local |
| 34 | `/usuarios/roles` | `RoleList` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 35 | `/usuarios/permisos` | `PermissionMatrix` | AdminLayout | Sí | MOCK (Matriz estática) |
| 36 | `/mi-perfil` | `MyProfile` | AdminLayout | Sí | MOCK (Datos hardcodeados) |
| 37 | `/analytics` | `AnalyticsPage` | AdminLayout | Sí | MOCK (Gráficos con datos ficticios) |
| 38 | `/audit` | `AuditLog` | AdminLayout | Sí | MOCK (Logs ficticios inline, ignora `useAuditStore`) |
| 39 | `/settings` | `SettingsPage` | AdminLayout | Sí | MOCK (Ajustes de empresa hardcodeados, ignora `useSettingsStore`) |
| 40 | `/datos-maestros` | `MasterData` | AdminLayout | Sí | MOCK (Tablas estáticas) |
| 41 | `*` | `NotFound` | MainLayout | No | Sin comunicación API (404 UI) |

---

## Hallazgos Principales
1. **Desconexión Total de Vistas**: El 100% de los componentes de página importan colecciones de objetos o arreglos hardcodeados (`dashboardData.js`, constantes locales).
2. **Ignorado de Stores Zustand**: Ninguna página protegida invoca a sus respectivos stores de Zustand (`useCatalogStore`, `useOrdersStore`, `useUsersStore`, etc.) en la capa de renderizado.
