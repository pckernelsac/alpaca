# Institucional — la web pública de Alpacart

React 19 + TypeScript + Vite, sin librería de UI ni de estado. Corre en el
puerto **3101**, que es el origen histórico de esta app y uno de los que el
backend acepta en `CORS_ORIGINS`.

```bash
npm install
npm run dev      # http://localhost:3101
npm run build    # tsc -b + vite build
npm run lint     # oxlint
```

Necesita el backend en `http://localhost:8010/api/v1` (se cambia con
`VITE_API_URL`). No tiene sesión ni carrito: **no vende**. Todo lo que es
comprar sale a la tienda, que vive en otro origen (`VITE_TIENDA_URL`, por
defecto `http://localhost:3200`).

## Rutas

| Ruta | Qué muestra | De dónde sale |
|---|---|---|
| `/` | hero, beneficios, colecciones, vitrina, proceso, galería y testimonios | CMS + catálogo |
| `/nosotros` | la historia de la casa y los tres compromisos | `/contents/nosotros` |
| `/colecciones` | una fila por colección y, en `#fibras`, el catálogo textil | `/collections`, `/textile/materials` |
| `/proceso` | los ocho pasos del taller, en línea de tiempo | `/cms/processes` |
| `/sostenibilidad` | el texto editable más cinco compromisos | `/contents/sostenibilidad` |
| `/servicios` | qué incluye una compra y qué se ofrece a marcas | fijo en el código |
| `/diario` · `/diario/:slug` | notas publicadas y su detalle | `/contents?type=post` |
| `/preguntas` | FAQ por categoría, con índice al costado | `/faq` |
| `/contacto` | formulario y ficha de la casa | `POST /contact` |
| `/envios` · `/devoluciones` · `/terminos` · `/privacidad` | páginas de texto | `/contents/{slug}` |

Las cuatro últimas son el mismo componente con otro slug: el texto lo escribe
el equipo desde el panel y cambiarlo no debería pedir un despliegue.

## Cómo está organizado

```
src/
  lib/api.ts        cliente HTTP de sólo lectura: sobre { success, data } y errores
  lib/types.ts      tipos de la API
  lib/empresa.ts    dirección, teléfono y horario (el endpoint real exige staff)
  lib/fotos.ts      las dos portadas fotográficas que se pueden usar
  hooks/useResource carga con abort y estados; useCms envuelve cada recurso
  hooks/useReveal   aparición al entrar en pantalla
  providers/        Theme (claro/oscuro) y Toast
  components/ui/    Button, Field, Icon, Primitives — los mismos de la tienda
  components/site/  PageHero, SectionHeading, Prose, Figura, PiezaCard, Newsletter
  components/layout Header, Footer, ScrollToTop
  pages/            una por ruta; Pagina.module.css tiene los bloques comunes
```

Lo que conviene saber antes de tocarlo:

- **No hay `AuthProvider` ni carrito, y es a propósito.** El cliente HTTP es una
  versión recortada del de la tienda: sin token, sin cabecera `Authorization` y
  sin manejo de 401.
- **`useReveal` observa el DOM, no sólo el primer render.** Media portada son
  secciones que piden sus propios datos y entran al árbol después de que la
  página montó; sin el `MutationObserver` se quedaban en opacidad 0 para
  siempre.
- **Los saltos de scroll van con `behavior: 'instant'`.** La hoja base declara
  `scroll-behavior: smooth`, y sin eso cada cambio de ruta arranca una
  animación que el propio contenido cancela: no se movía nada.
- **La franja invertida (newsletter, «El oficio», cierre de Servicios) cambia de
  lado con el tema:** en claro es carbón, en oscuro es crema. Su texto
  secundario, su acento y su línea usan `--text-inverse-secondary`,
  `--accent-on-inverse` y `--border-on-inverse`; un tono fijo de la escala
  quedaba ilegible en uno de los dos temas.
- **Las fotos del CMS no siempre son lo que dice su epígrafe.** La rotulada
  «Alpacas en el altiplano» es una cámara fotográfica, la de la colección de
  vicuña es una taza de café y la del taller directamente da 404. Por eso casi
  todas las portadas son tipográficas y `Figura` cae en el monograma de marca
  cuando la imagen falla. Ver `lib/fotos.ts`.
- **El texto de la interfaz está en español rioplatense**, como el resto del
  proyecto. Mantenerlo.
- Los tokens de diseño (`src/styles/tokens.css`) son los mismos de la tienda y
  del panel. Todo color nuevo se declara en `:root` **y** en los dos bloques
  oscuros.
