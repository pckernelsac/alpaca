import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ image, title, description, to = '/', className = '' }) {
  return (
    <Link to={to} className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.desc}>{description}</p>}
        <span className={styles.cta}>Explorar</span>
      </div>
    </Link>
  );
}