import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import useUsersStore from '@/stores/useUsersStore';
import styles from './UserList.module.css';

function getInitials(name) {
  if (!name) return 'US';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function UserList() {
  const { users, meta, loading, error, fetchAll } = useUsersStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage, q: search || undefined });
  }, [fetchAll, page, perPage, search]);

  return (
    <div className={styles.container}>
      <PageHeader
        title="Gestión de Usuarios"
        description="Administra las cuentas de acceso de colaboradores — Conectado a Backend NestJS API."
      >
        <button className={styles.exportBtn} onClick={() => fetchAll({ page, perPage, q: search })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
        <Link to="/usuarios/nuevo" className={styles.createBtn}>
          <span className="material-symbols-outlined">add</span>
          Crear Usuario
        </Link>
      </PageHeader>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.searchWrapper}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar por nombre o correo electrónico..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando directorio de usuarios IAM desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar usuarios IAM del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>person_off</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No se encontraron usuarios</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>
            {search ? `No hay resultados para "${search}".` : 'No hay usuarios de staff en la base de datos PostgreSQL.'}
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && users.length > 0 && (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th className={styles.actionsCol}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isAct = u.status === 'active' || u.status === 'Activo';
                return (
                  <tr key={u.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>
                          <span>{getInitials(u.name)}</span>
                        </div>
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>{u.name}</span>
                          <span className={styles.userEmail}>{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.roleBadge}>
                        {u.role || 'Staff'}
                      </span>
                    </td>
                    <td className={styles.bodyMd}>{u.phone || 'Sin teléfono'}</td>
                    <td>
                      <div className={styles.statusCell}>
                        <span className={`${styles.statusDot} ${isAct ? styles.statusActivo : styles.statusInactivo}`} />
                        <span>{isAct ? 'Activo' : u.status || 'Inactivo'}</span>
                      </div>
                    </td>
                    <td className={styles.actionsCol}>
                      <button className={styles.actionBtn}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              Mostrando <strong>{users.length}</strong> de <strong>{meta.total || users.length}</strong> usuarios
            </span>
            <div className={styles.paginationButtons}>
              <button className={styles.pageArrow} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                Página {page} de {meta.totalPages || 1}
              </span>
              <button className={styles.pageArrow} disabled={page >= (meta.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
