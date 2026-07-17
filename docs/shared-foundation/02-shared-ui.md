# shared-ui — Extracción Futura

## Contenido

El paquete `packages/shared-ui/` existe como **directorio placeholder**. Su extracción real está postergada hasta después de la Release 7 (R7).

### Situación actual

Cada frontend tiene su propia implementación duplicada de componentes básicos:

| Componente | dashboard | tienda | institucional |
|---|---|---|---|
| Button | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ |
| Modal | ✅ | ✅ | ✅ |
| Select | ✅ | ✅ | ✅ |
| Badge | ✅ | ✅ | ✅ |
| Loader | ✅ | ✅ | ✅ |
| Spinner | ✅ | ✅ | ✅ |
| EmptyState | ✅ | ✅ | ✅ |
| ErrorBoundary | ✅ | ✅ | ✅ |
| Toast | ✅ | ✅ | ✅ |

### Razones para postergar

1. **Alto riesgo de regresiones**: Los componentes UI tienen estilos, props y comportamientos ligeramente distintos en cada frontend. Unificarlos requiere refactor cruzado y pruebas visuales.
2. **Los frontends están congelados**: No se pueden hacer cambios que requieran modificar los 3 frontends simultáneamente.
3. **shared-ui requeriría su propio build**: A diferencia de types/constants/utils (código puro sin bundler), los componentes necesitan JSX + CSS → requieren configuración de build (Vite/Rollup).
4. **Dependencia de diseño atómico**: Idealmente shared-ui seguiría un sistema de diseño (Storybook, tokens de diseño) que aún no existe.

### Plan futuro

```
R7 (congelamiento) → R8 o R9:
1. Elegir componente candidato (Button — el más simple)
2. Migrar a shared-ui con props unificadas
3. Reemplazar importaciones en los 3 frontends
4. Iterar con los demás componentes
```

## Score: —/100

Sin puntuación por ser un placeholder sin implementación.
