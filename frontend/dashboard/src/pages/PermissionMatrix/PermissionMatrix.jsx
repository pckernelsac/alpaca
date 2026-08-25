import { useEffect, useState } from 'react';
import { iamRepository } from '@/repositories/api';
import styles from './PermissionMatrix.module.css';

export default function PermissionMatrix() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const rolesRes = await iamRepository.getRoles();
        const permsRes = await iamRepository.getPermissions();
        setRoles(rolesRes?.data || (Array.isArray(rolesRes) ? rolesRes : []));
        setPermissions(permsRes?.data || (Array.isArray(permsRes) ? permsRes : []));
      } catch (err) {
        setError(err?.message || 'Error al cargar matriz de permisos IAM');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await iamRepository.saveMatrix({ permissions });
      alert('Matriz de permisos guardada exitosamente.');
    } catch (err) {
      alert('Error al guardar matriz: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.stickyHeader}>
        <div className={styles.headerRow}>
          <div className={styles.headerTitle}>
            <div className={styles.headerAccent} />
            <div>
              <h1 className={styles.title}>Matriz de Permisos RBAC</h1>
              <p className={styles.subtitle}>Gestión granular de accesos por rol — Conectado a Backend NestJS API.</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
              <span className="material-symbols-outlined">save</span>
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando matriz de permisos desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar matriz de permisos del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.matrixContainer}>
          <table className={styles.matrixTable}>
            <thead>
              <tr className={styles.stickyRow}>
                <th className={`${styles.thFirst} ${styles.stickyCol}`}>
                  <span className={styles.thLabel}>Módulos & Permisos</span>
                </th>
                {roles.length === 0 ? (
                  <th className={styles.thRole}>Rol General</th>
                ) : (
                  roles.map((r) => (
                    <th key={r.id} className={styles.thRole}>
                      <div className={styles.thRoleName}>{r.name}</div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {permissions.length === 0 ? (
                <tr>
                  <td colSpan={roles.length + 1} style={{ textAlign: 'center', padding: 30, color: 'var(--color-on-surface-variant)' }}>
                    No hay permisos registrados en PostgreSQL actualmente.
                  </td>
                </tr>
              ) : (
                permissions.map((perm) => (
                  <tr key={perm.id} className={styles.permRow}>
                    <td className={`${styles.permCell} ${styles.stickyCol}`}>
                      <div className={styles.permInfo}>
                        <span className={styles.permName}>{perm.name || perm.action || `Permiso #${perm.id}`}</span>
                        <span className={styles.permDesc}>{perm.description || perm.module || 'Módulo ERP'}</span>
                      </div>
                    </td>
                    {roles.length === 0 ? (
                      <td className={styles.checkCell}>
                        <input type="checkbox" className={styles.checkbox} defaultChecked />
                      </td>
                    ) : (
                      roles.map((r) => (
                        <td key={r.id} className={styles.checkCell}>
                          <input type="checkbox" className={styles.checkbox} defaultChecked />
                        </td>
                      ))
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
