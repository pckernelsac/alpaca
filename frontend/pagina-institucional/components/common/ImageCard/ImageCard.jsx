import styles from './ImageCard.module.css';

export default function ImageCard({
  src,
  alt = '',
  title,
  subtitle,
  overlay = false,
  aspectRatio = '3/4',
  className = '',
}) {
  return (
    <div
      className={`${styles.card} ${overlay ? styles.hasOverlay : ''} ${className}`}
      style={{ aspectRatio }}
    >
      <img src={src} alt={alt} className={styles.image} loading="lazy" />
      {(title || subtitle) && (
        <div className={styles.content}>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          {title && <h3 className={styles.title}>{title}</h3>}
        </div>
      )}
    </div>
  );
}