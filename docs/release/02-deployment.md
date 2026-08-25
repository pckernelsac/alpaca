# Deployment Guide

> **Procedimiento de despliegue para AlpacaRT**

---

## Prerequisitos

- Docker 24+ y Docker Compose v2
- Node.js 20+ (para build local)
- PostgreSQL 16 (producción recomendada: RDS/Cloud SQL)
- Redis 7 (producción recomendada: ElastiCache/Memorystore)
- MinIO o S3 compatible

## Despliegue Manual

### 1. Backend

```bash
cd backend
npm ci
npm run build
# Configurar .env.production
NODE_ENV=production \
DB_HOST=postgres.example.com \
DB_PORT=5432 \
DB_USERNAME=alpacart \
DB_PASSWORD=*** \
DB_NAME=alpacart \
REDIS_HOST=redis.example.com \
REDIS_PORT=6379 \
JWT_SECRET=*** \
STRIPE_SECRET_KEY=*** \
STRIPE_WEBHOOK_SECRET=*** \
node dist/src/main.js
```

### 2. Frontends

```bash
# Cada frontend
cd frontend/<nombre>
npm ci
npm run build
# Servir dist/ con nginx
cp -r dist/* /var/www/html/
```

### 3. Migraciones

```bash
cd backend
npx sequelize-cli db:migrate --env production
npx sequelize-cli db:seed:all --env production
```

## Despliegue con Docker

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Rollback

```bash
# Revertir migración
npx sequelize-cli db:migrate:undo --env production

# Restaurar versión anterior de Docker
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.prev.yml up -d
```
