# AlpacaRT — Setup Guide

> Guía completa para levantar el ecosistema AlpacaRT en entorno local

---

## Requisitos

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| Node.js | 20.x o 24.x | Runtime |
| npm | 9.x+ | Gestor de paquetes |
| PostgreSQL | 16 | Base de datos |
| Redis | 7 | Cache + rate limiting (opcional, fail-open) |

---

## 1. Estructura del proyecto

```
alpacart/
├── backend/                    # NestJS 10 + Sequelize 6
│   ├── src/                   # Código fuente
│   ├── database/
│   │   ├── migrations/        # 16 migraciones (001-016)
│   │   ├── seeds/             # 8 seeds (001-008)
│   │   └── config/            # sequelize.js (lee de .env)
│   └── .env                   # Variables de entorno (¡configurar primero!)
├── frontend/
│   ├── pagina-institucional/  # React 19 — Puerto 3101
│   ├── tienda/                # React 19 — Puerto 3102
│   └── dashboard/             # React 19 — Puerto 5173
├── packages/                  # Paquetes compartidos (8)
├── docs/                      # Documentación (~347 archivos)
├── scripts/                   # Backup/restore
├── SETUP.md                   # Este archivo
└── CHANGELOG.md
```

---

## 2. Base de Datos

### 2.1 Configuración (backend/.env)

El archivo `backend/.env` ya existe con estos valores:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=alpacart
DB_PASSWORD=alpacart
DB_NAME=alpacart
```

### 2.2 Iniciar PostgreSQL con Docker (recomendado)

El proyecto incluye un `docker-compose-r7v.yml` que levanta PostgreSQL 16 y Redis 7:

```bash
cd backend
docker compose -f docker-compose-r7v.yml up -d
```

Esto crea:
- **PostgreSQL 16** en `localhost:5446` — BD: `alpacart_r7v`, user: `alpacart`, pass: `alpacart`
- **Redis 7** en `localhost:6387`

Verificar que los contenedores estén corriendo:

```bash
docker ps
# Deberías ver: alpacart-r7v-pg (postgres:16-alpine) y alpacart-r7v-redis (redis:7-alpine)
```

### 2.3 Crear la base de datos (si usas PostgreSQL nativo)

Si prefieres usar tu propia instalación de PostgreSQL en lugar de Docker:

```bash
psql -U postgres
CREATE USER alpacart WITH PASSWORD 'alpacart';
CREATE DATABASE alpacart OWNER alpacart;
\q

# Luego editar backend/.env:
# DB_PORT=5432
# DB_NAME=alpacart
```

---

## 3. Backend

### 3.1 Instalar dependencias

```bash
cd backend
npm install
```

### 3.2 Variables de entorno

El `.env` ya está configurado. Verifica que tenga:

```env
NODE_ENV=development
PORT=8000
API_PREFIX=api/v1
CORS_ORIGINS=http://localhost:5173,http://localhost:3101,http://localhost:3102

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=alpacart
DB_PASSWORD=alpacart
DB_NAME=alpacart

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=alpacart-dev-secret-change-in-production
```

### 3.3 Configurar variables de entorno

El archivo `backend/.env` ya está configurado para Docker. Verifica que tenga:

```env
DB_HOST=localhost
DB_PORT=5446          # ← Docker usa 5446 (no 5432)
DB_USERNAME=alpacart
DB_PASSWORD=alpacart
DB_NAME=alpacart_r7v  # ← Docker usa alpacart_r7v (no alpacart)
```

> **Importante:** Si usas PostgreSQL nativo en lugar de Docker, cambia a `DB_PORT=5432` y `DB_NAME=alpacart`.

### 3.4 Ejecutar migraciones

NestJS + `@nestjs/config` leen automáticamente el archivo `.env`. Usa los scripts de npm:

```bash
cd backend

