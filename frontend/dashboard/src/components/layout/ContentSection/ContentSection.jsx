import styles from './ContentSection.module.css';

export default function ContentSection({ title, description, children, className = '' }) {
  return (
    <div className={`${styles.section} ${className}`}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
