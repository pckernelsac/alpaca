import styles from './MetricCard.module.css';

export default function MetricCard({ title, value, subtitle, icon: Icon, color, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {Icon && (
        <div className={styles.iconWrap} style={color ? { backgroundColor: color } : undefined}>
          <Icon size={20} />
        </div>
      )}
      <div className={styles.value}>{value}</div>
      <div className={styles.title}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
}
