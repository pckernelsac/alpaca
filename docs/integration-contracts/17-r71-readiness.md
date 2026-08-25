# R7.1 Readiness Report — Institucional

> **Fecha:** 2026-07-16 | **Dependencia:** ICC-01 FIX ✅

---

## Estado: READY FOR R7.1 ✅

### Checklist

| # | Ítem | Estado |
|---|------|--------|
| 1 | VITE_API_URL unificado a `/api/v1` | ✅ |
| 2 | Pagination Contract alineado (total vs count) | ✅ |
| 3 | ContactDto conectado en SettingsController | ✅ |
| 4 | NewsletterSubscribeDto creado y conectado | ✅ |
| 5 | Shared types CMS: GalleryImage, FaqCategory, Benefit, ArtisanProcess | ✅ |
| 6 | Backend build PASS | ✅ |
| 7 | Institucional build PASS (233 modules) | ✅ |
| 8 | Tienda build PASS (201 modules) | ✅ |
| 9 | Dashboard build PASS (157 modules) | ✅ |

---

## Contratos de Institucional — Listos para Consumir

| Endpoint | Método | Auth | DTO | Shared Type | Estado |
|----------|--------|------|-----|-------------|--------|
| /api/v1/hero-slides | GET | Public | — | HeroSlide | ✅ |
| /api/v1/faq | GET | Public | — | FaqCategory | ✅ |
| /api/v1/testimonials | GET | Public | — | Testimonial | ✅ |
| /api/v1/gallery | GET | Public | — | GalleryImage | ✅ |
| /api/v1/benefits | GET | Public | — | Benefit | ✅ |
| /api/v1/artisan-processes | GET | Public | — | ArtisanProcess | ✅ |
| /api/v1/contents | GET | Public | — | Content | ✅ |
| /api/v1/settings/company | GET | Public | — | — | ✅ |
| /api/v1/contact | POST | Public | ContactDto | — | ✅ |
| /api/v1/newsletter/subscribe | POST | Public | NewsletterSubscribeDto | — | ✅ |

---

## Decisión

```
READY FOR R7.1
```

Puede comenzar la integración del frontend institucional:
1. Reemplazar contenido estático por llamadas GET a los endpoints CMS
2. Conectar formulario de contacto a POST /api/v1/contact
3. Conectar newsletter a POST /api/v1/newsletter/subscribe
