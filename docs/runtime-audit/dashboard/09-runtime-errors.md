# AUDITORÍA DE ERRORES DE RUNTIME Y PRIORIZACIÓN — DASHBOARD

## Clasificación de Problemas Detectados

Los hallazgos se han clasificado según su nivel de severidad (P0 Blocker, P1 High, P2 Medium):

---

## Problemas Priorizados

### P0 — Críticos / Bloqueantes

1. **Desconexión Completa Frontend ↔ Backend en Pantallas Internas**:
   - **Descripción**: El 100% de las pantallas protegidas del Dashboard (40 de 42 rutas) muestran información mediante arreglos hardcodeados (`dashboardData.js`, constantes en componentes). Ningún componente invoca las APIs backend ni los stores de Zustand.
   - **Ubicación**: `src/pages/**/*.jsx`

2. **Inyección de Sesión Ficticia en Entorno Dev**:
   - **Descripción**: `.env.development` tiene `VITE_DASHBOARD_PREVIEW=true`, lo que activa `PreviewProvider.jsx` e inyecta un token simulado (`preview_token`) y usuario mock en el inicio de la app, omitiendo la autenticación real JWT.
   - **Ubicación**: `src/preview/PreviewProvider.jsx` y `.env.development`

---

### P1 — Alta Severidad

1. **Mappers de Dominio No Integrados**:
   - **Descripción**: Los repositorios en `src/repositories/api.js` devuelven la respuesta directa de Axios / API sin invocar las funciones transformadoras definidas en `src/mappers/index.js`.
   - **Ubicación**: `src/repositories/api.js`

2. **Acciones de Mutación (Crear / Editar / Eliminar) Simuladas**:
   - **Descripción**: Pantallas como `ProductCreate.jsx`, `ClientCreate.jsx`, `UserCreate.jsx` no envían peticiones `POST`/`PUT` a la API. Simplemente muestran alertas o redirigen localmente.
   - **Ubicación**: `src/pages/ProductCreate/ProductCreate.jsx`, `src/pages/ClientCreate/ClientCreate.jsx`, `src/pages/UserCreate/UserCreate.jsx`

---

### P2 — Media Severidad

1. **Dependencia de Fuentes Externas (CDN)**:
   - **Descripción**: La UI de iconos se basa exclusivamente en Google Fonts CDN (`Material Symbols Outlined`). En redes corporativas cerradas u offline, los iconos se muestran como texto plano.
   - **Ubicación**: `index.html` y hojas de estilos CSS.
