import { useEffect } from 'react';
import useClientsStore from '@/stores/useClientsStore';
import styles from './CrmDashboard.module.css';

export default function CrmDashboard() {
  const { clients, meta, loading, fetchAll } = useClientsStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard CRM Clientes</h2>
          <p className={styles.pageDesc}>Resumen de relaciones comerciales — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando clientes CRM desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Clientes Destacados ({meta.total || clients.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Empresa</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay clientes registrados en PostgreSQL.</td>
                  </tr>
                ) : (
                  clients.map((c) => (
                    <tr key={c.id} className={styles.tableRow}>
                      <td>{c.name}</td>
                      <td>{c.company || 'N/A'}</td>
                      <td>{c.email}</td>
                      <td>{c.type || 'B2B'}</td>
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
