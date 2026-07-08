import styles from './Grid.module.css';

export default function Grid({
  children,
  cols = 1,
  gap = 'md',
  className = '',
}) {
  return (
    <div className={`${styles.grid} ${styles[`cols${cols}`]} ${styles[`gap${gap}`]} ${className}`}>
      {children}
    </div>
  );
}