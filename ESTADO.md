# ALPACART — Estado del proyecto

> Última actualización: 2026-08-25 (migración terminada y stack viejo retirado)
> Stack: FastAPI + SQLAlchemy 2.0 + PostgreSQL 18 · React 19 + TypeScript + Vite

El stack viejo (NestJS + React JS) se borró del árbol el 2026-08-25 y el contenido
de `alpacart_new/` pasó a la raíz. Queda en el historial, en el commit anterior a
esa limpieza, por si hiciera falta consultarlo.

---

## Estado por pieza

| Pieza | Estado | Puerto |
|---|---|---|
| PostgreSQL 18 + Redis | ✅ funcionando | 5448 / 6389 |
| Backend FastAPI | ✅ 95 endpoints, 127/127 en smoke test | 8010 |
| Tienda (React TS) | ✅ rediseñada y verificada en navegador | 3200 |
| Dashboard (React TS) | ✅ 11 pantallas, verificado en navegador | 3300 |
| Institucional (React TS) | ✅ 14 rutas, verificada en navegador | 3101 |

---

## Cómo levantar todo

```bash
# 1. Base de datos y cache
docker compose up -d

# 2. Backend  (desde backend/)
.venv/Scripts/python.exe -m uvicorn app.main:app --port 8010 --reload

# 3. Tienda  (desde frontend/tienda)
npm run dev

# 4. Dashboard  (desde frontend/dashboard)
npm run dev

# 5. Institucional  (desde frontend/institucional)
npm run dev
```

Primera vez, o para volver a cero:

```bash
cd backend
.venv/Scripts/python.exe -m pip install -r requirements.txt
.venv/Scripts/python.exe -m alembic upgrade head
.venv/Scripts/python.exe -m app.seeds.run --reset
```

**URLs:** tienda http://localhost:3200 · panel http://localhost:3300 ·
institucional http://localhost:3101 · API http://localhost:8010/api/v1 ·
Swagger http://localhost:8010/api/v1/docs

**Credenciales sembradas** (las mismas del proyecto viejo):

| Tipo | Correo | Contraseña |
|---|---|---|
| Staff (admin) | `mateo.q@alpacart.com` | `Admin123!` |
| Cliente | `camila.g@email.com` | `Cliente2024!` |

---

## Verificación

```bash
cd backend
.venv/Scripts/python.exe -m app.seeds.run --reset   # el test asume datos frescos
.venv/Scripts/python.exe smoke_test.py              # 127 verificaciones

cd frontend/tienda
npx tsc --noEmit && npm run build

cd frontend/dashboard
npx tsc -b && npm run build

cd frontend/institucional
npx tsc -b && npm run build
```

`smoke_test.py` no es idempotente: consume stock y crea pedidos. Correr `--reset`
antes, o los checks de checkout fallan en la segunda pasada.

---

## El dashboard

`frontend/dashboard` está terminado. Once pantallas, todas contra la API real:

| Ruta | Qué hace |
|---|---|
| `/ingresar` | login de personal (`POST /auth/login`) |
| `/` | KPIs, ventas por mes, más vendidos, últimos pedidos, stock a reponer |
| `/productos` | listado con filtros y orden; alta, edición y archivado |
| `/pedidos` · `/pedidos/:id` | listado por estado y detalle con historial, cambio de estado y cancelación |
| `/inventario` | existencias por almacén, ajuste con motivo, historial de movimientos |
| `/envios` | guías y estado de entrega |
| `/clientes` | compradores de la tienda y cuentas mayoristas |
| `/usuarios` | personal (CRUD) y roles con sus permisos |
| `/marketing` | cupones (alta), campañas, newsletter y consultas web |
| `/auditoria` | bitácora paginada |
| `/ajustes` | datos de la empresa, tu cuenta y tema del panel |

Detalles de implementación en `frontend/dashboard/README.md`. Lo que conviene
saber antes de tocarlo:

- **Corre en 3300 porque ese es el origen que el backend acepta.** Cambiar el
  puerto obliga a tocar `CORS_ORIGINS` en `backend/.env`.
- **El token del panel vive en `alpacart.admin.token`**, separado del de la
  tienda, para que las dos sesiones convivan en el mismo navegador.
