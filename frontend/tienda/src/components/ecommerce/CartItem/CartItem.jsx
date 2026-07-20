import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './CartItem.module.css';

export default function CartItem({ item, onUpdateQty, onRemove, className = '' }) {
  const img = item.imageUrl || item.image || '';
  const name = item.title || item.name || item.productName || 'Producto';
  const price = item.price ?? item.unitPrice ?? 0;

  return (
    <div className={[styles.item, className].filter(Boolean).join(' ')}>
      <div className={styles.imageWrap}>
        {img ? <img src={img} alt={name} className={styles.image} /> : <div className={styles.image} style={{ background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 12 }}>Sin img</div>}
      </div>
      <div className={styles.info}>
        <div className={styles.topRow}>
          <div>
            <h3 className={styles.title}>{name}</h3>
            {item.variant && <p className={styles.variant}>{item.variant}</p>}
          </div>
          <span className={styles.price}>S/ {Number(price).toFixed(2)}</span>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.qty}>
            <button className={styles.qtyBtn} onClick={() => onUpdateQty?.(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><FiMinus size={16} /></button>
            <span className={styles.qtyVal}>{item.quantity}</span>
            <button className={styles.qtyBtn} onClick={() => onUpdateQty?.(item.id, item.quantity + 1)}><FiPlus size={16} /></button>
          </div>
          <button className={styles.removeBtn} onClick={() => onRemove?.(item.id)}>
            <FiTrash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
