# R7.1A.2 — Composition Root

> **Punto único de resolución de dependencias**

---

## Ubicación: `src/providers/ServiceProvider.js`

### Responsabilidad

El Composition Root es el único lugar donde se crean y resuelven todas las dependencias:

```js
import { CmsService, ContactService, NewsletterService, AuthService } from '@/services/api';
import { cmsRepository, contactRepository, newsletterRepository, authRepository } from '@/repositories';
import { cmsMockRepository, contactMockRepository, newsletterMockRepository, authMockRepository } from '@/repositories/mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const serviceProvider = {
  cms:        new CmsService(USE_MOCK ? cmsMockRepository : cmsRepository),
  contact:    new ContactService(USE_MOCK ? contactMockRepository : contactRepository),
  newsletter: new NewsletterService(USE_MOCK ? newsletterMockRepository : newsletterRepository),
  auth:       new AuthService(USE_MOCK ? authMockRepository : authRepository),
};
```

### Reglas

1. **Un solo Composition Root** por aplicación
2. **Ningún otro archivo** crea instancias de servicios o repositorios
3. **Provider exporta un objeto** con todas las instancias resueltas
4. **Hooks consumen desde serviceProvider**, no importan services directamente

### Mock Mode

`VITE_USE_MOCK=true` activa mock repositories para desarrollo/testing sin backend.

### Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| Creación | En `services/api.js` (exports directos) | En `providers/ServiceProvider.js` |
| Consumo | `import { cmsService } from '@/services/api'` | `import { serviceProvider } from '@/providers/ServiceProvider'` |
| Mock | No existía | `VITE_USE_MOCK=true` + mock repositories |
| DI | Manual, implícita | Centralizada, explícita |
