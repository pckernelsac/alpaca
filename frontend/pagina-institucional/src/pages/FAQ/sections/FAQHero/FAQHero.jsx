import { useState } from 'react';
import styles from './FAQHero.module.css';

export default function FAQHero({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <h1 className={styles.title}>Centro de Ayuda</h1>
        <p className={styles.subtitle}>Descubra las respuestas a sus inquietudes sobre nuestra artesania, materiales y procesos de entrega exclusivos.</p>
        <div className={styles.searchWrap}>
          <input className={styles.input} value={query} onChange={handleChange} placeholder="Como podemos asistirle hoy?" type="text" />
          <span className={[styles.searchIcon, "material-symbols-outlined"].join(' ')}>search</span>
        </div>
      </div>
    </section>
  );
}
