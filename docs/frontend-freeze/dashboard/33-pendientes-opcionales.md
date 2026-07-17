# Dashboard — Pendientes Opcionales

## Para considerar post-freeze (no bloquean):

1. **Accesibilidad WCAG 2.2 AA** — Agregar ARIA labels completos, roles, skip-to-content
2. **Transiciones refinadas** — Agregar micro-interacciones en hover/active/focus
3. **Skeleton en páginas** — Reemplazar Spinner global por Skeleton contextual (tablas, cards, KPIs)
4. **Virtualización de listas** — Para tablas con muchos datos (react-window)
5. **Memoización selectiva** — React.memo en componentes de listas pesadas
6. **Imágenes lazy** — Agregar Intersection Observer para imágenes de products/media
7. **Formularios unificados** — Migrar formularios restantes al patrón FormField/FormSection
8. **Búsqueda global** — Agregar cmd+k search en el sidebar
