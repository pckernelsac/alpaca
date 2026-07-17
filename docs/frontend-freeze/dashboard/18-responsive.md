# Responsive Audit

## Resumen
El dashboard tiene comportamiento responsive básico. El Sidebar colapsa en mobile con overlay, las tablas tienen scroll horizontal y los formularios apilan sus campos verticalmente.

## Hallazgos
- AdminLayout: sidebar ocupa 260px en desktop (>768px), colapsado en mobile con overlay
- Sidebar: toggle con botón hamburguesa en Navbar, cierre automático al hacer clic fuera o navegar
- Navbar: los elementos se reordenan en mobile (CTA label oculto, solo icono)
- Tablas: scroll horizontal en contenedores (`.tableWrap`, `.tableWrapper`) para evitar desborde
- Dashboard: KPIs grid responsive con CSS grid, charts se apilan en mobile (chartSection flex-column)
- Formularios: layout de grid a flex column en viewports pequeños
- Login: centrado con max-width 440px, funciona bien en mobile
- CSS variables usadas consistentemente facilitan cambios de layout
- Sin media queries para tablet (solo breakpoint 768px)
- Algunas páginas con tablas anchas (OrderList, ProductList) pueden requerir mejoras en mobile

## Score: 80/100
