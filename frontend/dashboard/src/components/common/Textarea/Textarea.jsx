import { forwardRef } from 'react';
import styles from './Textarea.module.css';

const Textarea = forwardRef(function Textarea(
  { label, error, helperText, id, className = '', ...props },
  ref,
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={`${styles.textarea} ${error ? styles.hasError : ''}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
      {helperText && !error && (
        <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
});

export default Textarea;