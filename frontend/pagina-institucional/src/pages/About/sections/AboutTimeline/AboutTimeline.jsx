import styles from './AboutTimeline.module.css';

const items = [
  { year: '2012', title: 'El Origen', desc: 'Primer encuentro con las comunidades de Puno.' },
  { year: '2016', title: 'Taller Boutique', desc: 'Inauguracion de nuestro atelier en Cusco.' },
  { year: '2020', title: 'Expansion', desc: 'Lanzamiento de nuestra coleccion de Vicuna.' },
  {
    year: 'Presente',
    title: 'Huella Global',
    desc: 'Presencia en las principales capitales del mundo.',
  },
];

export default function AboutTimeline() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.track}>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.year}>{item.year}</span>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
