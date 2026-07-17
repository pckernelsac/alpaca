# Auditoria Frontend — Página Institucional

> Fecha: 2026-07-15  
> Alcance: 11 pages + shared components  
> Backend: NOT connected (intentional)

---

## Pages Audit

### 1. Home (`/`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | HeroSlider: `70vh`, font 40px on mobile. Features/Categories/Gallery/Newsletter all have `@media (min-width:768px)` breakpoints |
| **Dark Mode** | ✅ | Uses CSS variables from `variables.css`. All sections adapt via `[data-theme='dark']` |
| **Images** | ⚠️ | Hero slider uses SVG imports (local). Gallery/Categories use google AIDA CDN — external dependency. Alt text: Categories OK, Gallery `alt=""` (decorative), Testimonials has no image |
| **Forms** | ⚠️ | HomeNewsletter is an inline `<form>` with **no `onSubmit` handler** — does nothing on submit |
| **Content** | ✅ | All Spanish. No lorem ipsum |
| **Navigation** | ✅ | Header present, Footer present |
| **Accessibility** | ⚠️ | HeroSlider navigation/pagination OK. Gallery lacks `role="list"`. Newsletter input has no `<label>` |
| **SEO** | ❌ | No page-specific title or meta. Uses global `<title>Alpacart - Página Institucional</title>` |

### 2. About (`/about`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | Hero (768px), Story/Inspiration/Artisans/FiberQuality/Mission all have `@media` queries |
| **Dark Mode** | ✅ | Via CSS variables |
| **Images** | ⚠️ | All images from AIDA CDN. Story images have `alt=""` (should describe content). Hero image is a `HeroBase` background — no `loading="lazy"` on hero. Artisans have proper `alt={a.title}` |
| **Forms** | N/A | |
| **Content** | ✅ | Spanish, coherent. Note: `"anos"` missing tilde in CTA |
| **Navigation** | ✅ | |
| **Accessibility** | ⚠️ | Timeline section is a div list — should use `<ul>`. No `aria-label` on sections |
| **SEO** | ❌ | No meta tags |

### 3. Catalog (`/catalogo`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ⚠️ | Most sections use 768px breakpoint. CatalogTechSpecs uses **1024px** (inconsistent). CatalogProducts uses 640px/1024px (different pattern) |
| **Dark Mode** | ✅ | |
| **Images** | ⚠️ | All from AIDA CDN. Bento images have `alt=""`. Gallery uses `backgroundImage` (no alt possible). Filters use `backgroundImage` |
| **Forms** | N/A | |
| **Content** | ✅ | Spanish |
| **Navigation** | ✅ | |
| **Accessibility** | ❌ | CatalogFilters uses `<button>` elements but no `aria-pressed`, no keyboard selection feedback. Bento has no text alternatives for images |
| **SEO** | ❌ | No meta |
| **Interactive** | ❌ | CatalogFilters are **non-functional** — `active` is hardcoded, buttons do nothing |

### 4. Promotions (`/promociones`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | All sections have `@media` queries at 768px |
| **Dark Mode** | ✅ | |
| **Images** | ⚠️ | AIDA CDN. PromoCampaigns uses `backgroundImage` — no alt. PromoProducts OK |
| **Forms** | ⚠️ | PromoNewsletter inline form — **no `onSubmit` handler** |
| **Content** | ✅ | Spanish |
| **Navigation** | ✅ | |
| **Accessibility** | ⚠️ | Campaign buttons w/ `backgroundImage` lack accessible names |
| **SEO** | ❌ | No meta |

### 5. Contact (`/contacto`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | Grid switches at 1024px. Form fields stack on mobile |
| **Dark Mode** | ✅ | |
| **Images** | ⚠️ | ContactMap uses `backgroundImage` — no alt |
| **Forms** | ⚠️ | ContactForm validates and shows success UI but **does NOT send data anywhere** (no fetch/API call). Uses `noValidate` |
| **Content** | ✅ | Spanish. All fields have labels |
| **Navigation** | ✅ | WhatsApp link works. Social links go to `#` (placeholder) |
| **Accessibility** | ✅ | Form has labels, error messages, required validation. Map section lacks `role="img"` |
| **SEO** | ❌ | No meta |

### 6. FAQ (`/preguntas`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | Category grid at 768px. Hero at 768px |
| **Dark Mode** | ✅ | |
| **Images** | N/A | |
| **Forms** | ⚠️ | FAQHero search input sets state but **no filtering logic** if `onSearch` not passed |
| **Content** | ✅ | Spanish. Well-structured accordion |
| **Navigation** | ⚠️ | Category buttons scroll via `document.getElementById` — no router navigation |
| **Accessibility** | ✅ | FAQItem has `aria-expanded`. Accordion works with keyboard (native button) |
| **SEO** | ❌ | No meta |

### 7. Terms (`/terminos`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | 768px breakpoint for sidebar layout |
| **Dark Mode** | ✅ | |
| **Images** | N/A | |
| **Forms** | N/A | |
| **Content** | ✅ | Spanish, well-written legal content |
| **Navigation** | ✅ | ScrollSpySidebar functional |
| **Accessibility** | ✅ | Semantic HTML, proper heading hierarchy |
| **SEO** | ❌ | No meta |

### 8. Policies (`/politicas`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | 768px breakpoints |
| **Dark Mode** | ✅ | |
| **Images** | N/A | |
| **Forms** | N/A | |
| **Content** | ✅ | Spanish |
| **Navigation** | ✅ | ScrollSpySidebar |
| **Accessibility** | ✅ | |
| **SEO** | ❌ | No meta |

