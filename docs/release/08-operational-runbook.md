# Operational Runbook

> **Guía de operación para el ecosistema AlpacaRT**

---

## Servicios

| Servicio | Puerto | Health Check | Dependencias |
|----------|--------|-------------|--------------|
| Backend NestJS | 8000 | GET /health | PostgreSQL, Redis |
| PostgreSQL | 5446 | pg_isready | — |
| Redis | 6387 | redis-cli ping | — |
| MinIO | 9000 | mc admin info | — |
| Institucional FE | 3101 | HTTP 200 | Backend |
| Tienda FE | 3102 | HTTP 200 | Backend |
| Dashboard FE | 5173 | HTTP 200 | Backend |

## Comandos Comunes

```bash
# Iniciar todo
docker compose -f docker-compose.prod.yml up -d

# Ver logs
docker compose -f docker-compose.prod.yml logs -f backend

# Migraciones
docker exec backend npx sequelize-cli db:migrate

# Backup
docker exec backend bash /app/scripts/backup-postgres.sh

# Restore
docker exec -i backend bash /app/scripts/restore-postgres.sh /backups/...dump
```

## Troubleshooting

### Problema: Backend no inicia
1. `docker logs backend` — verificar error
2. Verificar PostgreSQL: `docker exec postgres pg_isready`
3. Verificar Redis: `docker exec redis redis-cli ping`
4. Verificar .env: todas las variables configuradas

### Problema: Frontend no carga
1. Verificar nginx: `docker logs nginx`
2. Verificar API: `curl localhost:8000/api/v1/health`
3. Verificar CORS: revisar orígenes en backend

### Problema: Error 401 en login
1. Verificar JWT_SECRET en backend
2. Verificar que el usuario existe en DB
3. Verificar bcrypt password hash

### Problema: Checkout falla
1. Verificar stock disponible
2. Verificar Stripe keys
3. Verificar webhook endpoint
4. Verificar idempotency key

## Escalamiento

| Componente | Estrategia |
|-----------|-----------|
| Backend | Horizontal (múltiples instancias) + PgBouncer |
| PostgreSQL | Read replicas + connection pooling |
| Redis | Cluster mode |
| Frontends | CDN + nginx load balancer |
| Storage | CDN para assets públicos |
