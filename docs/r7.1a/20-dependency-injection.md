# R7.1A.2 — Dependency Injection

> **Arquitectura de inyección de dependencias**

---

## Patrón Actual

```
ServiceProvider (composition root)
    ↓ inyecta
Repository (implementación concreta)
    ↓
Service (depende de contrato vía constructor)
    ↓
Hook (usa serviceProvider)
    ↓
Component (usa hook)
```

## Inyección por Constructor

Todos los Services reciben su dependencia vía constructor:

```js
export class CmsService {
  constructor(repository) {   // ← inyección
    this.repository = repository;
  }
  getHeroSlides() {
    return this.repository.getHeroSlides();  // ← usa contrato
  }
}
```

## Repository Swapping

El mismo Service funciona con cualquier implementación que cumpla el contrato:

```js
// Real
new CmsService(cmsRepository)

// Mock
new CmsService(cmsMockRepository)

// Offline (futuro)
new CmsService(cmsOfflineRepository)

// Cache (futuro)
new CmsService(cmsCacheRepository)
```

## Beneficios para Testing

```js
// test/services/cms.service.test.js
import { CmsService } from '@/services/api';

const mockRepo = {
  getHeroSlides: () => Promise.resolve([{ id: 1, title: 'Test' }]),
};

const service = new CmsService(mockRepo);
const result = await service.getHeroSlides();
// result → [{ id: 1, title: 'Test' }]
```
