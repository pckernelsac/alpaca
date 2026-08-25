# INTEGRACIÓN DE CAMPAÑAS DE MARKETING — REAL API

## Migración del Módulo de Marketing (`/marketing/campanas`)

Se migró `CampaignList.jsx` para consumir el endpoint real NestJS `GET /api/v1/marketing/campaigns`.

---

## Cambios Realizados

1. **Eliminación de Campañas Simuladas**:
   - Se removieron los registros hardcodeados ("Lanzamiento Invierno '24", etc.).

2. **Integración con Zustand Store (`useMarketingStore`)**:
   - Conectado a `useMarketingStore` (`campaigns`, `meta`, `loading`, `error`, `fetchAll`).

3. **Gestión Promocional Real**:
   - Muestra nombre de la campaña, tipo, canal de difusión (Email, Social, Web), presupuesto asignado y estado.
