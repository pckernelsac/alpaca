# Dashboard — Data Architecture (F3-B1)

## Arquitectura Objetivo

El Dashboard se reestructuró siguiendo una arquitectura en capas:

```
Página (UI)
    ↓
Hook (useXxx.js)
    ↓
Store (useXxxStore.js — Zustand)
    ↓
Repository (xxx.js)
    ↓
Mock Data (mocks/data.js)
```

Cada capa tiene una responsabilidad única y puede reemplazarse sin afectar las demás.

## Capas

### Mock Data (`src/mocks/data.js`)
Unico archivo que contiene todos los datos de prueba del Dashboard.
22 datasets organizados por dominio (products, users, orders, clients, etc.).

### Repositories (`src/repositories/`)
Abstracción de acceso a datos. Cada repository expone métodos como `getAll()`, `getById()`, `create()`, `update()`, `delete()`. Actualmente implementados con mocks; en el futuro se conectarán al backend sin modificar las capas superiores.

### Stores (`src/stores/`)
Estado compartido usando Zustand. Cada store administra:
- `loading` — estado de carga
- `error` — errores
- `data` — datos del dominio
- Métodos CRUD asíncronos

### Hooks (`src/hooks/`)
Interfaz que consumen las páginas. Los hooks se encargan de:
- Llamar al store al montar el componente
- Devolver datos, loading, error y métodos
- Las páginas nunca conocen el origen de los datos

## Principios
1. Las páginas NO contienen arrays/objetos mock inline
2. Las páginas solo importan hooks
3. Los hooks solo importan stores
4. Los stores solo importan repositories
5. Los repositories solo importan mocks
6. Para conectar al backend: solo se modifican los repositories
