# Dashboard — panel interno de Alpacart

React 19 + TypeScript + Vite, sin librería de UI ni de estado. Corre en el
puerto **3300**, que es el origen que el backend acepta en `CORS_ORIGINS`.

```bash
npm install
npm run dev      # http://localhost:3300
npm run build    # tsc -b + vite build
npm run lint     # oxlint
```

Necesita el backend en `http://localhost:8010/api/v1` (se cambia con
`VITE_API_URL`). Entrá con una cuenta de personal: `mateo.q@alpacart.com` /
`Admin123!`.

## Cómo está organizado

```
src/
  lib/api.ts          cliente HTTP: token, sobre { success, data }, errores
  lib/types.ts        tipos de la API
  lib/format.ts       Intl compartidos (moneda PEN, fechas, meses)
  lib/orderStatus.ts  etiquetas, colores y transiciones válidas de un pedido
  hooks/useResource   carga con abort + estados; useDebounced para buscadores
  providers/          Auth (staff), Theme (claro/oscuro), Toast
  components/ui/      Button, Field, DataTable, Drawer, ConfirmDialog, StatCard…
  components/charts/  SVG a mano: ventas por mes y ranking de productos
  components/layout/  Shell (sidebar + topbar), RequireAuth, PageHeader
  pages/              una pantalla por dominio
```

Decisiones que conviene conocer antes de tocar el código:

- **El token vive en `alpacart.admin.token`**, distinto del de la tienda, para
  que las dos sesiones convivan en el mismo navegador sin pisarse.
- **El orden de las tablas es local a la página visible.** La API pagina del
  lado del servidor y solo `/products` acepta `sort`; ordenar en cliente es
  honesto y no promete un orden global que el backend no da.
- **Los gráficos son de una sola serie**, así que no hay paleta categórica ni
  leyenda: un solo tono (`--chart-1`, definido en claro y oscuro) alcanza.
- **`Drawer` para formularios, `ConfirmDialog` para lo irreversible.** El panel
  lateral deja la tabla a la vista mientras editás.
- Los tokens de diseño (`src/styles/tokens.css`) son los mismos de la tienda.
  Todo color nuevo se declara en `:root` **y** en los dos bloques oscuros.
