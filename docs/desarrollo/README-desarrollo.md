# Guía de Desarrollo — ALPACART

## Requisitos

- Node.js 18+
- npm 9+

## Proyectos activos

Actualmente existen **2 frontends** operativos:

1. **Tienda** — Ecommerce principal (puerto 3102)
2. **Página Institucional** — Sitio corporativo (puerto 3101)

## Levantar los proyectos

### 1. Tienda

```bash
cd frontend/tienda
npm install
npm run dev
```

Abrir en el navegador: `http://localhost:3102`

### 2. Página Institucional

```bash
cd frontend/pagina-institucional
npm install
npm run dev
```

Abrir en el navegador: `http://localhost:3101`

## Build de producción

```bash
# En cada frontend:
npm run build
```

El output se genera en la carpeta `dist/` de cada proyecto.

## Stack

| Frontend | React | Vite | CSS | Puerto |
|---|---|---|---|---|
| Tienda | 19 | 6 | CSS Modules | 3102 |
| Página Institucional | 19 | 6 | CSS Modules | 3101 |

## Variables de entorno

Cada proyecto tiene archivos `.env.development` y `.env.production` en su raíz.

## Dashboard

`frontend/dashboard/` es un proyecto separado (panel administrativo). No tiene conexión directa con la tienda o la página institucional.
