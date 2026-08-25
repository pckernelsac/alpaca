import { useEffect, useState } from 'react';
import useCmsStore from '@/stores/useCmsStore';
import styles from './ContentList.module.css';

export default function ContentList() {
  const { contents, meta, loading, error, fetchAll } = useCmsStore();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage });
  }, [fetchAll, page, perPage]);

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Gestión de Contenido CMS</h2>
          <p className={styles.pageDesc}>Administración de páginas y artículos del portal — Conectado a Backend NestJS API.</p>
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
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando contenidos CMS desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar contenidos CMS del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && contents.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>article</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen contenidos CMS registrados</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay artículos ni páginas registradas en la base de datos PostgreSQL.</p>
        </div>
      )}

      {!loading && !error && contents.length > 0 && (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Slug / URL</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  <td>
                    <p className={styles.titleText}>{item.title}</p>
                  </td>
                  <td className={styles.titleSlug}>{item.slug || `/page/${item.id}`}</td>
                  <td>
                    <span className={styles.typeBadge} style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                      {item.type || 'Página'}
                    </span>
                  </td>
                  <td>
                    <span className={styles.statusBadge} style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
                      {item.status || 'Publicado'}
                    </span>
                  </td>
                  <td className={styles.tdDate}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              Mostrando <strong>{contents.length}</strong> de <strong>{meta.total || contents.length}</strong> contenidos
            </span>
            <div className={styles.paginationBtns}>
              <button className={styles.pageBtn} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                Página {page} de {meta.totalPages || 1}
              </span>
              <button className={styles.pageBtn} disabled={page >= (meta.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
