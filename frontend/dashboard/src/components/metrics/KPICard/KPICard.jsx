import TrendIndicator from '../TrendIndicator/TrendIndicator';
import styles from './KPICard.module.css';

export default function KPICard({ icon, label, value, trend, subtitle, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.accent} />
      <div className={styles.body}>
        <div className={styles.header}>
          {icon && <span className={`${styles.icon} material-symbols-outlined`}>{icon}</span>}
          <span className={styles.label}>{label}</span>
        </div>
        <div className={styles.valueRow}>
          <span className={styles.value}>{value}</span>
          {trend && <TrendIndicator value={trend.value} isUp={trend.isUp} />}
        </div>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}
