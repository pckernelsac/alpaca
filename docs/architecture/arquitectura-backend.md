# Arquitectura del Software

# Volumen IV

# Parte II

# Backend Architecture (NestJS)

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la arquitectura del Backend del sistema Alpacart ERP.

El Backend será el núcleo de toda la lógica del negocio y actuará como punto único de acceso para las tres aplicaciones Frontend:

- Página Institucional
- Tienda Online
- Dashboard ERP

Toda la lógica empresarial será implementada exclusivamente en el Backend.

---

# 2. Stack Tecnológico

Framework

NestJS

Lenguaje

TypeScript

ORM

TypeORM

Base de Datos

PostgreSQL

Autenticación

JWT

Encriptación

Argon2

Validaciones

class-validator

Documentación API

Swagger OpenAPI

Logs

NestJS Logger

Almacenamiento

Storage Service

Pasarela de Pago

Stripe

---

# 3. Arquitectura

El Backend seguirá una arquitectura basada en:

- Clean Architecture
- Domain Driven Design (DDD)
- SOLID
- Repository Pattern
- Dependency Injection

Cada dominio será completamente independiente.

---

# 4. Arquitectura General

```text
Backend

│

├── Core

├── Common

├── Infrastructure

├── Modules

│

├── IAM

├── Storage

├── MasterData

├── Configuration

├── Audit

│

├── CRM

├── Catalog

├── Textile

├── Inventory

├── OMS

├── Payments

├── Shipping

├── CMS

├── Marketing

└── Analytics
```

---

# 5. Estructura del Proyecto

```text
backend/

src/

main.ts

app.module.ts

config/

common/

core/

modules/

database/

storage/

```

---

# 6. Organización por Módulos

Cada dominio tendrá exactamente la misma estructura.

Ejemplo

```text
catalog/

catalog.module.ts

application/

domain/

infrastructure/

presentation/
```

---

# 7. Capa Application

Responsabilidades

- Casos de Uso
- DTO
- Commands
- Queries
- Interfaces

```text
application/

dto/

commands/

queries/

use-cases/

interfaces/
```

---

# 8. Capa Domain

Responsabilidades

- Entidades
- Value Objects
- Eventos
- Interfaces
- Reglas del Negocio

```text
domain/

entities/

events/

repositories/

services/

value-objects/
```

---

# 9. Capa Infrastructure

Responsabilidades

- TypeORM
- PostgreSQL
- Repositorios
- Servicios Externos
- Stripe
- Storage

```text
infrastructure/

database/

repositories/

providers/

mappers/
```

---

# 10. Capa Presentation

Responsabilidades

- Controllers
- Guards
- Pipes
- Interceptors
- Filters

```text
presentation/

controllers/

guards/

filters/

pipes/

decorators/
```

---

# 11. Configuración Global

El proyecto tendrá módulos globales para:

Config

Logger

Database

Storage

Authentication

Authorization

---

# 12. Módulos Compartidos

common/

Contendrá:

- Exceptions
- Pipes
- Guards
- Decorators
- Constants
- Helpers
- Validators
- Types

---

# 13. Core

El directorio core contendrá componentes reutilizables del sistema.

```text
core/

base/

events/

exceptions/

interfaces/

services/
```

---

# 14. Configuración

config/

```text
config/

app.config.ts

database.config.ts

jwt.config.ts

stripe.config.ts

storage.config.ts

swagger.config.ts
```

---

# 15. Base de Datos

database/

```text
database/

entities/

migrations/

seeds/

subscribers/

factories/
```

---

# 16. Convenciones

Todos los módulos deberán contener:

Controller

Service

Repository

Mapper

Entity

DTO

UseCases

Interfaces

Tests

---

# 17. Inyección de Dependencias

Toda dependencia será registrada mediante Providers de NestJS.

Nunca instanciar clases manualmente.

Siempre utilizar Dependency Injection.

---

# 18. Comunicación entre Módulos

Los módulos nunca accederán directamente a la base de datos de otro módulo.

La comunicación se realizará mediante:

Interfaces

Servicios

Eventos de Dominio

---

# 19. Validaciones

Toda validación crítica se realizará en Backend.

El Frontend únicamente realizará validaciones de experiencia de usuario.

---

# 20. Manejo de Errores

Se utilizarán Exception Filters globales.

Todas las respuestas de error tendrán un formato uniforme.

Ejemplo

```json
{
  "statusCode": 404,
  "message": "Producto no encontrado",
  "error": "Not Found",
  "timestamp": "2026-07-03T15:20:00Z",
  "path": "/api/catalog/products/123"
}
```

---

# 21. API REST

Todos los endpoints estarán versionados.

Ejemplo

/api/v1/

Los recursos seguirán convenciones REST.

Ejemplo

GET

POST

PUT

PATCH

DELETE

---

# 22. Documentación

Toda la API será documentada mediante Swagger.

Ruta

/api/docs

---

# 23. Pruebas

Cada módulo deberá incluir:

- Unit Tests
- Integration Tests

Las pruebas se implementarán con Jest.

---

# 24. Dependencias

El Backend será consumido por:

- Página Institucional
- Tienda Online
- Dashboard ERP

Todos consumirán exactamente la misma API REST.

---

# 25. Resumen

Arquitectura

Clean Architecture

Patrón

DDD

Framework

NestJS

Lenguaje

TypeScript

Base de Datos

PostgreSQL

ORM

TypeORM

Frontend

React (3 aplicaciones)

API

REST

Autenticación

JWT

Pago

Stripe

---

# 26. Próximo Documento

El siguiente documento corresponde a la Arquitectura del Frontend Institucional (React), donde se definirá la estructura del proyecto, organización de componentes, layouts, rutas, manejo de estado, consumo de la API y convenciones de desarrollo.