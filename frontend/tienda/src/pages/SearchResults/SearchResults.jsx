import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import styles from './SearchResults.module.css';

const products = [
  { id: 1, image: '', title: 'Bufanda de Vicuña', subtitle: 'Mezcla de Vicuña', price: 850 },
  { id: 2, image: '', title: 'Poncho Andino Bruma', subtitle: 'Mezcla de Vicuña', price: 1250 },
  { id: 3, image: '', title: 'Abrigo Heritage', subtitle: '100% Vicuña', price: 8450 },
];

export default function SearchResults() {
  const { query } = useParams();
  const decodedQuery = query ? decodeURIComponent(query) : '';

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
          {decodedQuery ? "Resultados para '" + decodedQuery + "'" : 'Resultados de busqueda'}
        </h1>
        <p className={styles.count}>{products.length} producto(s) encontrados</p>
      </header>
      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((p) => (
            <Link key={p.id} to={'/product/' + p.id} className={styles.card}>
              <div className={styles.cardImg} />
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardSub}>{p.subtitle}</p>
              <p className={styles.cardPrice}>${p.price}.00</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--color-text-light)' }}>search</span>
          <h3 className={styles.emptyTitle}>No se encontraron resultados</h3>
          <p className={styles.emptyDesc}>No encontramos resultados para "{decodedQuery}". Intenta con otros terminos.</p>
        </div>
      )}
    </div>
  );
}
