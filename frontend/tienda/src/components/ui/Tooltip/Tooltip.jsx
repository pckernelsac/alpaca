import styles from './Tooltip.module.css';

export default function Tooltip({ children, content, position = 'top' }) {
  return (
    <div className={styles.wrapper}>
      {children}
      <span className={`${styles.tooltip} ${styles[position]}`}>{content}</span>
    </div>
  );
}