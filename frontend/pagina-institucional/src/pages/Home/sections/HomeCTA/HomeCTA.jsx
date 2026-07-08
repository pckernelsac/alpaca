import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './HomeCTA.module.css';

export default function HomeCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.banner}>
          <Eyebrow>OFERTA DEL EQUINOCCIO</Eyebrow>
          <h2 className={styles.title}>
            Celebra el cambio de estaciones con <br /> envio global gratuito.
          </h2>
          <a className={styles.btn} href="#">
            Descubrir la Coleccion
          </a>
        </div>
      </div>
    </section>
  );
}
