import styles from './CampaignBanner.module.css';

export default function CampaignBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Edición de Temporada</span>
          <h2 className={styles.title}>Solsticio de Invierno: <br />Edición Limitada</h2>
          <button className={styles.btn}>Explorar Colección</button>
        </div>
      </div>
    </section>
  );
}