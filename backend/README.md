# ALPACART API

Backend de la plataforma ALPACART — marca premium de alpaca peruana.

## Requisitos

- Node.js >= 20
- npm

## Instalación

```bash
cd backend
cp .env.example .env
npm install
```

## Desarrollo

```bash
npm run start:dev
```

Servidor en `http://localhost:8000`.

## Build

```bash
npm run build
npm run start:prod
```

## Tests

```bash
npm test           # Unit tests
npm run test:e2e   # E2E tests
npm run test:cov   # Cobertura
```

## Endpoint base

```
GET /api/v1
```

Respuesta:

```json
{
  "name": "ALPACART API",
  "status": "running",
  "version": "1.0.0"
}
```

## Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Entorno |
| `PORT` | `8000` | Puerto del servidor |
| `API_PREFIX` | `api/v1` | Prefijo global de la API |
| `CORS_ORIGINS` | `http://localhost:5173,...` | Orígenes permitidos (separados por coma) |

## Estructura

```
src/
├── main.ts                  # Punto de entrada
├── app.module.ts            # Módulo raíz
├── app.controller.ts        # Controlador raíz
├── app.service.ts           # Servicio raíz
├── config/
│   ├── env.validation.ts    # Validación de variables de entorno
│   └── index.ts             # Módulo de configuración
├── common/                  # Capa compartida (guards, decorators, interceptors, filters)
└── modules/                 # Módulos funcionales del dominio
```

## Stack

- NestJS 10
- TypeScript 5
- class-validator + class-transformer
- Jest + Supertest
