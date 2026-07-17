# R7.1B — Newsletter Integration Report

> **Página:** Newsletter (sección Home y Footer)

---

## Componentes Integrados

| Sección | Componente | Hook | Endpoint | Uso |
|---------|-----------|------|----------|-----|
| Newsletter (Home) | HomeNewsletter | `useNewsletter()` | POST /newsletter/subscribe | Suscripción vía formulario |

## Cambios Realizados

- Reemplazado formulario estático por integración con `useNewsletter()` hook
- El hook usa `serviceProvider.newsletter.subscribe(email, source)` 
- `NewsletterSubscribeDto` conectado al backend (ICC-01 FIX)
- Se agregó feedback visual: loading, éxito, error
- Se limpia el input después de suscripción exitosa

## Problemas Encontrados

1. **Footer tiene su propio NewsletterForm**: El componente `Footer` acepta `showNewsletter` prop (default `false`). No se modificó porque por defecto no se muestra.
2. **Sin página de newsletter dedicada**: La suscripción ocurre solo desde el Home.

## Build

270 modules — sin errores.

**Checklist:** ✅ Endpoint ✅ Repository ✅ Service ✅ Hook ✅ Mapper ✅ Domain Model ✅ Datos reales ✅ UI sin cambios ✅ Build PASS
