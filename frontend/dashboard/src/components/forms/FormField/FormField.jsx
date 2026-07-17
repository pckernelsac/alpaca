import styles from './FormField.module.css';

export default function FormField({ label, name, error, helperText, required, children, className = '' }) {
  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
      {helperText && !error && <span className={styles.helper}>{helperText}</span>}
    </div>
  );
}
