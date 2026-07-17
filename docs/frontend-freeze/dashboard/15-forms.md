# Forms Audit

## Resumen
Los formularios existen en Login, ProductCreate, VariantCreate, ClientCreate, UserCreate, Settings y MyProfile. Todos utilizan estado local con `useState`. La validación es básica y del lado del cliente. No hay envíos reales a backend.

## Hallazgos
- Login: formulario con email/password, toggle de visibilidad, checkbox "Recordarme", simula error con setTimeout
- ProductCreate: formulario multi-step (4 tabs), tags input, upload de imágenes, switch auto-publish, variantes inline
- ClientCreate: formulario tabulado (6 tabs: General, Contacto, Dirección, Comercial, Notas, Configuración)
- UserCreate: formulario con secciones (Información Personal, Credenciales, Roles, Permisos)
- Settings: formulario bento grid con logo upload, campos de empresa, localización, notificaciones
- MyProfile: formulario con foto de perfil, campos de información, cambio de contraseña con validación de fortaleza
- VariantCreate: formulario para crear variantes con color, talla, precio, stock
- Componentes de formulario reutilizables: FormField, FormSection, FormGroup, FormWrapper, FormActions, ImageUploader
- Sin envío real: todos los submit usan preventDefault o simulan con setTimeout

## Score: 75/100
