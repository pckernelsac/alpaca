# Auditoría del Workspace — ALPACART Backend Implementation

## 1. Resumen Ejecutivo

| Aspecto | Resultado |
|---------|-----------|
| Modelo de repositorio | Repositorio simple (sin workspace manager) |
| Package manager | npm 11.15.0 |
| Node.js | v24.13.0 |
| Docker | disponible |
| Git | disponible |
| Backend existente | Carpeta `backend/` vacía — listo para implementar |
| Frontends | 3 independientes (dashboard, tienda, institucional) |
| Ubicación recomendada | `backend/` (ya existe, vacía) |
| Riesgos detectados | 10 |
| Bloqueantes | 0 |
| Estado final | **READY FOR PHASE 0B** |

---

## 2. Estado Actual del Workspace

| Elemento | Ruta | Estado |
|----------|------|--------|
| Raíz del proyecto | `D:\proyectos-propios\alpacart\` | ✅ |
| .git | `.git/` | ✅ |
| .gitignore | `.gitignore` | ✅ |
| README | `README.md` | ✅ |
| package.json raíz | — | ❌ No existe |
| workspace config | — | ❌ No existe |
| Docker compose | — | ❌ No existe |
| Backend | `backend/` | ⚠️ Vacío |
| Frontend dashboard | `frontend/dashboard/` | ✅ |
| Frontend tienda | `frontend/tienda/` | ✅ |
| Frontend institucional | `frontend/pagina-institucional/` | ✅ |
| Template dashboard | `template/dashboard/` | ✅ (40 HTML) |
| Docs backend-discovery | `docs/backend-discovery/` | ✅ (17 docs) |

---

## 3. Estructura Real del Repositorio

```
alpacart/
├── .git/
├── .gitignore
├── README.md
├── check_css_vars.js
├── check_imports.js
├── backend/                          ← VACÍO — lista para implementar
├── docs/
│   ├── backend-discovery/            ← 17 documentos
│   │   ├── 00-inventario-maestro.md
│   │   ├── 01-rutas-paginas.md
│   │   ├── ...
│   │   └── 17-preimplementation-certification.md
│   └── desarrollo/
│       └── README-desarrollo.md
├── frontend/
│   ├── dashboard/                    ← React 19 + Vite 6
│   ├── tienda/                       ← React 19 + Vite 6
│   └── pagina-institucional/         ← React 19 + Vite 6
└── template/
    └── dashboard/                    ← 40 HTML originales de Stitch
```

---

## 4. Modelo de Repositorio

**Tipo:** Repositorio simple (no monorepo, no workspace)

**Evidencia:**
- No existe `pnpm-workspace.yaml`
- No existe `package.json` raíz
- No existe `lerna.json`, `nx.json`, `turbo.json`
- Cada frontend tiene su propio `package.json` y `package-lock.json`
- No hay scripts compartidos entre proyectos

**Decisión:** Mantener como repositorio simple. Cada frontend gestiona sus dependencias. El backend tendrá su propio `package.json` en `backend/`.

---

## 5. Package Manager

| Herramienta | Versión | Disponible |
|-------------|---------|------------|
| npm | 11.15.0 | ✅ |
| pnpm | — | ❌ No instalado |
| yarn | — | ❌ No instalado |

**Package manager detectado:** npm (único disponible, usado por los 3 frontends)

---

## 6. Versiones de Herramientas

| Herramienta | Versión |
|-------------|---------|
| Node.js | v24.13.0 |
| npm | 11.15.0 |
| Docker | 29.2.0 |
| Git | 2.53.0 |
| OS | Windows |
| Arquitectura | x64 |

---

## 7. Estado de los Tres Frontends

### Dashboard (`frontend/dashboard/`)

| Aspecto | Detalle |
|---------|---------|
| Framework | React 19 |
| Bundler | Vite 6 |
| Puerto | No configurado en vite.config (default 5173) |
| API URL | `VITE_API_URL=http://localhost:8000/api/dashboard` |
| Cliente HTTP | Sin axios activo (services/api/ eliminado) |
| Auth | localStorage (auth_token) + Bearer interceptors eliminados |
| Mocks | 105 datasets inline en páginas |

### Tienda (`frontend/tienda/`)

