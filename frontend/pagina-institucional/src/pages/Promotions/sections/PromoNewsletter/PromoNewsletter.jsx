import styles from './PromoNewsletter.module.css';

export default function PromoNewsletter() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title}>El Diario de Alpacart</h2>
          <p className={styles.desc}>
            Historias del altiplano, lanzamientos exclusivos y acceso a ventas privadas. Sin ruido,
            solo esencia.
          </p>
        </div>
        <div className={styles.formWrap}>
          <input className={styles.input} placeholder="Su correo electronico" type="email" />
          <button className={styles.btn}>Suscribirse</button>
        </div>
      </div>
    </section>
  );
}
