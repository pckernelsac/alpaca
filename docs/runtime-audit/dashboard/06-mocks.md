# AUDITORÍA DE MOCKS Y DATOS SIMULADOS — DASHBOARD

## Búsqueda y Clasificación de Mocks

Se realizó una auditoría exhaustiva en la estructura del Frontend Dashboard para identificar archivos de prueba, objetos inline, JSON locales y datos ficticios.

---

## Inventario General de Mocks Encontrados

| Archivo / Componente | Tipo de Mock | Descripción | Usado en Vista |
|----------------------|--------------|-------------|----------------|
| `src/preview/PreviewProvider.jsx` | Auth Mock | Inyecta `preview_token` y usuario simulado `preview@alpacart.com` | Global en Dev |
| `src/pages/Dashboard/dashboardData.js` | Data Object Hardcodeado | Arreglos de KPIs, alertas, gráficos, órdenes recientes y actividad | `/` (Executive Dashboard) |
| `src/pages/ProductList/ProductList.jsx` | Array Inline | Arreglo local con 8 productos ficticios (SKUs ALP-INV-24-001...) | `/catalog/productos` |
| `src/pages/OrderList/OrderList.jsx` | Array Inline | Arreglo local con 8 pedidos ficticios | `/orders/list` |
| `src/pages/ClientList/ClientList.jsx` | Array Inline | Arreglo local con clientes B2B/B2C simulados | `/crm/clientes` |
| `src/pages/UserList/UserList.jsx` | Array Inline | Arreglo local con 6 usuarios administrativos | `/usuarios` |
| `src/pages/TransactionList/TransactionList.jsx` | Array Inline | Transacciones financieras hardcodeadas | `/payments/transactions` |
| `src/pages/StockList/StockList.jsx` | Array Inline | Ítems de inventario y stock simulados | `/inventory/stock` |
| `src/pages/ShipmentList/ShipmentList.jsx` | Array Inline | Envíos y guías ficticias | `/logistics/envios` |
| `src/pages/CampaignList/CampaignList.jsx` | Array Inline | Campañas de marketing locales | `/marketing/campanas` |
| `src/pages/ContentList/ContentList.jsx` | Array Inline | Artículos y banners CMS locales | `/cms/contenido` |
| `src/pages/TextileVariantList/TextileVariantList.jsx` | Array Inline | Variantes de hilos y fibras simuladas | `/textil/variantes` |
| `src/pages/AuditLog/AuditLog.jsx` | Array Inline | Logs de auditoría estáticos | `/audit` |
| `src/pages/Settings/Settings.jsx` | Object Inline | Configuración de empresa estática | `/settings` |

---

## Patrones Detectados
- **Archivos `*Data.js`**: `src/pages/Dashboard/dashboardData.js` sirve de fuente única de datos para el tablero principal.
- **Formularios de Creación**: Componentes como `ProductCreate.jsx`, `ClientCreate.jsx`, `UserCreate.jsx` procesan el submit mediante `useState` local y `console.log` o `navigate()`, sin consumir las funciones `create*` de los repositories o stores.