| Aspecto | Detalle |
|---------|---------|
| Framework | React 19 |
| Bundler | Vite 6 |
| Puerto | `3102` |
| API URL | `VITE_API_URL=http://localhost:8000/api/tienda` |
| Cliente HTTP | Axios con interceptors (Bearer token, 401→/login) |
| Auth | localStorage (auth_token, auth_user) |
| Stores | cartStore, wishlistStore, uiStore (localStorage) |
| Mocks | 25 datasets inline en páginas |

### Página Institucional (`frontend/pagina-institucional/`)

| Aspecto | Detalle |
|---------|---------|
| Framework | React 19 |
| Bundler | Vite 6 |
| Puerto | `3101` |
| API URL | `VITE_API_URL=http://localhost:8000/api` |
| Cliente HTTP | Misma estructura que tienda |
| Mocks | 15 datasets inline |

---

## 8. Inventario Técnico de Mocks

| Categoría | Dashboard | Tienda | Institucional | Total |
|-----------|-----------|--------|---------------|-------|
| Productos | ~20 | ~15 | ~6 | ~41 |
| Clientes | ~10 | — | — | ~10 |
| Pedidos | ~15 | ~5 | — | ~20 |
| Usuarios | ~8 | — | — | ~8 |
| Órdenes (B2B) | ~15 | — | — | ~15 |
| Transacciones | ~10 | — | — | ~10 |
| Envíos | ~8 | — | — | ~8 |
| Campañas | ~6 | — | — | ~6 |
| Contenido CMS | ~8 | — | — | ~8 |
| Variantes | ~12 | — | — | ~12 |
| Roles/Permisos | ~4 roles + 7 perms | — | — | ~11 |
| FAQ | — | — | ~15 | ~15 |
| Colecciones | 4 | 4 | — | 8 |
| Categorías | 12 | 9 | — | 21 |
| Reviews | — | 2 | — | 2 |

**Total de entidades mock:** ~195 registros en los 3 frontends.

**Nota:** Los mocks están embebidos en archivos JSX como arrays estáticos. No hay archivos mock independientes. La trazabilidad mock→seed está documentada en `16-backend-blueprint-final.md` (sección 10).

---

## 9. Puertos y Red

| Servicio | Puerto | Configurado en | Estado |
|----------|--------|---------------|--------|
| Dashboard (frontend) | — (default 5173) | vite.config.js (sin server.port) | ⚠️ Sin puerto explícito |
| Tienda (frontend) | 3102 | vite.config.js | ✅ |
| Institucional (frontend) | 3101 | vite.config.js | ✅ |
| API (backend) | 3000 (blueprint) / 8000 (frontend envs) | — | ⚠️ Discrepancia |
| PostgreSQL | 5432 | — | ❌ No configurado |
| Redis | 6379 | — | ❌ No configurado |
| MinIO API | 9000 | — | ❌ No configurado |
| MinIO Console | 9001 | — | ❌ No configurado |

**Discrepancia importante:** Los frontends actualmente apuntan a `localhost:8000` como API base, pero el blueprint recomienda puerto `3000`. Habrá que decidir y unificar.

---

## 10. Estado Git

| Aspecto | Estado |
|---------|--------|
| Rama actual | `main` |
| Upstream | `origin/main` (actualizado) |
| Archivos modificados | ~55 (dashboard refactorización) |
| Archivos no rastreados | ~50 (docs de discovery + dashboard pages nuevas) |
| Cambios pendientes | Sin commit |
| Riesgo de pérdida | Bajo (cambios en working tree, no en staged) |

---

## 11. Comparación Workspace vs Blueprint

| Elemento | Blueprint | Workspace | Estado |
|----------|-----------|-----------|--------|
| `backend/` | Sí | Existe (vacío) | ⚠️ EXISTE PARCIALMENTE |
| NestJS | Sí | No | ❌ NO EXISTE |
| Sequelize | Sí | No | ❌ NO EXISTE |
| PostgreSQL | Sí | No | ❌ NO EXISTE |
| Redis | Opcional | No | ❌ NO EXISTE |
| MinIO | Sí | No | ❌ NO EXISTE |
| Docker Compose | Sí | No | ❌ NO EXISTE |
| Swagger | Sí | No | ❌ NO EXISTE |
| Migraciones | Sí | No | ❌ NO EXISTE |
| Seeds | Sí | No | ❌ NO EXISTE |
| Tests | Sí | No | ❌ NO EXISTE |
| `.env` (backend) | Sí | No | ❌ NO EXISTE |
| ESLint/Prettier | Sí | No | ❌ NO EXISTE |
| Auth (JWT) | Sí | No | ❌ NO EXISTE |
| CORS | Sí | No | ❌ NO EXISTE |

