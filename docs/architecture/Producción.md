# Arquitectura del Software

# Volumen IV

# Parte XI

# Configuración del Entorno de Producción

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la configuración del entorno de producción del sistema Alpacart ERP.

Toda la infraestructura será desplegada dentro de un único VPS de Contabo utilizando Ubuntu Server LTS, Docker Compose y Nginx.

---

# 2. Infraestructura

Proveedor

Contabo

Servidor

VPS

Sistema Operativo

Ubuntu Server LTS

Arquitectura

64 bits

---

# 3. Componentes Instalados

Servidor

Ubuntu Server

Docker Engine

Docker Compose

Git

Nginx

Certbot

OpenSSH

Fail2Ban

UFW

---

# 4. Organización General

```text
/

├── opt/
│
│   └── alpacart/
│
│       ├── backend/
│       ├── frontend-web/
│       ├── frontend-store/
│       ├── frontend-dashboard/
│       ├── docker/
│       ├── nginx/
│       ├── postgres/
│       ├── backups/
│       ├── storage/
│       ├── scripts/
│       └── logs/
```

---

# 5. Directorio Backend

```text
backend/

src/

dist/

Dockerfile

package.json

.env.production
```

---

# 6. Directorio Frontend Web

```text
frontend-web/

src/

dist/

Dockerfile

vite.config.ts

.env.production
```

---

# 7. Directorio Frontend Store

```text
frontend-store/

src/

dist/

Dockerfile

vite.config.ts

.env.production
```

---

# 8. Directorio Frontend Dashboard

```text
frontend-dashboard/

src/

dist/

Dockerfile

vite.config.ts

.env.production
```

---

# 9. Directorio Docker

```text
docker/

docker-compose.yml

docker-compose.prod.yml

.env

README.md
```

---

# 10. Directorio Nginx

```text
nginx/

nginx.conf

conf.d/

ssl/

logs/
```

---

# 11. Directorio PostgreSQL

```text
postgres/

data/

backups/

init/

postgresql.conf
```

---

# 12. Directorio Storage

```text
storage/

products/

banners/

categories/

pages/

users/

documents/

temp/
```

---

# 13. Directorio Logs

```text
logs/

backend/

nginx/

postgres/

docker/

application/
```

---

# 14. Directorio Scripts

```text
scripts/

deploy.sh

backup.sh

restore.sh

update.sh

healthcheck.sh
```

---

# 15. Variables de Entorno

Backend

```text
PORT

DATABASE_URL

JWT_SECRET

JWT_REFRESH_SECRET

STRIPE_SECRET_KEY

STRIPE_WEBHOOK_SECRET

STORAGE_PATH

APP_URL

NODE_ENV
```

---

Frontend Web

```text
VITE_API_URL

VITE_APP_NAME
```

---

Frontend Store

```text
VITE_API_URL

VITE_STRIPE_PUBLIC_KEY
```

---

Frontend Dashboard

```text
VITE_API_URL
```

---

# 16. Dominios

Página Institucional

```
https://www.empresa.pe
```

Tienda

```
https://tienda.empresa.pe
```

Dashboard

```
https://erp.empresa.pe
```

API

```
https://api.empresa.pe
```

---

# 17. Certificados SSL

Proveedor

Let's Encrypt

Renovación

Automática

Todo el tráfico utilizará HTTPS.

---

# 18. Configuración Nginx

El servidor Nginx será responsable de:

- Redirección HTTP → HTTPS
- Reverse Proxy hacia NestJS
- Servir archivos estáticos de React
- Compresión Gzip
- Cache para recursos estáticos
- Cabeceras de seguridad

---

# 19. Firewall

Puertos permitidos

22

80

443

Todos los demás puertos permanecerán cerrados.

PostgreSQL no será accesible desde Internet.

---

# 20. Usuarios del Sistema

Administrador

Acceso SSH mediante clave privada.

No se permitirá acceso SSH como root.

Los permisos mínimos necesarios serán aplicados sobre los directorios de la aplicación.

---

# 21. Flujo de Producción

```text
Internet

↓

Dominio

↓

Nginx

↓

Frontend React

↓

Backend NestJS

↓

PostgreSQL
```

---

# 22. Buenas Prácticas

- Ejecutar todos los servicios mediante Docker Compose.
- Mantener separados los datos persistentes y el código fuente.
- Utilizar variables de entorno para toda configuración sensible.
- Registrar los logs de cada servicio en directorios independientes.
- Realizar despliegues únicamente desde la rama `main`.

---

# 23. Resumen

Proveedor

Contabo

Sistema Operativo

Ubuntu Server LTS

Servidor Web

Nginx

Backend

NestJS

Frontends

React (3 aplicaciones)

Base de Datos

PostgreSQL

Contenedores

Docker Compose

SSL

Let's Encrypt

Firewall

UFW

---

# 24. Próximo Documento

El siguiente documento corresponde a la estrategia de Monitoreo del sistema, donde se definirán la supervisión de servicios, métricas de rendimiento, disponibilidad, registros, alertas y procedimientos de diagnóstico para el entorno de producción.