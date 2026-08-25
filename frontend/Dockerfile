# Frontend ALPACART — las tres aplicaciones en una sola imagen.
#
# Comparten dominio y se separan por ruta (/ institucional, /tienda, /panel),
# asi que tiene mas sentido un nginx que las sirva a las tres que tres
# contenedores identicos peleandose el mismo host en Traefik. Ademas ese nginx
# es el que proxea /api/v1 al backend, y por eso las apps hablan contra su
# propio origen y no hay CORS de por medio.
#
# Cada app se compila en su propia etapa: si tocas la tienda, las etapas de la
# institucional y del panel salen de cache.

# --- institucional ----------------------------------------------------------
FROM node:22-alpine AS build-institucional
WORKDIR /app
COPY institucional/package.json institucional/package-lock.json ./
RUN npm ci
COPY institucional/ ./
RUN npm run build

# --- tienda -----------------------------------------------------------------
FROM node:22-alpine AS build-tienda
WORKDIR /app
COPY tienda/package.json tienda/package-lock.json ./
RUN npm ci
COPY tienda/ ./
RUN npm run build

# --- panel ------------------------------------------------------------------
FROM node:22-alpine AS build-panel
WORKDIR /app
COPY dashboard/package.json dashboard/package-lock.json ./
RUN npm ci
COPY dashboard/ ./
RUN npm run build

# --- servidor ---------------------------------------------------------------
FROM nginx:1.27-alpine

# El orden importa poco, pero la institucional va primero porque es la que
# ocupa la raiz; las otras dos cuelgan de subcarpetas con el mismo nombre que
# su prefijo, que es lo que hace que el try_files de nginx sea trivial.
COPY --from=build-institucional /app/dist/ /usr/share/nginx/html/
COPY --from=build-tienda        /app/dist/ /usr/share/nginx/html/tienda/
COPY --from=build-panel         /app/dist/ /usr/share/nginx/html/panel/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1