---

## 12. Dependencias Topológicas Detectadas

### Orden conceptual de creación de tablas por migración:

```
001-iam:        roles → permissions → departments → users → role_permissions → sessions → password_resets
002-textile:    fiber_materials → textile_colors → textile_sizes → seasons
003-catalog:    categories → collections → tags → products → product_variants → product_tags → product_media
004-clients:    clients → client_addresses → client_payment_methods → client_notes
005-customers:  customers → customer_addresses → wishlist_items → reviews → carts → cart_items
006-orders:     orders → order_items → order_events → order_documents
007-payments:   transactions → transaction_refunds
008-inventory:  warehouses → stock_items → stock_movements → warehouse_transfers → warehouse_transfer_items
009-logistics:  carriers → shipments → shipment_events
010-marketing:  campaigns → coupons → promotions → newsletter_subscribers
011-cms:        contents → faq_categories → faq_items → hero_slides → gallery_images → testimonials → benefits → artisan_processes
012-settings:   company_settings
013-audit:      audit_logs
014-contact:    contact_inquiries
015-indexes:    índices compuestos
016-cross-fks:  sessions.customer_id → customers, carts.coupon_id → coupons, orders.coupon_id → coupons
017-triggers:   triggers de auditoría
```

### Dependencias intra-migración destacadas:

| Tabla | Depende de | Migración |
|-------|-----------|-----------|
| role_permissions | roles, permissions | Misma (001) |
| products | categories, collections | Misma (003) |
| product_variants | products | Misma (003) |
| product_variants | fiber_materials, textile_sizes, textile_colors (002) | Cross-migración |
| collections | seasons (002) | Cross-migración |
| product_tags | products, tags | Misma (003) |
| order_items | orders | Misma (006) |
| stock_items | products/variants, warehouses | Cross-migración |
| warehouse_transfer_items | warehouse_transfers | Misma (008) |

---

## 13. FKs Cross-Domain (Creación Diferida)

| FK | Origen (migración) | Destino (migración) | Se crea en |
|----|-------------------|-------------------|------------|
| sessions.customer_id | 001-iam | 005-customers | **016-cross-fks** |
| carts.coupon_id | 005-customers | 010-marketing | **016-cross-fks** |
| orders.coupon_id | 006-orders | 010-marketing | **016-cross-fks** |

No se detectaron otras FKs cross-domain adicionales.

---

## 14. Riesgos

| ID | Riesgo | Severidad | Descripción |
|----|--------|-----------|-------------|
| R01 | Discrepancia seed 234 vs 235 | **BAJO** | La tabla visible suma 234, el blueprint declara 235. Requiere reconciliación contra mocks reales. |
| R02 | Puerto API: 3000 vs 8000 | **MEDIO** | Blueprint dice 3000, frontends apuntan a 8000. Habrá que unificar. |
| R03 | Dashboard sin puerto explícito | **BAJO** | vite.config.js del dashboard no tiene server.port. Usa default 5173. |
| R04 | Dashboard sin axios activo | **BAJO** | services/api/ fue eliminado durante refactorización del dashboard. Se restaurará con el backend. |
| R05 | Docker no disponible en todos los entornos | **INFORMATIVO** | Docker está disponible localmente. |
| R06 | Git con cambios sin commit | **BAJO** | ~100 archivos modificados/no rastreados. Los cambios son de la migración del dashboard y docs de discovery. |
| R07 | Sin refresh tokens en frontend | **MEDIO** | Los frontends usan solo access token en localStorage. El blueprint propone refresh token httpOnly. |
| R08 | Envs apuntan a puerto 8000, no 3000 | **MEDIO** | Habrá que decidir si cambiar los frontends o usar 8000. |
| R09 | Node v24 puede tener incompatibilidades | **INFORMATIVO** | Node 24 es muy reciente. NestJS 10 y Sequelize 6 deben verificarse. |
| R10 | MinIO/Redis no instalados localmente | **BAJO** | Se resolverán via Docker Compose en Fase 0B. |

