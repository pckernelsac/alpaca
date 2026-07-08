import styles from './FormGroup.module.css';

export default function FormGroup({ children, className = '' }) {
  return <div className={`${styles.group} ${className}`}>{children}</div>;
}