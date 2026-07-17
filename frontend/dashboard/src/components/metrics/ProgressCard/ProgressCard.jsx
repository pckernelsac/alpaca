import styles from './ProgressCard.module.css';

export default function ProgressCard({
  label,
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showPercent = true,
  className = '',
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {showPercent && <span className={styles.percent}>{Math.round(pct)}%</span>}
      </div>
      <div className={`${styles.track} ${styles[size]}`}>
        <div
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
