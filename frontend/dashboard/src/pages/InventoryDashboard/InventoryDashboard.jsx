import { useEffect } from 'react';
import useInventoryStore from '@/stores/useInventoryStore';
import styles from './InventoryDashboard.module.css';

export default function InventoryDashboard() {
  const { items, meta, loading, fetchAll } = useInventoryStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard de Inventario</h2>
          <p className={styles.pageDesc}>Resumen de existencias y control físico — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando inventario desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Resumen de Existencias ({meta.total || items.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ítem ID</th>
                  <th>Producto ID</th>
                  <th>Stock Físico</th>
                  <th>Stock Mínimo</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay existencias en PostgreSQL.</td>
                  </tr>
                ) : (
                  items.map((i) => (
                    <tr key={i.id} className={styles.tableRow}>
                      <td>#STK-{i.id}</td>
                      <td>Producto #{i.productId || 'N/A'}</td>
                      <td>{i.quantity || 0} und.</td>
                      <td>{i.minStock || 0} und.</td>
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
