# FASE IV: CONVERSIÓN DEL CATÁLOGO DE TIENDA (`/shop`)

## Migración de la Vista `/shop` a Catálogo General Real

---

## 1. OBJETIVO
Reemplazar la vista placeholder estática `Shop.jsx` por una interfaz funcional de catálogo general conectada a la API NestJS.

## 2. ARCHIVO AFECTADO
`frontend/tienda/src/pages/Shop/Shop.jsx`

## 3. CAMBIO REALIZADO
Se reescribió `Shop.jsx` reutilizando el hook `useCatalog()`, el componente `ProductGrid` y los controles de paginación existentes.

```javascript
const { products, loading, error, fetch } = useCatalog();

useEffect(() => {
  fetch({ page, perPage: 12 });
}, [fetch, page]);
```

## 4. DETALLES DE RED & ENDPOINT
- **Endpoint Real**: `/products`
- **Request HTTP**: `GET /api/v1/products?page=1&perPage=12`
- **Respuesta Backend**: Lista de productos reales con DTO DTO `{ id, name, price, variants, media }`.

## 5. EVIDENCIA & RESULTADO
- **Estado**: **PASS**
- **Interacciones Habilitadas**: Añadir al carrito (`addToCart`), cambiar favoritos (`toggleWishlist`), navegación paginada y estados de carga (`loading`).
