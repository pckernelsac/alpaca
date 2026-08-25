# Security Hardening

> **Medidas de seguridad para producción**

---

## Implementado

| Medida | Estado | Notas |
|--------|--------|-------|
| JWT HMAC SHA-256 | ✅ | Secret en .env |
| Helmet HTTP headers | ✅ | CSP, X-Frame, HSTS |
| CORS orígenes específicos | ✅ | 5173, 3101, 3102 |
| Rate limiting (3 perfiles) | ✅ | Redis + fail-open |
| ValidationPipe whitelist | ✅ | Elimina campos no esperados |
| Stripe webhook verification | ✅ | Firma HMAC |
| Idempotency keys | ✅ | UNIQUE + findOrCreate |
| Password bcrypt hashing | ✅ | 10 rounds |
| ActorGuard global | ✅ | StaffOnly/CustomerOnly decorators |
| ThrottlerGuard global | ✅ | APP_GUARD |

## Pendiente para Producción

| Medida | Prioridad | Ticket |
|--------|-----------|--------|
| Refresh Token | P2 | NON-BLOCKING |
| Forgot/Reset Password | P2 | NON-BLOCKING |
| JWT rotation | P3 | — |
| MFA para staff | P4 | — |
| Rate limit por endpoint | P2 | @Throttle() decorators |
| API keys para integraciones | P3 | — |
| WAF (Cloudflare/AWS) | P3 | — |
| Secrets rotation | P2 | — |

## Checklist Producción

- [ ] JWT_SECRET rotado antes de producción
- [ ] STRIPE_SECRET_KEY y STRIPE_WEBHOOK_SECRET configurados
- [ ] CORS orígenes actualizados con dominios reales
- [ ] Helmet CSP configurado para assets CDN
- [ ] Rate limiting ajustado por perfil de tráfico
- [ ] Password minimum length: 8 (actual: 6)
