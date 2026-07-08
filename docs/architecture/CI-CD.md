# Arquitectura del Software

# Volumen IV

# Parte X

# Continuous Integration & Continuous Deployment (CI/CD)

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la estrategia de Integración Continua (CI) y Despliegue Continuo (CD) para el sistema Alpacart ERP.

El objetivo es automatizar la compilación, validación, pruebas y despliegue del software hacia el VPS de Contabo, reduciendo errores manuales y garantizando consistencia entre los distintos entornos.

---

# 2. Objetivos

El proceso CI/CD deberá garantizar:

- Integración continua.
- Construcción automática.
- Validación del código.
- Ejecución de pruebas.
- Despliegue automatizado.
- Trazabilidad de versiones.
- Facilidad de recuperación.

---

# 3. Herramientas

Repositorio

GitHub

CI/CD

GitHub Actions

Servidor

Contabo VPS

Sistema Operativo

Ubuntu Server LTS

Despliegue

Docker Compose

---

# 4. Arquitectura

```text
Desarrollador

↓

Git

↓

GitHub

↓

GitHub Actions

↓

Build

↓

Tests

↓

Docker Images

↓

SSH

↓

Contabo VPS

↓

Docker Compose

↓

Aplicación Actualizada
```

---

# 5. Flujo de Trabajo

1.

El desarrollador realiza cambios.

↓

2.

Commit.

↓

3.

Push.

↓

4.

GitHub recibe cambios.

↓

5.

GitHub Actions inicia Pipeline.

↓

6.

Instalación de dependencias.

↓

7.

Compilación.

↓

8.

Pruebas.

↓

9.

Construcción Docker.

↓

10.

Despliegue automático.

---

# 6. Branches

main

Producción.

develop

Desarrollo.

feature/*

Nuevas funcionalidades.

hotfix/*

Correcciones urgentes.

---

# 7. Pipeline Backend

Etapas

Checkout

↓

Node.js

↓

Install

↓

Lint

↓

Tests

↓

Build

↓

Docker Build

↓

Deploy

---

# 8. Pipeline Frontends

Se ejecutará para:

Página Institucional

↓

Tienda

↓

Dashboard

Cada aplicación será compilada de forma independiente.

---

# 9. Pipeline General

```text
Backend

↓

Build

↓

Docker

↓

Deploy

------------------

Frontend Web

↓

Build

↓

Deploy

------------------

Frontend Store

↓

Build

↓

Deploy

------------------

Frontend Dashboard

↓

Build

↓

Deploy
```

---

# 10. Validaciones

Antes del despliegue se ejecutará:

Lint

Compilación

Type Checking

Unit Tests

Build

Si alguna etapa falla, el despliegue será cancelado.

---

# 11. Versionado

Formato

v1.0.0

Cambios mayores

Major

Nuevas funcionalidades

Minor

Correcciones

Patch

---

# 12. Variables de Entorno

GitHub Secrets almacenará:

SSH_HOST

SSH_PORT

SSH_USER

SSH_PRIVATE_KEY

DATABASE_URL

JWT_SECRET

STRIPE_SECRET_KEY

Nunca se almacenarán secretos dentro del repositorio.

---

# 13. Estrategia de Despliegue

GitHub Actions

↓

SSH

↓

Contabo VPS

↓

docker compose pull

↓

docker compose up -d

↓

Aplicación Actualizada

---

# 14. Recuperación

Si el despliegue falla:

- Mantener contenedores anteriores.
- Registrar el error.
- Notificar al desarrollador.

No se eliminarán datos de PostgreSQL.

---

# 15. Registro

Cada despliegue almacenará:

Versión

Fecha

Commit

Autor

Resultado

Duración

---

# 16. Buenas Prácticas

- No desplegar desde ramas Feature.
- Producción únicamente desde Main.
- Revisiones mediante Pull Request.
- Mantener historial de versiones.
- Ejecutar pruebas antes del despliegue.

---

# 17. Resumen

Repositorio

GitHub

Automatización

GitHub Actions

Servidor

Contabo VPS

Despliegue

Docker Compose

Versionado

SemVer

---

# 18. Próximo Documento

El siguiente documento corresponde a la Configuración del Entorno de Producción, donde se definirán la estructura final del VPS, configuración de dominios, Nginx, certificados SSL, variables de entorno y organización de directorios.