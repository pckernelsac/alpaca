import styles from './Price.module.css';

export default function Price({ value, originalValue, currency = 'PEN', size = 'md', className = '' }) {
  const fmt = (v) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency, minimumFractionDigits: 2 }).format(v);
  };
  return (
    <div className={[styles.wrapper, styles[size], className].filter(Boolean).join(' ')}>
      {originalValue && originalValue > value && (
        <span className={styles.original}>{fmt(originalValue)}</span>
      )}
      <span className={styles.current}>{fmt(value)}</span>
    </div>
  );
}