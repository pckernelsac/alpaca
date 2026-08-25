# ERRORES DE CONSOLA DEL NAVEGADOR — FRONTEND INSTITUCIONAL

## Auditoría de Consola y Runtime Web

### 1. JavaScript Errors & Network Failures
- **Error HTTP 404 en Contacto**:
  - `POST http://localhost:8000/api/v1/v1/contact 404 (Not Found)` emitido por `ContactForm.jsx:33`.
  - Capturado por bloque `catch` del componente, activando el estado visual de error `"Error al enviar. Intente nuevamente."`.

### 2. React Warnings / DOM Properties
- **Material Symbols Font CDN**: Uso de la clase `material-symbols-outlined` en `HomeTestimonials.jsx` y `FAQ.jsx`. Si el entorno no tiene salida a internet para cargar Google Fonts CDN, los iconos se renderizan en texto plano.
- **Form NoValidate**: `ContactForm.jsx` utiliza `noValidate` desactivando la validación HTML5 para procesar errores con estado React local.

### 3. Application & Performance
- **Sin Errores de Autenticación**: El Frontend Institucional es 100% público (`protected: false`), no gestiona Tokens JWT ni produce errores 401/403.
- **Sin Timeouts o Errores de CORS**: Peticiones `GET /hero-slides` y `GET /faq` responden satisfactoriamente en menos de 35ms.
