# Dashboard — IAM Migration

> **Usuarios, Roles, Permisos**

---

## Cambios

| Store | Mock Repo | API Repo |
|-------|-----------|----------|
| `useUsersStore` | `repositories/users.js` | `repositories/api.iamRepository` |
| — | `repositories/base.js` (factory genérica) | Eliminado |

## Endpoints

| Acción | Endpoint | Store Method |
|--------|----------|-------------|
| Listar usuarios | GET /users | `fetchAll()` |
| Crear usuario | POST /users | `createUser(d)` |
| Actualizar usuario | PUT /users/:id | `updateUser(id, d)` |
| Eliminar usuario | DELETE /users/:id | `deleteUser(id)` |
| Listar roles | GET /roles | — |
| Listar permisos | GET /permissions | — |

## Resultado

- ✅ Store consume API real
- ✅ Mock repository base.js eliminado
- ✅ users.js, roles.js, permissions.js repos eliminados
