# shared-hooks — Placeholder

## Contenido

`packages/shared-hooks/src/` está actualmente **vacío**. Se creó como placeholder para alojar hooks personalizados compartidos entre frontends.

### Hooks identificados en dashboard para futura extracción

| Hook | Ubicación actual | Descripción |
|---|---|---|
| `useAuth` | dashboard | Autenticación, token, sesión |
| `useLocalStorage` | dashboard | Persistencia en localStorage |
| `useDebounce` | dashboard | Debounce para búsquedas |
| `useMediaQuery` | dashboard | Responsive por breakpoints |
| `useFetch` | dashboard | Data fetching con estados |
| `usePagination` | dashboard | Paginación de tablas |
| `useForm` | dashboard | Manejo de formularios |

### Criterios para extraer un hook

1. **Uso en al menos 2 frontends** — si solo lo usa dashboard, no se extrae
2. **No depende de lógica de negocio específica** — debe ser genérico
3. **Tiene tipos definidos** — preferiblemente usando `shared-types`

### Prioridad sugerida

1. `useDebounce` — simple, sin dependencias externas
2. `useLocalStorage` — utilidad pura, reemplaza lógica inline
3. `useMediaQuery` — útil para los 3 frontends (responsivo)
4. `useAuth` — requiere refactor por diferencia en manejo de sesiones

## Score: —/100

Sin puntuación por ser un placeholder sin hooks implementados.
