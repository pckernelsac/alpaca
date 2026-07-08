# Especificación Funcional

# Volumen V

# Parte II

# Identity & Access Management (IAM)

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

El módulo Identity & Access Management (IAM) es responsable de administrar la identidad de los usuarios internos del Dashboard ERP, así como los mecanismos de autenticación, autorización, control de acceso y gestión de sesiones.

Este módulo garantiza que únicamente los usuarios autorizados puedan acceder a las funcionalidades del sistema de acuerdo con los roles y permisos asignados.

No administra la autenticación de clientes de la Tienda Online, aunque proporciona los mecanismos comunes de autenticación utilizados por el sistema.

---

# 2. Alcance

El módulo comprende las siguientes funcionalidades:

- Inicio de sesión.
- Cierre de sesión.
- Recuperación de contraseña.
- Cambio de contraseña.
- Gestión de usuarios.
- Gestión de roles.
- Gestión de permisos.
- Gestión de sesiones.
- Bloqueo y desbloqueo de usuarios.
- Consulta de historial de accesos.

---

# 3. Actores

## Administrador

Puede administrar completamente el módulo.

Funciones

- Crear usuarios.
- Editar usuarios.
- Desactivar usuarios.
- Crear roles.
- Editar roles.
- Asignar permisos.
- Revocar sesiones.
- Consultar auditoría.

---

## Supervisor

Puede consultar usuarios y administrar únicamente los permisos autorizados por el Administrador.

---

## Usuario ERP

Puede:

- Iniciar sesión.
- Cerrar sesión.
- Cambiar contraseña.
- Consultar su perfil.
- Consultar sus sesiones activas.

---

# 4. Interfaces Funcionales

## Login

Permite autenticar usuarios.

Campos

- Correo electrónico.
- Contraseña.

Acciones

- Iniciar sesión.
- Recuperar contraseña.

---

## Gestión de Usuarios

Permite administrar usuarios del ERP.

Operaciones

- Crear.
- Editar.
- Consultar.
- Desactivar.
- Restablecer contraseña.

---

## Gestión de Roles

Permite administrar los perfiles del sistema.

Operaciones

- Crear.
- Editar.
- Consultar.
- Desactivar.

---

## Gestión de Permisos

Permite asignar permisos a cada rol.

Operaciones

- Asignar.
- Revocar.
- Consultar.

---

## Gestión de Sesiones

Permite visualizar las sesiones activas.

Operaciones

- Consultar.
- Revocar.
- Cerrar todas las sesiones.

---

# 5. Funcionalidades

El módulo deberá permitir:

F-001

Autenticar usuarios.

---

F-002

Cerrar sesión.

---

F-003

Recuperar contraseña mediante correo electrónico.

---

F-004

Cambiar contraseña.

---

F-005

Registrar usuarios.

---

F-006

Editar usuarios.

---

F-007

Desactivar usuarios.

---

F-008

Administrar roles.

---

F-009

Administrar permisos.

---

F-010

Consultar sesiones activas.

---

F-011

Revocar sesiones.

---

F-012

Consultar historial de accesos.

---

# 6. Reglas de Negocio

RN-IAM-001

Todo usuario deberá poseer al menos un rol activo.

---

RN-IAM-002

No podrán existir dos usuarios con el mismo correo electrónico.

---

RN-IAM-003

Las contraseñas serán almacenadas utilizando Argon2id.

---

RN-IAM-004

Los usuarios desactivados no podrán autenticarse.

---

RN-IAM-005

Toda autenticación deberá generar un registro de auditoría.

---

RN-IAM-006

Toda modificación de permisos deberá quedar registrada.

---

RN-IAM-007

La eliminación de usuarios será lógica.

---

RN-IAM-008

Los permisos efectivos serán calculados a partir de los roles asignados.

---

RN-IAM-009

Toda sesión tendrá fecha de inicio, última actividad y fecha de expiración.

---

# 7. Validaciones

- Correo obligatorio.
- Correo con formato válido.
- Contraseña obligatoria.
- Longitud mínima de contraseña.
- Confirmación de contraseña.
- Correo único.
- Usuario activo.
- Rol activo.

---

