# R7.1B — Footer Integration Report

> **Componente:** Footer (layout global)

---

## Estado

El Footer contiene:
- Marca (logo, tagline) — datos estáticos de diseño
- Enlaces de navegación (Explorar, Ayuda, Contacto) — estáticos
- Redes sociales — estáticos
- Newsletter (oculto por defecto)

## Endpoint Disponible

GET /settings/company devuelve `{ legalName, email, phone, address, website, ... }`. Podría usarse para poblar dinámicamente la información de contacto en el footer.

## Recomendación

Migrar `defaultColumns[2].links` (Contacto) a datos de la API:
```js
const company = await cmsService.getCompany();
// email → company.email
// phone → company.phone
```

Actualmente no se implementó porque los datos estáticos coinciden con los del seed.

**Checklist:** ☐ Endpoint (existe) ☐ Repository (existe) ☐ Service (existe) ☐ Hook (no) ☐ Mapper ☐ Domain Model ✅ UI sin cambios ✅ Build PASS
