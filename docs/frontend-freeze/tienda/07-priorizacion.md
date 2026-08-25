# Matriz de Priorización — ALPACART Tienda

## Resumen de clasificación

| Prioridad | Count | Description |
|-----------|-------|-------------|
| **P0** | 0 | Bloqueantes — impiden usar la app |
| **P1** | 6 | Críticos — datos incorrectos, features faltantes, páginas rotas |
| **P2** | 7 | Moderados — componentes sin usar, lógica incompleta |
| **P3** | 5 | Menores — refactor, datos mock no actualizados |

**Total:** 18 issues

## Tabla de priorización

| Prioridad | Problema | Impacto | Esfuerzo estimado |
|-----------|----------|---------|-------------------|
| P1 | Cart/Checkout data disconnect | Alto — el usuario pierde su carrito al llegar a checkout | Bajo (conectar store) |
| P1 | ProductDetail ignora route params | Alto — todas las rutas de producto muestran el mismo item | Bajo (usar useParams + data) |
| P1 | Register es placeholder | Alto — no se pueden crear cuentas | Medio (implementar formulario) |
| P1 | 9 orphan pages sin registrar | Alto — footer links rotos | Bajo (registrar rutas) |
| P1 | GuestRoute no usado | Medio — usuarios autenticados pueden acceder a login | Muy bajo (wrapper) |
| P1 | useFetch hook sin uso | Medio — toda la data es mock | Alto (conectar APIs) |
| P2 | setupInterceptors nunca llamado | Medio — auth tokens no fluyen | Muy bajo (llamar en App) |
| P2 | Breadcrumb infrautilizado | Bajo — inconsistencia de navegación | Bajo (agregar a páginas) |
| P2 | Pagination sin uso | Bajo — no hay paginación real | Medio (implementar en listas) |
| P2 | Skeleton sin uso | Bajo — no hay loading states | Medio (agregar a páginas) |
| P2 | Category filters hardcodeados | Bajo — duplicación de lógica | Bajo (usar Filters component) |
| P2 | SearchResults ignora query param | Medio — resultados no filtran | Bajo (filtrar por query) |
| P2 | Account muestra órdenes hardcodeadas | Medio — datos irreales | Alto (conectar API) |
| P3 | API infrastructure sin uso | Bajo — ya está lista | - |
| P3 | Checkout/Payment sampleItems duplicados | Bajo — código duplicado | Muy bajo (shared state) |
| P3 | Thanks datos hardcodeados | Bajo — pantalla post-compra mock | Medio (conectar con orden) |
| P3 | OrderConfirmed ref hardcodeada | Bajo — ref fija | Bajo (pasar por props/state) |
| P3 | OrderTracking ignora route param | Bajo — siempre mismo pedido | Bajo (usar useParams) |

## Porcentaje de completitud estimado

- **UI/screens:** 65% (20/30 páginas tienen contenido, 10 son placeholder)
- **Funcionalidad real:** ~20% (solo carrito, wishlist, login simulados)
- **Backend integration:** 0%
- **UX completeness:** ~40% (faltan loading states, error handling, feedback)
- **Overall:** ~60%

## Ready for freeze

**SÍ** — se puede congelar como snapshot de frontend. Todos los problemas están documentados. No se requieren fixes antes del freeze. El propósito de este freeze es capturar el estado actual para trabajar en paralelo en documentación, backend, o refactors.
