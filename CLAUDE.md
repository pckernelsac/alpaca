# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

ALPACART — ecommerce de alpaca peruana. Monorepo **sin workspaces**: cada app tiene su propio `package.json` y `node_modules`; no hay `package.json` en la raíz. Siempre hay que `cd` a la app antes de instalar o correr scripts.

```
backend/                    NestJS 10 + TypeScript + Sequelize 6 (puerto 8000)
frontend/pagina-institucional/  React 19 + Vite (puerto 3101)
frontend/tienda/            React 19 + Vite (puerto 3102)
frontend/dashboard/         React 19 + Vite (puerto 5173)
packages/                   8 paquetes compartidos (JS/TS plano, sin build)
docs/                       ~426 archivos de especificación y auditorías
```

Documentación humana relevante: `SETUP.md` (arranque completo), `docs/api/estandar.md` (contrato REST), `CHANGELOG.md`, `STRIPE.md`.

## Comandos

### Infraestructura (PostgreSQL 16 + Redis 7)

```bash
cd backend
docker compose -f docker-compose-r7v.yml up -d   # PG en :5446 (BD alpacart_r7v), Redis en :6387
docker compose -f docker-compose-r7v.yml down -v # borra volúmenes = borra datos
```

Los puertos son **5446/6387**, no los estándar, para no colisionar con otras instalaciones. `backend/.env` ya apunta ahí.

### Backend

```bash
cd backend
npm run start:dev        # watch
npm run build && npm start
npm run lint             # eslint sobre src/ y test/
npm test                 # jest (unit, *.spec.ts bajo src/)
npm test -- catalog      # un archivo/patrón concreto
npm run test:e2e         # test/app.e2e-spec.ts, --runInBand
npm run db:migrate
npm run db:seed
npm run db:reset         # undo:all → migrate → seed:all
node scripts/r7v-tests.js  # smoke test end-to-end contra dist/ en :8990 (requiere npm run build previo)
```

`npm run db:*` pasan por `scripts/sequelize-runner.js`, que carga `backend/.env` con dotenv antes de invocar `sequelize-cli`. Llamar a `npx sequelize-cli` directamente **no** lee el `.env` — hay que exportar `DB_*` a mano.

Cobertura de tests: mínima (`src/app.spec.ts` y un e2e). El CI corre `npm test` con `continue-on-error: true`.

### Frontends (idéntico en las tres apps)

```bash
cd frontend/<app>
npm run dev | build | preview
npm run lint        # eslint --max-warnings 0
npm run format
```

Cada app tiene husky + lint-staged (eslint --fix + prettier en `*.{js,jsx}`).

### Utilidades de raíz

`check_css_vars.js` y `check_imports.js` se ejecutan **desde dentro de un frontend** (`node ../../check_css_vars.js`): validan que `:root` y `[data-theme="dark"]` definan las mismas custom properties, y que los imports `@/...` resuelvan.

## Arquitectura backend

Un módulo NestJS por dominio en `src/modules/` (iam, auth, catalog, textile, crm, customers, orders, payments, inventory, logistics, marketing, cms, audit, settings, analytics), cada uno con `*.controller.ts` / `*.service.ts` / `*.module.ts` / `dto/` / `entities/`.

**Autenticación dual por actor.** Un solo JWT con `{ sub, type }` donde `type` es `'staff'` o `'customer'`. `JwtStrategy.validate()` resuelve contra `User` (staff, con `Role`) o `Customer` según el `type` y devuelve `req.user` con ese campo. Dos endpoints de login: `POST /auth/login` (staff) y `POST /auth/customer-login` (customer).

Guards globales registrados en `app.module.ts`: `ActorGuard` y `ThrottlerGuard`. `ActorGuard` es **restrictivo pero no autenticador** — sólo verifica `user.type` contra los actores permitidos y deja pasar si no hay `user`. La autenticación real es opt-in por endpoint con `@UseGuards(JwtAuthGuard)`. Decoradores en `src/common/decorators/`: `@Actor(...)` / `@StaffOnly()` / `@CustomerOnly()`, `@Roles(...)`, `@Public()`, `@CurrentUser()`.