### 9. Services (`/services`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Todo** | ❌ | **Placeholder page** — only shows `<h1>Servicios</h1><p>Servicios ofrecidos</p>` |
| **Responsive** | ⚠️ | CSS module exists but minimal styling |
| **Dark Mode** | ⚠️ | Only inherits global variables |
| **SEO** | ❌ | No meta, no content |

### 10. Blog (`/blog`)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Todo** | ❌ | **Placeholder page** — only shows `<h1>Blog</h1><p>Blog y noticias</p>` |
| **Responsive** | ⚠️ | CSS module exists but minimal |
| **Dark Mode** | ⚠️ | Only inherits global |
| **SEO** | ❌ | Empty page |

### 11. NotFound (404)
| Área | Estado | Observaciones |
|------|--------|--------------|
| **Responsive** | ✅ | Centered layout works on all sizes |
| **Dark Mode** | ✅ | Uses CSS variables |
| **Images** | N/A | |
| **Forms** | N/A | |
| **Content** | ✅ | Spanish, concise |
| **Navigation** | ✅ | Returns to `/` via `useNavigate` |
| **Accessibility** | ⚠️ | Uses `<Button>` component — no `role` or `aria` beyond default |
| **SEO** | N/A | 404 page |

---

## Components Audit

### HeroSlider
| Check | Status | Detail |
|-------|--------|--------|
| Responsive | ✅ | 70vh on mobile, font 40px, nav hidden |
| Dark Mode | ✅ | Overlay uses rgba, not affected by theme |
| Images | ⚠️ | SVG local imports — no alt on slide backgrounds |
| Accessibility | ⚠️ | Swiper navigation/pagination are accessible. Hover pause works |
| Performance | ⚠️ | 5 slides with full images — could be heavy |

### Header
| Check | Status | Detail |
|-------|--------|--------|
| Responsive | ✅ | Hamburger menu at <768px, desktop nav at >768px |
| Dark Mode | ✅ | CSS variables |
| Scroll | ✅ | Sticky, blur on scroll |
| Accessibility | ✅ | `aria-label` on search, cart, menu, theme toggle |
| Links | ✅ | Proper routes |

### Footer
| Check | Status | Detail |
|-------|--------|--------|
| Responsive | ✅ | 2-col grid on mobile, 3-col on desktop |
| Dark Mode | ✅ | CSS variables |
| Links | ⚠️ | Social buttons have no `href` — just `<button>` with icons. No actual links |
| Newsletter | ⚠️ | Disabled by default (`showNewsletter=false`) |
| Accessibility | ✅ | `aria-label` on social buttons |

### Cards (Card, ProductCard, ImageCard, FeatureCard, TestimonialCard)
| Check | Status | Detail |
|-------|--------|--------|
| Responsive | ✅ | Rely on parent grid |
| Dark Mode | ✅ | CSS variables |
| Images | ✅ | `loading="lazy"`, alt text passed through |
| Accessibility | ✅ | Semantic elements |

### Buttons (Button, Badge)
| Check | Status | Detail |
|-------|--------|--------|
| Variants | ✅ | primary, secondary, outline, ghost |
| States | ⚠️ | Loading state OK, but no focus-visible visible styles beyond global |
| Accessibility | ✅ | Native `<button>`, disabled handled |

### Forms (Input, Select, Textarea, Checkbox, Radio)
| Check | Status | Detail |
|-------|--------|--------|
| Labels | ✅ | All have `<label>` with `htmlFor` |
| Errors | ✅ | Error messages displayed |
| Accessibility | ✅ | `forwardRef` for ref forwarding |
| Dark Mode | ✅ | CSS variables |

### NewsletterForm
| Check | Status | Detail |
|-------|--------|--------|
| Functionality | ⚠️ | Has `onSubmit` prop but **never called** from Footer (not rendered). The inline versions in Home/Promotions have no handler |
| States | ✅ | idle/loading/success/error handled |

### Accordion / FAQItem
| Check | Status | Detail |
|-------|--------|--------|
| Responsive | ✅ | |
| Dark Mode | ✅ | |
| Accessibility | ✅ | `aria-expanded`, keyboard native |
| Animation | ⚠️ | Uses `maxHeight` transition — can be janky |

### Gallery
| Check | Status | Detail |
|-------|--------|--------|
| Responsive | ✅ | 768px/480px breakpoints for column reduction |
| Images | ⚠️ | AIDA CDN. `alt` passed via `item.alt` but AboutGallery passes items **without `alt`** |
| Accessibility | ⚠️ | No `role="list"` or `aria-label` |

### Breadcrumb
| Check | Status | Detail |
|-------|--------|--------|
| Usage | ❌ | **Component exists but is NEVER used on any page** |

### Modal
| Check | Status | Detail |
|-------|--------|--------|
| Accessibility | ⚠️ | Escape key handled. No focus trap implemented. No `aria-modal` |
| Dark Mode | ✅ | CSS variables |

---

## Cross-cutting Issues

| Issue | Severity | Pages Affected |
|-------|----------|----------------|
| No page-specific `<title>` or meta tags | **High** | All |
| Services and Blog are empty placeholders | **High** | Services, Blog |
| Forms never send data to backend | **High** | Contact, Home, Promotions |
| External image CDN (Google AIDA) | **Medium** | Most pages |
| Images missing meaningful alt text | **Medium** | About, Catalog, Gallery |
| Breadcrumb component exists but unused | **Medium** | All pages |
| No OpenGraph / social meta tags | **Medium** | All |
| No focus trap in Modal | **Low** | (modal not used in pages) |
| Inconsistent breakpoints (768px vs 1024px) | **Low** | Catalog |
| Social links go to `#` (placeholder) | **Low** | Contact, Footer |
