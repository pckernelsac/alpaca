# Checklist — Aprobación Frontend Institucional

## Navegación
- [x] ✅ Header con links funcionales
- [x] ✅ Footer con columnas de enlaces
- [x] ✅ Mobile hamburger menu
- [x] ✅ Active link highlighting
- [x] ❌ Breadcrumb component sin uso en páginas
- [x] ⚠️ Navbar conectado a `useAuth` — errores si AuthContext no provee datos

## Responsive
- [x] ✅ HeroSlider se adapta (100vh → 70vh)
- [x] ✅ Header cambia a menú hamburguesa en <768px
- [x] ✅ Layouts grid usan `@media` queries
- [x] ⚠️ CatalogTechSpecs usa breakpoint 1024px (inconsistente con 768px del resto)
- [x] ✅ Contact grid 1-col → 2-col en 1024px
- [x] ✅ Terms/Policies sidebar apila en mobile

## Diseño (UI)
- [x] ✅ Tipografía consistente (Playfair Display + Inter)
- [x] ✅ Sistema de espaciado vía CSS variables
- [x] ✅ Sombras, bordes, radios consistentes
- [x] ✅ Paleta de colores coherente
- [x] ⚠️ HeroSlider usa colores hardcodeados (blanco/negro) para botones/texto

## Tema (Theme)
- [x] ✅ `ThemeContext` implementado con persistencia localStorage
- [x] ✅ System preference detectada (`prefers-color-scheme`)
- [x] ✅ Flash prevention via inline `<script>` en `index.html`
- [x] ✅ `[data-theme='dark']` con 50+ variables re-definidas
- [x] ✅ ThemeToggle funcional con iconos sol/luna
- [x] ⚠️ Fuentes dark mode cambian a Source Serif 4 / Hanken Grotesk (puede no ser intencional)

## Componentes
- [x] ✅ HeroSlider: autoplay, fade, hover pause, navegación
- [x] ✅ Accordion/FAQItem con `aria-expanded`
- [x] ✅ Gallery responsive con columnas variables
- [x] ✅ ProductCard con badge, precio, imagen
- [x] ✅ CTA con variantes primary/dark/outline
- [x] ✅ FormInput/Select/Textarea con labels y errores
- [x] ⚠️ NewsletterForm tiene lógica pero no se renderiza en Footer
- [x] ❌ HomeNewsletter inline form sin handler
- [x] ❌ PromoNewsletter inline form sin handler

## Imágenes
- [x] ⚠️ `loading="lazy"` presente en la mayoría de imágenes
- [x] ❌ Hero images NO tienen lazy loading (HeroBase bg)
- [x] ❌ Muchas imágenes decorativas con `alt=""` que deberían describir contenido
- [x] ⚠️ Todas las imágenes product/gallery apuntan a CDN externo (Google AIDA)
- [x] ✅ Imágenes SVG locales en HeroSlider

## Accesibilidad
- [x] ✅ `aria-label` en Header (buscar, carrito, menú, theme)
- [x] ✅ `aria-expanded` en FAQItem
- [x] ✅ `:focus-visible` outline global
- [x] ⚠️ Sin `aria-current="page"` en navegación activa
- [x] ⚠️ Modal sin focus trap ni `aria-modal`
- [x] ⚠️ Gallery sin `role="list"` ni `role="listitem"`
- [x] ⚠️ Algunos botones icono sin texto además del aria-label

## SEO
- [x] ❌ Sin `<title>` por página (solo título global genérico)
- [x] ❌ Sin `<meta name="description">` por página
- [x] ❌ Sin OpenGraph (`og:title`, `og:description`, `og:image`)
- [x] ❌ Sin Twitter Cards
- [x] ❌ Sin JSON-LD structured data
- [x] ⚠️ Meta description global en `index.html` es genérica

## Performance
- [x] ✅ Lazy loading en imágenes secundarias
- [x] ✅ Code splitting via `React.lazy()` en rutas
- [x] ✅ Fuentes cargadas con `preconnect`
- [x] ⚠️ 5 slides de héroe con imágenes grandes — optimizable
- [x] ⚠️ Sin CDN para assets locales

## Contenido
- [x] ✅ 100% en español
- [x] ✅ Sin lorem ipsum
- [x] ✅ Copywriting coherente con tono de lujo/artesanía
- [x] ❌ Página Services vacía (placeholder)
- [x] ❌ Página Blog vacía (placeholder)
- [x] ⚠️ Enlaces sociales en Contact y Footer van a `#`
