# R7.1A.1 — Endpoints Refactor

> **De un solo archivo a 14 archivos por dominio**

---

## Antes

```js
// src/api/endpoints.js — archivo único
const BASE = '/api/v1';
export const ENDPOINTS = {
  hero: () => `${BASE}/hero-slides`,
  faq:  () => `${BASE}/faq`,
  // ... ~14 rutas mezcladas
};
```

Problemas:
- Dos fuentes de verdad para `/api/v1` (endpoints.js + VITE_API_URL)
- Todas las rutas mezcladas sin separación por dominio
- Difícil de mantener al crecer

## Después

```js
// src/api/endpoints/cms.endpoints.js — un archivo por dominio
export const CmsEndpoints = {
  hero:            () => '/hero-slides',
  faq:             () => '/faq',
  gallery:         () => '/gallery',
  testimonials:    () => '/testimonials',
  benefits:        () => '/benefits',
  artisanProcesses: () => '/artisan-processes',
  contents:        () => '/contents',
};
```

Reglas:
- Rutas **relativas** (sin `/api/v1`)
- Funciones flecha para permitir parámetros dinámicos: `productById: (id) => \`/products/${id}\``
- Un archivo por dominio backend

## Beneficios

1. **Base URL único**: ApiClient controla `http://localhost:8000/api/v1`
2. **Cohesión**: Cada dominio es autónomo
3. **Escalabilidad**: Agregar endpoints no afecta otros dominios
4. **Tree-shaking**: Solo se importan los endpoints necesarios
