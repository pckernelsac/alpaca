import { useEffect, useState } from 'react';
import { iamRepository } from '@/repositories/api';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import styles from './RoleList.module.css';

export default function RoleList() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const res = await iamRepository.getRoles({ q: search || undefined });
        const list = res?.data || (Array.isArray(res) ? res : []);
        setRoles(list);
      } catch (err) {
        setError(err?.message || 'Error al cargar roles IAM desde backend');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search]);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Gestión de Roles RBAC"
        description="Define y administra roles y responsabilidades de los usuarios en la plataforma ERP."
      >
        <button className={styles.btnPrimary} onClick={() => setSearch('')}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </PageHeader>

      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar roles por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando roles IAM desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar roles del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && roles.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>admin_panel_settings</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen roles registrados</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay roles IAM configurados en la base de datos PostgreSQL.</p>
        </div>
      )}

      {!loading && !error && roles.length > 0 && (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>ID Rol</th>
                <th className={styles.th}>Nombre del Rol</th>
                <th className={styles.th}>Descripción</th>
                <th className={styles.th}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className={styles.tr}>
                  <td className={styles.td}>#ROL-{role.id}</td>
                  <td className={styles.td}>
                    <p className={styles.roleName}>{role.name}</p>
                  </td>
                  <td className={styles.td}>
                    <p className={styles.desc}>{role.description || 'Sin descripción'}</p>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.statusBadge} ${styles.status_active}`}>
                      <span className={styles.statusDot} />
                      {role.status || 'Activo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
