# R7.1A — Repositories

> **Data access layer — one per domain**

---

## File: `src/repositories/index.js`

### Pattern

```js
export const domainRepository = (api) => ({
  getX:   () => api.get(ENDPOINTS.x()),
  getY:   (id) => api.get(ENDPOINTS.y(id)),
  create: (data) => api.post(ENDPOINTS.y(), data),
});
```

### CMS Repository

| Method | Endpoint | Returns |
|--------|----------|---------|
| `getHeroSlides()` | GET /hero-slides | HeroSlide[] |
| `getFaq()` | GET /faq | FaqCategory[] (with items) |
| `getGallery()` | GET /gallery | GalleryImage[] |
| `getTestimonials()` | GET /testimonials | Testimonial[] |
| `getBenefits()` | GET /benefits | Benefit[] |
| `getArtisanProcesses()` | GET /artisan-processes | ArtisanProcess[] |
| `getContents()` | GET /contents | Content[] |

### Contact Repository

| Method | Endpoint | Body |
|--------|----------|------|
| `send(data)` | POST /contact | `{ name, email, subject, message }` |

### Newsletter Repository

| Method | Endpoint | Body |
|--------|----------|------|
| `subscribe(email, source?)` | POST /newsletter/subscribe | `{ email, source }` |

### Auth Repository

| Method | Endpoint | Body |
|--------|----------|------|
| `login(email, password)` | POST /auth/login | `{ email, password }` |
| `customerLogin(email, password)` | POST /auth/customer-login | `{ email, password }` |
| `register(data)` | POST /auth/register | `{ email, firstName, lastName, password }` |
| `getProfile()` | GET /auth/me | — |

### Usage

```js
import { cmsRepository } from '@/repositories';
import { api } from '@/api/client';

const repo = cmsRepository(api);
const slides = await repo.getHeroSlides();
```
