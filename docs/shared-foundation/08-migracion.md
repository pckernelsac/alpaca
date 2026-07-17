# Plan de Migración

## Contenido

El plan de migración hacia Shared Foundation se divide en 3 fases. La Fase 1 está completada; las Fases 2 y 3 están en ejecución.

### Fase 1: Creación de paquetes ✅ COMPLETADA

| Paquete | Comando | Estado |
|---|---|---|
| `shared-types` | `npm init` + interfaces | ✅ |
| `shared-constants` | `npm init` + constantes | ✅ |
| `shared-utils` | `npm init` + utilidades | ✅ |
| `shared-hooks` | `npm init` (vacío) | ✅ placeholder |
| `shared-ui` | `npm init` (vacío) | ✅ placeholder |

Configuración raíz:
- `package.json` con `"workspaces": ["packages/*"]`
- Cada paquete tiene su propio `package.json` con `"name": "@alpacart/..."` y `"main": "src/index.ts"`

### Fase 2: Alias en vite.config 🔄 EN PROCESO

Cada frontend debe agregar un alias `@alpacart/*` en su `vite.config.ts`:

```typescript
// frontend/<nombre>/vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@alpacart/shared-types': path.resolve(__dirname, '../../packages/shared-types/src'),
      '@alpacart/shared-constants': path.resolve(__dirname, '../../packages/shared-constants/src'),
      '@alpacart/shared-utils': path.resolve(__dirname, '../../packages/shared-utils/src'),
    },
  },
});
```

### Fase 3: Reemplazo de importaciones 🔄 EN PROCESO

Buscar y reemplazar importaciones locales por `@alpacart/*`.

```typescript
// ANTES
import type { Product } from '../../../types/product';
import { ROUTES } from '../../../constants/routes';
import { formatCurrency } from '../../../utils/format';

// DESPUÉS
import type { Product } from '@alpacart/shared-types';
import { ROUTES } from '@alpacart/shared-constants';
import { formatCurrency } from '@alpacart/shared-utils';
```

### Estrategia de reemplazo por frontend

| Frontend | Prioridad | Archivos a modificar | Dependencias a agregar |
|---|---|---|---|
| dashboard | Alta | ~15 archivos | shared-types, shared-utils, shared-constants |
| tienda | Media | ~8 archivos | shared-types, shared-utils, shared-constants |
| pagina-institucional | Baja | ~3 archivos | shared-types, shared-utils, shared-constants |

### Fase 4 (futura): shared-hooks y shared-ui

| Paquete | Release | Acción |
|---|---|---|
| shared-hooks | R8 | Extraer hooks desde dashboard |
| shared-ui | R9-R10 | Extraer componentes UI con Storybook |

## Score: —/100

Sin puntuación — es un plan de trabajo, no un entregable puntuable.
