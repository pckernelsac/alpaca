import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '@/hooks';
import styles from './NewArrivals.module.css';

export default function NewArrivals() {
  const scrollRef = useRef(null);
  const { products, loading, error, fetch } = useCatalog();

  useEffect(() => {
    fetch({ sort: 'createdAt', order: 'DESC', perPage: 6 });
  }, [fetch]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Lo Mejor de la Temporada</span>
          <h2 className={styles.title}>Nuevos Lanzamientos</h2>
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scroll(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className={styles.arrow} onClick={() => scroll(1)}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-on-surface-variant)' }}>
          Cargando nuevos lanzamientos...
        </div>
      )}

      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--color-error, #b91c1c)' }}>
          No se pudieron cargar los nuevos lanzamientos.
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-on-surface-variant)' }}>
          No hay productos nuevos disponibles en este momento.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className={styles.track} ref={scrollRef}>
          {products.map((p) => {
            const priceVal = p.variants?.[0]?.price || p.price || 0;
            const imgUrl = p.media?.[0]?.url || p.images?.[0] || p.img || '';

            return (
              <Link key={p.id} to={`/product/${p.id}`} className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.cardImg}>
                  {imgUrl ? (
                    <img src={imgUrl} alt={p.name || p.title} className={styles.cardImgEl} loading="lazy" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface-variant)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>inventory_2</span>
                    </div>
                  )}
                  <span className={styles.badge}>NUEVO</span>
                </div>
                <h4 className={styles.cardTitle}>{p.name || p.title}</h4>
                <p className={styles.cardPrice}>$ {Number(priceVal).toFixed(2)}</p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}