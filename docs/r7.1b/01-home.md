# R7.1B — Home Integration Report

> **Página:** Home (`/`)

---

## Componentes Integrados

| Sección | Componente | Hook | Endpoint | Mapper | Domain |
|---------|-----------|------|----------|--------|--------|
| Hero | HeroSlider | `useHero()` | GET /hero-slides | `mapHeroSlides` | `createHeroSlide` |
| Testimonials | HomeTestimonials | `useTestimonials()` | GET /testimonials | `mapTestimonials` | `createTestimonial` |
| Gallery | HomeGallery | `useGallery()` | GET /gallery | `mapGallery` | `createGalleryImage` |
| Newsletter | HomeNewsletter | `useNewsletter()` | POST /newsletter/subscribe | — | — |

## Problemas Encontrados

1. **Hero CTA shape**: Backend devuelve `{ ctaText, ctaLink }`, componente espera `{ primaryCta: { label, to } }`. Resuelto en mapper (`mapHeroSlide`).
2. **Slides estáticos**: El archivo `slides.js` con 5 slides importaba SVGs locales. Reemplazado por `useHero()` hook. El viejo `slides.js` queda como candidato a eliminación.
3. **Sin secondaryCta**: Backend HeroSlide solo tiene 1 CTA. El componente acepta `secondaryCta` opcional. Se mapea `ctaText/ctaLink` → `primaryCta`, `secondaryCta` = null.

## Build

| Antes | Después |
|-------|---------|
| 233 modules | 270 modules |

**Checklist:** ✅ Endpoint ✅ Repository ✅ Service ✅ Hook ✅ Mapper ✅ Domain Model ✅ Datos reales ✅ UI sin cambios ✅ Build PASS
