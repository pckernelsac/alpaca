# 02 — Infraestructura

## Objetivo
Analizar la configuración de infraestructura del backend: contenedores Docker, puertos, volúmenes, health checks y servicios.

## Alcance
- `docker-compose.yml`
- `Dockerfile` (no existe)
- `.env`
- `.env.example`

## Estado actual
Infraestructura definida vía Docker Compose con 3 servicios: PostgreSQL 16, MinIO (S3-compatible), Redis 7. No existe Dockerfile para la aplicación NestJS. Las variables de entorno están completas.

## Evidencias encontradas

### docker-compose.yml
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: alpacart-db
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: alpacart
      POSTGRES_USER: alpacart
      POSTGRES_PASSWORD: alpacart
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U alpacart -d alpacart"]
      interval: 5s
      timeout: 5s
      retries: 5

  minio:
    image: minio/minio:latest
    container_name: alpacart-storage
    ports: ["9000:9000", "9001:9001"]
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    command: server /data --console-address ":9001"
    volumes:
      - miniodata:/data
    # No healthcheck

  redis:
    image: redis:7-alpine
    container_name: alpacart-cache
    ports: ["6379:6379"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
```

### Dockerfile
**No existe** — no hay Dockerfile para la aplicación NestJS. Esto significa que la app solo puede ejecutarse localmente con `npm run start:dev` o `npm run start:prod` usando node directamente.

### .env / .env.example
- 29 variables definidas en .env
- .env.example tiene 23 variables (falta JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION, JWT_REMEMBER_EXPIRATION)
- Stripe: STRIPE_SECRET_KEY y STRIPE_WEBHOOK_SECRET existen en env.validation.ts pero NO están en .env ni .env.example

### Variables críticas ausentes en .env
- `STRIPE_SECRET_KEY` — no definida
- `STRIPE_WEBHOOK_SECRET` — no definida
- `JWT_ACCESS_EXPIRATION` — no definida (usa default 15m)
- `JWT_REFRESH_EXPIRATION` — no definida (usa default 7d)
- `JWT_REMEMBER_EXPIRATION` — no definida (usa default 30d)

### Servicios no utilizados
- Ningún servicio en docker-compose está de más. Los 3 servicios se usan: PG (base de datos principal), MinIO (almacenamiento S3), Redis (caché + rate limiting).

## Hallazgos
1. **F1**: No existe Dockerfile para la aplicación NestJS — no se puede contenerizar el backend.
2. **F2**: MinIO no tiene healthcheck configurado.
3. **F3**: Stripe keys faltan en .env y .env.example.
4. **F4**: .env.example incompleto (faltan 6 variables respecto a env.validation.ts).
5. **F5**: Contraseñas y claves hardcodeadas en docker-compose.yml y .env (solo desarrollo, pero riesgo).

## Riesgos
- **R1**: Sin Dockerfile no hay despliegue contenerizado posible.
- **R2**: Stripe keys faltantes romperán pagos en producción si no se configuran.
- **R3**: MinIO sin healthcheck podría iniciar la app con storage no disponible sin alerta.

## Recomendaciones
1. Crear Dockerfile multi-stage para la app NestJS.
2. Agregar healthcheck a MinIO.
3. Completar .env.example con todas las variables requeridas.
4. Usar secrets management para producción.

## Acciones Prioridad P0
- Crear Dockerfile para la aplicación NestJS.

## Acciones Prioridad P1
- Agregar STRIPE_SECRET_KEY y STRIPE_WEBHOOK_SECRET a .env.example y .env.
- Agregar healthcheck a MinIO.

## Acciones Prioridad P2
- Completar .env.example con JWT_* variables.
- Implementar Docker Compose con perfil de producción.

## Score
**6.5 / 10**

## Estado: APROBADO CON OBSERVACIONES
