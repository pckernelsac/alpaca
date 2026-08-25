# Dashboard — Tables Polish

## Resumen
El componente `DataTable` (en `components/data/`) se utiliza en múltiples páginas del dashboard. Las tablas cuentan con encabezados, filas y estilos básicos consistentes. Todos los datos son inline (mock), sin paginación real — solo paginación visual simulada.

## Hallazgos
- `DataTable` presente y reutilizado en la mayoría de páginas con listados.
- Estructura consistente: `thead`/`tbody`, filas zebradas, hover state.
- Paginación visual con controles que no ejecutan lógica real.
- Sin ordenamiento de columnas ni filtros en línea.
- Sin estados vacío (`empty state`) definido en el componente base.
- Sin indicador de carga integrado en la tabla (depende de cada página).
- Column actions presente con iconos de editar/eliminar en todas las tablas.

## Score: 75/100
