import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './CartItem.module.css';

export default function CartItem({ item, onUpdateQty, onRemove, className = '' }) {
  return (
    <div className={[styles.item, className].filter(Boolean).join(' ')}>
      <div className={styles.imageWrap}>
        <img src={item.image} alt={item.title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.topRow}>
          <div>
            <h3 className={styles.title}>{item.title}</h3>
            {item.variant && <p className={styles.variant}>{item.variant}</p>}
          </div>
          <span className={styles.price}>${item.price}</span>
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
