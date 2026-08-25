import { useEffect } from 'react';
import useCmsStore from '@/stores/useCmsStore';
import styles from './CmsDashboard.module.css';

export default function CmsDashboard() {
  const { contents, meta, loading, fetchAll } = useCmsStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard CMS</h2>
          <p className={styles.pageDesc}>Resumen de artículos y publicaciones institucionales — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando contenidos CMS desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Publicaciones CMS Recientes ({meta.total || contents.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Slug</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {contents.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay contenidos CMS en PostgreSQL.</td>
                  </tr>
                ) : (
                  contents.map((c) => (
                    <tr key={c.id} className={styles.tableRow}>
                      <td>{c.title}</td>
                      <td>{c.slug || `/page/${c.id}`}</td>
                      <td>{c.type || 'Página'}</td>
                      <td>{c.status || 'PUBLICADO'}</td>
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
