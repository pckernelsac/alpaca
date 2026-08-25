# Dashboard — Estructura

## Layout
```
┌─────────────────────────────────────┐
│ Sidebar (navegación)                │
├─────────────────────────────────────┤
│ Topbar (usuario, notificaciones)     │
├─────────────────────────────────────┤
│ Breadcrumb                           │
├─────────────────────────────────────┤
│ Content (Outlet - página activa)     │
├─────────────────────────────────────┤
│ Footer (opcional)                    │
└─────────────────────────────────────┘
```

## Árbol de directorios
```
src/
├── pages/          (42 páginas)
├── components/     
│   ├── common/     (Button, Card, Input, Modal, Select...)
│   ├── data/       (tablas, tarjetas)
│   ├── feedback/   (ErrorBoundary, Loader, Spinner, Toast)
│   ├── forms/      (FormActions, FormField, FormSection, ImageUploader)
│   ├── layout/     (Sidebar, Navbar, ContentSection, PageHeader)
│   ├── metrics/    (KPIs, tarjetas)
│   └── ui/         (Alert, Dropdown, Switch, Tabs)
├── context/        (AuthContext, ThemeContext, UIContext)
├── guards/         (ProtectedRoute)
├── hooks/          (useAuth, useLocalStorage, useClickOutside)
├── routes/         (AppRouter, routes - 40+ rutas)
├── services/       (storage - localStorage wrapper)
├── styles/         (global.css, variables.css)
└── preview/        (PreviewProvider - nuevo)
```
