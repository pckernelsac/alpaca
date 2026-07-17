import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import styles from './ClientList.module.css';

const clients = [
  { id: 1, name: 'Andean Textiles Ltd.', company: 'Exportaciones Peruanas S.A.C.', email: 'contacto@andeantextiles.pe', phone: '+51 984 123 456', type: 'Mayorista', orders: 48, totalSpent: 'S/ 284,500.00', lastPurchase: '12 Oct, 2024', status: 'Activo' },
  { id: 2, name: 'Boutique Cusco Real', company: 'Cusco Real E.I.R.L.', email: 'ventas@cuscoreal.com', phone: '+51 984 654 321', type: 'Minorista', orders: 12, totalSpent: 'S/ 48,200.00', lastPurchase: '10 Oct, 2024', status: 'VIP' },
  { id: 3, name: 'Mercado Central Lima', company: 'Corporación Mercado Central S.A.', email: 'compras@mcentral.pe', phone: '+51 999 888 777', type: 'Mayorista', orders: 156, totalSpent: 'S/ 892,100.00', lastPurchase: '08 Oct, 2024', status: 'Activo' },
  { id: 4, name: 'Puno Alpaca Threads', company: 'Hilos Andinos Puno S.A.C.', email: 'pedidos@punoalpaca.pe', phone: '+51 987 654 098', type: 'Mayorista', orders: 23, totalSpent: 'S/ 156,800.00', lastPurchase: '05 Oct, 2024', status: 'Inactivo' },
  { id: 5, name: 'Alpaca Luxury Boutique', company: 'Luxury Alpaca Brands S.A.C.', email: 'info@alpacaluxury.com', phone: '+51 977 123 456', type: 'Minorista', orders: 3, totalSpent: 'S/ 12,450.00', lastPurchase: 'Hoy', status: 'Activo' },
];

const statusConfig = {
  Activo: { bg: '#e8f5e9', text: '#2e7d32', dot: '#22c55e' },
  Inactivo: { bg: 'transparent', text: 'var(--color-on-surface-variant)', dot: 'var(--color-outline)', border: '1px solid var(--color-outline-variant)' },
  VIP: { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
};

const typeConfig = {
  Mayorista: { bg: '#e3f2fd', text: '#1565c0' },
  Minorista: { bg: '#f3e8ff', text: '#7c3aed' },
};

export default function ClientList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = clients.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    const matchType = !typeFilter || c.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (currentPage - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return (
    <div className={styles.container}>
      <PageHeader
        title="Clientes"
        description="Gestión centralizada de la base de clientes de Alpacart Textiles."
      >
        <button className={styles.exportBtn}>
          <span className="material-symbols-outlined">download</span>
          Exportar
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
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className={styles.filtersGroup}>
          <select className={styles.select} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
            <option value="">Estado: Todos</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="VIP">VIP</option>
          </select>
          <select className={styles.select} value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}>
            <option value="">Tipo: Todos</option>
            <option value="Mayorista">Mayorista</option>
            <option value="Minorista">Minorista</option>
          </select>
          <select className={styles.select}>
            <option value="">Ubicación: Todas</option>
            <option value="lima">Lima</option>
            <option value="cusco">Cusco</option>
            <option value="puno">Puno</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contacto</th>
              <th>Tipo</th>
              <th className={styles.thCenter}>Pedidos</th>
              <th>Gasto Total</th>
              <th>Última Compra</th>
              <th className={styles.thCenter}>Estado</th>
              <th className={styles.actionsCol}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((c) => {
              const st = statusConfig[c.status] || statusConfig.Activo;
              const tp = typeConfig[c.type] || typeConfig.Minorista;
              return (
                <tr key={c.id}>
                  <td>
                    <div className={styles.clientCell}>
                      <div className={styles.avatar}>{c.name.charAt(0)}{c.company.charAt(0)}</div>
                      <div className={styles.clientInfo}>
                        <span className={styles.clientName}>{c.name}</span>
                        <span className={styles.clientCompany}>{c.company}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contactCell}>
                      <span className={styles.contactEmail}>{c.email}</span>
                      <span className={styles.contactPhone}>{c.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.typeBadge} style={{ backgroundColor: tp.bg, color: tp.text }}>
                      {c.type}
                    </span>
                  </td>
                  <td className={styles.thCenter}>{c.orders}</td>
                  <td className={styles.cellBold}>{c.totalSpent}</td>
                  <td className={styles.cellMuted}>{c.lastPurchase}</td>
                  <td className={styles.thCenter}>
                    <span
                      className={styles.statusBadge}
                      style={{
                        backgroundColor: st.bg,
                        color: st.text,
                        border: st.border || 'none',
                      }}
                    >
                      <span className={styles.statusDot} style={{ backgroundColor: st.dot }} />
                      {c.status}
                    </span>
                  </td>
                  <td className={styles.actionsCol}>
                    <button className={styles.actionBtn}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className={styles.actionBtn}>
                      <span className="material-symbols-outlined">more_vert</span>
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
            Mostrando <strong>{start + 1}-{Math.min(start + perPage, filtered.length)}</strong> de <strong>{filtered.length}</strong> clientes
          </span>
          <div className={styles.paginationButtons}>
            <button className={styles.pageArrow} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? styles.pageActive : styles.pageBtn}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className={styles.pageArrow} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
