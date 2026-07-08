# ALPACART

Marca premium de alpaca peruana. Plataforma de comercio electrónico compuesta por tres frontends independientes.

## Proyectos

### Tienda (`frontend/tienda/`)
Ecommerce principal — 17 páginas (Home, Colecciones, Categorías, Producto, Carrito, Checkout, Pago, Cuenta, Favoritos, etc.)
- React 19 + Vite + CSS Modules
- Tema claro/oscuro con persistencia
- Localización completa al español

### Página Institucional (`frontend/pagina-institucional/`)
Sitio corporativo — 8 páginas (Inicio, Nosotros, Catálogo, Promociones, FAQ, Términos, Políticas, Contacto)
- React 19 + Vite + CSS Modules
- Tema claro/oscuro

### Dashboard (`frontend/dashboard/`)
Panel de administración
- React + Vite

## Inicio rápido

```bash
# Tienda
cd frontend/tienda
npm install
npm run dev        # http://localhost:3102

# Página Institucional
cd frontend/pagina-institucional
npm install
npm run dev        # http://localhost:3101

# Dashboard
cd frontend/dashboard
npm install
npm run dev
```

## Build

```bash
npm run build      # en cada frontend
```

## Stack
- React 19
- Vite 6
- CSS Modules
- JavaScript (sin TypeScript)
