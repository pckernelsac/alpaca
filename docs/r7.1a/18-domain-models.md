# R7.1A.2 — Domain Models

> **Modelos de dominio que React consume — nunca DTOs directos**

---

## Ubicación: `src/domain/`

### Modelos Creados

| Archivo | Factory | Campos |
|---------|---------|--------|
| `Hero.js` | `createHeroSlide(data)` | id, title, subtitle, image, cta, order, active |
| `Faq.js` | `createFaqCategory(data)`, `createFaqItem(data)` | category: id, name, slug, icon, order, items[] |
| `Gallery.js` | `createGalleryImage(data)` | id, url, altText, caption, category, order, visible |
| `Benefit.js` | `createBenefit(data)` | id, title, description, icon, image, order, active |
| `ArtisanProcess.js` | `createArtisanProcess(data)` | id, title, description, icon, image, stepOrder, active |
| `Testimonial.js` | `createTestimonial(data)` | id, author, role, company, avatar, text, rating, featured, order, active |

### Flujo de Datos

```
Backend JSON
    ↓
ApiClient (unwrap { success, data })
    ↓
Repository (raw response)
    ↓
Mapper (transform + call domain factory)
    ↓
Domain Model (create* function)
    ↓
Hook (useState)
    ↓
React Component
```

### ¿Por qué Domain Models?

| Razón | Explicación |
|-------|-------------|
| **Inmutabilidad conceptual** | El modelo de dominio no cambia aunque el backend cambie |
| **Validación en frontera** | `create*` functions normalizan valores nullable/undefined |
| **Sin acoplamiento a DTO** | React nunca ve `raw.id` del backend |
| **Testing** | Crear domain models en tests sin depender del backend |
| **Documentación** | El modelo es la fuente de verdad de la forma de los datos |
