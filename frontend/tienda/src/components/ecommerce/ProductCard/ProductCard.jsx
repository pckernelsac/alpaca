import { Link } from 'react-router-dom';
import Badge from '@/components/common/Badge/Badge';
import Price from '@/components/ecommerce/Price/Price';
import Rating from '@/components/ecommerce/Rating/Rating';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, variant = 'grid', onAddToCart, onToggleWishlist, className = '' }) {
  const { id, image, title, subtitle, price, originalPrice, badge, rating, reviewCount } = product;
  return (
    <div className={[styles.card, styles[variant], className].filter(Boolean).join(' ')}>
      <Link to={'/product/' + id} className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        {badge && <div className={styles.badge}><Badge variant={badge.variant || 'primary'} size="sm">{badge.label}</Badge></div>}
        {onToggleWishlist && (
          <button className={styles.wishlist} onClick={(e) => { e.preventDefault(); onToggleWishlist(product); }} aria-label="Agregar a favoritos">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        )}
        {variant === 'grid' && onAddToCart && (
          <button className={styles.quickAdd} onClick={(e) => { e.preventDefault(); onAddToCart(product); }}>Agregar al Carrito</button>
        )}
      </Link>
      <div className={styles.info}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        <h3 className={styles.title}><Link to={'/product/' + id}>{title}</Link></h3>
        {rating !== undefined && <Rating value={rating} count={reviewCount} size="sm" />}
        <Price value={price} originalValue={originalPrice} size="sm" />
      </div>
    </div>
  );
}