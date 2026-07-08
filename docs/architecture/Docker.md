# Arquitectura del Software

# Volumen IV

# Parte IX

# Arquitectura Docker

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la arquitectura de contenedores Docker que será utilizada para desplegar el sistema Alpacart ERP.

Toda la solución será desplegada dentro de un único VPS de Contabo utilizando Docker Compose como herramienta de orquestación.

No se utilizará Kubernetes ni otros orquestadores.

---

# 2. Objetivos

La arquitectura Docker deberá proporcionar:

- Despliegue reproducible.
- Aislamiento de servicios.
- Facilidad de mantenimiento.
- Actualización independiente de componentes.
- Recuperación rápida ante fallos.

---

# 3. Infraestructura

Proveedor

Contabo VPS

Sistema Operativo

Ubuntu Server LTS

Contenedores

Docker

Orquestación

Docker Compose

---

# 4. Servicios Docker

La infraestructura estará compuesta por los siguientes contenedores:

- nginx
- backend
- postgres
- web
- store
- dashboard

---

# 5. Arquitectura

```text
Internet

↓

Dominio .pe

↓

VPS Contabo

↓

Docker Compose

├── nginx
├── backend
├── postgres
├── web
├── store
└── dashboard
```

---

# 6. Contenedor Nginx

Responsabilidades

- Reverse Proxy
- HTTPS
- Redirecciones
- Compresión
- Servir archivos estáticos de React

Puertos

80

443

---

# 7. Contenedor Backend

Imagen

NestJS

Responsabilidades

- API REST
- JWT
- Stripe
- Lógica del negocio

Puerto interno

3000

---

# 8. Contenedor PostgreSQL

Imagen

PostgreSQL

Responsabilidades

- Base de datos principal

Puerto

5432

Acceso

Únicamente desde el Backend.

---

# 9. Contenedor Web

Aplicación

Página Institucional

Framework

React

Build

Vite

Servidor

Nginx

---

# 10. Contenedor Store

Aplicación

Tienda Online

Framework

React

Servidor

Nginx

---

# 11. Contenedor Dashboard

Aplicación

Dashboard ERP

Framework

React

Servidor

Nginx

---

# 12. Redes Docker

Red interna

alpacart-network

Todos los contenedores pertenecerán a la misma red privada.

Únicamente Nginx expondrá puertos hacia Internet.

---

# 13. Volúmenes

Persistencia

PostgreSQL

Logs

Archivos estáticos

Backups

Los datos persistentes nunca deberán almacenarse dentro del contenedor.

---

# 14. Variables de Entorno

Cada servicio utilizará su propio archivo `.env`.

backend/.env

web/.env

store/.env

dashboard/.env

postgres/.env

---

# 15. Dependencias

Backend

↓

PostgreSQL

Web

↓

Backend

Store

↓

Backend

Dashboard

↓

Backend

---

# 16. Reinicio

Todos los contenedores utilizarán:

restart: unless-stopped

---

# 17. Actualizaciones

Cada servicio podrá actualizarse individualmente sin afectar los demás componentes, siempre que se mantenga la compatibilidad con la API.

---

# 18. Seguridad

- No exponer PostgreSQL a Internet.
- No exponer el Backend directamente.
- Todo el tráfico externo pasará por Nginx.
- Utilizar únicamente HTTPS.

---

# 19. Flujo de Despliegue

GitHub

↓

GitHub Actions

↓

VPS Contabo

↓

Docker Compose

↓

Actualización de Contenedores

---

# 20. Resumen

Proveedor

Contabo

Sistema Operativo

Ubuntu Server LTS

Contenedores

6

Orquestación

Docker Compose

Reverse Proxy

Nginx

Base de Datos

PostgreSQL

Backend

NestJS

Frontends

React (3 aplicaciones)

---

# 21. Próximo Documento

El siguiente documento definirá el flujo de Integración y Despliegue Continuo (CI/CD) utilizando GitHub Actions para automatizar la construcción, pruebas y despliegue del sistema hacia el VPS de Contabo.