# R7.1A — Endpoints

> **Centralized endpoint catalog**

---

## File: `src/api/endpoints.js`

All API routes are defined as functions to allow runtime parameter injection.

```js
const BASE = '/api/v1';

export const ENDPOINTS = {
  hero:            () => `${BASE}/hero-slides`,
  faq:             () => `${BASE}/faq`,
  gallery:         () => `${BASE}/gallery`,
  testimonials:    () => `${BASE}/testimonials`,
  benefits:        () => `${BASE}/benefits`,
  artisanProcesses: () => `${BASE}/artisan-processes`,
  contents:        () => `${BASE}/contents`,
  company:         () => `${BASE}/settings/company`,
  contact:         () => `${BASE}/contact`,
  newsletter:      () => `${BASE}/newsletter/subscribe`,
  login:           () => `${BASE}/auth/login`,
  customerLogin:   () => `${BASE}/auth/customer-login`,
  register:        () => `${BASE}/auth/register`,
  me:              () => `${BASE}/auth/me`,
};
```

## Rules

1. **Never** hardcode routes in pages, components, hooks, services, or repositories.
2. **Always** import from `@/api/endpoints`.
3. Use functions (not constants) for routes with dynamic segments: `productById: (id) => \`\${BASE}/products/\${id}\``