---

## 15. Bloqueantes

| ID | Bloqueante | Estado |
|----|-----------|--------|
| — | Ninguno detectado | ✅ |

Todos los riesgos son manejables y no impiden comenzar la Fase 0B.

---

## 16. Ubicación Recomendada del Backend

**Recomendación:** `backend/` (directorio ya existente, actualmente vacío)

**Justificación:**
- Ya existe en la raíz del proyecto
- Consistente con `frontend/` para los 3 frontends
- Evita crear una nueva carpeta raíz
- Separación clara de dominios
- Escalable a Docker Compose multi-servicio
- No requiere conversión a monorepo

**Estructura propuesta:**
```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   ├── common/
│   └── modules/
│       ├── auth/
│       ├── users/
│       ├── catalog/
│       ├── orders/
│       ├── payments/
│       ├── inventory/
│       ├── logistics/
│       ├── crm/
│       ├── customers/
│       ├── marketing/
│       ├── cms/
│       ├── textile/
│       ├── audit/
│       ├── analytics/
│       ├── settings/
│       └── contact/
├── database/
│   ├── migrations/
│   └── seeds/
├── test/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

---

## 17. Plan Exacto para Fase 0B

### Objetivo: Bootstrap profesional de NestJS

| Acción | Detalle |
|--------|---------|
| Directorio | `backend/` |
| Package manager | npm |
| Node.js | 20 LTS (no 24, por compatibilidad NestJS) |
| NestJS | CLI v10 → `npx @nestjs/cli new .` |
| TypeScript | 5 |
| ESLint | @typescript-eslint + prettier |
| Testing | Jest (NestJS default) |

### Dependencias iniciales:

```
Producción:
- @nestjs/core, @nestjs/common, @nestjs/platform-express
- @nestjs/config
- @nestjs/jwt, @nestjs/passport, passport, passport-jwt
- @nestjs/swagger
- sequelize, sequelize-typescript, pg
- class-validator, class-transformer
- bcrypt
- reflect-metadata, rxjs

Desarrollo:
- @nestjs/cli, @nestjs/schematics
- @types/express, @types/bcrypt, @types/passport-jwt
- typescript, ts-node
- eslint, prettier, @typescript-eslint/eslint-plugin, @typescript-eslint/parser
- jest, @types/jest, ts-jest
- husky, lint-staged
```

### Scripts:
```json
{
  "start": "nest start",
  "dev": "nest start --watch",
  "build": "nest build",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,test}/**/*.ts\"",
  "format": "prettier --write \"src/**/*.ts\"",
  "test": "jest",
  "test:e2e": "jest --config ./test/jest-e2e.json",
  "migration:generate": "npx sequelize-cli migration:generate",
  "migration:run": "npx sequelize-cli db:migrate",
  "seed:all": "npx sequelize-cli db:seed:all"
}
```

### Configuración inicial:
- Puerto API: **3000** (según blueprint)
- CORS: `http://localhost:3100, http://localhost:3101, http://localhost:3102`
- Swagger: `/api/docs`
- Health: `/api/health`
- Prefijo global: `/api/v1`

### docker-compose.yml inicial:
```yaml
services:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: alpacart
      POSTGRES_USER: alpacart
      POSTGRES_PASSWORD: alpacart

  minio:
    image: minio/minio
    ports: ["9000:9000", "9001:9001"]
    command: server /data --console-address ":9001"

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

---

## 18. Resultado Final

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   WORKSPACE AUDIT — ALPACART                                 ║
║                                                              ║
║   Modelo de repositorio: simple                    ✅        ║
║   Package manager: npm 11.15.0                    ✅        ║
║   Backend existente: sí (vacío)                   ✅        ║
║   Ubicación recomendada: backend/                  ✅        ║
║   Frontends: 3 independientes                     ✅        ║
║   Docs de discovery: 17 documentos                 ✅        ║
║   Riesgos: 10                                     ⚠️        ║
║   Bloqueantes: 0                                  ✅        ║
║                                                              ║
║   Resultado: READY FOR PHASE 0B                   ✅        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```
