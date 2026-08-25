# AUDITORÍA DE DOMAIN MODELS Y MAPPERS — DASHBOARD

## Flujo DTO ➔ Mapper ➔ Domain Model ➔ Store ➔ React

Se examinó la arquitectura de transformación de datos definida en el proyecto:

```
Backend DTO ➔ Mapper (src/mappers/index.js) ➔ Domain Model (src/domain/index.js) ➔ Store ➔ Componente React
```

---

## Hallazgos en la Capa de Dominio

### 1. Mappers Definidos (`src/mappers/index.js`)
Existen mappers como:
- `mapUsers`
- `mapProducts`
- `mapOrders`
- `mapClients`
- `mapCampaigns`
- `mapContents`
- `mapStock`
- `mapTransactions`
- `mapShipments`
- `mapAuditLogs`
- `mapCompany`

### 2. Desconexión en Repositorios (`src/repositories/api.js`)
Los repositorios invocan directamente a `api.get()` / `api.post()` de `@alpacart/shared-api-client` y retornan el JSON tal como responde el backend (`raw response`), **sin ejecutar las funciones mappers de `src/mappers/index.js`**.

### 3. Fuga de DTOs
Al no aplicarse los mappers en `src/repositories/api.js` ni en los stores de Zustand, si la UI consumiera directamente los stores, recibiría DTOs de NestJS sin transformar a Modelos de Dominio. En la práctica actual, los componentes React consumen objetos duros inline que ni siquiera provienen de DTOs reales.
