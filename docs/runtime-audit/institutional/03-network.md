# INVENTARIO DE NETWORK — FRONTEND INSTITUCIONAL

## Registro de Solicitudes HTTP

Se auditaron las llamadas de red realizadas por el Frontend Institucional contra el servidor backend (`http://localhost:8000/api/v1`).

---

## Inventario de Requests

| Método | URL Completa | Status | Tiempo | Componente Origen | Payload | Response | Resultado |
|--------|--------------|--------|--------|-------------------|---------|----------|-----------|
| GET | `/api/v1/hero-slides` | 200 OK | ~25ms | `HeroSlider.jsx` (`useHero`) | Ninguno | `[{ id, title, subtitle, image, active, ... }]` | **PASS** |
| GET | `/api/v1/faq` | 200 OK | ~30ms | `FAQ.jsx` (`useFaq`) | Ninguno | `[{ id, name, slug, items: [...] }]` | **PASS** |
| POST | `/api/v1/v1/contact` | 404 Not Found | ~15ms | `ContactForm.jsx` | `{ name, email, subject, message }` | `{ statusCode: 404, message: "Cannot POST /api/v1/v1/contact" }` | **FAIL** |
| GET | `/api/v1/gallery` | N/A | N/A | `HomeGallery.jsx` | Ninguno | N/A | **NOT EXECUTED** |
| GET | `/api/v1/testimonials` | N/A | N/A | `HomeTestimonials.jsx` | Ninguno | N/A | **NOT EXECUTED** |
| GET | `/api/v1/benefits` | N/A | N/A | `useBenefits.js` | Ninguno | N/A | **NOT EXECUTED** |
| GET | `/api/v1/artisan-processes` | N/A | N/A | `useArtisanProcesses.js` | Ninguno | N/A | **NOT EXECUTED** |
| POST | `/api/v1/newsletter/subscribe` | N/A | N/A | `HomeNewsletter.jsx` | Ninguno | N/A | **NOT EXECUTED** |

---

## Clasificación de Requests
- **PASS (2)**: `GET /api/v1/hero-slides` y `GET /api/v1/faq`.
- **FAIL (1)**: `POST /api/v1/v1/contact` (Fail por 404 por mala concatenación de prefijo en el cliente).
- **NOT EXECUTED (5)**: Peticiones de galería, testimonios, beneficios, procesos artesanales y newsletter no gatilladas desde componentes.
