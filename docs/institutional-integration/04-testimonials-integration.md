# FASE III: INTEGRACIÓN DE TESTIMONIOS

## Conexión Real de Testimonios (`HomeTestimonials.jsx`)

---

## 1. OBJETIVO
Sustituir el texto hardcodeado de citas en `HomeTestimonials.jsx` por los testimonios reales servidos desde la API REST NestJS.

## 2. ARCHIVO AFECTADO
`frontend/pagina-institucional/src/pages/Home/sections/HomeTestimonials/HomeTestimonials.jsx`

## 3. CAMBIO REALIZADO
Se migró `HomeTestimonials.jsx` al hook `useTestimonials()`, el cual ejecuta `cmsService.getTestimonials()` y procesa el resultado con `mapTestimonials`.

```javascript
const { testimonials, loading, error, fetch } = useTestimonials();

useEffect(() => {
  fetch();
}, [fetch]);
```

## 4. DETALLES DE RED & ENDPOINT
- **Endpoint Real**: `/testimonials`
- **Request HTTP**: `GET /api/v1/testimonials`
- **Response esperado**: Colección JSON de testimonios con DTO `{ id, author, text, company, active }`.

## 5. EVIDENCIA & RESULTADO
- **Estado**: **PASS**
- **Manejo de Estados UI**: Implementados estados de carga, error y renderizado de la cita destacada de forma dinámica.
