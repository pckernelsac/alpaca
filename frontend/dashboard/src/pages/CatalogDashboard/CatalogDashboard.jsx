import { useEffect } from 'react';
import useCatalogStore from '@/stores/useCatalogStore';
import styles from './CatalogDashboard.module.css';

export default function CatalogDashboard() {
  const { items, meta, loading, fetchAll } = useCatalogStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <span>Dashboard</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Catálogo de Productos</span>
          </nav>
          <h2 className={styles.pageTitle}>Gestión del Catálogo</h2>
          <p className={styles.pageDesc}>Resumen ejecutivo de productos y existencias — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            Refrescar
          </button>
        </div>
      </section>

      <section className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiContent}>
            <span className={styles.kpiLabel}>Total Productos</span>
            <h3 className={styles.kpiValue}>{loading ? '...' : meta.total || items.length}</h3>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiContent}>
            <span className={styles.kpiLabel}>Productos en Vista</span>
            <h3 className={styles.kpiValue}>{loading ? '...' : items.length}</h3>
          </div>
        </div>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando resumen de catálogo desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Productos Recientes en Catálogo</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre del Producto</th>
                  <th>SKU</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay productos registrados en PostgreSQL.</td>
                  </tr>
                ) : (
                  items.map((p) => (
                    <tr key={p.id} className={styles.tableRow}>
                      <td>{p.name}</td>
                      <td>{p.sku}</td>
                      <td>$ {Number(p.price || 0).toFixed(2)}</td>
                      <td>{p.stock || 0} und.</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
