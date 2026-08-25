import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCatalogStore from '@/stores/useCatalogStore';
import styles from './ProductList.module.css';

const statusStyles = {
  active: { bg: '#e8f5e9', text: '#2e7d32' },
  draft: { bg: '#fff3e0', text: '#e65100' },
  archived: { bg: '#ffdad6', text: '#ba1a1a' },
  Activo: { bg: '#e8f5e9', text: '#2e7d32' },
  Oculto: { bg: '#fbddc3', text: '#705a46' },
  Descontinuado: { bg: '#ffdad6', text: '#ba1a1a' },
};

function getStockLabel(stock) {
  if (stock === 0) return { text: 'Stock Out', color: 'var(--color-error)' };
  if (stock <= 20) return { text: 'Crítico', color: 'var(--color-error)' };
  if (stock <= 50) return { text: 'Bajo', color: 'var(--color-warning)' };
  return { text: 'In Stock', color: 'var(--color-primary)' };
}

export default function ProductList() {
  const { products, meta, loading, error, fetchAll } = useCatalogStore();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage, q: search || undefined });
  }, [fetchAll, page, perPage, search]);

  const handleMasterCheck = (e) => {
    if (e.target.checked) {
      setSelected(products.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  const handleRowCheck = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected = products.length > 0 && selected.length === products.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <div className={styles.page}>
      {/* Breadcrumbs & Header Actions */}
      <div className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <Link to="/catalog" className={styles.breadcrumbLink}>Catálogo</Link>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Productos</span>
          </nav>
          <h2 className={styles.pageTitle}>Catálogo de Productos</h2>
          <p className={styles.pageDesc}>Gestión centralizada del catálogo textil — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline} onClick={() => fetchAll({ page, perPage, q: search })}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            Refrescar
          </button>
          <Link to="/catalog/productos/nuevo" className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Crear Producto
          </Link>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-on-surface-variant)', fontSize: 18 }}>search</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar por SKU o nombre de producto..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Status Messages: Loading, Error, Empty */}
      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando catálogo de productos desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar backend API
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px border var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>inventory_2</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No se encontraron productos</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>
            {search ? `No hay resultados para la búsqueda "${search}".` : 'No existen productos registrados en la base de datos PostgreSQL.'}
          </p>
        </div>
      )}

      {/* Data Table */}
      {!loading && !error && products.length > 0 && (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thCheck}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={allSelected}
                      ref={(el) => { if (el) el.indeterminate = someSelected; }}
                      onChange={handleMasterCheck}
                    />
                  </th>
                  <th className={styles.th}>Imagen</th>
                  <th className={styles.th}>SKU</th>
                  <th className={styles.th}>Producto</th>
                  <th className={`${styles.th} ${styles.thCenter}`}>Estado</th>
                  <th className={styles.th}>Stock</th>
                  <th className={styles.th}>Precio</th>
                  <th className={styles.thRight}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const stockLabel = getStockLabel(product.stock || 0);
                  const statusStyle = statusStyles[product.status] || { bg: '#e8f5e9', text: '#2e7d32' };

                  return (
                    <tr
                      key={product.id}
                      className={`${styles.tr} ${selected.includes(product.id) ? styles.trSelected : ''}`}
                    >
                      <td className={styles.tdCheck}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={selected.includes(product.id)}
                          onChange={() => handleRowCheck(product.id)}
                        />
                      </td>
                      <td className={styles.td}>
                        <div className={styles.productImage}>
                          {product.image ? (
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-outline)' }}>inventory_2</span>
                          )}
                        </div>
                      </td>
                      <td className={styles.tdSku}>{product.sku || `SKU-${product.id}`}</td>
                      <td className={styles.tdProduct}>
                        <p className={styles.productName}>{product.name}</p>
                      </td>
                      <td className={`${styles.td} ${styles.tdCenter}`}>
                        <span className={styles.statusBadge} style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                          {product.status || 'Activo'}
                        </span>
                      </td>
                      <td className={styles.tdStock}>
                        <div className={styles.stockBar}>
                          <div className={styles.stockBarInfo}>
                            <span>{product.stock || 0} u.</span>
                            <span className={styles.stockLabel} style={{ color: stockLabel.color }}>
                              {stockLabel.text}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.tdPrice}>$ {Number(product.price || 0).toFixed(2)}</td>
                      <td className={styles.tdActions}>
                        <div className={styles.actionBtns}>
                          <button className={styles.actionBtn} style={{ color: 'var(--color-primary)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <footer className={styles.pagination}>
            <div className={styles.paginationLeft}>
              <p className={styles.paginationInfo}>
                Mostrando <strong>{products.length}</strong> de <strong>{meta.total || products.length}</strong> productos
              </p>
              <div className={styles.perPage}>
                <span>Por página:</span>
                <select
                  className={styles.perPageSelect}
                  value={perPage}
                  onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            <div className={styles.paginationRight}>
              <button
                className={styles.pageBtn}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                Página {page} de {meta.totalPages || 1}
              </span>
              <button
                className={styles.pageBtn}
                disabled={page >= (meta.totalPages || 1)}
                onClick={() => setPage((p) => p + 1)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
