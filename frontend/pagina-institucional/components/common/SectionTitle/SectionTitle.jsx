import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, children, align = 'left', className = '' }) {
  return (
    <div className={`${styles.wrapper} ${styles[align]} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {children && (
        <h2 className={styles.heading}>{children}</h2>
      )}
    </div>
  );
}