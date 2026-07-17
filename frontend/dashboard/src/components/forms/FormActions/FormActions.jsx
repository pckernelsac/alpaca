import styles from './FormActions.module.css';

export default function FormActions({ children, sticky = true, className = '' }) {
  return (
    <div className={`${styles.actions} ${sticky ? styles.sticky : ''} ${className}`}>
      {children}
    </div>
  );
}
