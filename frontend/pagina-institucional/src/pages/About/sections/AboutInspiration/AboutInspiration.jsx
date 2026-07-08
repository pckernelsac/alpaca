import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './AboutInspiration.module.css';

const imgUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuADxoAdNdUbuoxvj44MpDwBKS83locIt3GJs2Pahs6CrhEywKdxl2RqYXln44DzLpgb2RIjYgvIOdL4i71QtzVBvKnu6KH4nmq57mG84bkQN95cbto1tyN8beYipZzeJ2rGymy591bgiHzYFxNCycUqlGXXExbL_Nd25LxlECT_Fy4Ge8do4ea0wETT3DXzkjVE8u0-rmftLzMxnD-vL1SnBmZ8rrWuXAgMqEYhtx3cB0mE-9B4PjzAbQVCH6rNM0WGtMZj-xbKTjs';

export default function AboutInspiration() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div className={styles.imageBox} style={{ backgroundImage: 'url(' + imgUrl + ')' }} />
        </div>
        <div className={styles.textCol}>
          <Eyebrow>Inspiracion</Eyebrow>
          <h2 className={styles.title}>La Tierra que nos susurra.</h2>
          <p className={styles.desc}>
            Nuestra paleta de colores nace de los minerales, los cielos y los pelajes naturales de
            la fauna andina. No usamos tintes sinteticos cuando la naturaleza ya nos ha otorgado la
            perfeccion en tonos crudos, grises y marrones profundos.
          </p>
          <div className={styles.locBox}>
            <div className={styles.locIcon}>
              <span className="material-symbols-outlined">landscape</span>
            </div>
            <span className={styles.locLabel}>Cusco, Valle Sagrado</span>
          </div>
        </div>
      </div>
    </section>
  );
}
