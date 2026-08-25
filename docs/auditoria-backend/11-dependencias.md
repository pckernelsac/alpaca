# 11 — Dependencias

## Objetivo
Auditar las dependencias del proyecto: cuáles se usan, cuáles están obsoletas o no se usan, versiones.

## Alcance
- `package.json` (dependencies + devDependencies)

## Estado actual
27 dependencias de producción, 16 devDependencies. Todas las dependencias principales se utilizan. No hay dependencias obsoletas evidentes.

---

## Dependencias de Producción (27)

| Dependencia | Versión | Uso | ¿Se usa? |
|-------------|---------|-----|----------|
| `@aws-sdk/client-s3` | ^3.1085.0 | S3-compatible storage | ✅ `storage.service.ts` |
| `@aws-sdk/s3-request-presigner` | ^3.1085.0 | Signed URLs | ✅ `storage.service.ts` |
| `@nestjs/common` | ^10.4.0 | NestJS core | ✅ |
| `@nestjs/config` | ^3.3.0 | ConfigModule | ✅ `config/index.ts` |
| `@nestjs/core` | ^10.4.0 | NestJS core | ✅ |
| `@nestjs/jwt` | ^11.0.2 | JWT auth | ✅ `auth.module.ts` |
| `@nestjs/passport` | ^11.0.5 | Passport integration | ✅ `auth.module.ts` |
| `@nestjs/platform-express` | ^10.4.0 | Express platform | ✅ |
| `@nestjs/sequelize` | ^11.0.1 | Sequelize ORM | ✅ `app.module.ts` |
| `@nestjs/swagger` | ^8.1.1 | Swagger docs | ✅ `main.ts` |
| `@nestjs/terminus` | ^11.1.1 | Health checks | ✅ `health.controller.ts` |
| `@nestjs/throttler` | ^6.5.0 | Rate limiting | ✅ `app.module.ts` |
| `bcrypt` | ^6.0.0 | Password hashing | ✅ `auth.service.ts`, `customers.service.ts` |
| `class-transformer` | ^0.5.1 | DTO transformation | ✅ `main.ts` ValidationPipe |
| `class-validator` | ^0.14.1 | DTO validation | ✅ `env.validation.ts`, `login.dto.ts` |
| `compression` | ^1.8.1 | HTTP compression | ✅ `main.ts` |
| `helmet` | ^8.3.0 | Security headers | ✅ `main.ts` |
| `ioredis` | ^5.11.1 | Redis client | ✅ `redis.service.ts` |
| `passport` | ^0.7.0 | Auth middleware | ✅ `auth.module.ts` |
| `passport-jwt` | ^4.0.1 | JWT strategy | ✅ `jwt.strategy.ts` |
| `pg` | ^8.22.0 | PostgreSQL driver | ✅ Sequelize config |
| `reflect-metadata` | ^0.2.2 | TypeScript decorators | ✅ |
| `rxjs` | ^7.8.1 | Reactive extensions | ✅ NestJS |
| `sequelize` | ^6.37.8 | ORM | ✅ |
| `sequelize-typescript` | ^2.1.6 | TS decorators for Sequelize | ✅ |
| `sharp` | ^0.35.3 | Image processing | ✅ `storage.service.ts` |
| `stripe` | ^22.3.1 | Stripe payments | ✅ `stripe.service.ts` |

## DevDependencies (16)

| Dependencia | Versión | Uso | ¿Se usa? |
|-------------|---------|-----|----------|
| `@nestjs/cli` | ^10.4.0 | NestJS CLI | ✅ |
| `@nestjs/schematics` | ^10.2.0 | Code generation | ✅ |
| `@nestjs/testing` | ^10.4.0 | Testing utilities | ✅ `app.spec.ts` |
| `@types/bcrypt` | ^6.0.0 | TypeScript types | ✅ |
| `@types/compression` | ^1.8.1 | TypeScript types | ✅ |
| `@types/express` | ^5.0.0 | TypeScript types | ✅ |
| `@types/jest` | ^29.5.14 | TypeScript types | ✅ |
| `@types/multer` | ^2.2.0 | TypeScript types | ✅ `storage.controller.ts` |
| `@types/node` | ^22.10.0 | TypeScript types | ✅ |
| `@types/passport-jwt` | ^4.0.1 | TypeScript types | ✅ |
| `@types/supertest` | ^6.0.2 | TypeScript types | ✅ |
| `@typescript-eslint/eslint-plugin` | ^8.16.0 | ESLint | ✅ |
| `@typescript-eslint/parser` | ^8.16.0 | ESLint | ✅ |
| `eslint` | ^8.57.1 | Linting | ✅ |
| `eslint-config-prettier` | ^9.1.0 | Prettier integration | ✅ |
| `eslint-plugin-prettier` | ^5.2.0 | Prettier | ✅ |
| `jest` | ^29.7.0 | Test framework | ✅ |
| `prettier` | ^3.4.0 | Code formatter | ✅ |
| `sequelize-cli` | ^6.6.5 | Migration CLI | ✅ |
| `source-map-support` | ^0.5.21 | Stack traces | ✅ |
| `supertest` | ^7.0.0 | HTTP testing | ✅ |
| `ts-jest` | ^29.2.5 | Jest TypeScript | ✅ |
| `ts-loader` | ^9.5.1 | Webpack loader | ✅ |
| `ts-node` | ^10.9.2 | TypeScript execution | ✅ `database/config/sequelize.js` |
| `tsconfig-paths` | ^4.2.0 | Path mapping | ✅ |
| `typescript` | ^5.7.0 | Language | ✅ |

## Dependencias no utilizadas
- **Ninguna**: todas las dependencias se referencian en al menos un archivo del proyecto.

## Versiones notables
- NestJS v10 — estable y con soporte LTS
- Sequelize v6 — estable, migración a v7 disponible pero no crítica
- TypeScript v5.7 — última versión estable
- Node engine: >=20.0.0

## Análisis de seguridad
- `bcrypt` v6 — correcto para password hashing
- `helmet` v8.3 — protección de headers HTTP
- `class-validator` + `whitelist: true` — protección contra mass assignment

## Dependencias faltantes
- **Winston o Pino**: no hay logging estructurado (solo `console.log`)
- No hay cliente HTTP externo (usando `axios` o `node-fetch`) — no necesario, pero podría ser útil para integraciones

## Hallazgos
1. **F1**: Todas las dependencias se usan — sin dead dependencies.
2. **F2**: Stripe SDK v22.3.1 — integración correcta.
3. **F3**: Sharp v0.35.3 para procesamiento de imágenes.
4. **F4**: `types/multer` presente pero multer no está en dependencies — multer viene con `@nestjs/platform-express` (incluido).
5. **F5**: No hay dependencias de logging estructurado.

## Riesgos
- **R1**: Sin logging estructurado, diagnosticar problemas en producción es difícil.
- **R2**: Dependencias con versiones `^` pueden traer breaking changes en minor updates si no se lockea.

## Recomendaciones
1. Agregar Winston o Pino para logging estructurado.
2. Lockear versiones exactas en producción (`npm ci`).
3. Revisar sharp: si no se usa redimensionamiento, podría ser opcional.

## Acciones Prioridad P0
- Ninguna — dependencias correctas y usadas.

## Acciones Prioridad P1
- Agregar Winston o Pino para logging.

## Acciones Prioridad P2
- Evaluar si sharp es necesario o si puede ser lazy-loaded.

## Score
**8.5 / 10**

## Estado: APROBADO