# Migrar (lee variables de backend/.env automáticamente)
npm run db:migrate
```

**Salida esperada (16 migraciones):**
```
== 20260711-001-create-iam: migrating =======
== 20260711-001-create-iam: migrated =======
...
== 20260715-016-create-webhook-events: migrating =======
== 20260715-016-create-webhook-events: migrated =======
✅ Cross-domain FKs created: sessions.customer_id, carts.coupon_id, orders.coupon_id
```

### 3.5 Ejecutar seeds

```bash
cd backend
npm run db:seed
```

**Salida esperada (8 seeds, ~301 registros):**
```
== 20260711-001-iam-base: seeded =======
...
== 20260717-008-cms-content: seeded =======
```

### 3.6 Reset completo (revertir migraciones, migrar y seedear de nuevo)

```bash
cd backend
npm run db:reset
```

Esto hace: `undo:all` → `migrate` → `seed:all` en un solo comando.

### 3.7 Compilar e iniciar

### 3.5 Compilar e iniciar

```bash
# Compilar TypeScript
npm run build

# Iniciar servidor
npm start

# O en modo desarrollo (hot reload)
npm run start:dev
```

El backend se levanta en:

```
http://localhost:8000
Swagger: http://localhost:8000/api/v1/docs
Health:  http://localhost:8000/api/v1/health
```

### 3.6 Credenciales de prueba

| Tipo | Email | Password |
|------|-------|----------|
| Staff (admin) | `mateo.q@alpacart.com` | `Admin123!` |
| Staff (logística) | `sofia.m@alpacart.com` | `Admin123!` |
| Customer (B2C) | `camila.g@email.com` | `Cliente2024!` |

---

## 4. Frontend Institucional (Puerto 3101)

```bash
cd frontend/pagina-institucional
npm install
npm run dev
# → http://localhost:3101
```

### .env.development
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Páginas
| Ruta | Descripción |
|------|-------------|
| `/` | Home (hero, testimonios, galería desde API) |
| `/about` | Nosotros |
| `/catalogo` | Catálogo |
| `/preguntas` | FAQ (desde GET /faq) |
| `/contacto` | Contacto (POST /contact) |
| `/promociones` | Promociones |

---

## 5. Frontend Tienda (Puerto 3102)

```bash
cd frontend/tienda
npm install
npm run dev
# → http://localhost:3102
```

### .env.development
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Páginas
| Ruta | Auth | Descripción |
|------|------|-------------|
| `/` | No | Home |
| `/product/:id` | No | Detalle de producto |
| `/cart` | No | Carrito |
| `/checkout` | No | Checkout |
| `/login` | No | Login customer |
| `/register` | No | Registro |
| `/wishlist` | Sí | Lista de deseos |
| `/order/history` | Sí | Historial de pedidos |

---

## 6. Frontend Dashboard (Puerto 5173)

```bash
cd frontend/dashboard
npm install
npm run dev
# → http://localhost:5173
```

### .env.development
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_DASHBOARD_PREVIEW=true
```

### Login
Usuario: `mateo.q@alpacart.com` / `Admin123!`

---

## 7. Resumen de Puertos

| Servicio | Puerto | URL |
|----------|--------|-----|
| Backend NestJS | 8000 | http://localhost:8000 |
| Swagger | 8000 | http://localhost:8000/api/v1/docs |
| Health Check | 8000 | http://localhost:8000/api/v1/health |
| Frontend Institucional | 3101 | http://localhost:3101 |
| Frontend Tienda | 3102 | http://localhost:3102 |
| Frontend Dashboard | 5173 | http://localhost:5173 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |

---

## 8. Docker — Ciclo de vida completo

### 8.1 Iniciar contenedores

```bash
cd backend
docker compose -f docker-compose-r7v.yml up -d
# → PostgreSQL en localhost:5446, Redis en localhost:6387
```

### 8.2 Detener contenedores (sin borrar datos)

```bash
cd backend
docker compose -f docker-compose-r7v.yml stop
# Los datos persisten. Al hacer start, las tablas y seeds siguen ahí.
```

### 8.3 Reanudar contenedores

```bash
cd backend
docker compose -f docker-compose-r7v.yml start
```

### 8.4 Ver logs

```bash
docker compose -f docker-compose-r7v.yml logs -f
# Ctrl+C para salir
```

### 8.5 Borrar todo y volver a cero

```bash
cd backend
docker compose -f docker-compose-r7v.yml down -v
```

