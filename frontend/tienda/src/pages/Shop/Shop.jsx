import styles from './Shop.module.css';

export default function Shop() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tienda</h1>
      <p className={styles.description}>Catálogo de productos</p>
    </div>
  );
}