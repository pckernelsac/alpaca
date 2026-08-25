# PLAN DE CORRECCIÓN E INTEGRACIÓN — FRONTEND TIENDA

## ALPACART — STOREFRONT CORRECTION PLAN

---

## 1. OBJETIVO DEL PLAN

Corregir únicamente los desacoples y componentes hardcodeados en el **Frontend Tienda** (`frontend/tienda`), garantizando que la UI consuma las APIs reales NestJS sin alterar la infraestructura ni los fallbacks locales legítimos.

---

## 2. ESTRUCTURA DE FASES

1. **FASE I — CARRITO / HEADER (`StoreHeader.jsx`)**: Eliminación de `localStorage.getItem('tienda_cart')` directo para el badge. Uso del estado reactivo de `useCart`.
2. **FASE II — NEW ARRIVALS (`NewArrivals.jsx`)**: Sustitución del arreglo local por `useCatalog` (`GET /api/v1/products?sort=createdAt`).
3. **FASE III — BEST SELLERS (`BestSellers.jsx`)**: Auditoría de capacidades backend. Comprobado que NestJS no tiene ranking/bestseller sort. Documentación de limitación sin inventar endpoints ficticios.
4. **FASE IV — SHOP (`Shop.jsx`)**: Conversión de la vista placeholder en catálogo general reutilizando `useCatalog` y `ProductGrid`.
5. **FASE V — AUDITORÍA DE HARDCODED**: Eliminación de arreglos sustitutos de datos dinámicos.
6. **FASE VI — REGRESSION TEST**: Prueba completa de las 28 rutas de la Tienda.
7. **FASE VII — AUDITORÍA FINAL & RUNTIME**: Verificación de compilación, red HTTP y servidor NestJS.
