# System Integration — Architecture

> **Mapa arquitectónico global del ecosistema AlpacaRT**

---

## Visión General

```
                    ┌──────────────────────────────────────────────┐
                    │              Frontend Layer                   │
                    │  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
                    │  │Institucional│  │  Tienda   │  │Dashboard │   │
                    │  │ :3101     │  │ :3102     │  │ :5173     │   │
                    │  │ 270 mods  │  │ 268 mods  │  │ 217 mods  │   │
                    │  └─────┬────┘  └─────┬────┘  └─────┬────┘   │
                    │        │             │             │         │
                    │        └──────────┬──┴──────┬──────┘         │
                    │                   │         │                │
                    │        @alpacart/shared-* (8 packages)       │
                    │                   │         │                │
                    │              ┌────┴─────────┴────┐           │
                    │              │   ApiClient       │           │
                    │              │   axios+intercept │           │
                    │              └────────┬─────────┘           │
                    └───────────────────────┼─────────────────────┘
                                            │
                    ┌───────────────────────┼─────────────────────┐
                    │              Backend Layer                  │
                    │        NestJS 10 + TypeScript 5             │
                    │  ┌──────────────────┼──────────────────┐    │
                    │  │    AuthModule    │    15 Modules     │    │
                    │  │  ActorGuard     │    IAM, Catalog,  │    │
                    │  │  ThrottlerGuard │    Orders, CRM,   │    │
                    │  │  JWT Dual Type  │    Marketing...   │    │
                    │  └──────────────────┴──────────────────┘    │
                    │                   │                         │
                    │              ┌────┴─────────┐               │
                    │              │  Sequelize 6  │               │
                    │              └────┬─────────┘               │
                    └───────────────────┼─────────────────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────┐
          │              Data Layer     │                         │
          │  ┌──────────┐  ┌──────────┐ │  ┌──────────────────┐  │
          │  │PostgreSQL│  │  Redis 7  │ │  │   MinIO / S3     │  │
          │  │ 16.14    │  │ Rate+Cache│ │  │ Storage          │  │
          │  │ 59 tables │  └──────────┘ │  └──────────────────┘  │
          │  └──────────┘               │                        │
          └─────────────────────────────┼─────────────────────────┘
```

## Paquetes Compartidos (8)

| Paquete | Versión | Rol |
|---------|---------|-----|
| shared-types | 1.0.0 | 24 interfaces TypeScript |
| shared-utils | 1.0.0 | 8 utilidades (formatCurrency, slugify, etc.) |
| shared-constants | 1.0.0 | 6 grupos (ROUTES, THEME, ROLES, etc.) |
| shared-api-client | 1.0.0 | ApiClient factory + interceptors + error mapping |
| shared-ui | 1.0.0 | 6 componentes (Spinner, Skeleton, Toast, etc.) |
| shared-hooks | 1.0.0 | 4 hooks (useAsync, useDebounce, usePagination, useInfiniteScroll) |
| shared-domain | 1.0.0 | Error classes + validation + pagination |
| shared-observability | 1.0.0 | Logger + performance marks |

## Backend (16 migraciones, 8 seeds, ~59 tablas)

| Módulo | Endpoints | Auth |
|--------|-----------|------|
| Auth | 4 | @Public + JWT dual |
| IAM | 12 | StaffOnly |
| Catalog | 11 | @Public + StaffOnly |
| Customers | 14 | CustomerOnly |
| Orders | 6 | ActorGuard staff/customer |
| Payments | 5 | JWT + @Public |
| Inventory | 4 | StaffOnly |
| Marketing | 17 | StaffOnly + @Public |
| CMS | 30 | @Public + StaffOnly |
| Settings | 3 | @Public + StaffOnly |
| Analytics | 1 | StaffOnly |
| Audit | 1 | StaffOnly |
| CRM | 5 | StaffOnly |
| Textile | 4 | @Public |
| Storage | 3 | JWT + @Public |
