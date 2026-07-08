import styles from './FeatureCard.module.css';

export default function FeatureCard({ icon, title, description, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {icon && (
        <span className={`${styles.icon} material-symbols-outlined`}>{icon}</span>
      )}
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}