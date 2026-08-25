# FASE II: INTEGRACIÓN DE GALERÍA DE IMÁGENES

## Conexión Real de Galería (`HomeGallery.jsx`)

---

## 1. OBJETIVO
Reemplazar el arreglo hardcodeado de URLs estáticas en `HomeGallery.jsx` por una consulta dinámica a la API NestJS mediante la arquitectura de hooks y mappers.

## 2. ARCHIVO AFECTADO
`frontend/pagina-institucional/src/pages/Home/sections/HomeGallery/HomeGallery.jsx`

## 3. CAMBIO REALIZADO
Se conectó `HomeGallery.jsx` al hook `useGallery()` que invoca `serviceProvider.cms.getGallery()`, aplicando el mapper `mapGallery` a la respuesta del servidor.

```javascript
const { images, loading, error, fetch } = useGallery();

useEffect(() => {
  fetch();
}, [fetch]);
```

## 4. DETALLES DE RED & ENDPOINT
- **Endpoint Real**: `/gallery`
- **Request HTTP**: `GET /api/v1/gallery`
- **Response esperado**: Lista JSON de imágenes con DTO `{ id, url, altText, caption, order, visible }`.

## 5. EVIDENCIA & RESULTADO
- **Estado**: **PASS**
- **Manejo de Estados UI**: Implementados indicadores de carga (`loading`), mensaje de error (`error`) y contenedor de galería sin elementos ficticios.
