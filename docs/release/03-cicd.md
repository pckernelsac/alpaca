# CI/CD Pipeline

> **GitHub Actions para integración y despliegue continuo**

---

## Pipeline Actual

Archivo: `.github/workflows/ci.yml`

### Jobs

| Job | Descripción | Tiempo estimado |
|-----|-------------|----------------|
| backend | Build + test backend NestJS | ~3 min |
| frontend-institucional | Build frontend institucional | ~2 min |
| frontend-tienda | Build frontend tienda | ~2 min |
| frontend-dashboard | Build frontend dashboard | ~2 min |

### Triggers

- Push a `main` y `develop`
- Pull requests a `main`

## Pendiente para CI/CD Completo

| Feature | Estado | Prioridad |
|---------|--------|-----------|
| Build matrix (Node 20/22) | ❌ | P3 |
| Lint + typecheck | ❌ | P2 |
| Tests unitarios | ❌ | P2 |
| Tests de integración | ❌ | P2 |
| Docker build + push | ❌ | P1 |
| Deploy automático | ❌ | P1 |
| SonarQube/SonarCloud | ❌ | P3 |
| Slack/Email notifications | ❌ | P3 |

## Recomendación

Para producción, implementar GitHub Actions + Docker Hub + VPS/Kubernetes.
