import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Field';
import { IconCheck } from '../components/ui/Icon';
import { Alert, LoadingBlock, formatPrice } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { ApiRequestError, checkoutApi } from '../lib/api';
import { useAuth } from '../providers/AuthProvider';
import { useCart } from '../providers/CartProvider';
import { useToast } from '../providers/ToastProvider';
import styles from './Checkout.module.css';
import page from './Page.module.css';

const STEPS = ['Datos de envío', 'Pago', 'Confirmación'];

export function Checkout() {
  usePageTitle('Finalizar compra');

  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const { cart, loading, refresh } = useCart();

  const [form, setForm] = useState({
    name: '',
    street: '',
    city: 'Lima',
    state: '',
    zip: '',
    phone: user?.phone ?? '',
    notes: '',
    payment_method: 'card',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const order = await checkoutApi.submit({
        payment_method: form.payment_method,
        notes:
          [form.name, form.street, form.city, form.state, form.zip, form.phone]
            .filter(Boolean)
            .join(' · ') + (form.notes ? ` — ${form.notes}` : ''),
      });
      await refresh();
      toast.success(`Pedido ${order.orderNumber} confirmado`);
      navigate(`/pedido/${order.orderNumber}/confirmado`, { replace: true });
    } catch (caught) {
      setError(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos procesar tu pedido',
      );
      setSubmitting(false);
    }
  }

  if (loading) return <LoadingBlock label="Preparando checkout" />;

  // Sin items no hay nada que confirmar: se vuelve al carrito.
  if (!cart || cart.items.length === 0) return <Navigate to="/carrito" replace />;

  return (
    <div className="container">
      <header style={{ paddingBlock: 'var(--space-12) var(--space-8)' }}>
        <h1 className={page.title}>Finalizar compra</h1>
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step} className={`${styles.step} ${index === 0 ? styles.stepActive : ''}`}>
              <span className={styles.stepNumber}>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </header>

      <form className={page.split} style={{ paddingTop: 0 }} onSubmit={submit}>
        <div className={styles.fields}>
          {error && <Alert tone="danger">{error}</Alert>}

          <section className={page.card}>
            <h2 className={page.cardTitle}>Datos de envío</h2>
            <div className={page.form}>
              <Input
                label="Nombre completo"
                autoComplete="name"
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
                required
              />
              <Input
                label="Dirección"
                autoComplete="street-address"
                placeholder="Calle, número, departamento"
                value={form.street}
                onChange={(event) => update('street', event.target.value)}
                required
              />
              <div className={page.formRow}>
                <Input
                  label="Ciudad"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(event) => update('city', event.target.value)}
                  required
                />
                <Input
                  label="Departamento"
                  autoComplete="address-level1"
                  value={form.state}
                  onChange={(event) => update('state', event.target.value)}
                />
              </div>
              <div className={page.formRow}>
                <Input
                  label="Código postal"
                  autoComplete="postal-code"
                  value={form.zip}
                  onChange={(event) => update('zip', event.target.value)}
                />
                <Input
                  type="tel"
                  label="Teléfono"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          <section className={page.card}>
            <h2 className={page.cardTitle}>Método de pago</h2>
            <Select
              label="Forma de pago"
              value={form.payment_method}
              onChange={(event) => update('payment_method', event.target.value)}
            >
              <option value="card">Tarjeta de crédito o débito</option>
              <option value="transfer">Transferencia bancaria</option>
              <option value="cash">Pago contra entrega</option>
            </Select>
            <p className={styles.paymentNote}>
              El cobro se procesa al confirmar el pedido. No almacenamos datos de tu tarjeta.
            </p>
          </section>

          <section className={page.card}>
            <h2 className={page.cardTitle}>Notas del pedido</h2>
            <Textarea
              placeholder="Referencias de entrega, horarios, indicaciones especiales…"
              value={form.notes}
              onChange={(event) => update('notes', event.target.value)}
              aria-label="Notas del pedido"
            />
          </section>
        </div>

        <aside className={page.aside}>
          <div className={page.card}>
            <h2 className={page.cardTitle}>Tu pedido</h2>

            <ul className={styles.items}>
              {cart.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <span className={styles.itemQty}>{item.quantity}×</span>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    {item.variantLabel && (
                      <p className={styles.itemVariant}>{item.variantLabel}</p>
                    )}
                  </div>
                  <span className={styles.itemTotal}>{formatPrice(item.total)}</span>
                </li>
              ))}
            </ul>

            <div className={styles.totals}>
              <div className={page.summaryRow}>
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              {cart.discount > 0 && (
                <div className={`${page.summaryRow} ${page.discount}`}>
                  <span>Descuento</span>
                  <span>-{formatPrice(cart.discount)}</span>
                </div>
              )}
              <div className={page.summaryRow}>
                <span>IGV (18%)</span>
                <span>{formatPrice(cart.tax)}</span>
              </div>
              <div className={page.summaryRow}>
                <span>Envío</span>
                <span className={cart.shippingFee === 0 ? page.free : undefined}>
                  {cart.shippingFee === 0 ? 'Gratis' : formatPrice(cart.shippingFee)}
                </span>
              </div>
              <div className={page.summaryTotal}>
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" fullWidth loading={submitting}>
              Confirmar pedido
            </Button>

            <ul className={styles.assurances}>
              <li>
                <IconCheck size={14} /> Envío asegurado
              </li>
              <li>
                <IconCheck size={14} /> 30 días para cambios
              </li>
              <li>
                <IconCheck size={14} /> Pago protegido
              </li>
            </ul>
          </div>
        </aside>
      </form>
    </div>
  );
}
