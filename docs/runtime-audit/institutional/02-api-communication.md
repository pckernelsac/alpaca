# AUDITORÍA DE COMUNICACIÓN API — FRONTEND INSTITUCIONAL

## Evaluación de Integración Frontend ↔ Backend

Se auditó el flujo completo de arquitectura:

```
Componente React ➔ Hook / Service ➔ Repository ➔ ApiClient (Axios) ➔ Backend (NestJS)
```

---

## Evaluación por Recurso / Funcionalidad

| Funcionalidad | Componente | Hook / Service | Repository | ApiClient | Endpoint | Estado Integración |
|---------------|------------|----------------|------------|-----------|----------|--------------------|
| Hero Slides | `HeroSlider.jsx` | `useHero()` ➔ `cmsService` | `cmsRepository` | `ApiClient` | `GET /api/v1/hero-slides` | **PASS** (API REAL) |
| FAQ | `FAQ.jsx` | `useFaq()` ➔ `cmsService` | `cmsRepository` | `ApiClient` | `GET /api/v1/faq` | **PASS** (API REAL) |
| Contact Form | `ContactForm.jsx` | Invoca `fetch` directo | N/A (Bypasses Repository) | `fetch` nativo | `POST /api/v1/v1/contact` | **FAIL** (HTTP 404 por `/v1/v1`) |
| Gallery | `HomeGallery.jsx` | No consumido | `cmsRepository` (Existe) | `ApiClient` | `GET /api/v1/gallery` | **NOT EXECUTED** (Usa array estático local) |
| Testimonials | `HomeTestimonials.jsx` | No consumido | `cmsRepository` (Existe) | `ApiClient` | `GET /api/v1/testimonials` | **NOT EXECUTED** (Usa texto estático local) |
| Benefits | N/A | No consumido | `cmsRepository` (Existe) | `ApiClient` | `GET /api/v1/benefits` | **NOT EXECUTED** |
| Artisan Processes | N/A | No consumido | `cmsRepository` (Existe) | `ApiClient` | `GET /api/v1/artisan-processes` | **NOT EXECUTED** |
| Newsletter | `HomeNewsletter.jsx` | Form sin handler | `newsletterRepository` | `ApiClient` | `POST /api/v1/newsletter/subscribe` | **NOT EXECUTED** (Formulario estático) |
| Company Settings | N/A | No consumido | `settingsRepository` | `ApiClient` | `GET /api/v1/settings/company` | **NOT EXECUTED** |

---

## Análisis Técnico
1. **Flujo Clean Architecture Preservado**: `HeroSlider.jsx` y `FAQ.jsx` respetan el desacoplamiento `Componente ➔ Hook ➔ ServiceProvider ➔ Service ➔ Repository ➔ ApiClient`.
2. **Desviación en ContactForm**: `ContactForm.jsx` no utiliza la capa de `contactService` ni `contactRepository`. En su lugar, realiza un `fetch()` nativo construyendo manualmente la URL `API + '/v1/contact'`, lo que produce la ruta inválida `http://localhost:8000/api/v1/v1/contact`.
