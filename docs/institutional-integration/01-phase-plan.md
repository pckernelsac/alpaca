# PLAN DE CORRECCIÓN E INTEGRACIÓN — FRONTEND INSTITUCIONAL

## ALPACART — INSTITUTIONAL FRONTEND CORRECTION PLAN

---

## 1. OBJETIVO DEL PLAN

Corregir de manera progresiva y estructurada los problemas identificados en la auditoría runtime del Frontend Institucional (`frontend/pagina-institucional`), eliminando desvíos de arquitectura, URLs hardcodeadas y componentes desconectados sin alterar las páginas estáticas intencionales.

---

## 2. ESTRUCTURA DE FASES

1. **FASE I — CONTACTO (`/contacto`)**: Eliminación del bypass `fetch(API + '/v1/contact')` y migración a `useContact` (`POST /api/v1/contact`).
2. **FASE II — GALLERY (`HomeGallery.jsx`)**: Conexión real con `useGallery` y `GET /api/v1/gallery`.
3. **FASE III — TESTIMONIALS (`HomeTestimonials.jsx`)**: Conexión real con `useTestimonials` y `GET /api/v1/testimonials`.
4. **FASE IV — NEWSLETTER (`HomeNewsletter.jsx`)**: Conexión de formulario `onSubmit` con `useNewsletter` y `POST /api/v1/newsletter/subscribe`.
5. **FASE V — MOCK AUDIT**: Verificación de desactivación de repositorios mock en desarrollo (`USE_MOCK = false`).
6. **FASE VI — CONTENIDO ESTÁTICO**: Preservación de páginas con contenido estático intencional.
7. **FASE VII — AUDITORÍA FINAL & RUNTIME**: Verificación de compilación, red HTTP, consola y backend logs.
