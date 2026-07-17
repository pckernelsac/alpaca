# Componentes Duplicados Identificados

## Contenido

Se identificaron **11 componentes** que están duplicados en los 3 frontends. Estos son candidatos a ser extraídos a `packages/shared-ui/` en releases futuras.

### Listado de componentes duplicados

| # | Componente | dashboard | tienda | institucional | Prioridad extracción |
|---|---|---|---|---|---|
| 1 | **Button** | `components/ui/Button.tsx` | `components/ui/Button.tsx` | `components/Button.tsx` | ⭐ Alta |
| 2 | **Card** | `components/ui/Card.tsx` | `components/ui/Card.tsx` | `components/Card.tsx` | ⭐ Alta |
| 3 | **Modal** | `components/ui/Modal.tsx` | `components/ui/Modal.tsx` | `components/Modal.tsx` | ⭐ Alta |
| 4 | **Input** | `components/ui/Input.tsx` | `components/ui/Input.tsx` | `components/Input.tsx` | ⭐ Alta |
| 5 | **Select** | `components/ui/Select.tsx` | `components/ui/Select.tsx` | `components/Select.tsx` | ⭐ Alta |
| 6 | **Badge** | `components/ui/Badge.tsx` | `components/ui/Badge.tsx` | `components/Badge.tsx` | 🟡 Media |
| 7 | **Loader** | `components/ui/Loader.tsx` | `components/ui/Loader.tsx` | `components/Loader.tsx` | 🟡 Media |
| 8 | **Spinner** | `components/ui/Spinner.tsx` | `components/ui/Spinner.tsx` | `components/Spinner.tsx` | 🟡 Media |
| 9 | **EmptyState** | `components/ui/EmptyState.tsx` | `components/ui/EmptyState.tsx` | `components/EmptyState.tsx` | 🟡 Media |
| 10 | **ErrorBoundary** | `components/ui/ErrorBoundary.tsx` | `components/ui/ErrorBoundary.tsx` | `components/ErrorBoundary.tsx` | 🔵 Baja |
| 11 | **Toast** | `components/ui/Toast.tsx` | `components/ui/Toast.tsx` | `components/Toast.tsx` | 🔵 Baja |

### Diferencias entre implementaciones

| Componente | Diferencias observadas |
|---|---|
| Button | dashboard usa `variant` (primary/secondary/danger); tienda usa `color` (blue/red/green); institucional solo `className` |
| Card | dashboard usa slots (header/body/footer); tienda es un solo contenedor; institucional es minimalista |
| Modal | dashboard con backdrop + animación; tienda con Portal; institucional sin animación |
| Input | dashboard con label flotante; tienda con label estático; institucional sin label |
| Toast | dashboard usa contexto global; tienda usa estado local; institucional no tiene Toast |

### Recomendación

Para la extracción, se recomienda:

1. **Diseñar una API unificada** que cubra los casos de uso de los 3 frontends
2. **Usar props con valores por defecto** para no romper el comportamiento existente
3. **Implementar con Typescript estricto** y `displayName`
4. **Agregar Storybook** para documentar variantes visuales
5. **Priorizar Button y Card** como pilotos por ser los más simples

## Score: —/100

Sin puntuación — es un catálogo de hallazgos, no un entregable puntuable.
