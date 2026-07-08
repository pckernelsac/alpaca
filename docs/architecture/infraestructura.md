# Arquitectura del Software

# Volumen IV

# Parte VIII

# Infraestructura

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la infraestructura física donde será desplegado el sistema Alpacart ERP.

El objetivo es proporcionar una arquitectura estable, escalable, segura y sencilla de administrar para una pequeña y mediana empresa.

La infraestructura estará preparada para alojar:

- Backend NestJS
- PostgreSQL
- Página Institucional
- Tienda Online
- Dashboard ERP
- Storage
- Nginx Reverse Proxy

Toda la infraestructura será desplegada inicialmente sobre un VPS Linux.

---

# 2. Arquitectura Física

```text
                    INTERNET

                         │

                  Cloudflare (Opcional)

                         │

                    Puerto 443

                         │

                     Nginx Proxy

                         │

        ┌────────────┬────────────┬────────────┐

        │            │            │

   Página Web      Tienda      Dashboard

 React + Nginx  React + Nginx React + Nginx

        │            │            │

        └────────────┴────────────┘

                  Backend NestJS

                         │

        ┌───────────────┼────────────────┐

        │               │                │

 PostgreSQL        Storage         Stripe API

```

---

# 3. Sistema Operativo

Sistema

Ubuntu Server LTS

Arquitectura

64 bits

Actualizaciones

Automáticas de seguridad

Zona Horaria

America/Lima

---

# 4. Componentes

Servidor

Ubuntu Server

↓

Docker

↓

Contenedores

↓

Servicios

Todos los servicios serán desplegados mediante Docker Compose.

---

# 5. Servicios

Infraestructura

- Reverse Proxy
- Backend
- PostgreSQL
- Storage
- Frontend Institucional
- Frontend Tienda
- Dashboard ERP

---

# 6. Dominios

Dominio principal

```
empresa.pe
```

Página Institucional

```
www.empresa.pe
```

Tienda

```
tienda.empresa.pe
```

Dashboard

```
erp.empresa.pe
```

API

```
api.empresa.pe
```

---

# 7. Flujo de Solicitudes

Cliente

↓

DNS

↓

Nginx

↓

Frontend

↓

NestJS

↓

PostgreSQL

---

# 8. Backend

Responsabilidades

- API REST
- Autenticación
- Autorización
- Lógica del negocio
- Integraciones
- Stripe

No servirá archivos estáticos de los Frontends.

---

# 9. PostgreSQL

Responsabilidades

Almacenamiento transaccional.

Configuración

Base de datos única.

Backups diarios.

Acceso únicamente desde Backend.

---

# 10. Storage

Responsabilidades

Imágenes

Documentos

Archivos

Videos (si aplica en el futuro)

El acceso será controlado por el Backend.

---

# 11. Frontend Institucional

Aplicación React compilada.

Servida mediante Nginx.

Contenido público.

Sin autenticación.

---

# 12. Frontend Tienda

Aplicación React compilada.

Servida mediante Nginx.

Clientes autenticados.

Comunicación únicamente mediante API.

---

# 13. Dashboard ERP

Aplicación React compilada.

Servida mediante Nginx.

Acceso restringido.

Protegido mediante JWT.

---

# 14. Reverse Proxy

Nginx será responsable de:

HTTPS

Redirecciones

Compresión

Cabeceras

Balanceo (si se requiere en el futuro)

Archivos estáticos

---

# 15. Certificados SSL

Let's Encrypt

Renovación automática.

Todo el tráfico utilizará HTTPS.

No se permitirá HTTP sin redirección.

---

# 16. Firewall

Puertos públicos

80

443

Puertos privados

5432

Nunca expuesto.

Puerto Backend

Solo accesible internamente.

SSH

Acceso restringido.

---

# 17. Variables de Entorno

Backend

.env.production

Frontend Institucional

.env.production

Tienda

.env.production

Dashboard

.env.production

Nunca almacenar secretos dentro del repositorio.

---

# 18. Recursos Iniciales

VPS recomendado

4 vCPU

8 GB RAM

160 GB SSD

Ubuntu Server

Docker

Esta configuración soporta adecuadamente la primera etapa del proyecto y permite crecimiento sin cambios inmediatos de arquitectura.

---

# 19. Flujo de Producción

Usuario

↓

Cloudflare (Opcional)

↓

Nginx

↓

Frontend

↓

Backend

↓

PostgreSQL

↓

Respuesta

---

# 20. Monitoreo de Infraestructura

Se supervisará:

Uso de CPU

Uso de RAM

Espacio en disco

Estado de contenedores

Disponibilidad del Backend

Disponibilidad de PostgreSQL

Disponibilidad de Nginx

---

# 21. Escalabilidad

La infraestructura permitirá:

Separar PostgreSQL.

Separar Backend.

Separar Frontends.

Agregar múltiples instancias.

Agregar balanceador.

Sin modificar la arquitectura del software.

---

# 22. Buenas Prácticas

- Todos los servicios deberán ejecutarse en contenedores.
- No instalar dependencias directamente sobre el sistema operativo salvo Docker y herramientas de administración.
- Mantener el sistema operativo actualizado.
- Limitar el acceso SSH mediante claves.
- Utilizar HTTPS en todos los dominios.

---

# 23. Resumen

Sistema Operativo

Ubuntu Server LTS

Contenedores

Docker

Reverse Proxy

Nginx

Backend

NestJS

Frontend

React (3 aplicaciones)

Base de Datos

PostgreSQL

Pagos

Stripe

Storage

Servicio de almacenamiento

---

# 24. Próximo Documento

El siguiente documento corresponde a la arquitectura Docker, donde se definirá la organización de los contenedores, redes, volúmenes, Docker Compose y la estrategia de despliegue para todos los servicios del sistema.