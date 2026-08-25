# STORE CERTIFICATION — Performance

> **Métricas de rendimiento del frontend Tienda**

---

## Bundle

| Métrica | Valor |
|---------|-------|
| Módulos totales | 268 |
| Lazy loading | ✅ React.lazy + Suspense en rutas |
| Code splitting | ✅ Por página (27 rutas lazy) |
| Tree shaking | ✅ Vite nativo |

## Tiempos de Carga (esperado)

| Página | Tipo | Tiempo Esperado |
|--------|------|----------------|
| Home | Estático | < 100ms |
| Shop/Category | API + render | < 500ms |
| Product Detail | API + render | < 400ms |
| Cart | API + render | < 300ms |
| Checkout | API + render | < 300ms |
| Login | API + render | < 200ms |
| Orders | API + render | < 400ms |

## Potenciales Issues

| Issue | Estado | Acción |
|-------|--------|--------|
| N+1 queries | ⚠️ No verificado | Revisar consultas Sequelize |
| Request duplicados | ✅ Hooks con useCallback | Prevenido |
| Memory leaks | ⚠️ Sin AbortController en hooks | Mejora futura |
| Re-renders | ✅ Estado local en hooks | Controlado |

## Conclusión

Performance: ✅ Aceptable para MVP
