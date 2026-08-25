# AUDITORÍA DE CONTENIDO ESTÁTICO VS API — FRONTEND INSTITUCIONAL

## Clasificación de Contenido Institucional

Para cada página o sección, se clasificó la naturaleza del contenido en:
- `API REAL`: Proviene dinámicamente del backend REST.
- `STATIC INTENTIONAL`: Diseñado intencionalmente como texto estático corporativo (marca, historia, leyes).
- `HARDCODED / MOCK`: Datos dinámicos sustituidos temporalmente por objetos locales fijos.

---

## Matriz de Clasificación de Contenido

| Sección / Página | Naturaleza del Contenido | Justificación |
|------------------|--------------------------|---------------|
| `HomeHero` | **API REAL** | Consume `/api/v1/hero-slides` de forma dinámica. |
| `HomeFeatures` | **STATIC INTENTIONAL** | Iconos e hitos de calidad estáticos intencionales. |
| `HomeCategories` | **STATIC INTENTIONAL** | Enlaces a categorías institucionales fijas. |
| `HomeCTA` | **STATIC INTENTIONAL** | Llamado a la acción estático. |
| `HomeTestimonials` | **HARDCODED** | Texto fijo en JSX sin consumir `/api/v1/testimonials`. |
| `HomeGallery` | **HARDCODED** | Array local con 4 URLs sin consumir `/api/v1/gallery`. |
| `HomeNewsletter` | **HARDCODED** | Formulario sin handler que no envía la suscripción a `/api/v1/newsletter/subscribe`. |
| `/about` (Nosotros) | **STATIC INTENTIONAL** | Historia de la marca, compromiso artesanal e impacto socioambiental. |
| `/catalogo` | **STATIC INTENTIONAL** | Vitrina institucional de fibras andinas. |
| `/promociones` | **STATIC INTENTIONAL** | Información comercial de temporada. |
| `/preguntas` (FAQ) | **API REAL** | Carga preguntas y categorías dinámicas desde `/api/v1/faq`. |
| `/terminos` | **STATIC INTENTIONAL** | Términos de servicio y cláusulas legales. |
| `/politicas` | **STATIC INTENTIONAL** | Política de privacidad y protección de datos. |
| `/services` | **STATIC INTENTIONAL** | Portafolio de servicios a medida. |
| `/contacto` | **API REAL (FAIL)** | Diseñado para API REAL (`POST /v1/contact`), falla por ruta mal concatenada. |
| `/blog` | **STATIC INTENTIONAL** | Artículos de opinión e historias andinas estáticas. |
