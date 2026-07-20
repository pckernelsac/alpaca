import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useCoupon } from '@/hooks';
import CartItem from '@/components/ecommerce/CartItem/CartItem';
import CouponBox from '@/components/ecommerce/CouponBox/CouponBox';
import styles from './Cart.module.css';

export default function Cart() {
  const { items, loading, fetch, updateItem, removeItem, clearCart } = useCart();
  const { validate, result: coupon } = useCoupon();
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => { fetch(); }, []);

  const subtotal = items.reduce((s, i) => s + ((i.price ?? i.unitPrice ?? 0) * (i.quantity || 1)), 0);
  const count = items.reduce((s, i) => s + (i.quantity || 1), 0);

  const handleApply = (code) => { setCouponCode(code); validate(code, subtotal); };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tu Carrito</h1>
        <p className={styles.count}>({count} {count === 1 ? 'Artículo' : 'Artículos'})</p>
      </div>
      <div className={styles.grid}>
        <section className={styles.items}>
          {loading && <p>Cargando...</p>}
          {!loading && items.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>Tu carrito está vacío</p>
              <Link to="/collection" className={styles.emptyLink}>Seguir comprando</Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItem key={item.id} item={item} onUpdateQty={(id, qty) => updateItem(id, { quantity: qty })} onRemove={(id) => removeItem(id)} />
            ))
          )}
          {items.length > 0 && <CouponBox onApply={handleApply} />}
          {coupon && <p style={{ color: 'green' }}>Cupón aplicado: {coupon.code}</p>}
        </section>
        <aside className={styles.sidebar}>
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumen del pedido</h2>
            <div className={styles.summaryRows}>
              <div className={styles.row}><span>Subtotal</span><span>S/ {subtotal.toFixed(2)}</span></div>
              <div className={styles.row}><span>Envío</span><span className={styles.free}>Gratis</span></div>
              <div className={styles.row}><span>Impuestos</span><span className={styles.tax}>Calculado al finalizar la compra</span></div>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span><span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className={styles.checkoutBtn}>
              Finalizar Compra
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
            <Link to="/collection" className={styles.continueLink}>Seguir comprando</Link>
            <div className={styles.trust}>
              <div className={styles.trustIcons}>
                <span className="material-symbols-outlined">payments</span>
                <span className="material-symbols-outlined">lock</span>
                <span className="material-symbols-outlined">cycle</span>
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <p className={styles.trustText}>Devoluciones gratuitas en 30 días</p>
            </div>
          </div>
          <div className={styles.help}>
            <h4 className={styles.helpTitle}>¿Necesitas ayuda?</h4>
            <p className={styles.helpText}>Nuestro equipo de atención está disponible para ayudarte con la elección y cuidado de tus prendas.</p>
            <a className={styles.helpLink} href="#">Contactar a nuestro equipo</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