# 8. Estados

## Usuario

- Activo
- Inactivo
- Bloqueado

---

## Rol

- Activo
- Inactivo

---

## Sesión

- Activa
- Expirada
- Revocada

---

# 9. Flujo General

```text
Usuario

↓

Login

↓

Validación

↓

Autenticación

↓

Generación JWT

↓

Carga de Roles

↓

Carga de Permisos

↓

Registro Auditoría

↓

Dashboard ERP
```

---

# 10. Casos de Uso

CU-IAM-001

Iniciar sesión.

---

CU-IAM-002

Cerrar sesión.

---

CU-IAM-003

Recuperar contraseña.

---

CU-IAM-004

Cambiar contraseña.

---

CU-IAM-005

Crear usuario.

---

CU-IAM-006

Editar usuario.

---

CU-IAM-007

Desactivar usuario.

---

CU-IAM-008

Crear rol.

---

CU-IAM-009

Editar rol.

---

CU-IAM-010

Administrar permisos.

---

CU-IAM-011

Consultar sesiones.

---

CU-IAM-012

Revocar sesión.

---

# 11. APIs Relacionadas

POST

/api/v1/auth/login

POST

/api/v1/auth/logout

POST

/api/v1/auth/forgot-password

POST

/api/v1/auth/reset-password

GET

/api/v1/users

POST

/api/v1/users

PATCH

/api/v1/users/{id}

GET

/api/v1/roles

POST

/api/v1/roles

GET

/api/v1/permissions

PATCH

/api/v1/roles/{id}/permissions

GET

/api/v1/sessions

DELETE

/api/v1/sessions/{id}

---

# 12. Tablas Involucradas

- iam_user
- iam_role
- iam_permission
- iam_role_permission
- iam_user_role
- iam_session
- audit_log

---

# 13. Permisos

IAM.USERS.READ

IAM.USERS.CREATE

IAM.USERS.UPDATE

IAM.USERS.DELETE

IAM.ROLES.READ

IAM.ROLES.CREATE

IAM.ROLES.UPDATE

IAM.ROLES.DELETE

IAM.PERMISSIONS.READ

IAM.PERMISSIONS.UPDATE

IAM.SESSIONS.READ

IAM.SESSIONS.REVOKE

---

# 14. Mensajes

Éxito

- Inicio de sesión exitoso.
- Usuario creado correctamente.
- Rol creado correctamente.
- Contraseña actualizada correctamente.

Advertencia

- La contraseña expirará próximamente.
- Existen sesiones activas en otros dispositivos.

Error

- Credenciales inválidas.
- Usuario bloqueado.
- Usuario inactivo.
- Permisos insuficientes.
- Correo ya registrado.

---

# 15. Criterios de Aceptación

- Solo usuarios activos podrán autenticarse.
- El sistema deberá emitir Access Token y Refresh Token.
- El Dashboard deberá mostrar únicamente las opciones permitidas por los permisos del usuario.
- Toda autenticación deberá registrarse en Audit.
- Las contraseñas nunca podrán almacenarse en texto plano.
- La revocación de una sesión deberá impedir el uso posterior del Access Token.

---

# 16. Casos Generales de Prueba

## Autenticación

- Inicio de sesión correcto.
- Contraseña incorrecta.
- Usuario inexistente.
- Usuario bloqueado.
- Usuario inactivo.

---

## Usuarios

- Crear usuario.
- Editar usuario.
- Desactivar usuario.
- Restablecer contraseña.

---

## Roles

- Crear rol.
- Editar rol.
- Asignar permisos.

---

## Sesiones

- Consultar sesiones.
- Revocar sesión.
- Expiración automática del Access Token.

---

# 17. Dependencias

Consume

- Configuration
- Audit

Produce servicios para

- Dashboard ERP
- Inventory
- Catalog
- CRM
- CMS
- Marketing
- Payments
- Shipping
- Analytics

---

# 18. Observaciones

IAM constituye el núcleo de seguridad del sistema.

Todos los módulos administrativos deberán validar autenticación, autorización y permisos utilizando este módulo.

Ningún módulo del Dashboard podrá omitir las validaciones establecidas por IAM.