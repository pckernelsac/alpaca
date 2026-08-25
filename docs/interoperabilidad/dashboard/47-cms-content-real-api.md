# INTEGRACIÓN DE CONTENIDO CMS — REAL API

## Migración de Contenidos Institucionales (`/cms/contenido`)

Se migró `ContentList.jsx` para consumir el endpoint real de la API NestJS `GET /api/v1/cms/contents`.

---

## Cambios Realizados

1. **Eliminación de Mocks Inline**:
   - Se descartaron las entradas hardcodeadas del CMS ("Winter Alpaca Essentials", etc.).

2. **Integración con Zustand Store (`useCmsStore`)**:
   - Conectado a `useCmsStore` (`contents`, `meta`, `loading`, `error`, `fetchAll`).

3. **Gestión de Artículos y Páginas**:
   - Renderiza títulos, slugs de publicación, tipos de contenido y estado de publicación desde PostgreSQL.
