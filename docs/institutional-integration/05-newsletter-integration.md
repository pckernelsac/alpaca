# FASE IV: INTEGRACIÓN DE NEWSLETTER

## Conexión del Formulario de Suscripción (`HomeNewsletter.jsx`)

---

## 1. OBJETIVO
Implementar el envío funcional del formulario de suscripción en `HomeNewsletter.jsx` hacia el backend real.

## 2. ARCHIVO AFECTADO
`frontend/pagina-institucional/src/pages/Home/sections/HomeNewsletter/HomeNewsletter.jsx`

## 3. CAMBIO REALIZADO
Se conectó el evento `onSubmit` del formulario al hook `useNewsletter()`, que invoca `newsletterService.subscribe(email, source)`.

```javascript
const { subscribe, loading, success, error: apiError, reset } = useNewsletter();

const handleSubmit = async (e) => {
  e.preventDefault();
  // Validaciones de email
  await subscribe(email.trim(), 'home_footer');
};
```

## 4. DETALLES DE RED & ENDPOINT
- **Endpoint Real**: `/newsletter/subscribe`
- **Request HTTP**: `POST /api/v1/newsletter/subscribe`
- **Payload**: `{ "email": "...", "source": "home_footer" }`
- **Respuesta Esperada**: `201 Created`

## 5. EVIDENCIA & RESULTADO
- **Estado**: **PASS**
- **Validaciones**: Se incluyeron comprobaciones de formato regex de email, estado de carga (`loading`), mensaje de confirmación de suscripción y reinicio de formulario.
