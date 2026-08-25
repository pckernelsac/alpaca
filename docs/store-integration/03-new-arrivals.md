# FASE II: INTEGRACIÓN DE NUEVOS LANZAMIENTOS

## Conexión Real de `NewArrivals.jsx`

---

## 1. OBJETIVO
Eliminar el arreglo de productos estáticos inline en `NewArrivals.jsx` y conectarlo con la API NestJS `GET /api/v1/products`.

## 2. ARCHIVO AFECTADO
`frontend/tienda/src/pages/Home/sections/NewArrivals/NewArrivals.jsx`

## 3. CAMBIO REALIZADO
Se migró `NewArrivals.jsx` para utilizar `useCatalog()`, solicitando la ordenación por fecha de creación descendente (`sort: 'createdAt', order: 'DESC'`).

```javascript
const { products, loading, error, fetch } = useCatalog();

useEffect(() => {
  fetch({ sort: 'createdAt', order: 'DESC', perPage: 6 });
}, [fetch]);
```

## 4. DETALLES DE RED & ENDPOINT
- **Endpoint Real**: `/products`
- **Parámetros**: `sort=createdAt&order=DESC&perPage=6`
- **Request HTTP**: `GET /api/v1/products?sort=createdAt&order=DESC&perPage=6`

## 5. EVIDENCIA & RESULTADO
- **Estado**: **PASS**
- **Manejo de Estados UI**: Implementados estados de carga, error, colección vacía y renderizado dinámico de tarjetas de producto reales con sus correspondientes variantes de precio e imagen.
