import styles from './Orders.module.css';

export default function Orders() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders</h1>
      <p className={styles.description}>Gestión de pedidos</p>
    </div>
  );
}