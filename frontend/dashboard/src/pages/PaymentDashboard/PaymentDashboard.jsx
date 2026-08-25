import { useEffect } from 'react';
import usePaymentsStore from '@/stores/usePaymentsStore';
import styles from './PaymentDashboard.module.css';

export default function PaymentDashboard() {
  const { transactions, meta, loading, fetchAll } = usePaymentsStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard de Pagos</h2>
          <p className={styles.pageDesc}>Resumen financiero y conciliaciones — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando datos financieros desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Cobros y Transacciones Recientes ({meta.total || transactions.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Transacción</th>
                  <th>Método</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay cobros en PostgreSQL.</td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr key={t.id} className={styles.tableRow}>
                      <td>{t.transactionId || `#PAY-${t.id}`}</td>
                      <td>{t.method || 'Visa'}</td>
                      <td>$ {Number(t.amount || 0).toFixed(2)}</td>
                      <td>{t.status || 'COMPLETADO'}</td>
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
