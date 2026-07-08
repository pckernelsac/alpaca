# Arquitectura del Software

# Volumen IV

# Parte I

# Arquitectura General

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la arquitectura general del sistema Alpacart ERP.

Su propósito es establecer la organización del software, los componentes principales, la comunicación entre ellos y las responsabilidades de cada aplicación.

El sistema estará compuesto por un Backend centralizado y tres aplicaciones Frontend independientes.

---

# 2. Objetivos de Arquitectura

La arquitectura deberá cumplir los siguientes principios:

- Modularidad
- Escalabilidad
- Bajo acoplamiento
- Alta cohesión
- Reutilización
- Seguridad
- Mantenibilidad

---

# 3. Arquitectura General

```text
                 INTERNET

                      │

      ┌───────────────┼───────────────┐

      │               │               │

 Página Web        Tienda        Dashboard ERP

 React             React             React

      │               │               │

      └───────────────┼───────────────┘

                  API REST

                    NestJS

                      │

       ┌──────────────┼───────────────┐

       │              │               │

 PostgreSQL      Storage        Stripe

```

---

# 4. Componentes

El sistema estará compuesto por:

## Backend

NestJS

Responsabilidades

- API REST
- Seguridad
- Lógica del negocio
- PostgreSQL
- Storage
- Stripe

---

## Frontend Institucional

React

Responsabilidades

- Página institucional
- Nosotros
- Historia
- Contacto
- FAQ
- Promociones
- Catálogo público

---

## Frontend Tienda

React

Responsabilidades

- Catálogo
- Productos
- Carrito
- Wishlist
- Checkout
- Perfil Cliente
- Pedidos

---

## Dashboard ERP

React

Responsabilidades

- Administración
- Inventario
- Productos
- Pedidos
- Clientes
- CMS
- Marketing
- Reportes
- Analytics

---

# 5. Responsabilidades

## Backend

Gestiona

- Seguridad
- Base de datos
- Integraciones
- Reglas del negocio
- Validaciones

---

## Página Institucional

Consume únicamente información pública.

No requiere autenticación.

---

## Tienda

Consume información pública y privada.

Autenticación de clientes.

---

## Dashboard

Consume únicamente endpoints protegidos.

Autenticación de usuarios internos.

---

# 6. Comunicación

Toda comunicación utilizará HTTPS.

Los Frontends nunca accederán directamente a PostgreSQL.

Siempre consumirán la API REST.

```text
React

↓

HTTPS

↓

NestJS

↓

PostgreSQL
```

---

# 7. Tecnologías

## Backend

- NestJS
- TypeScript
- PostgreSQL
- Docker
- JWT
- Stripe

---

## Frontend

- React
- React Router
- TanStack Query
- React Hook Form
- Axios

---

## Base de Datos

- PostgreSQL

---

## Storage

Proveedor configurable.

---

# 8. Arquitectura Física

```text
Servidor

│

├── Backend

├── PostgreSQL

├── Storage

└── Nginx

Cliente

│

├── Página Web

├── Tienda

└── Dashboard
```

---

# 9. Flujo General

Cliente

↓

Página Web

↓

Catálogo

↓

Tienda

↓

Pedido

↓

Pago Stripe

↓

Backend

↓

Inventario

↓

Envío

↓

Analytics

---

# 10. Principios

Una única API.

Una única Base de Datos.

Tres Frontends.

Un único modelo de negocio.

Un único sistema de autenticación.

---

# 11. Convenciones

Todos los Frontends consumirán exactamente la misma API.

No existirá lógica del negocio en React.

Toda regla del negocio estará implementada en NestJS.

La validación será realizada en Backend y complementada en Frontend.

---

# 12. Beneficios

- Separación clara de responsabilidades.
- Escalabilidad independiente de cada Frontend.
- Reutilización completa del Backend.
- Menor duplicidad de lógica.
- Facilidad de mantenimiento.
- Despliegue independiente de cada aplicación.

---

# 13. Próximo Documento

El siguiente documento corresponde a la Arquitectura Backend con NestJS, donde se definirá la organización de módulos, estructura de carpetas, capas de aplicación, dominios, servicios, controladores, repositorios y convenciones de desarrollo.