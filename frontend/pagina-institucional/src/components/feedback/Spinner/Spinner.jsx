import styles from './Spinner.module.css';

export default function Spinner({ size = 'sm', color }) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]}`}
      style={color ? { borderTopColor: color } : undefined}
    />
  );
}
