import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '@/hooks';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid({ categoryId, categoryName = 'Productos' }) {
  const { products, fetch, loading } = useCatalog();

  useEffect(() => {
    if (categoryId) {
      fetch({ categoryId });
    } else {
      fetch({});
    }
  }, [categoryId]);

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h3 className={styles.filterTitle}>Categorías</h3>
        <Link to="/category/ponchos" className={styles.filterOpt}>Ponchos</Link>
        <Link to="/category/chompas" className={styles.filterOpt}>Chompas</Link>
        <Link to="/category/bufandas" className={styles.filterOpt}>Bufandas</Link>
        <Link to="/category/accesorios" className={styles.filterOpt}>Accesorios</Link>
        <Link to="/category/abrigos" className={styles.filterOpt}>Abrigos</Link>
      </aside>
      <div className={styles.main}>
        {loading && <p className={styles.count}>Cargando productos...</p>}
        {!loading && products.length === 0 && <p className={styles.count}>No hay productos en esta categoría.</p>}
        <div className={styles.grid}>
          {products.map((p) => {
            const imgSrc = p.image || (p.images && p.images[0]) || '';
            const price = p.price ?? (p.variants && p.variants[0]?.price) ?? null;
            return (
              <div key={p.id} className={styles.card}>
                <Link to={'/product/' + p.id} className={styles.cardLink}>
                  <div className={styles.cardImg} style={imgSrc ? { backgroundImage: 'url(' + imgSrc + ')', backgroundSize: 'cover', backgroundPosition: 'center' } : {}} />
                  <h3 className={styles.cardTitle}>{p.name || p.title}</h3>
                  {p.subtitle && <p className={styles.cardSub}>{p.subtitle}</p>}
                  {price && <p className={styles.cardPrice}>S/ {Number(price).toFixed(2)}</p>}
                </Link>
                <Link to={'/product/' + p.id} className={styles.addBtn}>Ver Detalle</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
