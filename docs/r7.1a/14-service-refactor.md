# R7.1A.1 — Service Refactor

> **De IIFE singleton a clase con dependency injection**

---

## Motivación

El patrón anterior usaba IIFE para crear singletons:

```js
export const cmsService = (() => {
  const repo = cmsRepository(api);
  return {
    getHeroSlides: repo.getHeroSlides,
    getFaq: repo.getFaq,
  };
})();
```

Problemas:
- No se puede testear (mock repository inyectable)
- No se puede extender (herencia)
- Acoplamiento directo a `api`

## Nueva arquitectura

```js
// 1. Clase con constructor
export class CmsService {
  constructor(repository) {
    this.repository = repository;
  }
  getHeroSlides()       { return this.repository.getHeroSlides(); }
  getFaq()              { return this.repository.getFaq(); }
  getGallery()          { return this.repository.getGallery(); }
  getTestimonials()     { return this.repository.getTestimonials(); }
  getBenefits()         { return this.repository.getBenefits(); }
  getArtisanProcesses() { return this.repository.getArtisanProcesses(); }
  getContents()         { return this.repository.getContents(); }
}

// 2. Instancia única (producción)
export const cmsService = new CmsService(cmsRepository);

// 3. Mock repository (testing)
export const mockCmsRepository = {
  getHeroSlides: () => Promise.resolve([]),
};
export const cmsServiceMock = new CmsService(mockCmsRepository);
```

## Beneficios

1. **Testeable**: Se puede inyectar un mock repository
2. **Extensible**: Herencia para variantes por frontend
3. **Desacoplado**: Service no conoce ApiClient ni Axios
4. **Preparado para DI**: Compatible con inyección de dependencias futura

## Servicios creados

| Clase | Instancia | Repositorio |
|-------|-----------|-------------|
| `CmsService` | `cmsService` | `cmsRepository` |
| `ContactService` | `contactService` | `contactRepository` |
| `NewsletterService` | `newsletterService` | `newsletterRepository` |
| `AuthService` | `authService` | `authRepository` |
