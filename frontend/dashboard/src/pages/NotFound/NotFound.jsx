import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NotFound</h1>
      <p className={styles.description}>Página no encontrada</p>
    </div>
  );
}