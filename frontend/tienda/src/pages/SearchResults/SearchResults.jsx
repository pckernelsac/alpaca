import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCatalog } from '@/hooks';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import styles from './SearchResults.module.css';

export default function SearchResults() {
  const { query } = useParams();
  const decodedQuery = query ? decodeURIComponent(query).toLowerCase() : '';
  const { products, fetch } = useCatalog();

  useEffect(() => { if (decodedQuery) fetch({ search: decodedQuery }); }, [decodedQuery]);

  const crumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Buscar', path: '/search' },
    { label: decodedQuery ? '"' + decodedQuery + '"' : 'Busqueda', path: '' },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Breadcrumb items={crumbs} />
        <h1 className={styles.title}>Resultados para &quot;{decodedQuery}&quot;</h1>
        <p className={styles.count}>{products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}</p>
        <div className={styles.grid}>
          {products.map((p) => (
            <Link key={p.id} to={'/product/' + p.id} className={styles.card}>
              <img src={p.image || p.images?.[0]} alt={p.name || p.title} className={styles.img} />
              <div className={styles.info}>
                <h3 className={styles.name}>{p.name || p.title}</h3>
                <p className={styles.subtitle}>{p.subtitle || p.description}</p>
                <span className={styles.price}>${(p.price || 0).toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
        {products.length === 0 && <p style={{ textAlign: 'center', padding: 40, color: '#888' }}>No se encontraron productos.</p>}
      </div>
    </div>
  );
}
