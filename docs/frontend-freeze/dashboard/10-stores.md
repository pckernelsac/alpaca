# Dashboard — Stores

## Tecnología

Zustand — estado global liviano.

Cada store sigue la misma estructura:

```javascript
import { create } from 'zustand';
import repo from '../repositories/xxx.js';

const useStore = create((set) => ({
  data: [],           // datos del dominio
  loading: false,     // estado de carga
  error: null,        // errores
  selected: null,     // selección actual
  
  // Métodos asíncronos
  fetchAll: async () => { set({ loading: true }); const d = await repo.getAll(); set({ data: d, loading: false }); },
  create: async (item) => { const c = await repo.create(item); set((s) => ({ data: [...s.data, c] })); },
  update: async (id, changes) => { const u = await repo.update(id, changes); set((s) => ({ data: s.data.map(x => x.id === id ? u : x) })); },
  delete: async (id) => { await repo.delete(id); set((s) => ({ data: s.data.filter(x => x.id !== id) })); },
}));
```

## Stores Implementados (13)

| Store | Datos | Métodos Especiales |
|-------|-------|-------------------|
| useDashboardStore | kpis, recentOrders, alerts | fetchKpis() |
| useCatalogStore | products | createProduct, updateProduct, deleteProduct |
| useUsersStore | users | createUser, updateUser, deleteUser |
| useOrdersStore | orders | fetchAll |
| useClientsStore | clients | create, update, delete |
| usePaymentsStore | transactions, summary | fetchAll (incluye summary) |
| useInventoryStore | items, kpis | fetchAll (incluye KPIs) |
| useLogisticsStore | shipments, carriers | fetchAll |
| useMarketingStore | campaigns | fetchAll |
| useCmsStore | contents | fetchAll |
| useAuditStore | logs | fetchAll |
| useSettingsStore | settings | fetch, update |
| useTextileStore | variants, warehouses | fetchAll |

## Flujo de Datos

1. Hook llama a `store.fetchAll()` al montar el componente
2. Store establece `loading: true`
3. Store llama al repository
4. Repository devuelve datos mock (Promise)
5. Store establece `data` y `loading: false`
6. Componente se re-renderiza con los datos
