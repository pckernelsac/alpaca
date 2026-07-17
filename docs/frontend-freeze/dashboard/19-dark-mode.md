# Dark Mode Audit

## Resumen
Dark mode implementado vía ThemeContext con persistencia en localStorage y detección de preferencia del sistema. Se aplica mediante el atributo `data-theme` en `<html>`. Todos los componentes usan CSS variables, por lo que el cambio de tema es inmediato. No hay flash de contenido.

## Hallazgos
- ThemeContext.jsx: `createContext` + `ThemeProvider` con estado desde `useLocalStorage`
- Clave en localStorage: `app_theme` (definida en constants)
- `document.documentElement.setAttribute('data-theme', theme)` en useEffect para aplicar el tema
- `toggleTheme` con useCallback alterna entre 'light' y 'dark'
- Variables CSS para modo oscuro deben definirse con `[data-theme="dark"]` (pendiente verificar cobertura completa)
- Sin flash porque el estado se lee de localStorage antes del primer render
- Todos los colores de componentes referencian variables CSS, no valores hardcodeados
- Integración en AppProvider: ThemeProvider es el provider más externo
- Faltan verificar algunas páginas con colores hardcodeados (Login.card usa `#ffffff` y `#E5D8C7` directos)
- UIContext y demás providers independientes del tema

## Score: 95/100
