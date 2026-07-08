import styles from './ProductImage.module.css';

export default function ProductImage({ src, alt = '', aspectRatio = '1/1', className = '' }) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')} style={{ aspectRatio }}>
      <img src={src} alt={alt} className={styles.img} loading="lazy" />
    </div>
  );
}