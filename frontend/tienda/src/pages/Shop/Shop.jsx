import { useEffect, useState } from 'react';
import { useCatalog, useCart, useWishlist } from '@/hooks';
import ProductGrid from '@/components/ecommerce/ProductGrid/ProductGrid';
import SEO from '@/components/common/SEO/SEO';
import styles from './Shop.module.css';

export default function Shop() {
  const { products, loading, error, fetch } = useCatalog();
  const { addItem: addToCart } = useCart();
  const { toggle: toggleWishlist } = useWishlist();
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    fetch({ page, perPage });
  }, [fetch, page]);

  return (
    <div className={styles.container}>
      <SEO title="Tienda — Catálogo General" description="Explora la colección completa de productos de alpaca y vicuña de Alpacart." />

      <header className={styles.header}>
        <h1 className={styles.title}>Catálogo de Productos</h1>
        <p className={styles.description}>
          Prendas y textiles exclusivos elaborados artesanalmente con las fibras más finas de los Andes.
        </p>
      </header>

      {loading && (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando catálogo de productos...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'var(--color-error-container)', borderRadius: 12, color: 'var(--color-error)', margin: '20px 0' }}>
          <h4>Error al cargar el catálogo</h4>
          <p>{error?.message || 'No se pudo conectar con el servidor.'}</p>
        </div>
      )}

      {!loading && !error && (
        <main>
          <ProductGrid
            products={products}
            columns={3}
            onAddToCart={(product) => addToCart({ productId: product.id, quantity: 1, title: product.name, price: product.price })}
            onToggleWishlist={(product) => toggleWishlist(product.id)}
          />

          {products.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 40 }}>
              <button
                className={styles.paginationBtn}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--color-outline)',
                  backgroundColor: 'var(--color-surface)',
                  cursor: page <= 1 ? 'not-allowed' : 'pointer',
                  opacity: page <= 1 ? 0.5 : 1,
                }}
              >
                Anterior
              </button>
              <span style={{ fontWeight: 500 }}>Página {page}</span>
              <button
                className={styles.paginationBtn}
                disabled={products.length < perPage}
                onClick={() => setPage((p) => p + 1)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--color-outline)',
                  backgroundColor: 'var(--color-surface)',
                  cursor: products.length < perPage ? 'not-allowed' : 'pointer',
                  opacity: products.length < perPage ? 0.5 : 1,
                }}
              >
                Siguiente
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
}