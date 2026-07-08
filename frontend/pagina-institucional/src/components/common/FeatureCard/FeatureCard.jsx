import styles from './FeatureCard.module.css';

export default function FeatureCard({ icon, title, description, className = '' }) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      {icon && <span className={'material-symbols-outlined ' + styles.icon}>{icon}</span>}
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
