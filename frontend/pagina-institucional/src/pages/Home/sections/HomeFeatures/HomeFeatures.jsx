import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './HomeFeatures.module.css';

const items = [
  {
    icon: 'spa',
    title: 'Baby Alpaca',
    desc: 'Seleccionada por su finura extrema y propiedades termicas, superando al cachemir tanto en calidez como en ligereza.',
  },
  {
    icon: 'water_drop',
    title: 'Origen Trazable',
    desc: 'Cada fibra es rastreada desde los remotos rebanyos andinos hasta nuestro telar final, garantizando un tratamiento etico y calidad superior.',
  },
  {
    icon: 'eco',
    title: 'Paleta Natural',
    desc: 'Priorizamos las fibras sin tenir, celebrando los 22 tonos naturales de la alpaca, desde el blanco nube hasta el negro obsidiana.',
  },
];

export default function HomeFeatures() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Eyebrow>NOBLEZA INIGUALABLE</Eyebrow>
          <h2 className={styles.title}>El Oro de los Andes</h2>
        </div>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              <span className={[styles.icon, 'material-symbols-outlined'].join(' ')}>
                {item.icon}
              </span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
