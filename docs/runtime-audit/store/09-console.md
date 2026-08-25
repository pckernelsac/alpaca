# ERRORES DE CONSOLA DEL NAVEGADOR — TIENDA

## Auditoría de Runtime y Consola Web

### 1. JavaScript Errors & Promesas Rechazadas
- **Clean Execution**: No se registraron excepciones no capturadas (`Uncaught TypeError` o `Unhandled Promise Rejection`) durante la ejecución de los flujos de navegación, login, carrito y checkout.

### 2. Warnings de React y PropType Warnings
- **Controlador de Fuentes Externas (CDN)**:
  - Uso de clases `material-symbols-outlined` dependientes de Google Fonts CDN. Sin conexión a internet externa, los iconos muestran su identificador textual.
- **Formularios de Búsqueda y Carrito**:
  - `StoreHeader.jsx` lee directamente `localStorage.getItem('tienda_cart')` en render inicial, lo cual puede generar leves diferencias en SSR o montado hidratado.

### 3. Solicitudes Fallidas en Network
- **401 Unauthorized esperado**: Emitido intencionalmente al invocar `useCart().fetch()` sin token activo para determinar la necesidad de fallback en `localStorage`.
- **Zero CORS / Timeouts**: La API responde dentro de los umbrales esperados (<150ms).
