import styles from './Checkbox.module.css';

export default function Checkbox({ label, id, className = '', ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={inputId} className={`${styles.wrapper} ${className}`}>
      <input type="checkbox" id={inputId} className={styles.input} {...props} />
      <span className={styles.checkmark} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
