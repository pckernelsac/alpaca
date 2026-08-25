# R7.1A — Mappers

> **Response transformation layer**

---

## Location: `src/mappers/`

### Purpose

Mappers transform raw backend JSON into frontend model shapes. Never expose raw API responses to components.

### Files

| Mapper | Transforms | Filters |
|--------|-----------|---------|
| `hero.mapper.js` | HeroSlide → `{ id, title, subtitle, image, cta, order, active }` | `active !== false` |
| `faq.mapper.js` | FaqCategory + FaqItem[] → `{ id, name, slug, icon, order, items[] }` | — |
| `gallery.mapper.js` | GalleryImage → `{ id, url, altText, caption, category, order, visible }` | `visible !== false` |
| `benefit.mapper.js` | Benefit → `{ id, title, description, icon, image, order, active }` | `active !== false` |
| `testimonial.mapper.js` | Testimonial → `{ id, author, role, company, avatar, text, rating, featured, order, active }` | `active !== false` |
| `artisan.mapper.js` | ArtisanProcess → `{ id, title, description, icon, image, stepOrder, active }` | `active !== false` |

### Pattern

```js
export function mapDomainItem(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    // transform + default values
    title: raw.title,
    description: raw.description || '',
    active: raw.active !== false,
  };
}

export function mapDomainItems(rawList) {
  return (rawList || []).map(mapDomainItem).filter((item) => item.active);
}
```

### Why Mappers?

1. **Default values**: Backend nullable fields get sensible defaults
2. **Boolean normalization**: `active !== false` handles null/undefined/true/false
3. **Shape decoupling**: Backend entity changes don't break frontend
4. **Computed fields**: Add derived properties (e.g., `cta` object combining ctaText + ctaLink)
5. **Filtering**: Remove inactive/invisible items at transform layer
