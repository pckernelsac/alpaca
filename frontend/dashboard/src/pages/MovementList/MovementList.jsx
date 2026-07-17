import { useState } from 'react';
import styles from './MovementList.module.css';

const kpiData = [
  { id: 1, label: 'INGRESOS DEL MES', value: '1,248', badge: '+12%', badgeColor: 'var(--color-tertiary)', icon: 'history', subtitle: 'vs mes anterior', accent: 'var(--color-primary)' },
  { id: 2, label: 'SALIDAS PENDIENTES', value: '42', badge: 'Crítico', badgeColor: 'var(--color-error)', icon: 'priority_high', subtitle: 'Requiere acción', accent: 'var(--color-error)' },
  { id: 3, label: 'AJUSTES RECIENTES', value: '15', badge: 'Auditados', badgeColor: 'var(--color-on-surface-variant)', icon: 'check_circle', subtitle: 'Últimas 48h', accent: 'var(--color-primary)' },
  { id: 4, label: 'TRANSF. EN TRÁNSITO', value: '8', badge: '860kg', badgeColor: 'var(--color-tertiary)', icon: 'local_shipping', subtitle: 'Entre sedes', accent: 'var(--color-tertiary)' },
  { id: 5, label: 'RESERVAS ACTIVAS', value: '256', badge: 'Alta Demanda', badgeColor: 'var(--color-primary-container)', icon: 'lock', subtitle: 'Stock comprometido', accent: 'var(--color-primary)' },
];

const movements = [
  {
    id: 'MOV-2024-0891',
    date: '24 Oct 2023, 09:15',
    type: 'Ingreso',
    product: 'Fibra Alpaca Baby Gold',
    sku: 'SKU-ALP-992-BG',
    qty: '120.00 kg',
    route: 'Proveedor → Central Lima',
    person: { initials: 'RM', name: 'R. Mendoza' },
    status: 'Completado',
    statusColor: 'var(--color-tertiary)',
  },
  {
    id: 'MOV-2024-0895',
    date: '24 Oct 2023, 11:20',
    type: 'Transferencia',
    product: 'Hilado Premium Suri',
    sku: 'SKU-HIL-441-PS',
    qty: '45.50 kg',
    route: 'Central → Fábrica AQP',
    person: { initials: 'JC', name: 'J. Ccahua' },
    status: 'En Tránsito',
    statusColor: 'var(--color-primary-container)',
  },
  {
    id: 'MOV-2024-0898',
    date: '24 Oct 2023, 14:05',
    type: 'Ajuste',
    product: "Manta Artesanal 'Cusco'",
    sku: 'SKU-MAN-202-CU',
    qty: '-2.00 und',
    route: 'Stock Merma → Miraflores',
    person: { initials: 'AQ', name: 'A. Quispe' },
    status: 'Auditado',
    statusColor: 'var(--color-on-surface-variant)',
  },
  {
    id: 'MOV-2024-0902',
    date: '25 Oct 2023, 08:30',
    type: 'Salida',
    product: 'Chalina Alpaca Mistura',
    sku: 'SKU-CHA-115-AM',
    qty: '500.00 und',
    route: 'Central → Cliente Export',
    person: { initials: 'LP', name: 'L. Palomino' },
    status: 'Pendiente',
    statusColor: 'var(--color-error)',
  },
  {
    id: 'MOV-2024-0910',
    date: '25 Oct 2023, 10:45',
    type: 'Reserva',
    product: 'Lote Fibra Cruda Blanca',
    sku: 'SKU-RAW-BLK-01',
    qty: '2,000.00 kg',
    route: 'Bloqueado → Almacén A',
    person: { initials: 'SM', name: 'S. Mamani' },
    status: 'Activo',
    statusColor: 'var(--color-on-surface)',
  },
];

const typeBadgeStyles = {
  Ingreso: { bg: 'var(--color-tertiary)', opacity: '0.1', color: 'var(--color-tertiary)' },
  Transferencia: { bg: 'var(--color-primary)', opacity: '0.1', color: 'var(--color-primary)' },
  Ajuste: { bg: 'var(--color-error)', opacity: '0.1', color: 'var(--color-error)' },
  Salida: { bg: 'var(--color-secondary)', opacity: '0.1', color: 'var(--color-secondary)' },
  Reserva: { bg: 'var(--color-on-secondary-fixed)', opacity: '0.1', color: 'var(--color-on-secondary-fixed)' },
};

