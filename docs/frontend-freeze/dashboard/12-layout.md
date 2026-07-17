# Layout Audit

## Resumen
El layout del Dashboard se compone de un Sidebar colapsable con iconos y secciones, un Topbar (Navbar) con información de usuario, notificaciones, búsqueda y acciones contextuales, y un área de contenido principal. Se identificaron 3 layouts: MainLayout, AdminLayout y AuthLayout.

## Hallazgos
- AdminLayout implementa Sidebar + Navbar + main content area con flexbox
- Sidebar con 13 secciones colapsables (controlado por UIContext > collapsedSections)
- Sidebar usa NavLink con estado active/hover vía CSS modules
- Sidebar tiene overlay en mobile y se cierra al hacer clic fuera (useClickOutside)
- Navbar incluye: menú hamburguesa, buscador, botones de ayuda/config/notificaciones, avatar de usuario con logout
- Navbar tiene CTA contextual ("Crear Producto", "Nuevo Cliente", etc.) según la ruta activa
- Breakpoint responsive en 768px: sidebar se oculta y wrapper usa margin-left: 260px en desktop
- CSS variables para sidebar-width (260px), topbar-height (56px), container-margin (32px)
- Contenido principal con padding y background-color: var(--color-surface-container)

## Score: 90/100
