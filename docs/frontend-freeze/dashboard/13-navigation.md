# Navigation Audit

## Resumen
Todas las rutas están definidas en `src/routes/routes.jsx`. El Sidebar usa `NavLink` de react-router-dom para manejar estados activos. Breadcrumbs existen en páginas principales. El menú del Sidebar es colapsable por sección.

## Hallazgos
- 43 rutas definidas con lazy loading, layouts (admin/auth/main) y protección por ruta
- Sidebar con 13 secciones agrupadas, cada una colapsable vía UIContext
- NavLink con clase `active` cuando la ruta coincide
- Chevron animado en grupos colapsados/expandidos
- Breadcrumbs implementados manualmente en páginas como ProductList, ProductCreate, ClientCreate, Settings
- Sidebar se cierra automáticamente al navegar en mobile
- Ruta comodín `*` redirige a NotFound
- Sin breadcrumbs globales ni componente de breadcrumb reutilizable

## Score: 85/100
