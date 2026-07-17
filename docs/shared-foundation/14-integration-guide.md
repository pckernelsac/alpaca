# Shared Foundation — Integration Guide

## Cómo consumir los paquetes

### En cualquier frontend (Dashboard, Tienda, Institucional)

```typescript
// shared-types
import type { Product, Customer, Order } from '@alpacart/shared-types';

// shared-utils
import { formatCurrency, slugify, debounce } from '@alpacart/shared-utils';

// shared-constants
import { ROUTES, THEME, BREAKPOINTS, ORDER_STATUS } from '@alpacart/shared-constants';
```

### En backend (NestJS)

El backend no usa aliases. Los tipos se definen directamente en `backend/src/`.
Para sincronización manual, los interfaces en `shared-types` deben reflejar las entidades Sequelize.

## Flujo de trabajo para nuevas interfaces

1. Definir tipo en `packages/shared-types/src/index.ts`
2. Exportar desde `packages/shared-types/package.json` si es necesario
3. Usar `@alpacart/shared-types` en cualquier frontend
4. Si el backend necesita el mismo tipo, copiar a `backend/src/common/types/`

## Migración de imports (aplicada)

Se migraron imports duplicados de los 3 frontends a los paquetes compartidos:

| Concepto | Origen (duplicado) | Destino (compartido) |
|----------|-------------------|---------------------|
| formatCurrency | Dashboard utils/ Tienda utils/ Institucional utils | @alpacart/shared-utils |
| slugify | Dashboard utils/ Tienda utils | @alpacart/shared-utils |
| ROUTES constantes | Dashboard config/ Tienda config/ Institucional config | @alpacart/shared-constants |
| THEME colors | Dashboard theme/ Tienda theme/ Institucional theme | @alpacart/shared-constants |
| BREAKPOINTS | Dashboard config/ Tienda config | @alpacart/shared-constants |
| Order/Customer/Product types | Dashboard types/ Tienda types/ Institucional types | @alpacart/shared-types |

## Verificación post-migración

```bash
# Cada frontend debe buildear sin errores
cd frontend/dashboard && npx vite build
cd frontend/tienda && npx vite build
cd frontend/pagina-institucional && npx vite build
```

## Buenas prácticas

1. **No duplicar tipos**: si existe en shared-types, úsalo desde allí
2. **Utils puras**: shared-utils solo contiene funciones sin side effects
3. **Constantes inmutables**: shared-constants usa `as const` y `Object.freeze`
4. **Backend primero**: el backend es source of truth; actualizar shared-types cuando cambien las entidades
5. **Build check**: siempre correr build de los 3 frontends después de cambiar shared packages
