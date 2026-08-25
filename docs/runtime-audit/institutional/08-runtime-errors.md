# AUDITORÍA DE ERRORES DE RUNTIME — FRONTEND INSTITUCIONAL

## Clasificación de Problemas Detectados

Los problemas encontrados en la auditoría del Frontend Institucional se han priorizado según su impacto:

---

## Problemas Priorizados

### P0 — Críticos / Bloqueantes
1. **URL de Formulario de Contacto Inválida (`POST /api/v1/v1/contact`)**:
   - **Descripción**: `ContactForm.jsx` (línea 33) concatena `API + '/v1/contact'` usando `VITE_API_URL` que ya termina en `/v1` (`http://localhost:8000/api/v1`). Esto produce la petición HTTP `POST http://localhost:8000/api/v1/v1/contact`, que falla con `404 Not Found` impidiendo el envío de mensajes de contacto de clientes.
   - **Ubicación**: `src/pages/Contact/sections/ContactForm/ContactForm.jsx`

---

### P1 — Alta Severidad
1. **Sección `HomeGallery` y `HomeTestimonials` Desconectadas de API**:
   - **Descripción**: Aunque existen los repositorios `getGallery()` y `getTestimonials()` y sus respectivos hooks `useGallery` y `useTestimonials`, los componentes `HomeGallery.jsx` y `HomeTestimonials.jsx` muestran datos locales duros en lugar de consumir la API backend.
   - **Ubicación**: `src/pages/Home/sections/HomeGallery/HomeGallery.jsx` y `src/pages/Home/sections/HomeTestimonials/HomeTestimonials.jsx`

2. **Formulario `HomeNewsletter` Inoperativo**:
   - **Descripción**: El formulario de suscripción en el Home no tiene event handler (`onSubmit`) ni conecta con `useNewsletter` / `newsletterRepository.subscribe`.
   - **Ubicación**: `src/pages/Home/sections/HomeNewsletter/HomeNewsletter.jsx`

---

### P2 — Media Severidad
1. **Dependencia Externa CDN para Iconos**:
   - **Descripción**: Dependencia de Google Fonts CDN para renderizar Material Symbols.
   - **Ubicación**: `index.html` y estilos CSS de secciones.
