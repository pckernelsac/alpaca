# INTEGRACIÓN DE ROLES Y MATRIZ DE PERMISOS IAM — REAL API

## Migración de Roles (`/usuarios/roles`) y Permisos (`/usuarios/permisos`)

Se conectaron los módulos de seguridad RBAC a los controladores IAM de NestJS.

---

## Cambios Realizados

1. **Gestión de Roles (`RoleList.jsx`)**:
   - Conectado a `iamRepository.getRoles` ➔ `GET /api/v1/iam/roles`.
   - Muestra roles configurados en la plataforma.

2. **Matriz de Permisos (`PermissionMatrix.jsx`)**:
   - Conectado a `iamRepository.getPermissions` y `saveMatrix` ➔ `GET/PUT /api/v1/iam/permissions`.
   - Permite la gestión granular de accesos por rol y módulo operacional.
