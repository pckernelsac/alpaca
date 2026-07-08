import styles from './OrderConfirmed.module.css';

export default function OrderConfirmed() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>¡Pedido confirmado!</h1>
        <p className={styles.subtitle}>Recibimos tu pedido. Pronto lo tendrás listo.</p>
        <span className={styles.ref}>#APC-98234102</span>
        <p className={styles.estimate}>Fecha estimada de entrega: 24 de octubre</p>
      </div>
      <div className={styles.imageCol}>
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-raKaETQMX_9Gz8yPTCcLuTlQ8OcWfNuiOJ3w3c8lD6dmMCIhvQH6YdRr8-Vpbd1mDQfseWhd3xGNBHQzXqMHjCql4kVxqRjX7Gz-LpHrzg0Cr89JLXuzdW_ix22a5YtYQj0oq5ISlAgEsD6xNxmMCGCEEkT6vEMhSSAgYpq5OHWuBmWeCqrP6QtlPo9lZQp91pWU00UK6XxFree2Ua65IjCaLYfb0sprNP2K8exfqRa2iTlAkt0oLMU9Wq7-JapmMPzPpjApKzoJ" alt="" className={styles.image} />
      </div>
    </div>
  );
}