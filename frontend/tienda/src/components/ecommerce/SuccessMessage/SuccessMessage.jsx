import styles from './SuccessMessage.module.css';

export default function SuccessMessage({ orderRef = '#APC-98234102', email = 'a.vogel@gmail.com', className = '' }) {
  return (
    <section className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.iconWrap}>
        <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '2rem', fontVariationSettings: "'wght' 200" }}>check</span>
      </div>
      <h1 className={styles.title}>Gracias por tu pedido</h1>
      <p className={styles.subtitle}>Estamos preparando tus textiles artesanales de alpaca con el mayor cuidado y dedicación.</p>
      <div className={styles.refRow}>
        <span className={styles.refLabel}>Referencia del pedido</span>
        <span className={styles.refValue}>{orderRef}</span>
      </div>
      <span className={styles.status}><span className={styles.statusDot} /> Pedido confirmado</span>
    </section>
  );
}