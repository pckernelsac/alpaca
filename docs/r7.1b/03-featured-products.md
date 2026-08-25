# R7.1B — Featured Products Integration Report

> **Página:** Catálogo / Productos Destacados

---

## Estado

No existe una página de catálogo independiente en el frontend institucional. La sección más cercana es `HomeCategories` que muestra colecciones con imágenes estáticas.

## Endpoint Disponible

GET /products está implementado en el backend con soporte para parámetros `search`, `categoryId`, `collectionId`, `sort`, `page`, `perPage`.

## Hook Faltante

No existe un hook `useProducts()` o `useCatalog()` en la arquitectura actual. El repository `catalogRepository` existe en `repositories/index.js` pero no está expuesto via service ni hook.

## Recomendación

Para una futura página de catálogo:
1. Crear `src/hooks/useProducts.js` → `catalogService` o directamente `catalogRepository`
2. Usar `mapProduct` mapper
3. Implementar `createProduct` domain model

**Checklist:** ☐ Endpoint (existe) ☐ Repository (existe) ☐ Service (no) ☐ Hook (no) ☐ Mapper (no) ☐ Domain Model (no) ✅ UI sin cambios ✅ Build PASS
