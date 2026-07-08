import Badge from '@components/common/Badge/Badge';
import styles from './ProductCard.module.css';

export default function ProductCard({
  image,
  title,
  subtitle,
  price,
  originalPrice,
  badge,
  className = '',
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        {badge && (
          <div className={styles.badge}>
            <Badge variant={badge.variant || 'primary'}>{badge.label}</Badge>
          </div>
        )}
      </div>
      <div className={styles.info}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.pricing}>
          {price && <span className={styles.price}>{price}</span>}
          {originalPrice && <span className={styles.originalPrice}>{originalPrice}</span>}
        </div>
      </div>
    </div>
  );
}