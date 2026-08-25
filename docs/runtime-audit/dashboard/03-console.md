# ERRORES DEL NAVEGADOR — DASHBOARD FRONTEND

## Resumen de Consola y Runtime Web

### 1. JavaScript / React Errors
- **No exceptions at render**: Al no ejecutar peticiones asíncronas ni hooks reactivos de API en las páginas, no ocurren excepciones por promesas rechazadas (`Unhandled Promise Rejection`).
- **Controlador de Formulario Incompleto**: En componentes como `ProductList.jsx`, `ClientList.jsx` y `UserList.jsx`, las interacciones de filtrado, paginación y búsqueda no emiten eventos a la red; la lógica de estado es meramente visual.

### 2. Warnings de Autenticación y Entorno
- **Warning VITE_DASHBOARD_PREVIEW**: `.env.development` contiene `VITE_DASHBOARD_PREVIEW=true`. El componente `PreviewProvider.jsx` ejecuta en un `useEffect` inicial el auto-login simulado:
  ```js
  login('preview_token', { name: 'Admin Preview', email: 'preview@alpacart.com', role: 'Super Administrador' });
  ```
  Esto bypasses la autenticación real en consola y oculta la falta de persistencia real de sesión JWT con el backend.

### 3. Recursos e Iconos Externos
- **Material Symbols Font CDN**: Las vistas dependen de la fuente externa de Google Fonts (`Material Symbols Outlined`). Si no hay conexión externa a Google Font CDN, se renderizan textos planos (ej: `payments`, `inventory_2`) en lugar de iconos.

### 4. Errores HTTP en Network Tab
- **401 Unauthorized**: No se producen 401 durante la navegación en modo preview ya que no se envía ningún `Authorization Bearer` a las APIs reales.
- **CORS / Timeouts**: No registrados debido a la ausencia de tráfico HTTP activo en las vistas internas del Dashboard.
