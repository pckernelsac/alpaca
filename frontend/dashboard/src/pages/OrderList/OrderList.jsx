import { useState } from 'react';
import styles from './OrderList.module.css';

const kpiCards = [
  { label: 'Pedidos Activos', value: '1,245', trend: '+12%', icon: 'shopping_cart', trendColor: '#22c55e', trendIcon: 'trending_up' },
  { label: 'Pendientes Envío', value: '84', trend: 'Requiere Atención', icon: 'schedule', trendColor: '#ea580c', trendIcon: 'schedule' },
  { label: 'Ingresos Hoy', value: '$42,890', trend: 'Lima Showroom lidera', icon: 'payments', trendColor: 'var(--color-primary)', trendIcon: 'payments' },
  { label: 'Tasa Devoluciones', value: '0.4%', trend: 'Debajo del objetivo (1.2%)', icon: 'check_circle', trendColor: '#22c55e', trendIcon: 'check_circle' },
];

const orders = [
  { id: '#ORD-2024-001', customer: 'Elena Rodriguez', avatar: null, initials: 'ER', date: '12/05/2024', status: 'Entregado', statusClass: 'delivered', payment: 'Pagado', paymentClass: 'paid', shipping: 'DHL Express', shippingSub: 'Success', total: '$4,250.00', channel: 'Wholesale', agent: 'M. Vargas' },
  { id: '#ORD-2024-002', customer: 'Marcello Silva', avatar: null, initials: 'MS', date: '14/05/2024', status: 'Enviado', statusClass: 'shipped', payment: 'Pagado', paymentClass: 'paid', shipping: 'Standard', shippingSub: 'In Transit', total: '$1,280.00', channel: 'Online', agent: 'S. Quispe' },
  { id: '#ORD-2024-003', customer: 'Claire Dubois', avatar: null, initials: 'CD', date: '15/05/2024', status: 'Pendiente', statusClass: 'pending', payment: 'Pendiente', paymentClass: 'pending', shipping: 'TBD', shippingSub: 'Awaiting Info', total: '$8,940.50', channel: 'Showroom', agent: 'M. Vargas' },
  { id: '#ORD-2024-004', customer: 'Liam Chen', avatar: null, initials: 'LC', date: '16/05/2024', status: 'Procesando', statusClass: 'processing', payment: 'Pagado', paymentClass: 'paid', shipping: 'UPS Express', shippingSub: 'Processing', total: '$3,210.00', channel: 'Online', agent: 'P. Ríos' },
  { id: '#ORD-2024-005', customer: 'Sofia Torres', avatar: null, initials: 'ST', date: '17/05/2024', status: 'Cancelado', statusClass: 'cancelled', payment: 'Fallido', paymentClass: 'failed', shipping: 'N/A', shippingSub: 'Cancelled', total: '$1,540.00', channel: 'Wholesale', agent: 'M. Vargas' },
  { id: '#ORD-2024-006', customer: 'Hans Gruber', avatar: null, initials: 'HG', date: '18/05/2024', status: 'Entregado', statusClass: 'delivered', payment: 'Pagado', paymentClass: 'paid', shipping: 'FedEx', shippingSub: 'Delivered', total: '$6,780.00', channel: 'Showroom', agent: 'S. Quispe' },
];

const statusBadgeMap = {
  delivered: { bg: '#dcfce7', fg: '#166534' },
  shipped: { bg: '#fef9c3', fg: '#854d0e' },
  pending: { bg: '#fee2e2', fg: '#991b1b' },
  processing: { bg: '#dbeafe', fg: '#1e40af' },
  cancelled: { bg: '#fce4ec', fg: '#9a0007' },
};

const paymentBadgeMap = {
  paid: { bg: '#dcfce7', fg: '#166534' },
  pending: { bg: '#fef9c3', fg: '#854d0e' },
  failed: { bg: '#fee2e2', fg: '#991b1b' },
};

