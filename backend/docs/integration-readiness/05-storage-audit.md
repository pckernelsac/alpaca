# IRC-01: Storage Audit — MinIO / S3

## Current Setup

- **Provider**: AWS SDK v3 (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
- **Endpoint**: `http://localhost:9000` (dev) → MinIO
- **Buckets**:
  - `alpacart-public` — Imagenes de productos, CMS y assets publicos
  - `alpacart-private` — Documentos, reportes, archivos privados
- **Module**: `src/storage/` — `StorageModule`, `StorageService`

## Capabilities

| Funcionalidad | Status | Notas |
|--------------|--------|-------|
| Upload de archivos | Implementado | MulterModule configurado |
| Presigned URLs | Parcial | SDK importado, uso parcial |
| Bucket publico/privado | Implementado | Separacion por bucket |
| CDN / CloudFront | No configurado | Pendiente para produccion |
| Image optimization (sharp) | Instalado | `sharp` en dependencias |
| File type validation | No implementado | Falta validacion MIME |
| File size limits | No implementado | Falta configuracion de limites |
| Backup / replication | No configurado | Manual |

## Production Readiness

- [ ] Migrar de MinIO a S3 (AWS S3 o compatible: DO Spaces, Cloudflare R2)
- [ ] Configurar CDN (CloudFront) para bucket publico
- [ ] Implementar validacion de tipo de archivo (MIME) en upload
- [ ] Implementar limites de tamaño por archivo
- [ ] Agregar politicas de CORS en bucket
- [ ] Configurar lifecycle policies (expirar archivos temporales)
- [ ] Implementar backup automatico de bucket privado
- [ ] Agregar logging de acceso a storage

## Dependencies

```json
"@aws-sdk/client-s3": "^3.1085.0",
"@aws-sdk/s3-request-presigner": "^3.1085.0",
"sharp": "^0.35.3"
```

## Environment Variables

```
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
STORAGE_PUBLIC_BUCKET=alpacart-public
STORAGE_PRIVATE_BUCKET=alpacart-private
```
