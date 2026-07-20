import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useCheckout, useAddresses } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import { serviceProvider } from '@/providers/ServiceProvider';
import CheckoutStepper from '@/components/ecommerce/CheckoutStepper/CheckoutStepper';
import OrderSummary from '@/components/ecommerce/OrderSummary/OrderSummary';
import styles from './Checkout.module.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, fetch } = useCart();
  const { placeOrder, loading, error: checkoutError } = useCheckout();
  const { addresses, fetch: fetchAddresses } = useAddresses();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: user?.email || '', phone: user?.phone || '', name: user?.firstName ? (user.firstName + ' ' + (user.lastName || '')).trim() : user?.name || '', street: '', city: '', country: 'Perú' });

  useEffect(() => { fetch(); if (isAuthenticated) fetchAddresses(); }, []);

  useEffect(() => {
    if (isAuthenticated && addresses.length > 0) {
      const def = addresses.find(a => a.isDefault) || addresses[0];
      setForm(prev => ({
        ...prev,
        name: prev.name || def.name || '',
        street: prev.street || def.street || '',
        city: prev.city || def.city || '',
        country: prev.country || def.country || 'Perú',
      }));
    }
  }, [addresses, isAuthenticated]);

  const subtotal = items.reduce((s, i) => s + (i.price || i.unitPrice || 0) * (i.quantity || 1), 0);

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center', padding: '0 20px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 56, color: '#ccc' }}>shopping_cart</span>
        <h2 style={{ margin: '16px 0 8px', color: '#555', fontWeight: 400 }}>Tu carrito está vacío</h2>
        <button onClick={() => navigate('/')} className={styles.backBtn}>Seguir comprando</button>
      </div>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const validEmail = form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const validStep2 = form.name && form.street;

  const handlePay = async () => {
    try {
      const checkoutResult = await placeOrder({}, crypto.randomUUID());
      if (!checkoutResult?.valid) throw new Error('Error al validar el carrito');
      const items = checkoutResult.items || [];
      if (items.length === 0) throw new Error('El carrito está vacío');
      navigate('/order/payment?data=' + encodeURIComponent(JSON.stringify({
        items: checkoutResult.items, customerId: checkoutResult.customerId,
        subtotal: checkoutResult.subtotal, discount: checkoutResult.discount,
        total: checkoutResult.total, currency: checkoutResult.currency, couponId: checkoutResult.couponId,
      })));
    } catch (err) {
      setError(err.message || 'Error al procesar el pago');
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
      <CheckoutStepper currentStep={step} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, marginTop: 24 }}>
        <div>
          {step === 1 && (
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: 16 }}>Información de contacto</h2>
              <Field label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@correo.com" />
              <Field label="Teléfono (opcional)" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+51 999 888 777" />
              <button className={styles.continueBtn} onClick={() => setStep(2)} disabled={!validEmail}>Continuar</button>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: 16 }}>Dirección de envío</h2>
              <Field label="Nombre completo" name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" />
              <Field label="Dirección" name="street" value={form.street} onChange={handleChange} placeholder="Av. Principal 123" />
              <Field label="Ciudad" name="city" value={form.city} onChange={handleChange} placeholder="Lima" />
              <Field label="País" name="country" value={form.country} onChange={handleChange} placeholder="Perú" />
              <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                <button className={styles.backBtn} onClick={() => setStep(1)}>← Volver</button>
                <button className={styles.continueBtn} onClick={() => setStep(3)} disabled={!validStep2}>Continuar</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: 16 }}>Revisa tu pedido</h2>
              <div style={{ background: '#f9f6f0', padding: 20, borderRadius: 8, border: '1px solid #e0d5c1', marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #e0d5c1' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Contacto</p>
                    <p style={{ color: '#555' }}>{form.email}</p>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#8B4513', cursor: 'pointer' }} onClick={() => setStep(1)}>Editar</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Envío a</p>
                    <p style={{ color: '#555' }}>{form.name}<br />{form.street}, {form.city}<br />{form.country}</p>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#8B4513', cursor: 'pointer' }} onClick={() => setStep(2)}>Editar</span>
                </div>
              </div>
              <button className={styles.backBtn} onClick={() => setStep(2)}>← Volver</button>
            </section>
          )}
        </div>

        <div>
          <OrderSummary items={items} subtotal={subtotal} total={subtotal} />
          {step === 3 && (
            <div style={{ marginTop: 24 }}>
              {checkoutError && <p style={{ color: '#c00', fontSize: '0.85rem', marginBottom: 8 }}>{checkoutError.message}</p>}
              <button onClick={handlePay} disabled={loading} style={{
                width: '100%', padding: 16, background: '#8B4513', color: '#fff',
                border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                opacity: loading ? 0.6 : 1,
              }}>
                {loading ? 'PROCESANDO...' : `Pagar — S/ ${subtotal.toFixed(2)}`}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888', marginTop: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle' }}>lock</span>
                {' '}Pago 100% seguro
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: '100%', padding: '12px 14px', border: '1px solid #d4c9b0', borderRadius: 8, fontSize: '0.95rem', boxSizing: 'border-box' }}
      />
    </div>
  );
}
