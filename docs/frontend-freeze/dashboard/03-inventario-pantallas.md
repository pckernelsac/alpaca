# Dashboard — Inventario de Pantallas

Total: **42 páginas** (40 funcionales + Login + NotFound)

| # | Pantalla | Ruta | Módulo | Estado | Mock |
|---|----------|------|--------|--------|------|
| 1 | Login | /login | Auth | ✅ | localStorage |
| 2 | Dashboard Home | / | Dashboard | ✅ | dashboardData.js |
| 3 | Catalog Dashboard | /catalog | Catálogo | ✅ | inline |
| 4 | Product List | /catalog/productos | Catálogo | ✅ | inline |
| 5 | Product Create | /catalog/productos/nuevo | Catálogo | ✅ | inline |
| 6 | Product Media | /catalog/productos/multimedia | Catálogo | ✅ | inline |
| 7 | Variant List | /catalog/variantes | Catálogo | ✅ | inline |
| 8 | Variant Create | /catalog/variantes/nueva | Catálogo | ✅ | inline |
| 9 | Order Dashboard | /orders | Pedidos | ✅ | inline |
| 10 | Order List | /orders/list | Pedidos | ✅ | inline |
| 11 | Order Detail | /pedidos/detalle | Pedidos | ✅ | inline |
| 12 | Order Timeline | /pedidos/seguimiento | Pedidos | ✅ | inline |
| 13 | CRM Dashboard | /crm | CRM | ✅ | inline |
| 14 | Client List | /crm/clientes | CRM | ✅ | inline |
| 15 | Client Create | /crm/clientes/nuevo | CRM | ✅ | inline |
| 16 | Client Profile | /crm/clientes/perfil | CRM | ✅ | inline |
| 17 | Payment Dashboard | /payments | Pagos | ✅ | inline |
| 18 | Transaction List | /payments/transactions | Pagos | ✅ | inline |
| 19 | Inventory Dashboard | /inventory | Inventario | ✅ | inline |
| 20 | Stock List | /inventory/stock | Inventario | ✅ | inline |
| 21 | Kardex | /inventory/kardex | Inventario | ✅ | inline |
| 22 | Movement List | /inventory/movements | Inventario | ✅ | inline |
| 23 | Logistics Dashboard | /logistics | Logística | ✅ | inline |
| 24 | Shipment List | /logistics/envios | Logística | ✅ | inline |
| 25 | Marketing Dashboard | /marketing | Marketing | ✅ | inline |
| 26 | Campaign List | /marketing/campanas | Marketing | ✅ | inline |
| 27 | CMS Dashboard | /cms | CMS | ✅ | inline |
| 28 | Content List | /cms/contenido | CMS | ✅ | inline |
| 29 | Textile Dashboard | /textile | Textil | ✅ | inline |
| 30 | Transfer List | /textile/transferencias | Textil | ✅ | inline |
| 31 | Textile Variants | /textil/variantes | Textil | ✅ | inline |
| 32 | User List | /usuarios | IAM | ✅ | inline |
| 33 | User Create | /usuarios/nuevo | IAM | ✅ | inline |
| 34 | Role List | /usuarios/roles | IAM | ✅ | inline |
| 35 | Permission Matrix | /usuarios/permisos | IAM | ✅ | inline |
| 36 | My Profile | /mi-perfil | Usuario | ✅ | inline |
| 37 | Analytics | /analytics | Reportes | ✅ | inline |
| 38 | Audit Log | /audit | Auditoría | ✅ | inline |
| 39 | Settings | /settings | Config | ✅ | inline |
| 40 | Master Data | /datos-maestros | Maestros | ✅ | inline |
| — | NotFound | * | Error | ✅ | inline |

## Estado general
- Todas las pantallas existen y renderizan correctamente
- 100% datos mock inline
- 40 rutas protegidas + Login público + NotFound
- Preview mode permite acceso completo sin autenticación
