import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './AboutStory.module.css';

const img1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCG-W9fsPWbJm3tc6OxdU76cfU1WgFfAdpezGrjzo3I1TrCPYqSXHfIQtkx5M_TkFz6J2cC3UY5Fo6UqS-5yS0dKo2diI4dVR4_6-_w1Dri6sSsC0BxssTWVbqgLigUWpk4dOSceWh7wzZdEkAcPwrcM-WvsZy4G6AlfdR9yGW2nZubGhlkAPDnZKilyjqWFL_Ax-puNataoWuLPUf_wSvvFR8mpGymdLp4BArhz_5oJ3q_20_DkPTqTPrwHm8OKkciLlTh6cRJifw';

const img2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQijBY38m4q1AJeIARFOKIy0UcjJbW1RN161l9Sd48kgP1tYbzcAupHi8XhA5t5JUjBurt5SUN-BkclbKOwEvP8v0PmiKYuFFznvMuZZEssyU0N_0XwKhyd72oOeh3kaJ4dtYq-H8dFGhFfJ_0APFoN3agIG1xmKjZf2putr-AiUr_HgQqxIsXMkClDgn0-DH0XJHJw4n4jpkh5KpiDABdZrnlsu79-9hu1CpouX3MAIAT1E0IzyR7-8GaarPHd5MNdDPAAIpjkhw';

export default function AboutStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <Eyebrow>Nuestra Historia</Eyebrow>
          <h2 className={styles.title}>Donde el tiempo se detiene para crear.</h2>
          <p className={styles.para}>
            Alpacart nacio de una busqueda por la pureza. En los valles mas remotos de la
            cordillera, descubrimos que el verdadero lujo no se fabrica, se hereda. Nuestra travesia
            comenzo con el respeto absoluto hacia la fibra de alpaca, considerada por los Incas como
            el &quot;oro de los dioses&quot;.
          </p>
          <p className={styles.para}>
            Hoy, preservamos tecnicas de tejido manual que han pasado de generacion en generacion,
            integrando un diseno minimalista que respira sofisticacion y calma.
          </p>
        </div>
        <div className={styles.imageCol}>
          <div className={styles.imageGrid}>
            <div className={styles.imgWrap1}>
              <img src={img1} alt="" className={styles.img} loading="lazy" />
            </div>
            <div className={styles.imgWrap2}>
              <img src={img2} alt="" className={styles.img} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