export default function OrderList() {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState(new Set());

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected(new Set());
    } else {
      setSelected(new Set(orders.map((_, i) => i)));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (idx) => {
    const next = new Set(selected);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setSelected(next);
    setSelectAll(next.size === orders.length);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Gestión de Pedidos</h2>
          <p className={styles.pageDesc}>Administre y despache exportaciones textiles andinas al mundo.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">file_download</span>
            Exportar
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">file_upload</span>
            Importar
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">add</span>
            Nuevo Pedido
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiAccent} />
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <div className={styles.kpiTrend} style={{ color: kpi.trendColor }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, marginRight: 2 }}>{kpi.trendIcon}</span>
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className={styles.filtersBar}>
        <div className={styles.filtersLeft}>
          <div className={styles.filterChip}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
            <span className={styles.filterChipLabel}>Rango de Fechas</span>
          </div>
          <div className={styles.filterChip}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>
            <span className={styles.filterChipLabel}>Estado: Todos</span>
          </div>
          <div className={styles.filterChip}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>payments</span>
            <span className={styles.filterChipLabel}>Pago: Todos</span>
          </div>
          <div className={styles.filterChip}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>local_shipping</span>
            <span className={styles.filterChipLabel}>Envío: Todos</span>
          </div>
          <div className={styles.filterChip}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_month</span>
            <span className={styles.filterChipLabel}>Courier: Todos</span>
          </div>
          <button className={styles.clearFilters}>Limpiar Filtros</button>
        </div>
        <div className={styles.filtersRight}>
          <span className={styles.bulkLabel}>Acciones Masivas:</span>
          <button className={styles.bulkBtn} disabled={selected.size === 0}>Cambiar Estado</button>
          <button className={styles.bulkBtn} disabled={selected.size === 0}>Imprimir Etiquetas</button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCheck}>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className={styles.checkbox} />
                </th>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Pago</th>
                <th>Envío</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} className={styles.tableRow}>
                  <td className={styles.tdCheck}>
                    <input type="checkbox" checked={selected.has(i)} onChange={() => handleSelect(i)} className={styles.checkbox} />
                  </td>
                  <td className={styles.tdId}>{o.id}</td>
                  <td>
                    <div className={styles.clientCell}>
                      <span className={styles.clientAvatar}>{o.initials}</span>
                      <span>{o.customer}</span>
                    </div>
                  </td>
                  <td className={styles.tdDate}>{o.date}</td>
                  <td className={styles.tdProducts}>
                    <span className={styles.productBadge}>{o.channel === 'Online' ? '2' : o.channel === 'Wholesale' ? '4' : '1'} prod.</span>
                  </td>
                  <td className={styles.tdTotal}>{o.total}</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{
                        backgroundColor: statusBadgeMap[o.statusClass].bg,
                        color: statusBadgeMap[o.statusClass].fg,
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{
                        backgroundColor: paymentBadgeMap[o.paymentClass].bg,
                        color: paymentBadgeMap[o.paymentClass].fg,
                      }}
                    >
                      {o.payment}
                    </span>
                  </td>
                  <td>
                    <div className={styles.shippingCell}>
                      <span className={styles.shippingMethod}>{o.shipping}</span>
                      <span
                        className={styles.shippingStatus}
                        style={{
                          color: o.shippingSub === 'Success' || o.shippingSub === 'Delivered' ? '#166534' : o.shippingSub === 'In Transit' || o.shippingSub === 'Processing' ? '#854d0e' : 'var(--color-on-surface-variant)',
                        }}
                      >
                        {o.shippingSub}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button className={styles.actionBtn}><span className="material-symbols-outlined">visibility</span></button>
                      <button className={styles.actionBtn}><span className="material-symbols-outlined">edit</span></button>
                      <button className={styles.actionBtn}><span className="material-symbols-outlined">print</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <p className={styles.paginationInfo}>
            Mostrando <strong>1-6</strong> de <strong>12,450</strong> resultados
          </p>
          <div className={styles.paginationControls}>
            <button className={styles.pageBtn} disabled>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            <button className={styles.pageBtnActive}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageBtn}>249</button>
            <button className={styles.pageBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
          <div className={styles.paginationPerPage}>
            <span className={styles.perPageLabel}>Filas por página:</span>
            <select className={styles.perPageSelect}>
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
