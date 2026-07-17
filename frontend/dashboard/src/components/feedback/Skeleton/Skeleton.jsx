import styles from './Skeleton.module.css';

export default function Skeleton({ width = '100%', height = '20px', variant = 'text', count = 1 }) {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className={`${styles.skeleton} ${styles[variant] || styles.text}`}
          style={{ width, height }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className={styles.tableWrap} role="status" aria-label="Cargando tabla">
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className={styles.tableRow}>
          {Array.from({ length: cols }, (_, c) => (
            <div key={c} className={`${styles.skeleton} ${styles.cell}`} />
          ))}
        </div>
      ))}
      <span className={styles.srOnly}>Cargando...</span>
    </div>
  );
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          <div className={`${styles.skeleton} ${styles.cardValue}`} />
          <div className={`${styles.skeleton} ${styles.cardDesc}`} />
        </div>
      ))}
    </div>
  );
}
