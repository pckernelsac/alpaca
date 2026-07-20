# Dashboard Integration — Users

> **Módulo IAM: Usuarios, Roles, Permisos**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /users | `iamRepository.getUsers(q)` | `IamService.getUsers(q)` | `useUsers(q)` |
| GET | /users/:id | `iamRepository.getUser(id)` | `IamService.getUser(id)` | — |
| POST | /users | `iamRepository.createUser(d)` | `IamService.createUser(d)` | — |
| PUT | /users/:id | `iamRepository.updateUser(id,d)` | `IamService.updateUser(id,d)` | — |
| GET | /roles | `iamRepository.getRoles()` | `IamService.getRoles()` | `useRoles()` |
| POST | /roles | `iamRepository.createRole(d)` | `IamService.createRole(d)` | — |
| GET | /permissions | `iamRepository.getPermissions()` | `IamService.getPermissions()` | `usePermissions()` |
| PUT | /permissions/matrix | `iamRepository.saveMatrix(d)` | `IamService.saveMatrix(d)` | — |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| UserList | inline data | `useUsers()` | ❌ |
| UserCreate | inline data | — | ❌ |
| RoleList | inline data | `useRoles()` | ❌ |
| PermissionMatrix | inline data | `usePermissions()` | ❌ |
