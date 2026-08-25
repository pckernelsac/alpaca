import { useEffect } from 'react';
import useOrdersStore from '@/stores/useOrdersStore';
import styles from './OrderDashboard.module.css';

export default function OrderDashboard() {
  const { orders, meta, loading, fetchAll } = useOrdersStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard de Pedidos</h2>
          <p className={styles.pageDesc}>Resumen comercial y ventas — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando resumen de pedidos desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Últimos Pedidos Registrados ({meta.total || orders.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay pedidos en la base de datos PostgreSQL.</td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className={styles.tableRow}>
                      <td>{o.orderNumber || `#ORD-${o.id}`}</td>
                      <td>{o.customerName || `Cliente #${o.customerId || 'N/A'}`}</td>
                      <td>$ {Number(o.total || 0).toFixed(2)}</td>
                      <td>{o.status}</td>
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
