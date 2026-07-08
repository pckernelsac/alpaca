import styles from './Categories.module.css';

export default function Categories() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories</h1>
      <p className={styles.description}>Gestión de categorías</p>
    </div>
  );
}