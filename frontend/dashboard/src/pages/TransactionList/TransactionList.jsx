import { useEffect, useState } from 'react';
import usePaymentsStore from '@/stores/usePaymentsStore';
import styles from './TransactionList.module.css';

const statusMap = {
  succeeded: { label: 'Completado', bg: '#dcfce7', fg: '#166534' },
  completed: { label: 'Completado', bg: '#dcfce7', fg: '#166534' },
  pending: { label: 'Pendiente', bg: '#fef9c3', fg: '#854d0e' },
  failed: { label: 'Fallido', bg: '#fee2e2', fg: '#991b1b' },
  refunded: { label: 'Reembolsado', bg: '#f3f4f6', fg: '#4b5563' },
};

export default function TransactionList() {
  const { transactions, meta, loading, error, fetchAll } = usePaymentsStore();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage });
  }, [fetchAll, page, perPage]);

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Gestión de Pagos y Transacciones</h2>
          <p className={styles.pageDesc}>Auditoría de pasarelas de pago y cobros — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={() => fetchAll({ page, perPage })}>
            <span className="material-symbols-outlined">refresh</span>
            Refrescar
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando transacciones de pago desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar transacciones del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>payments</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen transacciones registradas</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay cobros en la base de datos PostgreSQL actualmente.</p>
        </div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Transacción</th>
                  <th>ID Pedido</th>
                  <th>Método</th>
                  <th>Monto</th>
                  <th>Moneda</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  const st = statusMap[tx.status] || { label: tx.status || 'Completado', bg: '#dcfce7', fg: '#166534' };
                  return (
                    <tr key={tx.id} className={styles.tableRow}>
                      <td className={styles.tdId}>{tx.transactionId || `#PAY-${tx.id}`}</td>
                      <td className={styles.tdOrder}>Pedido #{tx.orderId || 'N/A'}</td>
                      <td>
                        <span className={styles.methodBadge} style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                          {tx.method || 'Card'}
                        </span>
                      </td>
                      <td className={styles.tdAmount}>$ {Number(tx.amount || 0).toFixed(2)}</td>
                      <td className={styles.tdCurrency}>{tx.currency || 'USD'}</td>
                      <td>
                        <span className={styles.badge} style={{ backgroundColor: st.bg, color: st.fg }}>
                          {st.label}
                        </span>
                      </td>
                      <td className={styles.tdDate}>{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              Mostrando <strong>{transactions.length}</strong> de <strong>{meta.total || transactions.length}</strong> transacciones
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.pageBtn} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                Página {page} de {meta.totalPages || 1}
              </span>
              <button className={styles.pageBtn} disabled={page >= (meta.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
