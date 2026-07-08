import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './AboutFiberQuality.module.css';

const imgUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAQnv16xRlJZEYXPYooejS_HReDrvkCQZC0v_-pRtphBCMDse1i-p_T9WklyvAOF2Kteo2XWUSHM-yOo5NXKIxumXqXLwCBaT-PrPPE2fAdhGNZoxsogqALvPFS-8vcUEgMceF2134oqamfHKKW9-AZ5BxbEnTLVcSWyIvDkPiRkePLHr5W-89vacZOhfmGcR0024MJLLKhLOlck7SChB4Wdo_UYlEO9f28OP9I0WAr9ujPRdrRFZ6TPZsVy7XTgH_B50f_k-_d-eA';

export default function AboutFiberQuality() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <Eyebrow>La Nobleza de la Fibra</Eyebrow>
          <h2 className={styles.title}>Mas que abrigo, una caricia.</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined">fiber_manual_record</span>
              <div>
                <h4 className={styles.listTitle}>Alpaca Baby</h4>
                <p className={styles.listDesc}>
                  La primera esquila, de una suavidad incomparable y propiedades termicas
                  inteligentes.
                </p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined">fiber_manual_record</span>
              <div>
                <h4 className={styles.listTitle}>Vicuna Real</h4>
                <p className={styles.listDesc}>
                  La fibra mas escasa y preciada del mundo, recolectada de forma etica y sostenible.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.imageCol}>
          <div className={styles.imageBox} style={{ backgroundImage: 'url(' + imgUrl + ')' }} />
        </div>
      </div>
    </section>
  );
}
