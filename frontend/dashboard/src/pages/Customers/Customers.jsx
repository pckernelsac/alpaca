import styles from './Customers.module.css';

export default function Customers() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customers</h1>
      <p className={styles.description}>Gestión de clientes</p>
    </div>
  );
}