**Formato de respuesta.** `TransformInterceptor` (global) envuelve todo en `{ success: true, data }`, salvo que el service ya devuelva un objeto con `success`, o con `meta` + `data` (en cuyo caso conserva la paginación). Los errores pasan por `HttpExceptionFilter`. Los frontends por eso desempaquetan defensivamente (`res?.data ?? res`).

**Rutas.** La mayoría de controllers usan `@Controller()` vacío y declaran la ruta completa en el método (`@Get('transactions')`), de modo que un módulo puede exponer varios recursos de primer nivel. Prefijo global `api/v1`. Swagger en `/api/v1/docs`; `npx ts-node scripts/generate-openapi.ts` vuelca el spec a `docs/openapi/`.

**Persistencia.** `sequelize-typescript` con `autoLoadModels: true` y `synchronize: false` — el esquema **sólo** cambia vía migraciones en `backend/database/migrations/` (numeradas `YYYYMMDD-NNN-descripcion.js`). Entidades con `@Table({ underscored: true })`: camelCase en TS, snake_case en la BD. PKs UUID. Seeds en `backend/database/seeds/`, tablas de control `sequelize_meta` / `sequelize_data`.

**Shared** (`src/shared/`): `redis/` (cliente + storage del throttler; **fail-open**, la API funciona sin Redis), `idempotency/` (`@Global`, tabla `idempotency_keys` con `findOrCreate` atómico; el checkout acepta header `Idempotency-Key`), `storage/` (S3/MinIO con presigned URLs, `POST /upload`).

Stripe vive en `payments/stripe.service.ts`; el webhook es `@Public()` y depende de `rawBody: true` en `main.ts`.

## Arquitectura frontend

Las tres apps comparten stack (React 19, Vite 6, react-router 6, axios, **CSS Modules**, JavaScript sin TypeScript) y una arquitectura en capas, pero **difieren en la capa de estado**.

Flujo de datos común:

```
api/endpoints/*.endpoints.js   funciones que devuelven la URL
api/client.js                  axios + createApiClient() de @alpacart/shared-api-client (inyecta token, maneja 401)
repositories/                  llamadas HTTP por dominio
mappers/                       desempaqueta la envoltura { success, data } de la API
domain/                        factories createProduct() / createOrder()… → forma estable para la UI
services/                      clases con la lógica de negocio, reciben el repositorio por constructor
providers/ServiceProvider.js   inyección: new CatalogService(catalogRepository)
hooks/ o stores/               consumo desde React
```

- **tienda** e **institucional**: hooks + Context (`useCatalog`, `useCart`, `AuthContext`, `ThemeContext`, `UIContext`); institucional además define interfaces de repositorio en `src/contracts/I*Repository.js`.
- **dashboard**: 13 stores Zustand en `src/stores/` que llaman a `repositories/api` directamente (sin capa `services/`).

Al agregar un endpoint hay que tocar la cadena completa: endpoint → repository → (service) → hook/store.

**Convenciones de componentes:** un directorio por componente con `Componente.jsx` + `Componente.module.css`; páginas en `pages/<Pagina>/` con `sections/` opcional. Alias `@` → `src/`. Los `packages/` se resuelven por alias de Vite a `packages/<nombre>/src` (código fuente, sin build ni instalación); si un import `@alpacart/*` falla, revisar `resolve.alias` en el `vite.config.js` de la app.

**Tema claro/oscuro** por `data-theme` en `<html>` y CSS custom properties en `src/styles/variables.css`. Todo color nuevo debe declararse en **ambos** bloques (`:root` y `[data-theme="dark"]`).

**Idioma:** la UI, los mensajes de error y los comentarios del código están en español. Mantenerlo.

## Notas operativas

- `backend/.env` está versionado con valores de desarrollo; `SETUP.md` y `CREDENCIALES.md` listan las credenciales sembradas (staff `mateo.q@alpacart.com` / `Admin123!`, customer `camila.g@email.com` / `Cliente2024!`).
- CI (`.github/workflows/ci.yml`): cuatro jobs independientes en Node 20, uno por app, cada uno con su `npm ci` + `npm run build`. Ningún job corre lint.
- `version.json` versiona backend, cada frontend y cada paquete por separado.
