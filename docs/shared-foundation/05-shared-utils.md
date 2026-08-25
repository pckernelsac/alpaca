# shared-utils — Funciones Utilitarias

## Contenido

`packages/shared-utils/src/index.ts` exporta **8 funciones** de utilidad general. Son funciones puras, sin dependencias externas ni efectos secundarios.

### Listado completo

| # | Función | Firma | Descripción |
|---|---|---|---|
| 1 | **formatCurrency** | `(amount: number, currency = 'USD') => string` | Formatea monto monetario con locale `es-PE`. Ej: `S/ 150.00` |
| 2 | **formatDate** | `(date: string \| Date) => string` | Formatea fecha en formato corto (ej. `jul. 16, 2026`) |
| 3 | **formatPercentage** | `(value: number) => string` | Formatea porcentaje con 1 decimal (ej. `15.5%` recibe 15.5, divide entre 100) |
| 4 | **slugify** | `(text: string) => string` | Convierte texto a slug URL-safe. Ej: `"Hola Mundo" → "hola-mundo"` |
| 5 | **truncate** | `(text: string, length = 100) => string` | Trunca texto y agrega `...` si excede el largo |
| 6 | **generateUUID** | `() => string` | Genera UUID v4 usando `crypto.randomUUID()` |
| 7 | **classNames** | `(...args: (string \| false \| null \| undefined)[]) => string` | Concatena clases condicionalmente (similar a clsx) |
| 8 | **debounce** | `<T>(fn: T, ms = 300) => (...args: Parameters<T>) => void` | Crea versión debounced de una función |

### Uso en frontends

```typescript
import { formatCurrency, formatDate, slugify, truncate, generateUUID, classNames, debounce } from '@alpacart/shared-utils';
```

### Notas

- **Locale**: todas las funciones de formateo usan `es-PE` (Perú). Si se requiere soporte multi-locale en el futuro, habrá que parametrizarlo.
- **formatPercentage**: recibe el valor numérico directamente (ej. `12.5` = 12.5%) y divide internamente entre 100 para `Intl.NumberFormat`.
- **classNames**: implementación minimalista tipo `clsx`, sin soporte para objetos ni arrays anidados.
- **Sin dependencias externas**: cero librerías npm — todo es nativo del runtime.

### Pendiente

- Agregar tests unitarios con Vitest
- Evaluar `generateUUID` → usar `nanoid` si `crypto.randomUUID()` no está disponible en todos los entornos

## Score: 80/100

Pérdida de 20 puntos por: (i) sin tests automatizados, (ii) `formatPercentage` tiene semántica confusa (divide entre 100 internamente), (iii) `classNames` no soporta objetos/arrays como clsx, (iv) `debounce` carece de opciones `leading`/`trailing`.
