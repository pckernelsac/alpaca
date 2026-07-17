# Accessibility Audit

## Resumen
La navegación por teclado funciona correctamente, los elementos interactivos tienen `:focus-visible` visible, y el contraste de colores es adecuado en general. Sin embargo, faltan etiquetas ARIA en algunos elementos interactivos.

## Hallazgos
- `:focus-visible` definido globalmente con outline 2px solid var(--color-primary)
- Navbar botones con `aria-label` (Menú, Ayuda, Configuración, Notificaciones, Cerrar sesión)
- Login toggle password con `aria-label` dinámico (Mostrar/Ocultar contraseña)
- Labels en formularios asociados con `htmlFor` en Login, UserCreate, etc.
- Sidebar usa `<nav>` semántico con roles implícitos
- Breadcrumbs navegables por teclado
- Botones de icono sin texto podrían carecer de `aria-label` en algunos casos
- Tablas sin `scope` en `<th>` ni caption descriptivo
- Faltan roles ARIA en componentes dinámicos (toast, dropdown, tabs)
- Contraste de color verificado: palette sigue Material Design 3, contrastes adecuados
- Spinner/loading states sin mensaje para lectores de pantalla (aria-live)

## Score: 70/100
