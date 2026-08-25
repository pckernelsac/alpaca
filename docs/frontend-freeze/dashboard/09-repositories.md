# Dashboard — Repositories

## Estructura

Todos los repositories siguen el patrón `createRepository(mockData)` definido en `base.js`.

## Repositorios Implementados (13)

| # | Repositorio | Métodos | Mock Data | Uso |
|---|-------------|---------|-----------|-----|
| 1 | `base.js` | Factory: getAll, getById, create, update, delete, query | — | Base para todos |
| 2 | `dashboard.js` | kpis(), recentOrders(), alerts() | dashboardKpis, recentOrders, dashboardAlerts | Dashboard Home |
| 3 | `catalog.js` | CRUD completo | products | Catálogo, Productos |
| 4 | `users.js` | CRUD completo | users | Usuarios |
| 5 | `orders.js` | CRUD completo | orders | Pedidos |
| 6 | `clients.js` | CRUD completo | clients | CRM, Clientes |
| 7 | `payments.js` | getAll + getSummary() | transactions | Pagos |
| 8 | `inventory.js` | getAll + getKpis() | stockItems | Inventario, Stock |
| 9 | `logistics.js` | getAll + getCarriers() | shipments, carriers | Logística, Envíos |
| 10 | `marketing.js` | CRUD completo | campaigns | Marketing, Campañas |
| 11 | `cms.js` | CRUD completo | contents | CMS, Contenido |
| 12 | `audit.js` | CRUD completo | auditLogs | Auditoría |
| 13 | `textile.js` | getAll + getWarehouses() | textileVariants, warehouses | Textil |
| 14 | `settings.js` | get(), update() | companySettings | Configuración |

## Factory Base (`base.js`)

```javascript
function createRepository(mockData) {
  return {
    getAll: () => Promise.resolve([...data]),
    getById: (id) => Promise.resolve(data.find(i => i.id === id)),
    create: (item) => { const c = { ...item, id: Date.now() }; data.push(c); return Promise.resolve(c); },
    update: (id, changes) => { /* busca y actualiza */ },
    delete: (id) => { /* filtra */ },
    query: (fn) => Promise.resolve(data.filter(fn)),
  };
}
```

## Migración a Backend

Para conectar al backend real (R7+):
1. Reemplazar la importación de mock data por llamadas HTTP
2. Mantener la misma interfaz de métodos
3. Las stores y hooks no requieren cambios
