import styles from './Rating.module.css';

export default function Rating({ value = 0, max = 5, count, size = 'sm', className = '' }) {
  return (
    <div className={[styles.wrapper, styles[size], className].filter(Boolean).join(' ')}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={[styles.star, i < Math.round(value) ? styles.filled : ''].filter(Boolean).join(' ')}>&#9733;</span>
      ))}
      {count !== undefined && <span className={styles.count}>({count})</span>}
    </div>
  );
}