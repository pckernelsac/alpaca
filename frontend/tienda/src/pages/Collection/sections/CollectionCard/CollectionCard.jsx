import { Link } from 'react-router-dom';
import styles from './CollectionCard.module.css';

export default function CollectionCard({ image, title, pieceCount, description, catalogId, to = '/category/all', className = '' }) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        {catalogId && <span className={styles.badge}>ID: {catalogId}</span>}
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{pieceCount} PIEZAS</span>
        </div>
        <p className={styles.desc}>{description}</p>
        <Link to={to} className={styles.cta}>
          EXPLORAR COLECCIÓN
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}