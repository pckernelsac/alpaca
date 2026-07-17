# Dashboard — Accessibility Polish

## Resumen
Se agregaron `aria-label` a elementos interactivos clave en la Sidebar. Focus visible implementado vía CSS. La navegación por teclado es funcional. El componente Skeleton incluye `aria-hidden="true"` y `role="status"`.

## Hallazgos
- Sidebar: `aria-label` en enlaces de navegación y botón de colapso.
- Topbar: `aria-label` en botón de toggle de tema.
- Focus visible: outline personalizado en `:focus-visible` para todos los elementos interactivos.
- Skeleton: `aria-hidden="true"` en las barras animadas y `role="status"` en el contenedor.
- Tablas: sin `aria-sort` en encabezados, sin `role="row"` explícito.
- Formularios: `aria-describedby` no implementado para mensajes de error.
- Sin skip-to-content link.
- Sin contraste verificado contra WCAG AA.

## Score: 75/100
