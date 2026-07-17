# R7.2A — Shared Hooks

> **Hooks reutilizables entre los 3 frontends**

---

## Package: `@alpacart/shared-hooks`

**Ubicación:** `packages/shared-hooks/src/`

### Hooks

| Hook | Props | Retorno | Descripción |
|------|-------|---------|-------------|
| `useAsync(asyncFn, deps)` | async function, dependencies | `{ data, loading, error, execute, reset }` | Async con AbortController |
| `useDebounce(value, delay)` | value, delay (ms) | debounced value | Debounce para inputs/búsqueda |
| `usePagination({ totalItems, pageSize, currentPage })` | totalItems, pageSize, currentPage | `{ totalPages, pages, hasPrev, hasNext }` | Lógica de paginación |
| `useInfiniteScroll({ threshold, onLoadMore })` | threshold, onLoadMore | `{ page, loading, hasMore, sentinelRef }` | Infinite scroll con IntersectionObserver |

### Uso

```jsx
import { useAsync, useDebounce, usePagination, useInfiniteScroll } from '@alpacart/shared-hooks';

// Async con cancelación
const { data, loading, error, execute } = useAsync(async (signal) => {
  const res = await api.get('/products', { signal });
  return res;
}, []);

// Debounce para búsqueda
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

// Paginación
const pagination = usePagination({ totalItems: 100, pageSize: 25, currentPage: 1 });

// Infinite scroll
const { sentinelRef } = useInfiniteScroll({
  threshold: 200,
  onLoadMore: async (page) => { await loadMore(page); },
});
```