**Flags:**
- `down` → Detiene y elimina los contenedores
- `-v` → Elimina también los volúmenes (BORRA TODOS LOS DATOS)

Después de esto, la próxima vez que hagas `up -d` tendrás PostgreSQL y Redis completamente limpios.

### 8.6 Flujo completo: de cero a funcionando

```powershell
# 1. Limpiar todo (opcional, solo si quieres empezar de cero)
cd backend
docker compose -f docker-compose-r7v.yml down -v

# 2. Iniciar Docker
docker compose -f docker-compose-r7v.yml up -d

# 4. Migrar base de datos (lee .env automáticamente)
npm run db:migrate

# 5. Sembrar datos de prueba
npm run db:seed

# 6. Compilar backend
npm run build

# 7. Iniciar backend (se queda ejecutándose)
npm start

# 8. En nuevas terminales, iniciar frontends
cd frontend/pagina-institucional && npm run dev
cd frontend/tienda && npm run dev
cd frontend/dashboard && npm run dev
```

---

## 9. Orden de arranque recomendado

```bash
# PASO 1: Iniciar Docker (PostgreSQL + Redis)
cd backend
docker compose -f docker-compose-r7v.yml up -d

# PASO 2: Migrar base de datos
$env:DB_HOST='localhost'; $env:DB_PORT='5446'; $env:DB_USERNAME='alpacart'; $env:DB_PASSWORD='alpacart'; $env:DB_NAME='alpacart_r7v'
npx sequelize-cli db:migrate --config database/config/sequelize.js --env development --migrations-path database/migrations

# PASO 3: Sembrar datos de prueba
npx sequelize-cli db:seed:all --config database/config/sequelize.js --env development --seeders-path database/seeds

# PASO 4: Compilar e iniciar backend
npm run build
npm start

# PASO 5: En terminales separadas, iniciar frontends
cd frontend/pagina-institucional && npm install && npm run dev
cd frontend/tienda && npm install && npm run dev
cd frontend/dashboard && npm install && npm run dev
```

---

## 9. Solución de problemas

### "password authentication failed for user alpacart"

```bash
# 1. El contenedor Docker está corriendo?
docker ps | findstr alpacart-r7v-pg

# 2. Conectar desde Docker (prueba interna)
docker exec alpacart-r7v-pg psql -U alpacart -d alpacart_r7v -c "SELECT 1;"

# 3. Probar conexión desde el host
psql -U alpacart -d alpacart_r7v -h localhost -p 5446

# 4. Verificar que backend/.env tenga los valores correctos para Docker:
# DB_PORT=5446
# DB_NAME=alpacart_r7v
# DB_USERNAME=alpacart
# DB_PASSWORD=alpacart

# 5. Al ejecutar migraciones, pasar las variables explicitamente:
$env:DB_HOST='localhost'; $env:DB_PORT='5446'; $env:DB_USERNAME='alpacart'; $env:DB_PASSWORD='alpacart'; $env:DB_NAME='alpacart_r7v'
npx sequelize-cli db:migrate --config database/config/sequelize.js --env development --migrations-path database/migrations
```

> **Nota importante:** El archivo `.env` NO es leído automáticamente por Sequelize CLI. Las variables deben estar en el entorno (con `$env:` en PowerShell o `export` en bash).

### "relation does not exist" al seedear

Las migraciones no se ejecutaron. Corre primero (con las variables de entorno configuradas):

```bash
npx sequelize-cli db:migrate --config database/config/sequelize.js --env development --migrations-path database/migrations
```

### Puerto en uso

```bash
# Cambiar puerto en frontend (vite.config.js)
server: { port: 3101 }  # Cambiar número

# Cambiar puerto en backend (variable PORT en .env)
PORT=8001
```

### Redis no disponible

El backend tiene fail-open. La API funciona sin Redis (rate limiting y caché se degradan).

### Error con paquetes compartidos

Los paquetes en `packages/` se resuelven mediante alias de Vite. No requieren instalación separada. Si fallan, verifica los alias en `vite.config.js`:

```js
'@alpacart/shared-types': path.resolve(__dirname, '../../packages/shared-types/src'),
```
