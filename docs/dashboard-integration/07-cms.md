# Dashboard Integration — CMS

> **Módulo CMS: Contenidos, Hero Slides, Galería, Testimonios**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /contents | `cmsRepository.getContents(q)` | `CmsService.getContents(q)` | `useContents(q)` |
| POST | /contents | `cmsRepository.createContent(d)` | `CmsService.createContent(d)` | — |
| GET | /admin/hero-slides | `cmsRepository.getHeroSlides()` | `CmsService.getHeroSlides()` | — |
| POST | /admin/hero-slides | `cmsRepository.createHeroSlide(d)` | `CmsService.createHeroSlide(d)` | — |
| GET | /admin/gallery | `cmsRepository.getGallery()` | `CmsService.getGallery()` | — |
| GET | /admin/testimonials | `cmsRepository.getTestimonials()` | `CmsService.getTestimonials()` | — |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| CmsDashboard | inline KPIs | `useContents()` | ❌ |
| ContentList | inline contents | `useContents()` | ❌ |
