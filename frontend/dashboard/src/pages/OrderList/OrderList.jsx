import { useEffect, useState } from 'react';
import useOrdersStore from '@/stores/useOrdersStore';
import styles from './OrderList.module.css';

const statusBadgeMap = {
  delivered: { bg: '#dcfce7', fg: '#166534', label: 'Entregado' },
  shipped: { bg: '#fef9c3', fg: '#854d0e', label: 'Enviado' },
  pending: { bg: '#fee2e2', fg: '#991b1b', label: 'Pendiente' },
  processing: { bg: '#dbeafe', fg: '#1e40af', label: 'Procesando' },
  cancelled: { bg: '#fce4ec', fg: '#9a0007', label: 'Cancelado' },
  paid: { bg: '#dcfce7', fg: '#166534', label: 'Pagado' },
  in_transit: { bg: '#e0f2fe', fg: '#0369a1', label: 'En Tránsito' },
  preparing: { bg: '#fef3c7', fg: '#b45309', label: 'En Preparación' },
};

function getInitials(name) {
  if (!name) return 'OD';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function OrderList() {
  const { orders, meta, loading, error, fetchAll } = useOrdersStore();
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage });
  }, [fetchAll, page, perPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(new Set(orders.map((o) => o.id)));
    } else {
      setSelected(new Set());
    }
  };

  const handleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const allSelected = orders.length > 0 && selected.size === orders.length;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Gestión de Pedidos</h2>
          <p className={styles.pageDesc}>Administre y despache exportaciones textiles andinas — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline} onClick={() => fetchAll({ page, perPage })}>
            <span className="material-symbols-outlined">refresh</span>
            Refrescar
          </button>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando listado de pedidos desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar pedidos del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>shopping_cart</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen pedidos registrados</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay pedidos en la base de datos PostgreSQL actualmente.</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && orders.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thCheck}>
                    <input type="checkbox" checked={allSelected} onChange={handleSelectAll} className={styles.checkbox} />
                  </th>
                  <th>ID / N° Orden</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Pago</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const statusInfo = statusBadgeMap[o.status] || { bg: '#f5f5f5', fg: '#666', label: o.status || 'Pendiente' };
                  const isPaid = o.paid;
                  const customerName = o.customerName || `Cliente #${o.customerId || 'ID'}`;

                  return (
                    <tr key={o.id} className={styles.tableRow}>
                      <td className={styles.tdCheck}>
                        <input type="checkbox" checked={selected.has(o.id)} onChange={() => handleSelect(o.id)} className={styles.checkbox} />
                      </td>
                      <td className={styles.tdId}>{o.orderNumber || `#ORD-${o.id}`}</td>
                      <td>
                        <div className={styles.clientCell}>
                          <span className={styles.clientAvatar}>{getInitials(customerName)}</span>
                          <span>{customerName}</span>
                        </div>
                      </td>
                      <td className={styles.tdDate}>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td className={styles.tdProducts}>
                        <span className={styles.productBadge}>{(o.items || []).length} ítems</span>
                      </td>
                      <td className={styles.tdTotal}>$ {Number(o.total || 0).toFixed(2)}</td>
                      <td>
                        <span
                          className={styles.badge}
                          style={{
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.fg,
                          }}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td>
                        <span
                          className={styles.badge}
                          style={{
                            backgroundColor: isPaid ? '#dcfce7' : '#fee2e2',
                            color: isPaid ? '#166534' : '#991b1b',
                          }}
                        >
                          {isPaid ? 'Pagado' : 'Pendiente'}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionsCell}>
                          <button className={styles.actionBtn} title="Ver detalle"><span className="material-symbols-outlined">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <p className={styles.paginationInfo}>
              Mostrando <strong>{orders.length}</strong> de <strong>{meta.total || orders.length}</strong> resultados
            </p>
            <div className={styles.paginationControls}>
              <button
                className={styles.pageBtn}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                Página {page} de {meta.totalPages || 1}
              </span>
              <button
                className={styles.pageBtn}
                disabled={page >= (meta.totalPages || 1)}
                onClick={() => setPage((p) => p + 1)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
