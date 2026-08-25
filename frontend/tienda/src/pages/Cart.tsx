import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { productPath } from '../lib/routes';

import { Button, ButtonLink } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { IconBag, IconMinus, IconPlus, IconTrash } from '../components/ui/Icon';
import { EmptyState, LoadingBlock, formatPrice } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../providers/AuthProvider';
import { useCart } from '../providers/CartProvider';
import styles from './Cart.module.css';
import page from './Page.module.css';

export function Cart() {
  usePageTitle('Carrito');

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, loading, busy, updateItem, removeItem, applyCoupon } = useCart();
  const [code, setCode] = useState('');

  async function submitCoupon(event: FormEvent) {
    event.preventDefault();
    if (!code.trim()) return;
    const ok = await applyCoupon(code.trim());
    if (ok) setCode('');
  }

  if (!isAuthenticated) {
    return (
      <div className="container">
        <EmptyState
          icon={<IconBag size={26} />}
          title="Ingresá para ver tu carrito"
          description="Tu carrito se guarda en tu cuenta, así lo encontrás desde cualquier dispositivo."
          actions={
            <>
              <ButtonLink to="/ingresar">Iniciar sesión</ButtonLink>
              <ButtonLink to="/catalogo" variant="secondary">
                Ver catálogo
              </ButtonLink>
            </>
          }
        />
      </div>
    );
  }

  if (loading) return <LoadingBlock label="Cargando carrito" />;

  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyState
          icon={<IconBag size={26} />}
          title="Tu carrito está vacío"
          description="Cuando encuentres algo que te guste, va a aparecer acá."
          actions={<ButtonLink to="/catalogo">Explorar el catálogo</ButtonLink>}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <header style={{ paddingBlock: 'var(--space-12) var(--space-8)' }}>
        <h1 className={page.title}>Tu carrito</h1>
        <p className={page.subtitle}>
          {items.length} {items.length === 1 ? 'pieza' : 'piezas'} seleccionadas
        </p>
      </header>

      <div className={page.split} style={{ paddingTop: 0 }}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <Link to={productPath(item.productSlug, item.productId)}>
                {item.image ? (
                  <img src={item.image} alt="" className={styles.thumb} loading="lazy" />
                ) : (
                  <div className={styles.thumb} />
                )}
              </Link>

              <div className={styles.body}>
                <div className={styles.itemHead}>
                  <div>
                    <Link
                      to={productPath(item.productSlug, item.productId)}
                      className={styles.name}
                    >
                      {item.name}
                    </Link>
                    {item.variantLabel && <p className={styles.variant}>{item.variantLabel}</p>}
                    <p className={styles.sku}>SKU {item.sku}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => void removeItem(item.id)}
                    disabled={busy}
                    aria-label={`Quitar ${item.name}`}
                  >
                    <IconTrash size={18} />
                  </button>
                </div>

                <div className={styles.itemFoot}>
                  <div className={styles.stepper}>
                    <button
                      type="button"
                      className={styles.stepperButton}
                      onClick={() => void updateItem(item.id, item.quantity - 1)}
                      disabled={busy || item.quantity <= 1}
                      aria-label="Quitar una unidad"
                    >
                      <IconMinus size={14} />
                    </button>
                    <span className={styles.stepperValue}>{item.quantity}</span>
                    <button
                      type="button"
                      className={styles.stepperButton}
                      onClick={() => void updateItem(item.id, item.quantity + 1)}
                      disabled={busy}
                      aria-label="Agregar una unidad"
                    >
                      <IconPlus size={14} />
                    </button>
                  </div>

                  <div className={styles.itemPrice}>
                    <span className={styles.unit}>{formatPrice(item.unitPrice)} c/u</span>
                    <strong>{formatPrice(item.total)}</strong>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className={page.aside}>
          <div className={page.card}>
            <h2 className={page.cardTitle}>Resumen</h2>

            <div className={page.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(cart!.subtotal)}</span>
            </div>
            {cart!.discount > 0 && (
              <div className={`${page.summaryRow} ${page.discount}`}>
                <span>Descuento</span>
                <span>-{formatPrice(cart!.discount)}</span>
              </div>
            )}
            <div className={page.summaryRow}>
              <span>IGV (18%)</span>
              <span>{formatPrice(cart!.tax)}</span>
            </div>
            <div className={page.summaryRow}>
              <span>Envío</span>
              <span className={cart!.shippingFee === 0 ? page.free : undefined}>
                {cart!.shippingFee === 0 ? 'Gratis' : formatPrice(cart!.shippingFee)}
              </span>
            </div>

            <div className={page.summaryTotal}>
              <span>Total</span>
              <span>{formatPrice(cart!.total)}</span>
            </div>

            <form className={styles.coupon} onSubmit={submitCoupon}>
              <Input
                placeholder="Código de descuento"
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                aria-label="Código de descuento"
              />
              <Button type="submit" variant="secondary" disabled={busy || !code.trim()}>
                Aplicar
              </Button>
            </form>

            <Button
              size="lg"
              fullWidth
              onClick={() => navigate('/checkout')}
              disabled={busy}
              className={styles.checkoutButton}
            >
              Finalizar compra
            </Button>

            <p className={styles.note}>
              Los impuestos están incluidos. El envío se confirma en el siguiente paso.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
