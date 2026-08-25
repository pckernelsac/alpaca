# 06 — Seguridad

## Objetivo
Evaluar la seguridad del backend: autenticación JWT, guards, decoradores de acceso, rate limiting, CORS, helmet, bcrypt, validación.

## Alcance
- `src/common/guards/` (ActorGuard, JwtAuthGuard, RolesGuard)
- `src/common/decorators/` (@Public, @StaffOnly, @CustomerOnly, @Roles, @CurrentUser)
- `src/main.ts`
- `src/app.module.ts`
- `src/modules/auth/`

## Estado actual
Backend implementa autenticación JWT con Passport, autorización por actor (staff/customer), protección de headers con Helmet, compresión HTTP, rate limiting con ThrottlerGuard, validación de entrada con ValidationPipe, CORS configurado y bcrypt para passwords.

## Evidencias encontradas

### Autenticación JWT
- **AuthService** (`auth.service.ts`):
  - Login con bcrypt.compare + validación de status 'active'
  - JWT payload: `{ sub, email, role, type }`
  - 3 tipos de expiración: access (15m), refresh (7d), remember (30d)
  - Genera accessToken + refreshToken
- **JwtStrategy** (`jwt.strategy.ts`):
  - Extrae token de Bearer header
  - Valida staff vs customer por `payload.type`
  - Para staff: busca User con Role, verifica status 'active'
  - Para customer: busca Customer
- **JwtAuthGuard** (`jwt-auth.guard.ts`):
  - Extiende AuthGuard('jwt') de Passport
  - Respeta @Public() — si el endpoint tiene @Public, no valida JWT

### Autorización
- **ActorGuard** (`actor.guard.ts`):
  - Registrado como APP_GUARD global
  - Lee decorador @Actor, @StaffOnly, @CustomerOnly
  - Si no hay restricción de actor: permite (público o JWT-only)
  - Si hay restricción: valida `user.type` contra allowedActors
  - Public endpoints (sin user) pasan automáticamente
- **RolesGuard** (`roles.guard.ts`):
  - Definido pero NO usado en ningún controlador
  - Dead code

### Decoradores
| Decorador | Uso | 
|-----------|-----|
| `@Public()` | Endpoints públicos (login, register, products, CMS público) |
| `@StaffOnly()` | IAM, CRM, Inventory, Logistics, Marketing admin, CMS admin, Audit, Analytics, Settings |
| `@CustomerOnly()` | Customers: account, cart, wishlist, checkout |
| `@Actor('staff', 'customer')` | Orders endpoints |
| `@Roles(...)` | No usado |
| `@CurrentUser()` | Definido pero no usado |

### Helmet y Compression (`main.ts`)
```typescript
app.use(helmet());         // Security headers (XSS, content-type, etc.)
app.use(compression());    // HTTP compression (gzip)
```

### Rate Limiting (`app.module.ts`)
```typescript
ThrottlerGuard como APP_GUARD global
3 throttlers:
  - short: 3 req / 1s
  - medium: 20 req / 10s
  - long: 100 req / 60s
Storage: Redis (RedisThrottlerStorage)
```

### CORS (`main.ts`)
```typescript
app.enableCors({
  origin: ['http://localhost:5173', 'http://localhost:3101', 'http://localhost:3102'],
  credentials: true,
});
```

### ValidationPipe (`main.ts`)
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,           // elimina campos no definidos en DTO
    transform: true,           // transforma tipos
    forbidNonWhitelisted: true // rechaza campos extra
  }),
);
```

### Passwords con bcrypt
- **AuthService**: `bcrypt.compare(password, user.password)` en login
- **CustomersService**: `bcrypt.hash(data.password, 10)` en register
- **CustomersService**: `bcrypt.compare + hash` en changePassword

### Swagger
- Swagger habilitado en `/api/v1/docs` con Bearer Auth
- Accesible en producción (no hay flag para deshabilitar)

### Global Guards (app.module.ts)
```typescript
{ provide: APP_FILTER, useClass: HttpExceptionFilter }  // Error handling
{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor } // Response formatting
{ provide: APP_GUARD, useClass: ActorGuard }  // Authorization
{ provide: APP_GUARD, useClass: ThrottlerGuard }  // Rate limiting
```

### Env Validation (`env.validation.ts`)
- Validación de variables de entorno con class-validator
- JWT_SECRET validado como string requerido

## Hallazgos
1. **F1**: JWT implementado correctamente con Passport + refresh token.
2. **F2**: ActorGuard global con @Public, @StaffOnly, @CustomerOnly — arquitectura de autorización completa.
3. **F3**: Helmet + Compression activados.
4. **F4**: Rate limiting con 3 niveles y Redis storage.
5. **F5**: ValidationPipe con whitelist + forbidNonWhitelisted — protección contra mass assignment.
6. **F6**: Passwords con bcrypt (10 rounds).
7. **F7**: Swagger habilitado sin restricción de entorno — expuesto también en producción.
8. **F8**: JWT_SECRET hardcodeado como `alpacart-dev-secret-change-in-production` en env.validation.ts.
9. **F9**: No hay refresh token rotation ni blacklisting.

## Riesgos
- **R1**: Swagger expuesto en producción revela toda la API.
- **R2**: JWT_SECRET hardcodeado como fallback rompe seguridad si no se configura en producción.
- **R3**: Sin refresh token rotation, un token robado es válido por 7-30 días.
- **R4**: No hay rate limiting específico por endpoint (login sin límite más restrictivo).

## Recomendaciones
1. Deshabilitar Swagger en producción o protegerlo con auth.
2. Eliminar fallback de JWT_SECRET en producción.
3. Implementar refresh token rotation.
4. Agregar rate limiting más restrictivo para /auth/login.
5. RolesGuard es dead code — eliminarlo.

## Acciones Prioridad P0
- Deshabilitar Swagger en producción (`NODE_ENV === 'production'`).
- Eliminar fallback `'fallback-secret'` en JwtStrategy y default en env.validation.ts.

## Acciones Prioridad P1
- Agregar rate limit específico para login (ej: 5 intentos/minuto).
- Implementar refresh token rotation.

## Acciones Prioridad P2
- Eliminar RolesGuard (dead code).
- Agregar tests de penetración básicos.

## Score
**7.5 / 10**

## Estado: APROBADO CON OBSERVACIONES
