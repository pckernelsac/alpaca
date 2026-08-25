# AUDITORÍA DE MOCKS — TIENDA

## Inventario de Mocks y Datos Simulados

Se buscó exhaustivamente la presencia de archivos `mock`, `fixtures`, JSONs locales de productos, carritos simulados u objetos hardcodeados en la Tienda.

---

## Hallazgos de Mocks

| Archivo / Componente | Tipo de Mock | Ubicación | Impacto / Estado |
|----------------------|--------------|-----------|------------------|
| `NewArrivals.jsx` | Array Inline Hardcoded | `src/pages/Home/sections/NewArrivals/NewArrivals.jsx` | **MOCK**: 4 productos hardcodeados con URLs externas de Google UserContent en el carrusel de Home. |
| `BestSellers.jsx` | Array Inline Hardcoded | `src/pages/Home/sections/BestSellers/BestSellers.jsx` | **MOCK**: 4 productos hardcodeados en la sección de más vendidos de Home. |
| `Shop.jsx` | Componente Placeholder | `src/pages/Shop/Shop.jsx` | **HARDCODED / PLACEHOLDER**: Retorna sólo `<h1>Tienda</h1>` sin conexión API. |

---

## Ausencia de Mock Repositories
A diferencia del Dashboard o Frontend Institucional, la Tienda **no posee una carpeta `src/repositories/mock` ni flags de simulación `VITE_USE_MOCK`**. Todos los servicios y repositorios están cableados directamente a las llamadas Axios reales.
