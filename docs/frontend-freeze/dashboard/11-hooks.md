# Dashboard — Hooks

## Propósito

Los hooks son la interfaz entre las páginas y los stores. Ninguna página debe importar stores directamente ni contener datos mock inline.

## Hooks Implementados (13 dominio + 3 infraestructura)

### Hooks de Dominio

| Hook | Store | Retorna | Uso en Páginas |
|------|-------|---------|----------------|
| `useDashboard()` | useDashboardStore | `{ kpis, recentOrders, alerts, loading }` | Dashboard Home |
| `useCatalog()` | useCatalogStore | `{ products, loading, createProduct, updateProduct, deleteProduct }` | Catálogo, Productos |
| `useUsers()` | useUsersStore | `{ users, loading, createUser, updateUser, deleteUser }` | Usuarios |
| `useOrders()` | useOrdersStore | `{ orders, loading }` | Pedidos |
| `useClients()` | useClientsStore | `{ clients, loading, create, update, delete }` | CRM, Clientes |
| `usePayments()` | usePaymentsStore | `{ transactions, summary, loading }` | Pagos |
| `useInventory()` | useInventoryStore | `{ items, kpis, loading }` | Inventario, Stock |
| `useLogistics()` | useLogisticsStore | `{ shipments, carriers, loading }` | Logística, Envíos |
| `useMarketing()` | useMarketingStore | `{ campaigns, loading }` | Marketing, Campañas |
| `useCms()` | useCmsStore | `{ contents, loading }` | CMS, Contenido |
| `useAudit()` | useAuditStore | `{ logs, loading }` | Auditoría |
| `useSettings()` | useSettingsStore | `{ settings, loading, update }` | Configuración |
| `useTextile()` | useTextileStore | `{ variants, warehouses, loading }` | Textil |

### Hooks de Infraestructura

| Hook | Propósito |
|------|-----------|
| `useAuth()` | Autenticación (contexto existente) |
| `useLocalStorage(key, initial)` | Estado persistente en localStorage |
| `useClickOutside(handler)` | Detectar clics fuera de un elemento |

## Patrón de Implementación

```javascript
// useXxx.js
import { useEffect } from 'react';
import useXxxStore from '../stores/useXxxStore';

export default function useXxx() {
  const store = useXxxStore();
  useEffect(() => {
    if (store.data.length === 0) store.fetchAll();
  }, []);
  return store; // { data, loading, error, create, update, delete }
}
```

## Uso en Páginas

```javascript
import useCatalog from '@/hooks/useCatalog';

export default function ProductList() {
  const { products, loading } = useCatalog();
  if (loading) return <Spinner />;
  return products.map(p => <ProductCard key={p.id} product={p} />);
}
```

## Próximo Paso (F3-C)

Reemplazar los datos mock inline en las 42 páginas del Dashboard por estos hooks.
