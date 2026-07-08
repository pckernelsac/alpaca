import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './CatalogBento.module.css';

export default function CatalogBento() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.major}>
          <div className={styles.majorOverlay} />
          <img
            className={styles.majorImg}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd4Q4RPIQgmndIJGbK5l99KlL7h7cGJ2vV4mmcZREE3-4OLPlnnx4UscOzPKixSlhQQNrmk8I2mvFyEqzT9ZaEQRL1hkF5z4iwUclMYAm6AvL6EbAkSI_xXZhnumhwGCc2o-b5XP4dXofnFClWSyDH5BwlPedl74EmSEiJ-seQG81qMfXhnea1dF1F_Bn9rDD7LzNMzRzaBXp9J8IpbXAGSVi3YFgalTo0vxD3Zh4OIfm6opdf130HN2fxoD9RZQsygp6-tefLjQk"
            alt=""
            loading="lazy"
          />
          <div className={styles.majorContent}>
            <Eyebrow>Serie Limitada</Eyebrow>
            <h3 className={styles.majorTitle}>Invierno Andino</h3>
            <p className={styles.majorDesc}>
              Explorando la proteccion termica natural a traves de estructuras volumetricas.
            </p>
          </div>
        </div>
        <div className={styles.secondary}>
          <div className={styles.secOverlay} />
          <img
            className={styles.secImg}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj_zSIAElzqK2nyTcLxKEWM8-kD78p01dfYRh7d61jZ6ozHvcodfFePKDdqY95-NXRHlti92KHdtFOm4d2z4at-M5L5jg76vNplYSt1uI_Hn_tUHvlq9jMayCs4kd8-SRxpOaEiTOIPShKVCiYWpgzjwRHzqpJ6xBTfX85p_xU3zwbJqftunKQOfgs_ejcnsRnwEXN6bq3tUZje7H_7bKA-AOxu704fTwNNBvaecFkRshHX8ak0FoKEUaorqQr-zoO9xR-TCYIdh8"
            alt=""
            loading="lazy"
          />
          <div className={styles.secContent}>
            <h3 className={styles.secTitle}>Esencia</h3>
            <span className={styles.secSub}>Coleccion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
