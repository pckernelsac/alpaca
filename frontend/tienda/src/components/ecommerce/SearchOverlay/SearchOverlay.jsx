import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import logo from '@/assets/images/logo.png';
import styles from './SearchOverlay.module.css';

const trendingTags = ['Vicuña', 'Baby Alpaca', 'Ponchos', 'Bufandas', 'Colección Invierno'];
const quickLinks = [
  { label: 'Nuevos lanzamientos', to: '/category/new' },
  { label: 'Los más vendidos', to: '/category/bestsellers' },
  { label: 'Serie Artesanal', to: '/collection' },
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = '/search/' + encodeURIComponent(query.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.logo}><img src={logo} alt="ALPACART" className={styles.logoImg} /></span>
          <button className={styles.closeBtn} onClick={onClose}>
            Cerrar <FiX size={16} />
          </button>
        </header>
        <div className={styles.canvas}>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.inputWrap}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-text-light)' }}>search</span>
              <input ref={inputRef} className={styles.input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busca en nuestras colecciones..." />
            </div>
          </form>
          <div className={styles.suggestions}>
            <div>
              <h4 className={styles.sectionTitle}>Tendencias</h4>
              <div className={styles.tags}>
                {trendingTags.map((tag) => (
                  <Link key={tag} to={'/search/' + encodeURIComponent(tag)} className={styles.tag} onClick={onClose}>{tag}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className={styles.sectionTitle}>Accesos directos</h4>
              <div className={styles.links}>
                {quickLinks.map((link) => (
                  <Link key={link.to} to={link.to} className={styles.link} onClick={onClose}>{link.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}