import styles from './Gallery.module.css';

export default function Gallery({ items = [], columns = 3, gap = 'md', className = '' }) {
  return (
    <div className={`${styles.gallery} ${styles[`cols${columns}`]} ${styles[`gap${gap}`]} ${className}`}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <img src={item.src} alt={item.alt || ''} className={styles.image} loading="lazy" />
          {item.caption && <span className={styles.caption}>{item.caption}</span>}
        </div>
      ))}
    </div>
  );
}