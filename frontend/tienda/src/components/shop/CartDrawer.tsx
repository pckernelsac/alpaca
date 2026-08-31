import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { mediaUrl } from '../../lib/api';
import { productPath } from '../../lib/routes';

import { useCart } from '../../providers/CartProvider';
import { Button } from '../ui/Button';
import { IconBag, IconClose, IconMinus, IconPlus } from '../ui/Icon';
import { LoadingBlock, formatPrice } from '../ui/Primitives';
import styles from './CartDrawer.module.css';

const FREE_SHIPPING_FROM = 500;

export function CartDrawer() {
  const navigate = useNavigate();
  const { cart, count, loading, busy, drawerOpen, closeDrawer, updateItem, removeItem } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal ?? 0;
  const remaining = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  function goToCheckout() {
    closeDrawer();
    navigate('/checkout');
  }

  return (
    <>
      <div className={styles.overlay} onClick={closeDrawer} aria-hidden="true" />
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <header className={styles.head}>
          <h2 className={styles.title}>
            Tu carrito
            {count > 0 && <span className={styles.count}>({count})</span>}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={closeDrawer}
            aria-label="Cerrar carrito"
          >
            <IconClose />
          </button>
        </header>

        <div className={styles.body}>
          {loading ? (
            <LoadingBlock label="Cargando carrito" />
          ) : items.length === 0 ? (
            <div className={styles.empty}>
              <IconBag size={40} />
              <p className={styles.emptyTitle}>Tu carrito está vacío</p>
              <p>Todavía no agregaste ninguna pieza.</p>
              <Button variant="secondary" onClick={closeDrawer}>
                Seguir viendo
              </Button>
            </div>
          ) : (
            <ul className={styles.items}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  {item.image ? (
                    <img src={mediaUrl(item.image) ?? undefined} alt="" className={styles.thumb} loading="lazy" />
                  ) : (
                    <div className={styles.thumb} />
                  )}
                  <div className={styles.itemBody}>
                    <Link
                      to={productPath(item.productSlug, item.productId)}
                      className={styles.itemName}
                      onClick={closeDrawer}
                    >
                      {item.name}
                    </Link>
                    {item.variantLabel && (
                      <span className={styles.itemVariant}>{item.variantLabel}</span>
                    )}
                    <span className={styles.itemVariant}>{formatPrice(item.unitPrice)} c/u</span>

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
                        <span className={styles.stepperValue} aria-live="polite">
                          {item.quantity}
                        </span>
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
                      <strong>{formatPrice(item.total)}</strong>
                    </div>

                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => void removeItem(item.id)}
                      disabled={busy}
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && cart && (
          <footer className={styles.foot}>
            <div className={styles.progress}>
              <p className={styles.progressText}>
                {remaining > 0 ? (
                  <>
                    Te faltan <strong>{formatPrice(remaining)}</strong> para el envío gratis
                  </>
                ) : (
                  <span className={styles.freeShipping}>Tenés envío gratis</span>
                )}
              </p>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progreso hacia envío gratis"
              >
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className={styles.summary}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              {cart.discount > 0 && (
                <div className={`${styles.row} ${styles.discount}`}>
                  <span>Descuento</span>
                  <span>-{formatPrice(cart.discount)}</span>
                </div>
              )}
              <div className={styles.row}>
                <span>IGV (18%)</span>
                <span>{formatPrice(cart.tax)}</span>
              </div>
              <div className={styles.row}>
                <span>Envío</span>
                <span className={cart.shippingFee === 0 ? styles.freeShipping : undefined}>
                  {cart.shippingFee === 0 ? 'Gratis' : formatPrice(cart.shippingFee)}
                </span>
              </div>
              <div className={`${styles.row} ${styles.rowTotal}`}>
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <Button size="lg" fullWidth onClick={goToCheckout} disabled={busy}>
                Finalizar compra
              </Button>
              <Button variant="secondary" fullWidth onClick={closeDrawer}>
                Seguir comprando
              </Button>
            </div>

            <p className={styles.note}>Impuestos incluidos. Envío calculado al confirmar.</p>
          </footer>
        )}
      </aside>
    </>
  );
}
