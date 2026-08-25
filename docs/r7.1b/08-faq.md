# R7.1B — FAQ Integration Report

> **Página:** Preguntas Frecuentes (`/preguntas`)

---

## Componentes Integrados

| Sección | Componente | Hook | Endpoint | Mapper | Domain |
|---------|-----------|------|----------|--------|--------|
| FAQ | FAQ | `useFaq()` | GET /faq | `mapFaq` | `createFaqCategory`, `createFaqItem` |

## Cambios Realizados

- Reemplazado el array hardcodeado `categories` (4 categorías, 8 preguntas) por datos de la API
- El componente `CategorySection` ahora usa `category.slug` en lugar de `category.id` para el anchor ID
- Usa `category.name` en lugar de `category.title` (shape del mapper)

## Problemas Encontrados

1. **FAQCategory no tiene `title`**: El mapper produce `name` no `title`. El componente esperaba `category.title`. Se corrigió a `category.name`.
2. **Seed data**: 4 categorías con 2 preguntas cada una (8 total). Coincide con el contenido previo.

## Build

270 modules — sin errores.

**Checklist:** ✅ Endpoint ✅ Repository ✅ Service ✅ Hook ✅ Mapper ✅ Domain Model ✅ Datos reales ✅ UI sin cambios ✅ Build PASS
