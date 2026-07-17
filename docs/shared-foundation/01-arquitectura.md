# Arquitectura del Monorepo

## Contenido

Alpacart utiliza un monorepo estructurado con **npm workspaces** desde la raíz. Los paquetes compartidos residen en `packages/` y los tres frontends en `frontend/`.

### Estructura

```
alpacart/
├── packages/
│   ├── shared-types/       # Interfaces TypeScript (20 interfaces)
│   ├── shared-constants/   # Rutas, claves de storage, temas, roles, etc.
│   ├── shared-utils/       # Utilidades puras (formateo, slug, debounce)
│   ├── shared-hooks/       # Placeholder — hooks a extraer desde dashboard
│   └── shared-ui/          # Placeholder — componentes UI a extraer post-R7
├── frontend/
│   ├── dashboard/          # 40+ páginas (admin, frozen)
│   ├── tienda/             # 20 páginas (e-commerce, frozen)
│   └── pagina-institucional/ # 11 páginas (landing, frozen)
├── docs/
│   └── shared-foundation/  # Esta documentación
└── package.json            # npm workspaces raíz
```

### Propósito de cada paquete

| Paquete | Estado | Consumido por |
|---|---|---|
| `shared-types` | ✅ Completo | Todos los frontends |
| `shared-constants` | ✅ Completo | Todos los frontends |
| `shared-utils` | ✅ Completo | Todos los frontends |
| `shared-hooks` | 🟡 Placeholder | Pendiente de extracción |
| `shared-ui` | 🔴 Futuro | Postergado a post-R7 |

### Cómo consumen los frontends

Cada frontend declara la dependencia en su `package.json` mediante el alias definido en el workspace raíz. Ejemplo:

```json
// frontend/dashboard/package.json
{
  "dependencies": {
    "@alpacart/shared-types": "workspace:*",
    "@alpacart/shared-utils": "workspace:*",
    "@alpacart/shared-constants": "workspace:*"
  }
}
```

Luego en código:

```typescript
import type { Product, Order } from '@alpacart/shared-types';
import { formatCurrency } from '@alpacart/shared-utils';
import { ROUTES } from '@alpacart/shared-constants';
```

### Beneficios

- **Código fuente único** para tipos, constantes y utilidades
- **Actualización centralizada**: un cambio propaga a los 3 frontends
- **Type Safety**: las interfaces viven en un solo lugar y se consumen con tipos completos
- **Bundle pequeño**: solo se importa lo que se usa (tree-shakeable)

## Score: 80/100
