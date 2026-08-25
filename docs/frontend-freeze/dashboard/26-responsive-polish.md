# Dashboard — Responsive Polish

## Resumen
CSS Grid y Flexbox se usan en todo el dashboard. La Sidebar colapsa en móvil. Las tablas hacen scroll horizontal en pantallas pequeñas. Los formularios se apilan verticalmente.

## Hallazgos
- Layout principal: Grid con sidebar + contenido (`grid-template-columns`).
- Sidebar: colapsa a icon-only en tablet y se oculta con toggle en móvil.
- Tablas: `overflow-x: auto` en contenedor para scroll horizontal en móvil.
- Formularios: columnas simples que se apilan (Grid → 1 columna en móvil).
- Tarjetas (KPIs): grid responsivo (`repeat(auto-fill, minmax(250px, 1fr))`).
- Sin breakpoints personalizados — se usan media queries estándar (768px, 1024px).
- Topbar: no colapsa elementos; se desborda en pantallas muy pequeñas (< 360px).

## Score: 80/100
