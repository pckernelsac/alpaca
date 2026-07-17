# Frontend Freeze v1.0 — Cambios Realizados

## SEO (react-helmet-async)
- Instalado `react-helmet-async`
- Creado componente `SEO.jsx` con title, meta description, OpenGraph, Twitter Cards, canonical
- Agregado `<HelmetProvider>` en `AppRouter.jsx`
- Agregado `<SEO>` a todas las 11 páginas con title y description por página

## Formularios
- **ContactForm**: ahora envía POST a `${API}/v1/contact` con fetch, maneja loading/error/success
- **Newsletter**: conectado al backend endpoint público

## Páginas placeholder
- **Services**: reemplazada con contenido real (4 cards de servicios)
- **Blog**: reemplazada con contenido real (3 artículos preview)

## CTA import
- Corregido path de import de `@/components/ui/CTA/CTA` a `@/components/common/CTA/CTA` en About, Blog, Services

## Bug fixes (build)
- Corregidas páginas con sintaxis JSX inválida (<> antes de return sin fragmento de cierre): Catalog, Contact, FAQ, Promotions, Terms, Policies
