# Tables Audit

## Resumen
Las páginas con listados (ProductList, ClientList, OrderList, UserList, VariantList, etc.) usan datos mock hardcodeados dentro del mismo componente o desde `mocks/data.js`. No hay paginación, ordenamiento ni filtrado real del lado del servidor. Existe un componente DataTable reutilizable y componentes auxiliares (EmptyState, FiltersBar, StatusBadge, TableToolbar).

## Hallazgos
- DataTable.jsx: componente reutilizable con soporte para selección de filas, sort visual (solo frontend), striped rows, empty state
- EmptyState.jsx: componente para estado vacío con icono, título, descripción y acción
- TableToolbar.jsx: toolbar con SearchInput y slot para acciones
- ProductList: datos inline (8 productos), checkboxes, stock bars, breadcrumbs, sin paginación real
- ClientList: datos inline (5 clientes), filtros locales (search, status, type), paginación visual client-side
- OrderList: datos inline (6 pedidos), KPI cards arriba, checkboxes, sin paginación real
- UserList, VariantList, MovementList, CampaignList, ContentList: mismo patrón de datos mock inline
- Sin llamadas HTTP ni integración con API real

## Score: 70/100
