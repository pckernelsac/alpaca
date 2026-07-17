# R7.1A — Services

> **Business logic layer — singleton instances**

---

## File: `src/services/api.js`

### Pattern

Services are singleton objects created at module load time:

```js
import { domainRepository } from '@/repositories';
import { api } from '@/api/client';

export const domainService = (() => {
  const repo = domainRepository(api);
  return {
    getX: repo.getX,
    doY: async (params) => {
      const result = await repo.doY(params);
      // business logic here
      return result;
    },
  };
})();
```

### Services Available

| Service | Methods | Source Repository |
|---------|---------|------------------|
| `cmsService` | getHeroSlides, getFaq, getGallery, getTestimonials, getBenefits, getArtisanProcesses, getContents | cmsRepository |
| `contactService` | send | contactRepository |
| `newsletterService` | subscribe | newsletterRepository |
| `authService` | login, customerLogin, register, getProfile | authRepository |

### Adding Business Logic

Services are the correct place for:
- Response transformation (calling mappers)
- Multiple repository orchestration
- Caching decisions
- Error enrichment
