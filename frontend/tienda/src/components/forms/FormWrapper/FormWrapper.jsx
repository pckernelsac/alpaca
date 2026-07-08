import styles from './FormWrapper.module.css';

export default function FormWrapper({ children, onSubmit, className = '', ...props }) {
  return (
    <form
      className={`${styles.form} ${className}`}
      onSubmit={onSubmit}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
}