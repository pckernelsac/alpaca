import styles from './Sort.module.css';

const options = [
  { value: 'popular', label: 'Mas Populares' },
  { value: 'newest', label: 'Mas Recientes' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' },
];

export default function Sort({ value = 'popular', onChange, className = '' }) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <label className={styles.label}>Ordenar por:</label>
      <select className={styles.select} value={value} onChange={(e) => onChange && onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}