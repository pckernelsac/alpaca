# FASE I: CORRECCIÓN DE FORMULARIO DE CONTACTO

## Integración del Formulario de Contacto (`/contacto`)

---

## 1. OBJETIVO
Eliminar el error P0 donde `ContactForm.jsx` ejecutaba `fetch(API + '/v1/contact')`, ocasionando peticiones erróneas a `POST /api/v1/v1/contact` (404 Not Found).

## 2. PROBLEMA DETECTADO
El componente `ContactForm.jsx` evitaba la capa de abstracción del proyecto (`useContact` ➔ `contactService` ➔ `contactRepository`) realizando una llamada directa a `fetch` con `/v1/contact` concatenado al `VITE_API_URL`.

## 3. ARCHIVO AFECTADO
`frontend/pagina-institucional/src/pages/Contact/sections/ContactForm/ContactForm.jsx`

## 4. CAMBIO REALIZADO
Se refactorizó `ContactForm.jsx` para utilizar el hook `useContact()`, delegando la llamada HTTP a `contactRepository.send(data)` a través de la arquitectura institucional.

```javascript
// Llamada limpia mediante hook institucional
const { send, loading, success, error: apiError, reset } = useContact();
const ok = await send(form);
```

## 5. DETALLES DE RED & ENDPOINT
- **Endpoint Real**: `/contact`
- **URL Base ApiClient**: `http://localhost:3000/api/v1`
- **Request HTTP**: `POST /api/v1/contact`
- **Payload**: `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`
- **Respuesta Esperada**: `201 Created`

## 6. EVIDENCIA & RESULTADO
- **Estado**: **PASS**
- **Validaciones**: Se agregaron mensajes de error por campo, deshabilitado de controles durante `loading`, mensaje de éxito (`success`) y botón de reinicio (`reset`).
