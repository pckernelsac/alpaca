# Dark Mode — ALPACART Tienda

## Implementación

### ThemeContext (`src/context/ThemeContext.jsx`)
- Provider que expone: `theme`, `setTheme`, `toggleTheme`
- Persistencia en `localStorage` con clave `app_theme` (constante `THEME_KEY`)
- Detección de preferencia del sistema vía `window.matchMedia('(prefers-color-scheme: dark)')`
- Sincronización con cambios en vivo del sistema (`change` listener en media query)
- Si el usuario ha almacenado un tema explícito, no sobreescribe con cambios del sistema
- Aplica el tema seteando `data-theme` en `<html>`

### Flash prevention (`index.html`)
- Script inline en `<head>` que ejecuta antes del render:
  - Lee `localStorage.getItem('app_theme')`
  - Si no hay, usa `prefers-color-scheme: dark`
  - Setea `document.documentElement.setAttribute('data-theme', theme)`
- Esto evita el flash de white screen al cargar en modo oscuro

### ThemeToggle (`src/components/common/ThemeToggle/`)
- Botón que llama a `toggleTheme()`
- Integrado en StoreHeader

### Estilos
- CSS custom properties con dos conjuntos de valores (light/dark)
- `[data-theme="dark"]` selectors en el CSS global
- Consistente en todas las páginas (todas heredan del `data-theme` en html)

## Evaluación
- **Funciona correctamente** en toda la aplicación
- Persistencia entre sesiones
- Respeta preferencia del sistema
- Sin flicker en carga inicial
- Sin problemas de contraste evidentes
- Migración completa y consistente
