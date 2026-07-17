# R7.1A — Architecture

> **Frontend Communication Architecture — ALPACART**

---

## Overview

Three-layer architecture for all frontend ↔ backend communication:

```
Pages / Components
        ↕
   React Hooks        ← hooks/
        ↕
   Services            ← services/
        ↕
   Repositories        ← repositories/
        ↕
   ApiClient           ← packages/shared-api-client/
        ↕
   Axios + Interceptors
        ↕
   Backend API (/api/v1)
```

## Layers

### 1. ApiClient (`packages/shared-api-client/`)
Shared package consumed via `@alpacart/shared-api-client` alias. Provides:
- `createApiClient(baseURL, options)` — factory
- Automatic `{ success, data }` envelope extraction
- Token injection via `getToken` callback
- 401 redirect via `onUnauthorized` callback
- Error mapping via `mapHttpError()`

### 2. Repositories (`src/repositories/`)
One repository per domain. Pure data access — no transformation.
- `cmsRepository(api)` — 7 CMS endpoints
- `contactRepository(api)` — POST /contact
- `newsletterRepository(api)` — POST /newsletter/subscribe
- `authRepository(api)` — login, register, me

### 3. Services (`src/services/`)
Singleton service instances. Business logic + orchestration.
- `cmsService` — wraps cmsRepository
- `contactService` — wraps contactRepository
- `newsletterService` — wraps newsletterRepository
- `authService` — wraps authRepository

### 4. Mappers (`src/mappers/`)
Transform raw API responses to frontend model shapes.
- `hero.mapper.js` — HeroSlide → { id, title, subtitle, image, cta, ... }
- `faq.mapper.js` — FaqCategory + FaqItem flattening
- `gallery.mapper.js` — GalleryImage with visible filter
- `benefit.mapper.js` — Benefit with active filter
- `testimonial.mapper.js` — Testimonial with active filter
- `artisan.mapper.js` — ArtisanProcess with active filter

### 5. Hooks (`src/hooks/`)
React hooks consuming services. Standard pattern:
```js
const { data, loading, error, fetch } = useHero();
```

All hooks expose: `{ data, loading, error, fetch }` or mutation: `{ action, loading, success, error, reset }`

## Data Flow

```
Backend JSON → ApiClient.extractData() → Repository → Service → Mapper → Hook → Component
```

## Shared Package

`@alpacart/shared-api-client` provides:
- `createApiClient` — axios factory with interceptors
- `ApiError` — HTTP error with status code
- `NetworkError` — connection error
- `ValidationError` — 400 with field errors
- `mapHttpError` — raw axios error → typed error
