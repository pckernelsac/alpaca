import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import useClientsStore from '@/stores/useClientsStore';
import styles from './ClientList.module.css';

const statusConfig = {
  active: { bg: '#e8f5e9', text: '#2e7d32', dot: '#22c55e', label: 'Activo' },
  inactive: { bg: '#f5f5f5', text: '#666', dot: '#9e9e9e', label: 'Inactivo' },
  Activo: { bg: '#e8f5e9', text: '#2e7d32', dot: '#22c55e', label: 'Activo' },
  Inactivo: { bg: '#f5f5f5', text: '#666', dot: '#9e9e9e', label: 'Inactivo' },
  VIP: { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b', label: 'VIP' },
};

const typeConfig = {
  retail: { bg: '#f3e8ff', text: '#7c3aed', label: 'Minorista' },
  wholesale: { bg: '#e3f2fd', text: '#1565c0', label: 'Mayorista' },
  Mayorista: { bg: '#e3f2fd', text: '#1565c0', label: 'Mayorista' },
  Minorista: { bg: '#f3e8ff', text: '#7c3aed', label: 'Minorista' },
};

function getInitials(name, company) {
  const n1 = name ? name[0] : 'C';
  const c1 = company ? company[0] : 'T';
  return (n1 + c1).toUpperCase();
}

export default function ClientList() {
  const { clients, meta, loading, error, fetchAll } = useClientsStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage, q: search || undefined });
  }, [fetchAll, page, perPage, search]);

  return (
    <div className={styles.container}>
      <PageHeader
        title="Clientes"
        description="Gestión centralizada de la base de clientes de Alpacart Textiles — Conectado a Backend NestJS API."
      >
        <button className={styles.exportBtn} onClick={() => fetchAll({ page, perPage, q: search })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
        <Link to="/crm/clientes/nuevo" className={styles.createBtn}>
          <span className="material-symbols-outlined">person_add</span>
          Crear Cliente
        </Link>
      </PageHeader>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.searchWrapper}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar por nombre, empresa o correo..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando directorio de clientes desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar clientes del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && clients.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>groups</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No se encontraron clientes</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>
            {search ? `No hay resultados para "${search}".` : 'No hay clientes registrados en la base de datos PostgreSQL.'}
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && clients.length > 0 && (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente / Empresa</th>
                <th>Contacto</th>
                <th>Tipo</th>
                <th className={styles.thCenter}>Estado</th>
                <th className={styles.actionsCol}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => {
                const st = statusConfig[c.status] || statusConfig.active;
                const tp = typeConfig[c.type] || typeConfig.retail;
                return (
                  <tr key={c.id}>
                    <td>
                      <div className={styles.clientCell}>
                        <div className={styles.avatar}>{getInitials(c.name, c.company)}</div>
                        <div className={styles.clientInfo}>
                          <span className={styles.clientName}>{c.name}</span>
                          <span className={styles.clientCompany}>{c.company || 'Cliente Particular'}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.contactCell}>
                        <span className={styles.contactEmail}>{c.email}</span>
                        <span className={styles.contactPhone}>{c.phone || 'Sin teléfono'}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.typeBadge} style={{ backgroundColor: tp.bg, color: tp.text }}>
                        {tp.label}
                      </span>
                    </td>
                    <td className={styles.thCenter}>
                      <span
                        className={styles.statusBadge}
                        style={{
                          backgroundColor: st.bg,
                          color: st.text,
                        }}
                      >
                        <span className={styles.statusDot} style={{ backgroundColor: st.dot }} />
                        {st.label}
                      </span>
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
              Mostrando <strong>{clients.length}</strong> de <strong>{meta.total || clients.length}</strong> clientes
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
