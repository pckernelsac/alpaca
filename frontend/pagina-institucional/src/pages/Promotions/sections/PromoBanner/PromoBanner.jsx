import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <section className={styles.banner}>
      <div
        className={styles.bg}
        style={{
          backgroundImage:
            'url(https://lh3.googleusercontent.com/aida-public/AB6AXuD8XR4GBmFVCjFCtYUFMnHoKvz3v0x_eSMFdDp4JvWL0ceDjy9bR9drloDMhkw_jUj8ufT92YB76s1Bjbd-RoUhaN0hkfuMPYg32_gyMUxv7I-e8Z0LtTb1mc_FjGOFE_A9rUT852krQEbQFVO8KTQZ64MdiMp6s923xM8n4tDDL5zzEsUGBKxqkVY4jxyewhBmNhlJCPVibljkNOsMsH2tJ99CZOtUmAjEsKGp02UVTcTCR0MD9aIss126UVepNcgsLw4GfC8OKKA)',
        }}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <blockquote className={styles.quote}>
          &ldquo;El lujo no es la posesion, es la conexion con la historia de lo que
          vestimos.&rdquo;
        </blockquote>
        <div className={styles.line} />
        <p className={styles.label}>Nuestra Filosofia de Trazabilidad</p>
      </div>
    </section>
  );
}
