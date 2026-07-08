# Especificación Funcional

# Volumen V

# Parte VII

# Customer Relationship Management (CRM)

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Administrar la información de clientes y sus relaciones con la empresa durante todo el ciclo comercial.

---

# 2. Alcance

Administra

- Clientes.
- Direcciones.
- Contactos.
- Favoritos.
- Historial.
- Perfil.
- Preferencias.

---

# 3. Actores

Cliente.

Administrador.

Ventas.

Marketing.

---

# 4. Interfaces Funcionales

Clientes.

Perfil.

Direcciones.

Favoritos.

Historial.

---

# 5. Funcionalidades

Registrar cliente.

Actualizar perfil.

Administrar direcciones.

Administrar favoritos.

Consultar historial.

Bloquear cliente.

---

# 6. Reglas de Negocio

RN-CRM-001

Correo único.

RN-CRM-002

Todo cliente deberá tener un estado.

RN-CRM-003

No eliminar clientes con pedidos registrados.

RN-CRM-004

Toda modificación deberá auditarse.

---

# 7. Validaciones

Correo.

Documento.

Dirección.

Teléfono.

Estado.

---

# 8. Estados

Activo.

Inactivo.

Bloqueado.

---

# 9. Flujo General

Registro

↓

Perfil

↓

Compras

↓

Historial

↓

Fidelización

---

# 10. Casos de Uso

Registrar cliente.

Editar cliente.

Consultar cliente.

Administrar direcciones.

Administrar favoritos.

---

# 11. APIs

/api/v1/customers

/api/v1/customers/{id}

/api/v1/customers/profile

/api/v1/customers/address

/api/v1/customers/wishlist

---

# 12. Tablas

crm_customer

crm_address

crm_contact

crm_wishlist

crm_history

---

# 13. Permisos

CRM.READ

CRM.CREATE

CRM.UPDATE

CRM.DELETE

CRM.WISHLIST

---

# 14. Mensajes

Cliente registrado.

Perfil actualizado.

Dirección agregada.

Cliente bloqueado.

---

# 15. Criterios de Aceptación

Todo cliente deberá mantener historial de cambios.

---

# 16. Casos de Prueba

Registrar cliente.

Editar cliente.

Agregar dirección.

Agregar favorito.

Bloquear cliente.

---

# 17. Dependencias

Consume

IAM

Master Data

Storage

Produce

Order Management

Marketing

Analytics

---

# 18. Observaciones

CRM constituye la fuente oficial de información de clientes del sistema.