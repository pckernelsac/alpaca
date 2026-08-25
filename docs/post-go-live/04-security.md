# Post Go-Live — Security

> **Monitoreo de seguridad**

---

## Métricas de Seguridad

| Métrica | Frecuencia | Alerta | Umbral |
|---------|-----------|--------|--------|
| Intentos fallidos login | Tiempo real | P2 | >5/min por IP |
| Rate limiting activado | Tiempo real | P2 | >20/min total |
| JWT inválidos | Por hora | P3 | >10/h |
| Errores 401/403 | Tiempo real | P2 | >50/min |
| Webhook fallidos | Tiempo real | P1 | 3 consecutivos |
| Usuarios bloqueados | Diario | P3 | Nuevos bloqueos |

## Eventos de Auditoría

```sql
-- Últimos eventos de seguridad
SELECT created_at, user_id, action, module, description, severity
FROM audit_logs
WHERE severity IN ('warning', 'error')
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

## Rate Limiting

| Perfil | Límite | TTL | Uso Actual |
|--------|--------|-----|-----------|
| short | 3 req | 1s | Login, register, contact |
| medium | 20 req | 10s | Checkout, creación recursos |
| long | 100 req | 60s | Lectura general |

## Checklist Diario

- [ ] Revisar logs de auditoría
- [ ] Verificar rate limiting no bloquea tráfico legítimo
- [ ] Verificar JWT expiraciones
- [ ] Verificar webhooks Stripe
- [ ] Revisar intentos de acceso no autorizado
- [ ] Verificar CORS funciona correctamente
