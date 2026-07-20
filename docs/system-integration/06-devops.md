# System Integration — DevOps

> **Infraestructura y despliegue**

---

## Docker

| Servicio | Imagen | Puerto | Estado |
|----------|--------|--------|--------|
| PostgreSQL | postgres:16-alpine | 5446 | ✅ Configurado |
| Redis | redis:7-alpine | 6387 | ✅ Configurado |
| MinIO | minio/minio | 9000 | ✅ Configurado |

## Variables de Entorno

| Variable | Frontends | Backend |
|----------|-----------|---------|
| VITE_API_URL | ✅ http://localhost:8000/api/v1 | — |
| DB_HOST | — | ✅ localhost |
| DB_PORT | — | ✅ 5446 |
| REDIS_HOST | — | ✅ localhost |
| REDIS_PORT | — | ✅ 6387 |
| JWT_SECRET | — | ✅ Configurado |
| STRIPE_SECRET_KEY | — | ✅ Configurado |

## CI/CD

| Aspecto | Estado |
|---------|--------|
| Docker Compose | ✅ 3 servicios (PG, Redis, MinIO) |
| Build scripts | ✅ npm run build en cada frontend |
| Backend build | ✅ npx nest build |
| Tests | ⚠️ 1 unit test (app.spec.ts) |
| Pipeline CI | ❌ No implementado (GitHub Actions/GitLab CI) |
| Deploy automatizado | ❌ No implementado |

## Backup

| Componente | Estado |
|-----------|--------|
| PostgreSQL backup | ❌ No configurado |
| Storage backup | ❌ No configurado |

## Conclusión

DevOps: ⚠️ Parcial — Docker listo, CI/CD y backups pendientes
