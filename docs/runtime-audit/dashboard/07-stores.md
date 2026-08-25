# AUDITORÍA DE ZUSTAND STORES — DASHBOARD

## Evaluación de Stores

Se auditaron los 13 stores de Zustand ubicados en `src/stores/`.

---

## Matriz de Evaluación de Stores

| Store | Archivo | Consume API Real | Datos Locales | Estado del Store | Invocado por UI |
|-------|---------|------------------|---------------|------------------|-----------------|
| Audit | `useAuditStore.js` | Sí (`auditRepository.getLogs`) | No | API REAL | **NO UTILIZADO** |
| Catalog | `useCatalogStore.js` | Sí (`catalogRepository.*`) | No | API REAL | **NO UTILIZADO** |
| Clients | `useClientsStore.js` | Sí (`crmRepository.*`) | No | API REAL | **NO UTILIZADO** |
| CMS | `useCmsStore.js` | Sí (`cmsRepository.*`) | No | API REAL | **NO UTILIZADO** |
| Dashboard | `useDashboardStore.js` | Sí (`analyticsRepository.getKpis`) | No | API REAL | **NO UTILIZADO** |
| Inventory | `useInventoryStore.js` | Sí (`inventoryRepository.getStock`) | No | API REAL | **NO UTILIZADO** |
| Logistics | `useLogisticsStore.js` | Sí (`logisticsRepository.*`) | No | API REAL | **NO UTILIZADO** |
| Marketing | `useMarketingStore.js` | Sí (`marketingRepository.getCampaigns`) | No | API REAL | **NO UTILIZADO** |
| Orders | `useOrdersStore.js` | Sí (`ordersRepository.getAll`) | No | API REAL | **NO UTILIZADO** |
| Payments | `usePaymentsStore.js` | Sí (`paymentsRepository.getAll`) | No | API REAL | **NO UTILIZADO** |
| Settings | `useSettingsStore.js` | Sí (`settingsRepository.*`) | No | API REAL | **NO UTILIZADO** |
| Textile | `useTextileStore.js` | Sí (`textileRepository.getMaterials`) | No | API REAL | **NO UTILIZADO** |
| Users | `useUsersStore.js` | Sí (`iamRepository.*`) | No | API REAL | **NO UTILIZADO** |

---

## Hallazgo Principal
Los 13 stores están **correctamente codificados** para interactuar con la capa de repositorios REST (`src/repositories/api.js`). Sin embargo, **ningún componente de página en `src/pages` importa o ejecuta estos stores**. Se encuentran en estado **NO UTILIZADO**.
