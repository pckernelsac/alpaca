# AUDITORÍA DE MOCKS — FRONTEND INSTITUCIONAL

## Inventario de Mocks y Objetos Ficticios

Se auditó el código del Frontend Institucional para identificar repositorios mock, respuestas simuladas o datos locales.

---

## Archivos y Mocks Encontrados

| Archivo / Componente | Tipo de Mock | Ubicación | Impacto / Estado |
|----------------------|--------------|-----------|------------------|
| `src/repositories/mock/index.js` | Mock Repositories | `cmsMockRepository`, `contactMockRepository`, `newsletterMockRepository`, `authMockRepository` | **INACTIVO en Dev**: Solo se activa si `VITE_USE_MOCK === 'true'`. En `.env.development` no está definido, usando la API real. |
| `HomeGallery.jsx` | Array Inline Hardcoded | Arreglo `images` con 4 URLs fijas delh3.googleusercontent.com | **MOCK / HARDCODED**: Reemplaza la llamada dinámicas al API de galería. |
| `HomeTestimonials.jsx` | Text Inline Hardcoded | Testimonio fijo en cita de HTML `&ldquo;Cada prenda tiene una presencia...&rdquo;` | **HARDCODED**: Reemplaza el llamado al API de testimonios. |

---

## Análisis de Mocks
1. **Mock Repositories Integrados por Flag**: El sistema posee un patrón limpio de repositorios mock (`src/repositories/mock/index.js`) toggleable via `VITE_USE_MOCK`. Actualmente está deshabilitado en desarrollo.
2. **Hardcoded UI Sections**: Las secciones `HomeGallery` y `HomeTestimonials` contienen datos hardcodeados directamente en el JSX/JS del componente en lugar de invocar los hooks `useGallery` y `useTestimonials`.
