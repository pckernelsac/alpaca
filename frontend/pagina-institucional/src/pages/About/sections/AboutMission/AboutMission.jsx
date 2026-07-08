import styles from './AboutMission.module.css';

export default function AboutMission() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.mission}>
          <span className={styles.label}>Mision</span>
          <h3 className={styles.missionText}>
            Preservar el arte textil andino mediante un modelo de comercio justo que honre tanto al
            artesano como a la naturaleza.
          </h3>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <p className={styles.statNum}>100%</p>
              <p className={styles.statLabel}>Trazable</p>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <p className={styles.statNum}>500+</p>
              <p className={styles.statLabel}>Artesanos</p>
            </div>
          </div>
        </div>
        <div className={styles.vision}>
          <span className={styles.visionLabel}>Vision</span>
          <h3 className={styles.visionText}>
            Ser el referente global del lujo consciente, donde cada prenda es una inversion en
            cultura y sostenibilidad.
          </h3>
          <div className={styles.visionIcon}>
            <span className="material-symbols-outlined">public</span>
          </div>
        </div>
      </div>
    </section>
  );
}
