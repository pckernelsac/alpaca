# Dashboard — Mock Removal

> **Archivos eliminados**

---

## Mocks Eliminados

| Archivo | Tipo | Reemplazo |
|---------|------|-----------|
| `src/mocks/data.js` | Mock data centralizado | API real via repositories/api |
| `src/repositories/base.js` | Factory genérica Promise.resolve | repositories/api con axios |
| `src/repositories/catalog.js` | Mock catálogo | catalogRepository |
| `src/repositories/orders.js` | Mock órdenes | ordersRepository |
| `src/repositories/users.js` | Mock usuarios | iamRepository |
| `src/repositories/dashboard.js` | Mock KPIs | analyticsRepository |
| `src/repositories/clients.js` | Mock clientes | crmRepository |
| `src/repositories/inventory.js` | Mock inventario | inventoryRepository |
| `src/repositories/marketing.js` | Mock marketing | marketingRepository |
| `src/repositories/cms.js` | Mock CMS | cmsRepository |
| `src/repositories/payments.js` | Mock pagos | paymentsRepository |
| `src/repositories/logistics.js` | Mock logística | logisticsRepository |
| `src/repositories/audit.js` | Mock auditoría | auditRepository |

## Stores Migrados a API

| Store | Antes | Después |
|-------|-------|---------|
| useDashboardStore | dashboardRepo mock | analyticsRepository API |
| useCatalogStore | catalogRepo mock | catalogRepository API |
| useOrdersStore | ordersRepo mock | ordersRepository API |
| useUsersStore | usersRepo mock | iamRepository API |
| useClientsStore | clientsRepo mock | crmRepository API |
| useInventoryStore | inventoryRepo mock | inventoryRepository API |
| useMarketingStore | marketingRepo mock | marketingRepository API |
| useCmsStore | cmsRepo mock | cmsRepository API |
| usePaymentsStore | paymentsRepo mock | paymentsRepository API |
| useLogisticsStore | logisticsRepo mock | logisticsRepository API |
| useAuditStore | auditRepo mock | auditRepository API |
| useTextileStore | textileRepo mock | textileRepository API |
| useSettingsStore | settingsRepo mock | settingsRepository API |

## Total

- **13 archivos mock eliminados**
- **12 Zustand stores migrados a API real**
- **217 modules build PASS**
