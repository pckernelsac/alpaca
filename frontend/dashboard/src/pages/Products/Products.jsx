import styles from './Products.module.css';

export default function Products() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <p className={styles.description}>Gestión de productos</p>
    </div>
  );
}