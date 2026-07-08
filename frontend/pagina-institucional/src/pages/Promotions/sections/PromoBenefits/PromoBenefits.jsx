import styles from './PromoBenefits.module.css';

const items = [
  {
    icon: 'public',
    title: 'Envios Globales',
    desc: 'Logistica premium para asegurar que su pieza llegue impecable a cualquier rincon del mundo.',
  },
  {
    icon: 'featured_seasonal_and_gifts',
    title: 'Empaque Artesanal',
    desc: 'Cada orden es envuelta a mano en materiales biodegradables con sellos de autenticidad.',
  },
  {
    icon: 'support_agent',
    title: 'Conserje Personalizado',
    desc: 'Asesoria experta en tallas, cuidado de fibras y personalizacion de pedidos especiales.',
  },
];

export default function PromoBenefits() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {items.map((item, i) => (
          <div key={i} className={styles.card}>
            <span className={[styles.icon, 'material-symbols-outlined'].join(' ')}>
              {item.icon}
            </span>
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
