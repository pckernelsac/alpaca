import { useEffect, useState } from 'react';
import useLogisticsStore from '@/stores/useLogisticsStore';
import styles from './ShipmentList.module.css';

const statusBadgeMap = {
  in_transit: { label: 'En Tránsito', class: 'transit' },
  delivered: { label: 'Entregado', class: 'delivered' },
  pending: { label: 'Pendiente', class: 'ready' },
  delayed: { label: 'Retrasado', class: 'delayed' },
};

export default function ShipmentList() {
  const { shipments, meta, loading, error, fetchAll } = useLogisticsStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage, q: search || undefined });
  }, [fetchAll, page, perPage, search]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Gestión de Envíos y Logística</h2>
          <p className={styles.pageDesc}>Trazabilidad de guías de remisión y despachos — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={() => fetchAll({ page, perPage, q: search })}>
            <span className="material-symbols-outlined">refresh</span>
            Refrescar
          </button>
        </div>
      </section>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando guías de envío desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar envíos logísticos del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && shipments.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>local_shipping</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen guías de envío registradas</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay despachos cargados en la base de datos PostgreSQL.</p>
        </div>
      )}

      {!loading && !error && shipments.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Guía (Waybill)</th>
                  <th>ID Pedido</th>
                  <th>Transportista</th>
                  <th>Ciudad Origen ➔ Destino</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => {
                  const st = statusBadgeMap[s.status] || { label: s.status || 'Enviado', class: 'transit' };
                  return (
                    <tr key={s.id} className={styles.tableRow}>
                      <td className={styles.cellWaybill}>{s.waybill || `#GUI-${s.id}`}</td>
                      <td className={styles.cellBody}>Pedido #{s.orderId || 'N/A'}</td>
                      <td className={styles.cellBody}>{s.carrier || 'DHL Express'}</td>
                      <td className={styles.cellBody}>
                        {s.originCity || 'Lima'} ➔ {s.destinationCity || 'Destino'}
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[`status${st.class}`]}`}>{st.label}</span>
                      </td>
                      <td className={styles.cellBody}>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.tableToolbar}>
            <div className={styles.tablePagination}>
              <span className={styles.paginationInfo}>
                Mostrando <strong>{shipments.length}</strong> de <strong>{meta.total || shipments.length}</strong> guías de envío
              </span>
              <div className={styles.paginationButtons}>
                <button className={styles.paginationBtn} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                  Página {page} de {meta.totalPages || 1}
                </span>
                <button className={styles.paginationBtn} disabled={page >= (meta.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
