# INTEGRACIÓN DE SUB-DASHBOARDS REGIONALES — REAL API

## Migración de los 9 Paneles de Resumen por Área

Se conectaron los 9 Sub-Dashboards a sus respectivos Zustand Stores y controladores NestJS API.

---

## Paneles Migrados

1. **Catálogo (`/catalog`)**: `CatalogDashboard.jsx` ➔ `useCatalogStore` & `GET /api/v1/products`.
2. **Pedidos (`/orders`)**: `OrderDashboard.jsx` ➔ `useOrdersStore` & `GET /api/v1/orders`.
3. **CRM (`/crm`)**: `CrmDashboard.jsx` ➔ `useClientsStore` & `GET /api/v1/crm/clients`.
4. **Pagos (`/payments`)**: `PaymentDashboard.jsx` ➔ `usePaymentsStore` & `GET /api/v1/payments/transactions`.
5. **Inventario (`/inventory`)**: `InventoryDashboard.jsx` ➔ `useInventoryStore` & `GET /api/v1/inventory/stock`.
6. **Logística (`/logistics`)**: `LogisticsDashboard.jsx` ➔ `useLogisticsStore` & `GET /api/v1/logistics/shipments`.
7. **Marketing (`/marketing`)**: `MarketingDashboard.jsx` ➔ `useMarketingStore` & `GET /api/v1/marketing/campaigns`.
8. **CMS (`/cms`)**: `CmsDashboard.jsx` ➔ `useCmsStore` & `GET /api/v1/cms/contents`.
9. **Textiles (`/textile`)**: `TextileDashboard.jsx` ➔ `textileRepository` & `GET /api/v1/textile/materials`.
