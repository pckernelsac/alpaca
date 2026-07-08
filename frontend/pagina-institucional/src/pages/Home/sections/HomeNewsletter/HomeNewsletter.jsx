import styles from './HomeNewsletter.module.css';

export default function HomeNewsletter() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <h2 className={styles.title}>El Diario</h2>
          <p className={styles.desc}>
            Mantente conectado con las historias de los Andes, los lanzamientos de nuevas colecciones
            y nuestras iniciativas de sostenibilidad.
          </p>
        </div>
        <form className={styles.form}>
          <input className={styles.input} placeholder="TU CORREO ELECTRONICO" type="email" />
          <button className={styles.btn} type="submit">
            SUSCRIBIRSE
          </button>
        </form>
      </div>
    </section>
  );
}
