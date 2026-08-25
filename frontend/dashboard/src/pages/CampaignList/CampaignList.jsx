import { useEffect, useState } from 'react';
import useMarketingStore from '@/stores/useMarketingStore';
import styles from './CampaignList.module.css';

export default function CampaignList() {
  const { campaigns, meta, loading, error, fetchAll } = useMarketingStore();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage });
  }, [fetchAll, page, perPage]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h1 className={styles.pageTitle}>Gestión de Marketing</h1>
          <p className={styles.pageDesc}>Control centralizado de estrategias comerciales — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={() => fetchAll({ page, perPage })}>
            <span className="material-symbols-outlined">refresh</span>
            Refrescar
          </button>
        </div>
      </section>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando campañas promocionales desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar campañas del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && campaigns.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>campaign</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen campañas registradas</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay campañas promocionales cargadas en la base de datos PostgreSQL.</p>
        </div>
      )}

      {!loading && !error && campaigns.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Campaña</th>
                  <th>Tipo</th>
                  <th>Canal</th>
                  <th>Presupuesto</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className={styles.tableRow}>
                    <td className={styles.campaignName}>{c.name}</td>
                    <td className={styles.cellMono}>{c.type || 'General'}</td>
                    <td>
                      <span className={styles.channelBadge}>{c.channel || 'E-commerce'}</span>
                    </td>
                    <td className={styles.cellMono}>$ {Number(c.budget || 0).toFixed(2)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles.active}`}>{c.status || 'Activa'}</span>
                    </td>
                    <td className={styles.cellMuted}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              Mostrando <strong>{campaigns.length}</strong> de <strong>{meta.total || campaigns.length}</strong> campañas
            </span>
            <div className={styles.paginationBtns}>
              <button className={styles.pageBtn} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Anterior
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                Página {page} de {meta.totalPages || 1}
              </span>
              <button className={styles.pageBtn} disabled={page >= (meta.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