- **El orden de las tablas es local a la página visible**: la API pagina del
  lado del servidor y solo `/products` acepta `sort`.
- **Los gráficos son SVG a mano, de una sola serie**, con el token `--chart-1`
  declarado en claro y en oscuro.
- Sin librerías de UI ni de estado: los mismos tokens y componentes que la
  tienda, más `DataTable`, `Drawer`, `ConfirmDialog` y `StatCard`.

## URLs de producto

La tienda publica los productos por **slug**: `/producto/manta-imperial-gold`.
`products.slug` se agregó en la migración `b2c7f1d4e9a3`, que rellena los
existentes a partir del nombre (sin tildes, con sufijo `-2` si chocan).

`GET /products/{identificador}` acepta **slug o UUID**: los links viejos y lo
que guarda el carrito —que referencia por id— siguen resolviendo. El carrito,
los favoritos y las líneas de pedido devuelven además `productSlug`, así que
los links internos también salen legibles.

El slug se genera solo al crear un producto. En el panel se puede corregir
desde el cajón de edición (campo «URL»), y solo viaja al backend si de verdad
cambió: renombrar un producto no debería mover su URL.

## La institucional

`frontend/institucional` se reescribió el 2026-08-25 y con eso la migración
queda completa: las tres aplicaciones viven en el stack nuevo. Catorce rutas,
todas contra la API real.

| Ruta | Qué muestra |
|---|---|
| `/` | hero, beneficios, colecciones, vitrina, proceso, galería y testimonios |
| `/nosotros` | la historia de la casa y los tres compromisos |
| `/colecciones` | una fila por colección y, en `#fibras`, el catálogo textil |
| `/proceso` | los ocho pasos del taller, en línea de tiempo |
| `/sostenibilidad` | el texto editable más cinco compromisos |
| `/servicios` | qué incluye una compra y qué se ofrece a marcas |
| `/diario` · `/diario/:slug` | notas publicadas y su detalle |
| `/preguntas` | FAQ por categoría, con índice al costado |
| `/contacto` | formulario (`POST /contact`) y ficha de la casa |
| `/envios` · `/devoluciones` · `/terminos` · `/privacidad` | páginas de texto del CMS |

Detalles en `frontend/institucional/README.md`. Lo que conviene saber:

- **No vende.** No hay sesión, carrito ni token: el cliente HTTP es la versión
  de sólo lectura del de la tienda. Todo botón de compra sale a `VITE_TIENDA_URL`
  (otro origen, por eso son `<a>` y no `<Link>`).
- **Corre en 3101** porque es el origen que `CORS_ORIGINS` ya aceptaba.
- **Los saltos de scroll van con `behavior: 'instant'`.** La base declara
  `scroll-behavior: smooth`; sin eso, cada cambio de ruta arrancaba una
  animación que el propio contenido cancelaba y el scroll no se movía. El ancla
  `#fibras` además se reencuadra mientras las secciones de arriba cargan.
- **`useReveal` observa el DOM además del primer render.** Las secciones que
  piden sus propios datos entran al árbol después de montar la página y se
  quedaban invisibles.
- **La franja invertida cambia de lado con el tema** (carbón en claro, crema en
  oscuro). Su texto secundario, acento y borde usan
  `--text-inverse-secondary`, `--accent-on-inverse` y `--border-on-inverse`,
  agregados a `tokens.css` en los tres bloques.

La app vieja (`frontend/pagina-institucional`, React JS) se borró junto con el
resto del stack anterior; si hace falta mirarla, está en el historial.

## Variantes, fotos y catalogos textiles

Agregado el 2026-08-20 para que el panel pueda administrar el catálogo entero:

| Ruta | Nota |
|---|---|
| `POST /variants` | crea la variante **y su fila de stock** en el almacén principal; si nace con stock, deja el movimiento |
| `PUT /variants/{id}` | no acepta `stock`: las existencias se mueven por `POST /stock/adjust`, que registra el movimiento |
| `DELETE /variants/{id}` | borra de verdad solo si nunca se vendió ni se transfirió; si tiene historial, la desactiva y lo dice en la respuesta |
| `POST /products/{id}/media` | la primera foto queda principal aunque no se pida |
| `PUT /media/{id}` · `DELETE /media/{id}` | mantienen la regla de una sola principal; al ocultarla o borrarla, otra toma su lugar |
| `GET /textile/{materials,colors,sizes,seasons}` | públicos, como en el backend viejo; los talles salen por `order`, no alfabéticos |

