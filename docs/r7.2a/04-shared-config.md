# R7.2A — Shared Config

> **Variables de entorno, aliases y configuración Vite**

---

## Aliases Configurados

| Alias | Resuelve | Institucional | Tienda | Dashboard |
|-------|----------|:---:|:---:|:---:|
| `@alpacart/shared-types` | `packages/shared-types/src` | ✅ | ✅ | ✅ |
| `@alpacart/shared-utils` | `packages/shared-utils/src` | ✅ | ✅ | ✅ |
| `@alpacart/shared-constants` | `packages/shared-constants/src` | ✅ | ✅ | ✅ |
| `@alpacart/shared-api-client` | `packages/shared-api-client/src` | ✅ | ✅ | ✅ |
| `@alpacart/shared-ui` | `packages/shared-ui/src` | ✅ | ✅ | ✅ |
| `@alpacart/shared-hooks` | `packages/shared-hooks/src` | ✅ | ✅ | ✅ |
| `@alpacart/shared-domain` | `packages/shared-domain/src` | ✅ | ✅ | ✅ |
| `@alpacart/shared-observability` | `packages/shared-observability/src` | ✅ | ✅ | ✅ |

## Environment Variables

| Variable | Default | Propósito |
|----------|---------|-----------|
| `VITE_API_URL` | `http://localhost:8000/api/v1` | Backend base URL |
| `VITE_APP_NAME` | `Alpacart` | Nombre de la aplicación |
| `VITE_APP_ENV` | `development` | Entorno |
| `VITE_LOG_LEVEL` | `info` | Nivel de logging (debug/info/warn/error) |

## Ruta de paquetes compartidos

```
packages/
├── shared-types/       # @alpacart/shared-types
├── shared-utils/       # @alpacart/shared-utils
├── shared-constants/   # @alpacart/shared-constants
├── shared-api-client/  # @alpacart/shared-api-client
├── shared-ui/          # @alpacart/shared-ui       ← NUEVO
├── shared-hooks/       # @alpacart/shared-hooks    ← NUEVO
├── shared-domain/      # @alpacart/shared-domain   ← NUEVO
└── shared-observability/ # @alpacart/shared-observability ← NUEVO
```
