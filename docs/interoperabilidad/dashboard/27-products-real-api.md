# MIGRACIÓN DE CATÁLOGO DE PRODUCTOS — REAL API

## Integración de Productos (`/catalog/productos`)

Se migró la vista `ProductList.jsx` para consumir el endpoint paginado del backend NestJS.

---

## Cambios Realizados

1. **Eliminación de Array Inline**:
   - Se removió el arreglo estático `const products = [...]` que contenía 8 ítems ficticios (`ALP-INV-24-001`, etc.).

2. **Integración con Zustand Store (`useCatalogStore`)**:
   - `ProductList.jsx` consume `products`, `meta`, `loading`, `error` y `fetchAll` desde `useCatalogStore`.
   - Soporta parámetros de consulta `fetchAll({ page, perPage, q })`.

3. **Mappers y Domain Models**:
   - `catalogRepository.getProducts` ejecuta `mapProducts`, transformando cada DTO en un objeto de dominio `createProduct`.
   - Se procesa y preserva el objeto de paginación `meta` (`total`, `page`, `perPage`, `totalPages`) retornado por `PaginationInterceptor` del backend.

4. **Estados de UI Implementados**:
   - **Loading**: Mensaje interactivo durante la petición de red.
   - **Error**: Alerta de error con detalle en caso de fallo HTTP.
   - **Empty State**: Vista limpia cuando la consulta no arroja resultados.
   - **Success Table**: Tabla interactiva con datos reales, estado de stock dinámico y barra de paginación reactiva.
