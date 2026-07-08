import styles from './FAQCategory.module.css';

const categories = [
  { icon: 'inventory_2', label: 'PRODUCTOS', id: 'productos' },
  { icon: 'texture', label: 'MATERIALES', id: 'materiales' },
  { icon: 'local_shipping', label: 'ENVIOS', id: 'envios' },
  { icon: 'support_agent', label: 'CONTACTO', id: 'contacto' },
];

export default function FAQCategory({ onSelect }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onSelect) onSelect(id);
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <button key={i} className={styles.btn} onClick={() => scrollTo(cat.id)}>
              <span className={[styles.icon, 'material-symbols-outlined'].join(' ')}>
                {cat.icon}
              </span>
              <h3 className={styles.label}>{cat.label}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
