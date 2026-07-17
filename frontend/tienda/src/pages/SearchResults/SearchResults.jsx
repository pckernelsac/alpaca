import { useParams, Link } from 'react-router-dom';
import { products as allProducts } from '@/mocks';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import styles from './SearchResults.module.css';

export default function SearchResults() {
  const { query } = useParams();
  const decodedQuery = query ? decodeURIComponent(query).toLowerCase() : '';

  const products = decodedQuery
    ? allProducts.filter(p => p.title.toLowerCase().includes(decodedQuery) || p.subtitle.toLowerCase().includes(decodedQuery))
    : allProducts;

  const crumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Buscar', path: '/search' },
    { label: decodedQuery ? '"' + decodedQuery + '"' : 'Busqueda', path: '' },
  ];

  return (
    <div className={styles.wrapper}>
      <Breadcrumb items={crumbs} />
      <header className={styles.header}>
        <h1 className={styles.title}>
          {decodedQuery ? 'Resultados para "' + decodedQuery + '"' : 'Resultados de busqueda'}
        </h1>
        <p className={styles.count}>{products.length} producto(s) encontrados</p>
      </header>
      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((p) => (
            <Link key={p.id} to={'/product/' + p.id} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={p.image} alt={p.title} className={styles.img} loading="lazy" />
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{p.subtitle}</p>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.price}>${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span className="material-symbols-outlined">search_off</span>
          <p>No se encontraron resultados para &ldquo;{decodedQuery}&rdquo;</p>
          <Link to="/" className={styles.backBtn}>Volver al inicio</Link>
        </div>
      )}
    </div>
  );
}


