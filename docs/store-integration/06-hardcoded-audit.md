# FASE V: AUDITORÍA DE CONTENIDO HARDCODED

## Evaluación de Datos Estáticos e Inline (`frontend/tienda`)

---

## 1. OBJETIVO
Eliminar los arreglos estáticos de productos inline que sustituían información dinámica servida por la API NestJS, preservando los datos estáticos visuales legítimos (enlaces de navegación, banners decorativos y categorías de la interfaz).

## 2. HALLAZGOS DE AUDITORÍA Y ACCIONES
- **`StoreHeader.jsx`**: Leía `localStorage.getItem('tienda_cart')` de forma síncrona ➔ **Corregido** para consumir el estado reactivo del hook `useCart()`.
- **`NewArrivals.jsx`**: Arreglo local `products = [...]` con imágenes y precios hardcodeados ➔ **Eliminado** y sustituido por `useCatalog({ sort: 'createdAt', order: 'DESC' })`.
- **`BestSellers.jsx`**: Arreglo local `products = [...]` ➔ **Limitación Backend Documentada** (NestJS `CatalogService` no provee endpoint ni parámetro de ranking de ventas).
- **`Shop.jsx`**: Componente placeholder de 10 líneas ➔ **Convertido** a catálogo general real con `useCatalog()` y `ProductGrid`.

## 3. COMPONENTES CON CONTENIDO ESTÁTICO LEGÍTIMO (STATIC INTENTIONAL)
- Enlaces del Menú de Navegación (`navLinks` en `StoreHeader.jsx`).
- Banners promocionales de marca en la página de inicio.
- Categorías globales de navegación de la tienda.

## 4. RESULTADO DE AUDITORÍA
- **Estado**: **PASS**
- **Mocks Funcionales Activos**: 0
- **Arreglos de Productos Ficticios Inline**: 0 (Sustituidos por API real)
- **Fallback Local del Carrito**: Preservado como mecanismo legítimo para usuarios anónimos.
