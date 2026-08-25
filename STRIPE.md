# Stripe — Configuración Local

## 1. Crear cuenta Stripe (si no tenés)

1. Andá a https://dashboard.stripe.com/register
2. Registrate con tu email
3. Completá los datos básicos (país, nombre)
4. No necesitás activar el modo producción — usamos modo test   

## 2. Obtener API Keys

1. Andá a https://dashboard.stripe.com/test/apikeys
2. Ahí vas a ver dos claves:

| Clave | Valor (ejemplo) |
|-------|----------------|
| **Secret key** (ya la tenés) | `sk_test_51TdyhJ...` |
| **Publishable key** (la que falta) | `pk_test_51TdyhJ...` |

3. Copiá la **Publishable key** (empieza con `pk_test_`)

## 3. Agregar la clave al frontend

En `frontend/tienda/.env.development` agregá:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51TdyhJ3RwG6LoZiceA...
```

Reemplazá con tu publishable key real.

## 4. (Opcional) Webhook para desarrollo local

Para probar webhooks localmente necesitás Stripe CLI:

```bash
# Instalar Stripe CLI
# Windows: https://github.com/stripe/stripe-cli/releases

# Iniciar forwarding
stripe listen --forward-to localhost:8000/api/v1/stripe/webhook

# Copiar el webhook signing secret (whsec_...) que aparece
# Stripe CLI te muestra algo como:
# > Ready! Your webhook signing secret is whsec_xxxxxxxx...

# Si usás Stripe CLI, actualizá STRIPE_WEBHOOK_SECRET en .env
```

## 5. Verificar que está funcionando

```bash
cd backend
npm run build
npm start
```

Después, en el checkout de la tienda debería aparecer la opción de pago con tarjeta.

## 6. Tarjeta de prueba

Para pagar en modo test, usá:

| Campo | Valor |
|-------|-------|
| Número | `4242 4242 4242 4242` |
| Expiración | `12/34` |
| CVC | `123` |
| CP | `12345` |


Tarjetas de prueba Stripe
Situación	Número	Resultado
Exitosa	4242 4242 4242 4242	Pago ok
Rechazada	4000 0000 0000 0002	Tarjeta rechazada
Fondos insuficientes	4000 0000 0000 9995	Declinada
Sin autenticación	4000 0025 0000 3155	Requiere 3D Secur
