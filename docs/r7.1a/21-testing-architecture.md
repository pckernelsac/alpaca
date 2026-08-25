# R7.1A.2 — Testing Architecture

> **Infraestructura preparada para testing**

---

## Componentes Testeables

| Capa | Testeable | Cómo |
|------|-----------|------|
| Domain Models | ✅ | Unit: `createHeroSlide({...})` |
| Mappers | ✅ | Unit: `mapHeroSlides([raw])` |
| Services | ✅ | Unit: `new CmsService(mockRepo)` |
| Repositories | ⚠️ | Integration: require ApiClient |
| Hooks | ⚠️ | Integration: require ServiceProvider |
| Contracts | ✅ | Verificación de forma |
| Mock Repositories | ✅ | Ya implementados |

## Mock Infrastructure

`src/repositories/mock/index.js` provee implementaciones mock para todos los repositorios del dominio CMS:

```js
export const cmsMockRepository = {
  getHeroSlides:       () => Promise.resolve([]),
  getFaq:              () => Promise.resolve([]),
  getGallery:          () => Promise.resolve([]),
  getTestimonials:     () => Promise.resolve([]),
  getBenefits:         () => Promise.resolve([]),
  getArtisanProcesses: () => Promise.resolve([]),
  getContents:         () => Promise.resolve([]),
};
```

## Estrategia de Testing

### Unit Tests (sin backend)
- **Domain**: `create*()` con datos válidos/nulos/borde
- **Mappers**: `map*(raw)` con respuesta backend simulada
- **Services**: `new Service(mockRepo)` + verify métodos

### Integration Tests (con mock backend)
- **Repositories**: `new Repository(mockApiClient)` + verify llamadas HTTP
- **Hooks**: Render hook con ServiceProvider mockeado

### E2E Tests (con backend real)
- Flujo completo: Component → Hook → Service → Repository → ApiClient → Backend
