# shared-assets — Extracción Futura

## Contenido

No existe un paquete `packages/shared-assets/` aún. Los assets estáticos (logo, SVGs, iconos) están actualmente duplicados en los 3 frontends.

### Situación actual

| Asset | dashboard | tienda | institucional |
|---|---|---|---|
| Logo Alpacart | ✅ propio | ✅ propio | ✅ propio |
| Iconos (SVG inline) | ✅ mix | ✅ mix | ✅ mix |
| Favicon | ✅ | ✅ | ✅ |
| Imágenes de placeholder | ✅ | ✅ | ✅ |
| Fuentes | ✅ Google Fonts | ✅ Google Fonts | ✅ Google Fonts |

### Problemas

1. **Duplicación**: el logo de Alpacart existe en 3 resoluciones distintas en cada frontend
2. **Inconsistencia**: ligeras variaciones en color, tamaño y formato entre frontends
3. **Mantenimiento**: cambiar el logo requiere modificar 3 carpetas
4. **Sin CDN gestionado**: todos los assets se sirven desde el bundler local

### Plan de extracción (post-R7)

```
Fase 1: Crear packages/shared-assets/
Fase 2: Mover logo, favicon y SVG comunes
Fase 3: Configurar build con copy task
Fase 4: Opcional — migrar a CDN (Cloudinary / S3 + CloudFront)
```

### Assets candidatos a compartir

- `LogoAlpacart.svg` — logo principal
- `LogoAlpacart-iso.svg` — isotipo (versión reducida)
- `favicon.ico` / `favicon.svg`
- Iconos de redes sociales (Facebook, Instagram, LinkedIn, TikTok)
- Iconos de medios de pago (Visa, Mastercard, PayPal, Yape, Plin)
- Flags de idioma (ES, EN)
- Placeholder `product-placeholder.svg`

## Score: —/100

Sin puntuación por ser un paquete no implementado (extracción futura).
