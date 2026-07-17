# Observaciones Finales

## 1. Páginas Incompletas
**Services** y **Blog** son páginas placeholder con solo un título y un párrafo genérico. No se modificaron porque queda fuera del alcance del frontend freeze (requiere definición de contenido). **No deployar estas rutas en producción sin contenido real.**

## 2. Forms Sin Conexión al Backend
- ContactForm: valida campos y muestra "Mensaje Enviado" pero nunca ejecuta un `fetch`/`POST`.
- HomeNewsletter (inline): no tiene `onSubmit`.
- PromoNewsletter (inline): no tiene `onSubmit`.
- NewsletterForm component: acepta `onSubmit` prop pero nunca se invoca desde Footer (showNewsletter=false).
- **El usuario verá falsa confirmación de envío.** Corregir antes de producción.

## 3. SEO Completamente Ausente
No hay meta tags dinámicos por página. No hay OpenGraph, Twitter Cards, ni JSON-LD. El title global es genérico ("Alpacart - Página Institucional"). Se recomienda integrar `react-helmet-async` para SEO por ruta.

## 4. Dependencia de CDN Externo (Google AIDA)
Todas las imágenes de productos, galerías, y backgrounds (excepto SVG del hero) apuntan a `lh3.googleusercontent.com/aida-public/...`. Si ese CDN falla, todo el sitio pierde imágenes. No hay fallbacks ni imágenes placeholder.

## 5. Breadcrumb Component Inactivo
El componente `<Breadcrumb />` está completamente implementado pero no se utiliza en ninguna página. Debería integrarse en `PublicLayout` o en páginas individuales.

## 6. Navbar Conectado a Auth Backend
`Navbar.jsx` importa `useAuth()` y `UIContext`. Si el backend de autenticación no está corriendo, este componente puede lanzar errores. El header principal (`Header.jsx`) no tiene este problema.

## 7. CatalogFilters No Funcionales
Los botones de filtro en Catalog (Baby Alpaca, Vicuña, Mezcla Real, Tejido Artesanal) son decorativos — el estado `active` está hardcodeado y los botones no filtran productos reales.

## 8. Inconsistencia en Breakpoints
La mayoría de componentes usa `768px` como breakpoint. CatalogTechSpecs usa `1024px`, CatalogProducts usa `640px` y `1024px`. Unificar criterio.

## 9. Social Links Placeholder
Los enlaces a Instagram, LinkedIn, Pinterest en ContactInfo y Footer apuntan a `#`. No hay URLs reales configuradas.

## 10. Fuentes Diferentes en Dark Mode
En light mode se usa `Inter` para body. En dark mode cambia a `Source Serif 4`. Mientras que `Hanken Grotesk` reemplaza a `Inter` para labels. Verificar si esto es intencional o un error de diseño.
