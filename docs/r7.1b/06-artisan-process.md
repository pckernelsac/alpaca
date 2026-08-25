# R7.1B — Artisan Process Integration Report

> **Página:** Proceso Artesanal

---

## Estado

No existe una página dedicada al proceso artesanal en el frontend institucional. Los datos están disponibles en la API.

## Endpoint Disponible

GET /artisan-processes — seed 008 inserta 4 procesos (Selección, Lavado, Teñido, Tejido).

## Hooks Disponibles

`useArtisanProcesses` no existe aún. El repository `cmsRepository.getArtisanProcesses()` está implementado. Se requiere crear el hook para exponerlo.

## Recomendación

Si se agrega una sección de proceso artesanal en el futuro, usar:
- Hook: crear `useArtisanProcesses()` → `cmsService.getArtisanProcesses()` → `cmsRepository`
- Mapper: `mapArtisanProcesses` (ya existe)
- Domain: `createArtisanProcess` (ya existe)

**Checklist:** ☐ Endpoint (existe) ☐ Repository (existe) ☐ Service (existe) ☐ Hook (no) ☐ Mapper (existe) ☐ Domain Model (existe) ✅ UI sin cambios ✅ Build PASS
