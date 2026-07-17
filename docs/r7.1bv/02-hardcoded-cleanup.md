# R7.1BV — Hardcoded Data Cleanup

> **Eliminación de datos hardcodeados reemplazables por API**

---

## Datos Eliminados

| Componente | Datos Antes | Fuente Nueva |
|-----------|-------------|--------------|
| HomeFeatures | 3 items hardcodeados (icon, title, desc) | `useBenefits()` → GET /benefits |
| HeroSlider | 5 slides en slides.js (archivo eliminado) | `useHero()` → GET /hero-slides |
| FAQ | 4 categorías, 8 preguntas hardcodeadas | `useFaq()` → GET /faq |

## Datos Conservados (pertenecen al diseño visual)

| Componente | Razón |
|-----------|-------|
| HomeFeatures (eyebrow + title) | Texto de marketing fijo: "NOBLEZA INIGUALABLE", "El Oro de los Andes" |
| HomeCategories | Sin endpoint de colecciones implementado para institucional |
| Footer (brand, columns, social) | Datos de navegación y marca, no gestionables por CMS |
| ContactInfo (dirección, teléfono) | Datos fiscales, cambiarían poco |
| About sections | Contenido editorial de marca |
| Policies, Terms | Documentos legales |
