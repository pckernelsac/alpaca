# R7.2A — Shared Components

> **Componentes UI reutilizables entre los 3 frontends**

---

## Package: `@alpacart/shared-ui`

**Ubicación:** `packages/shared-ui/src/`

### Componentes

| Componente | Props | Descripción |
|-----------|-------|-------------|
| `Spinner` | `size`, `color`, `className` | SVG spinner animado |
| `Skeleton` | `width`, `height`, `borderRadius`, `className` | Placeholder shimmer |
| `EmptyState` | `icon`, `title`, `description`, `action` | Estado vacío con icono |
| `ErrorBoundary` | `fallback`, `onError`, `children` | Error boundary React |
| `Toast` | `message`, `type`, `duration`, `onClose` | Notificación temporal |
| `Loading` | `text`, `size` | Pantalla de carga con spinner |
| `useToast` | — | Hook para gestionar toasts |

### Uso

```jsx
import { Spinner, Skeleton, EmptyState, ErrorBoundary, Loading, useToast } from '@alpacart/shared-ui';

// Loading state
{ loading && <Loading text="Cargando productos..." /> }

// Skeleton placeholder
<Skeleton width="100%" height={200} />

// Empty state
<EmptyState icon="search" title="Sin resultados" description="Intenta con otros filtros" />

// Error boundary
<ErrorBoundary fallback={<div>Error</div>}>
  <App />
</ErrorBoundary>

// Toast notifications
const { addToast, toastElements } = useToast();
addToast('Producto agregado', 'success');
```