export default function MovementList() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Movimientos de Inventario</h2>
          <p className={styles.pageDesc}>Gestión y auditoría de flujo de materias primas y productos terminados.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>ios_share</span>
            Exportar
          </button>
          <button className={styles.actionOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>publish</span>
            Importar
          </button>
          <button className={styles.actionPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Nuevo Movimiento
          </button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        {kpiData.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: kpi.accent }} />
            <div className={styles.kpiContent}>
              <span className={styles.kpiLabel}>{kpi.label}</span>
              <div className={styles.kpiRow}>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={styles.kpiBadge} style={{ color: kpi.badgeColor }}>{kpi.badge}</span>
              </div>
              <div className={styles.kpiFooter}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, opacity: 0.6 }}>{kpi.icon}</span>
                <span className={styles.kpiSubtitle}>{kpi.subtitle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-on-surface-variant)' }}>search</span>
          <input
            className={styles.searchInput}
            placeholder="Filtrar por SKU, ID o Lote..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filterSelects}>
          <select className={styles.filterSelect} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Tipo de Movimiento</option>
            <option>Ingreso</option>
            <option>Salida</option>
            <option>Ajuste</option>
            <option>Transferencia</option>
          </select>
          <select className={styles.filterSelect} value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
            <option value="">Almacén</option>
            <option>Central - Lima</option>
            <option>Fábrica - Arequipa</option>
            <option>Retail - Miraflores</option>
          </select>
          <select className={styles.filterSelect} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Estado</option>
            <option>Completado</option>
            <option>Pendiente</option>
            <option>En Tránsito</option>
          </select>
          <button className={styles.filterDateBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
            Últimos 30 días
          </button>
          <button className={styles.filterIconBtn}>
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID / Referencia</th>
                <th>Fecha y Hora</th>
                <th>Tipo</th>
                <th>Producto / SKU</th>
                <th>Cantidad</th>
                <th>Origen → Destino</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th className={styles.thRight}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m) => {
                const tb = typeBadgeStyles[m.type] || {};
                const pulse = m.status === 'En Tránsito';
                return (
                  <tr key={m.id} className={`${styles.tableRow} ${m.status === 'Pendiente' ? styles.rowPriority : ''}`}>
                    <td className={styles.cellId}>{m.id}</td>
                    <td className={styles.cellMuted}>{m.date}</td>
                    <td>
                      <span className={styles.typeBadge} style={{ backgroundColor: tb.bg, color: tb.color, opacity: 1 }}>
                        {m.type}
                      </span>
                    </td>
                    <td>
                      <div className={styles.productInfo}>
                        <span className={styles.productName}>{m.product}</span>
                        <span className={styles.productSku}>{m.sku}</span>
                      </div>
                    </td>
                    <td className={styles.cellQty}>{m.qty}</td>
                    <td className={styles.cellMuted}>{m.route}</td>
                    <td>
                      <div className={styles.personCell}>
                        <div className={styles.personAvatar}>{m.person.initials}</div>
                        <span className={styles.personName}>{m.person.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.statusCell}>
                        <span className={`${styles.statusDot} ${pulse ? styles.statusPulse : ''}`} style={{ backgroundColor: m.statusColor }} />
                        <span className={styles.statusLabel}>{m.status}</span>
                      </div>
                    </td>
                    <td className={styles.thRight}>
                      <div className={styles.actionCell}>
                        <button className={styles.iconBtn} title="Ver Detalles">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button className={styles.iconBtn} title="PDF">
                          <span className="material-symbols-outlined">picture_as_pdf</span>
                        </button>
                        <button className={styles.iconBtn} title="Auditoría">
                          <span className="material-symbols-outlined">history</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>Mostrando 1-5 de 1,248 resultados</span>
          <div className={styles.paginationBtns}>
            <button className={styles.pageBtn} disabled>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
            </button>
            <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageBtn}>125</button>
            <button className={styles.pageBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.footerMeta}>
        <div className={styles.legendItems}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-tertiary)' }} />
            Completado
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-primary-container)' }} />
            En Tránsito
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-error)' }} />
            Crítico
          </span>
        </div>
        <span className={styles.syncInfo}>Última sincronización: Hace 2 minutos</span>
      </div>
    </div>
  );
}
