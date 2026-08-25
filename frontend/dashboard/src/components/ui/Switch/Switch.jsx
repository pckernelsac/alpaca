import styles from './Switch.module.css';

export default function Switch({ checked, onChange, label, disabled, className = '' }) {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''} ${className}`}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
