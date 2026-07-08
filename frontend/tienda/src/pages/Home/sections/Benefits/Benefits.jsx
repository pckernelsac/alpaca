import styles from './Benefits.module.css';

const items = [
  { icon: 'public', title: 'Envíos Globales', desc: 'Entregas personalizadas a más de 50 países.' },
  { icon: 'eco', title: 'Origen Sostenible', desc: 'Comprometidos con la crianza ética y procesos carbono neutrales.' },
  { icon: 'brush', title: 'Hecho a Mano', desc: 'Cada pieza es tejida individualmente por maestros artesanos.' },
  { icon: 'inventory_2', title: 'Empaque de Lujo', desc: 'Presentado en estuches de fibra reciclada con protector de cedro.' },
];

export default function Benefits() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.card}>
            <span className={[styles.icon, 'material-symbols-outlined'].join(' ')}>{item.icon}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}