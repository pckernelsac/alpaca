import styles from './Radio.module.css';

export default function Radio({ label, name, id, className = '', ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={inputId} className={`${styles.wrapper} ${className}`}>
      <input
        type="radio"
        name={name}
        id={inputId}
        className={styles.input}
        {...props}
      />
      <span className={styles.radio} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}