import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home</h1>
      <p className={styles.description}>Pagina principal del panel de administración</p>
    </div>
  );
}