En el panel, el cajón del producto ahora tiene pestañas **Datos · Variantes ·
Fotos** (solo al editar: un producto sin id todavía no puede tener variantes).
Elegir un color del catálogo textil completa nombre y hex de una vez.

Las fotos se **suben desde la máquina**; el campo de URL ya no existe, ni en el
cajón del producto ni en el CMS. El archivo va a `POST /uploads` (staff, una
imagen por llamada) y la respuesta trae la ruta con la que se guarda:

| Pieza | Detalle |
|---|---|
| `POST /uploads` | acepta JPG, PNG, WEBP, AVIF y GIF hasta 8 MB; valida el tipo por los **primeros bytes**, no por lo que declara el navegador |
| `GET /api/v1/files/{archivo}` | el propio backend sirve la carpeta como estática |
| `backend/uploads/` | dónde aterrizan; en el servidor es el volumen `alpacart-uploads` |

Tres decisiones que conviene no deshacer:

- **Lo que se guarda es una ruta relativa** (`/api/v1/files/…`), no una URL
  absoluta. En producción las tres apps y la API comparten dominio y la ruta ya
  apunta bien; guardar `http://localhost:8010/…` dejaría el catálogo inservible
  apenas se despliegue. En desarrollo cada frontend la resuelve con `mediaUrl()`
  contra su `VITE_API_URL`, y esa misma función deja pasar tal cual las fotos
  viejas de Unsplash, que son absolutas.
- **Los archivos se sirven bajo `/files/` y no bajo `/media/`**, que ya es la
  ruta con la que el catálogo edita y borra fotos.
- **SVG no se acepta**: es XML, admite `<script>` y se serviría desde el mismo
  dominio que el panel y la tienda.

## Edición del contenido de la web

El CMS dejó de ser de solo lectura. Cada recurso —hero, beneficios,
testimonios, galería y procesos— tiene `POST`, `PUT` y `DELETE` bajo su misma
ruta (`/cms/hero`, `/cms/hero/{id}`…), con staff obligatorio para escribir.

Los listados aceptan `?include_hidden=true`, que **solo respeta el staff**: la
web sigue viendo únicamente lo publicado aunque alguien pruebe el parámetro.
El `PUT` aplica `exclude_unset`, así que mandar solo `active` no vacía el resto
de los campos.

En el panel esto es la pantalla **Contenido**, con una pestaña por recurso. Las
cinco comparten un componente (`components/cms/CmsResource.tsx`) que recibe los
campos como datos: la coreografía es idéntica y no tenía sentido escribir cinco
pantallas casi iguales.

**Ojo con las secuencias de Postgres.** Las semillas insertan ids explícitos y
eso no mueve el contador; el primer alta desde la API chocaba con la clave
primaria. `app/seeds/run.py` ahora corre `sincronizar_secuencias()` al final y
deja las 44 secuencias al día. Si algún día una tabla sembrada a mano vuelve a
dar "duplicate key", es esto.

## Deploy en Dokploy

Un solo dominio y tres aplicaciones separadas por ruta:

| Ruta | App |
|---|---|
| `/` | institucional |
| `/tienda/` | tienda |
| `/panel/` | back office |
| `/api/v1/` | backend FastAPI, por el proxy del nginx |

Que compartan origen no es un detalle de infraestructura: es lo que hace que las
tres llamen a `/api/v1` sin CORS de por medio.

**Los prefijos viven en tres lugares y hay que moverlos juntos:** la `base` de
Vite (`vite.config.ts` de cada app, solo al compilar), el `basename` del router
—que la lee de `import.meta.env.BASE_URL`, para que no puedan divergir— y los
`location` de `frontend/nginx.conf`.

Archivos del deploy:

