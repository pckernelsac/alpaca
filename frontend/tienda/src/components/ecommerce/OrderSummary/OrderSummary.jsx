import Price from '@/components/ecommerce/Price/Price';
import styles from './OrderSummary.module.css';

export default function OrderSummary({ items = [], subtotal, shipping = 0, tax = 0, total, className = '' }) {
  return (
    <div className={[styles.summary, className].filter(Boolean).join(' ')}>
      <h3 className={styles.title}>Resumen del pedido</h3>
      {items.map((item, i) => {
        const img = item.imageUrl || item.image || '';
        const name = item.title || item.name || item.productName || 'Producto';
        const price = item.price ?? item.unitPrice ?? 0;
        const qty = item.quantity || 1;
        return (
          <div key={i} className={styles.item}>
            {img ? <img src={img} alt={name} className={styles.itemImg} /> : <div className={styles.itemImg} style={{ background: '#eee' }} />}
            <div className={styles.itemInfo}>
              <p className={styles.itemTitle}>{name}</p>
              <p className={styles.itemQty}>Cant: {qty}</p>
            </div>
            <Price value={price * qty} size="sm" />
          </div>
        );
      })}
      <div className={styles.divider} />
      <div className={styles.row}><span>Subtotal</span><Price value={subtotal} size="sm" /></div>
      {shipping > 0 && <div className={styles.row}><span>Envío</span><Price value={shipping} size="sm" /></div>}
      {tax > 0 && <div className={styles.row}><span>Impuestos</span><Price value={tax} size="sm" /></div>}
      <div className={[styles.row, styles.totalRow].filter(Boolean).join(' ')}><span>Total</span><Price value={total} size="lg" /></div>
    </div>
  );
}