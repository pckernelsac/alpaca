import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import Price from '@/components/ecommerce/Price/Price';
import styles from './WishlistItem.module.css';

export default function WishlistItem({ product, onMoveToBag, onRemove, className = '' }) {
  return (
    <div className={[styles.item, className].filter(Boolean).join(' ')}>
      <Link to={'/product/' + product.id} className={styles.imageWrap}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </Link>
      <div className={styles.info}>
        <h3 className={styles.title}><Link to={'/product/' + product.id}>{product.title}</Link></h3>
        {product.subtitle && <p className={styles.subtitle}>{product.subtitle}</p>}
        <Price value={product.price} size="md" />
      </div>
      <div className={styles.actions}>
        <button className={styles.addBtn} onClick={() => onMoveToBag(product)}><FiShoppingBag size={16} /> Agregar al Carrito</button>
        <button className={styles.removeBtn} onClick={() => onRemove(product.id)}><FiHeart size={16} /> Eliminar</button>
      </div>
    </div>
  );
}