```
docker-compose.dokploy.yml   dos servicios: alpacart-backend y alpacart-frontend
backend/Dockerfile           python:3.11-slim
backend/entrypoint.sh        espera la base, migra, siembra si RUN_SEED=true, sirve
frontend/Dockerfile          compila las tres apps y las mete en un nginx
frontend/nginx.conf          rutas, cache y proxy a la API
```

Variables que van en **App → Environment** de Dokploy:

| Variable | Nota |
|---|---|
| `ALPACART_DOMAIN` | el dominio, sin esquema |
| `ALPACART_DATABASE_URL` | cadena del servicio de PostgreSQL **18** creado en Dokploy |
| `ALPACART_JWT_SECRET` | largo y aleatorio; sin esto el deploy falla a propósito |
| `ALPACART_RUN_SEED` | `true` sólo en el primer deploy; **borra y reescribe el catálogo** |
| `ALPACART_TOKEN_MINUTES` | opcional, por defecto 720 |
| `ALPACART_STRIPE_*` | opcionales, vacías mientras el checkout no cobre |

Detalles que ya costaron una vuelta y conviene no repetir:

- **Todo lleva el prefijo `alpacart`**: servicios, red interna, routers y
  middleware de Traefik. En Dokploy todos los stacks comparten
  `dokploy-network` y el DNS de Docker resuelve por nombre de servicio en
  todas las redes del contenedor: un `backend` a secas puede terminar
  atendiendo al nginx de otra aplicación del mismo servidor.
- **El `proxy_pass` va por variable, con `resolver 127.0.0.11`.** Con el nombre
  literal nginx resuelve al cargar la configuración: si el backend todavía no
  existe se niega a arrancar (`host not found in upstream`), y si se reinicia
  con otra IP se queda pegado a la vieja.
- **El cacheo se decide con un `map`, no con `add_header` por `location`.** Un
  `add_header` dentro de un `location` descarta todos los heredados del
  `server`, y ahí se perderían en silencio las cabeceras de seguridad.
- **`cta_link` de los slides va sin el prefijo `/tienda`** (`/catalogo?...`): la
  tienda lo resuelve con el `basename` de su router y la institucional le
  antepone `VITE_TIENDA_URL`. Con el prefijo escrito da `/tienda/tienda/...`.
- **Redis no se usa** en el backend nuevo, así que no entra al deploy. Sigue en
  el `docker-compose.yml` de desarrollo, pero no hace falta.

Verificación después de desplegar (sustituir DOMINIO):

```bash
curl -sI https://DOMINIO | grep -iE 'HTTP|cache-control'
curl -s  https://DOMINIO/api/v1/health
curl -s  https://DOMINIO/tienda/ | grep -o '/tienda/assets/index-[^"]*\.js'
curl -s  https://DOMINIO/panel/  | grep -o '/panel/assets/index-[^"]*\.js'
# Ruta que sólo existe en esta app: detecta un proxy hacia el backend de otro stack
curl -s  https://DOMINIO/api/v1/textile/materials | head -c 80
```

## Pendientes menores

- **El material fotográfico está mal.** Dos productos (Chalina Vicuña, Bufanda
  Esencial) no tienen foto y usan el placeholder de marca. Peor: de las seis
  fotos que siembran la galería y las colecciones, una da 404
  (`photo-1528732263440-4d1a1a0a4e8f`, la del taller de Puno) y tres muestran
  algo que no es lo que dice su epígrafe —«Alpacas en el altiplano» es una
  cámara fotográfica y la colección de vicuña, una taza de café—. Los ids de
  Unsplash son arbitrarios y no se pueden deducir del tema, así que hay que
  reemplazarlas a mano por fotos reales del taller. Mientras tanto la
  institucional abre casi todas sus secciones con portada tipográfica.
- Stripe está integrado a nivel de modelo (`transactions`, `webhook_events`) pero el
  checkout todavía no cobra: registra el pedido como `pending`. Falta el
  PaymentIntent y el webhook.
- No hay tests unitarios del backend, solo el smoke test end-to-end.
- `passlib` emite un warning al leer la versión de `bcrypt` (incompatibilidad conocida
  entre passlib 1.7.4 y bcrypt 4.x). El hashing funciona; es solo ruido en el log.
