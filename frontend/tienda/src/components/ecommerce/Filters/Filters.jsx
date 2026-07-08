import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './Filters.module.css';

const defaultSections = [
  { id: 'category', label: 'Categoria', type: 'list', options: ['Ponchos', 'Chompas', 'Bufandas', 'Accesorios', 'Abrigos'] },
  { id: 'material', label: 'Material', type: 'checkbox', options: ['Baby Alpaca', 'Vicuña', 'Alpaca Real', 'Suri'] },
  { id: 'color', label: 'Color', type: 'swatch', options: ['#2F2A25', '#8B6B3F', '#C79A4B', '#FAF8F5', '#6B645E', '#7BAE6B'] },
  { id: 'size', label: 'Talla', type: 'grid', options: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'price', label: 'Precio', type: 'list', options: ['Menos de S/200', 'S/200 - S/500', 'S/500 - S/1000', 'Mas de S/1000'] },
];

export default function Filters({ sections = defaultSections, onFilter, className = '' }) {
  const [openSections, setOpenSections] = useState(sections.map((s) => s.id));
  const toggle = (id) => setOpenSections((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  return (
    <div className={[styles.filters, className].filter(Boolean).join(' ')}>
      {sections.map((sec) => (
        <div key={sec.id} className={styles.section}>
          <button className={styles.header} onClick={() => toggle(sec.id)}>
            <span className={styles.label}>{sec.label}</span>
            <FiChevronDown className={[styles.arrow, openSections.includes(sec.id) ? styles.open : ''].filter(Boolean).join(' ')} size={16} />
          </button>
          {openSections.includes(sec.id) && (
            <div className={styles.body}>
              {sec.type === 'list' && sec.options.map((opt) => (
                <button key={opt} className={styles.option} onClick={() => onFilter && onFilter(sec.id, opt)}>{opt}</button>
              ))}
              {sec.type === 'checkbox' && sec.options.map((opt) => (
                <label key={opt} className={styles.checkbox}><input type="checkbox" /><span>{opt}</span></label>
              ))}
              {sec.type === 'swatch' && (
                <div className={styles.swatches}>
                  {sec.options.map((color) => (
                    <button key={color} className={styles.swatch} style={{ background: color }} aria-label={color} />
                  ))}
                </div>
              )}
              {sec.type === 'grid' && (
                <div className={styles.grid}>
                  {sec.options.map((opt) => (
                    <button key={opt} className={styles.gridBtn}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}