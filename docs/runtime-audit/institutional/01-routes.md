# AUDITORÍA DE RUTAS — FRONTEND INSTITUCIONAL

## Resumen Ejecutivo de Rutas
Se auditaron las **11 rutas** registradas en `src/routes/routes.jsx` del Frontend Institucional.

---

## Inventario Completo de Rutas

| # | Ruta | Componente Página | Layout | Protegida | Tipo de Contenido | Integración API / Estado Real |
|---|------|-------------------|--------|-----------|-------------------|-------------------------------|
| 1 | `/` | `Home` | PublicLayout | No | HÍBRIDO | API REAL (`HeroSlider` solicita `GET /api/v1/hero-slides`). Resto de secciones static intentional. |
| 2 | `/about` | `About` | PublicLayout | No | STATIC INTENTIONAL | Contenido de marca, historia artesanal y valores institucionales. |
| 3 | `/catalogo` | `Catalog` | PublicLayout | No | STATIC INTENTIONAL | Muestra categorías y vitrina textil estática intencional. |
| 4 | `/promociones` | `Promotions` | PublicLayout | No | STATIC INTENTIONAL | Banners y promociones institucionales estáticas. |
| 5 | `/preguntas` | `FAQ` | PublicLayout | No | API REAL | Invoca `useFaq()` ➔ `GET /api/v1/faq` para cargar categorías y preguntas dinámicas. |
| 6 | `/terminos` | `Terms` | PublicLayout | No | STATIC INTENTIONAL | Términos y condiciones legales de la empresa. |
| 7 | `/politicas` | `Policies` | PublicLayout | No | STATIC INTENTIONAL | Políticas de privacidad y tratamiento de datos personales. |
| 8 | `/services` | `Services` | PublicLayout | No | STATIC INTENTIONAL | Descripción de servicios corporativos y confección a medida. |
| 9 | `/contacto` | `Contact` | PublicLayout | No | API REAL (FAIL) | Intenta `POST` de formulario a `/api/v1/v1/contact` (Error de URL duplicada `/v1/v1` ➔ 404). |
| 10 | `/blog` | `Blog` | PublicLayout | No | STATIC INTENTIONAL | Artículos institucionales y notas de sostenibilidad. |
| 11 | `*` | `NotFound` | N/A | No | UI STATIC | Página 404 estática. |

---

## Hallazgos Principales
1. **Conexiones API Activas**: La vista `/` (`HeroSlider`) y la vista `/preguntas` (`FAQ.jsx`) están integradas con los servicios backend NestJS mediante la capa de `ServiceProvider`, `services` y `hooks`.
2. **Naturaleza Institucional Estática**: El 70% del sitio web institucional está diseñado de forma intencional como contenido estático (`STATIC INTENTIONAL`) para la divulgación de marca, valores y políticas.
