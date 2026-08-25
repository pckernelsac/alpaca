import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { serviceProvider } from '@/providers/ServiceProvider';
import styles from './Payment.module.css';

const stripePk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = stripePk ? loadStripe(stripePk) : null;

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dataRaw = searchParams.get('data');
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (dataRaw) {
      try { setCheckoutData(JSON.parse(decodeURIComponent(dataRaw))); } catch { setError('Error al cargar datos del checkout'); }
    } else {
      setError('No hay datos del checkout. Volvé al carrito.');
    }
  }, [dataRaw]);

  const total = checkoutData?.total || 0;

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !checkoutData) return;
    setPaying(true);
    setError('');
    try {
      const intentResult = await serviceProvider.payments.createIntent(checkoutData);
      const clientSecret = intentResult?.clientSecret || intentResult?.client_secret;
      if (!clientSecret) { setError('Error al crear el pago'); setPaying(false); return; }

      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (confirmError) {
        setError(confirmError.message || 'Pago rechazado. Probá con otra tarjeta.');
      } else {
        setDone(true);
        setTimeout(() => navigate('/order/confirmed'), 3000);
      }
    } catch (err) {
      setError(err.message || 'Error al procesar el pago');
    }
    setPaying(false);
  };

  if (!stripePk) return <div className={styles.wrapper}><p>Stripe no configurado. Agregá VITE_STRIPE_PUBLISHABLE_KEY en .env.</p></div>;
  if (done) return <div className={styles.wrapper}><h2>¡Pago exitoso!</h2><p>Redirigiendo...</p></div>;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Pagar</h1>
      <p style={{ color: '#555', marginBottom: 8 }}>Total: S/ {total.toFixed(2)}</p>
      {error && <p style={{ color: '#c00', fontSize: '0.85rem', marginBottom: 12 }}>{error}</p>}
      {!checkoutData && !error && <p>Cargando...</p>}
      {checkoutData && (
        <form onSubmit={handlePay} className={styles.form}>
          <div className={styles.cardField}>
            <label className={styles.label}>Tarjeta</label>
            <CardElement className={styles.input} options={{ style: { base: { fontSize: '16px', color: '#333' } } }} />
          </div>
          <button type="submit" disabled={!stripe || paying} className={styles.btn}>
            {paying ? 'PROCESANDO...' : `Pagar S/ ${total.toFixed(2)}`}
          </button>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: 12, textAlign: 'center' }}>
            Prueba: 4242 4242 4242 4242 — Exp: 12/34 — CVC: 123
          </p>
        </form>
      )}
      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: 12, textAlign: 'center' }}>
        Tarjeta rechazada: 4000 0000 0000 0002 — Fondos: 4000 0000 0000 9995
      </p>
    </div>
  );
}

export default function Payment() {
  if (!stripePromise) return <div className={styles.wrapper}><h2>Stripe no configurado</h2><p>Agregá VITE_STRIPE_PUBLISHABLE_KEY en frontend/tienda/.env.development</p></div>;
  return <Elements stripe={stripePromise}><PaymentForm /></Elements>;
}
