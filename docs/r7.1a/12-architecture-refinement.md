# R7.1A.1 — Architecture Refinement

> **Correcciones aplicadas a la arquitectura R7.1A**

---

## Cambios Realizados

### 1. Base URL único
- `src/api/endpoints.js` eliminado
- Todos los endpoints ahora usan rutas **relativas** (sin `/api/v1`)
- ApiClient es la única fuente de `baseURL` via `VITE_API_URL`

### 2. Endpoints por dominio
`src/api/endpoints/` con 14 archivos:

| Archivo | Dominio |
|---------|---------|
| `auth.endpoints.js` | login, customer-login, register, me |
| `cms.endpoints.js` | hero-slides, faq, gallery, testimonials, benefits, artisan-processes, contents |
| `catalog.endpoints.js` | products, categories, collections, variants, media |
| `customers.endpoints.js` | profile, addresses, wishlist, cart, checkout |
| `orders.endpoints.js` | orders CRUD, status, notes, events |
| `payments.endpoints.js` | transactions, payment-intent, refund, webhook |
| `inventory.endpoints.js` | stock, adjust, movements, transfers |
| `marketing.endpoints.js` | campaigns, coupons, promotions, newsletter |
| `settings.endpoints.js` | company, contact |
| `upload.endpoints.js` | upload, upload/public, delete |
| `analytics.endpoints.js` | kpis |
| `audit.endpoints.js` | logs |
| `crm.endpoints.js` | clients, notes |
| `textile.endpoints.js` | materials, colors, sizes, seasons |

### 3. Services como clases

Antes (IIFE singleton):
```js
export const cmsService = (() => {
  const repo = cmsRepository(api);
  return { getHeroSlides: repo.getHeroSlides };
})();
```

Después (clase con DI):
```js
export class CmsService {
  constructor(repository) { this.repository = repository; }
  getHeroSlides() { return this.repository.getHeroSlides(); }
}
export const cmsService = new CmsService(cmsRepository);
```

### 4. Repositories sin lógica
- Repositories solo construyen la petición y llaman ApiClient
- No transforman, no validan, no cachean

### 5. Mappers obligatorios
- `hero.mapper.js`, `faq.mapper.js`, `gallery.mapper.js`
- `benefit.mapper.js`, `testimonial.mapper.js`, `artisan.mapper.js`
- Todos los datos del backend pasan por un mapper antes de llegar al hook

### 6. Dependencias estrictas

```
Pages → Hooks → Services → Repositories → ApiClient → Axios → Backend
  ↓       ↓         ↓            ↓
mappers  mappers    —            endpoints
```
