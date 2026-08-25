import styles from './PageHeader.module.css';

export default function PageHeader({ title, description, children, className = '' }) {
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
