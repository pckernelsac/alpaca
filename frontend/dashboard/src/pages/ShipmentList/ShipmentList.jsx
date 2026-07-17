import { useState } from 'react';
import styles from './ShipmentList.module.css';

const kpis = [
  { label: 'In Transit', value: '142', trend: '+12%', trendClass: 'up' },
  { label: 'Ready for Pickup', value: '28', trend: '-4%', trendClass: 'down' },
  { label: 'Delayed', value: '7', trend: 'High', trendClass: 'alert' },
  { label: 'Delivered Today', value: '54', trend: 'On Track', trendClass: 'ok' },
];

const tabs = ['All Shipments', 'Exceptions', 'Watchlist'];

const shipments = [
  { waybill: 'ALPC-TR-88294', order: 'ORD-4421', client: 'Textiles Del Sur S.A.', carrier: 'DHL Express', carrierColor: '#FFCC00', status: 'In Transit', statusClass: 'transit', city: 'Lima, PE', despatch: 'Oct 12, 2023', estimated: 'Oct 15, 2023' },
  { waybill: 'ALPC-TR-88301', order: 'ORD-4425', client: 'Alpaca Boutique NYC', carrier: 'FedEx International', carrierColor: '#4D148C', status: 'Delayed', statusClass: 'delayed', city: 'New York, US', despatch: 'Oct 11, 2023', estimated: 'Oct 14, 2023' },
  { waybill: 'ALPC-TR-88310', order: 'ORD-4428', client: 'Andean Fabrics Ltd.', carrier: 'Local Fleet #4', carrierColor: 'var(--color-secondary)', status: 'Ready for Pickup', statusClass: 'ready', city: 'Arequipa, PE', despatch: '---', estimated: 'Oct 16, 2023' },
  { waybill: 'ALPC-TR-88280', order: 'ORD-4410', client: 'Milan Wool Dist.', carrier: 'DHL Global', carrierColor: '#FFCC00', status: 'Delivered', statusClass: 'delivered', city: 'Milan, IT', despatch: 'Oct 08, 2023', estimated: 'Oct 12, 2023' },
  { waybill: 'ALPC-TR-88322', order: 'ORD-4430', client: 'Cuzco Craft Co.', carrier: 'Local Fleet #2', carrierColor: 'var(--color-secondary)', status: 'In Transit', statusClass: 'transit', city: 'Cusco, PE', despatch: 'Oct 13, 2023', estimated: 'Oct 14, 2023' },
  { waybill: 'ALPC-TR-88335', order: 'ORD-4435', client: 'Global Fibers Inc.', carrier: 'FedEx Express', carrierColor: '#4D148C', status: 'In Transit', statusClass: 'transit', city: 'Tokyo, JP', despatch: 'Oct 13, 2023', estimated: 'Oct 18, 2023' },
];

const carrierPerformance = [
  { name: 'DHL Express', pct: 98.2, color: 'var(--color-primary)' },
  { name: 'FedEx Int.', pct: 91.5, color: 'var(--color-tertiary)' },
  { name: 'Local Fleet', pct: 84.0, color: 'var(--color-on-surface-variant)' },
];

export default function ShipmentList() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Shipment Management</h2>
          <p className={styles.pageDesc}>Track and coordinate textile logistics across global carriers.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.avatarGroup}>
            <span className={styles.avatarBadge}>DHL</span>
            <span className={styles.avatarBadge}>FDX</span>
            <span className={styles.avatarBadge}>+4</span>
          </div>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">download</span>
            Export
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">add</span>
            New Shipment
          </button>
        </div>
      </section>

      {/* KPI Row */}
      <div className={styles.kpiRow}>
        {kpis.map((kpi, i) => (
          <div key={i} className={styles.kpiCard}>
            <p className={styles.kpiLabel}>{kpi.label}</p>
            <div className={styles.kpiValueRow}>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <span className={`${styles.kpiTrend} ${styles[`trend${kpi.trendClass}`]}`}>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        {/* Toolbar */}
        <div className={styles.tableToolbar}>
          <div className={styles.tableTabs}>
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`${styles.tabBtn} ${activeTab === i ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.tablePagination}>
            <span className={styles.paginationInfo}>Displaying 1-6 of 842</span>
            <div className={styles.paginationButtons}>
              <button className={styles.paginationBtn}><span className="material-symbols-outlined">chevron_left</span></button>
              <button className={styles.paginationBtn}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Guía (Waybill)</th>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Transportista</th>
                <th>Estado</th>
                <th>Ciudad</th>
                <th>Despacho</th>
                <th>Estimada</th>
                <th className={styles.thRight}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((row, i) => (
                <tr key={i} className={styles.tableRow}>
                  <td className={styles.cellWaybill}>{row.waybill}</td>
                  <td className={styles.cellBody}>{row.order}</td>
                  <td className={styles.cellClient}>{row.client}</td>
                  <td>
                    <div className={styles.carrierCell}>
                      <span className={styles.carrierDot} style={{ backgroundColor: row.carrierColor }} />
                      <span className={styles.cellBody}>{row.carrier}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${row.statusClass}`]}`}>{row.status}</span>
                  </td>
                  <td className={styles.cellBody}>{row.city}</td>
                  <td className={styles.cellBody}>{row.despatch}</td>
                  <td className={`${styles.cellBody} ${row.statusClass === 'delayed' ? styles.cellEstimatedWarn : ''}`}>{row.estimated}</td>
                  <td className={styles.cellActions}>
                    <div className={styles.actionGroup}>
                      <button className={styles.actionBtn} title="Track"><span className="material-symbols-outlined">location_on</span></button>
                      <button className={styles.actionBtn} title="Timeline"><span className="material-symbols-outlined">timeline</span></button>
                      <button className={styles.actionBtn} title="Print Label"><span className="material-symbols-outlined">print</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className={styles.bottomGrid}>
        {/* Map / Fleet Distribution */}
        <div className={styles.fleetCard}>
          <div className={styles.fleetMapBg} />
          <div className={styles.fleetContent}>
            <h4 className={styles.fleetTitle}>Live Fleet Distribution</h4>
            <div className={styles.fleetLegend}>
              <div className={styles.fleetLegendItem}>
                <span className={styles.fleetDot} style={{ backgroundColor: 'var(--color-primary)' }} />
                <span className={styles.fleetLegendLabel}>Active Shipments</span>
              </div>
              <div className={styles.fleetLegendItem}>
                <span className={styles.fleetDot} style={{ backgroundColor: 'var(--color-tertiary)' }} />
                <span className={styles.fleetLegendLabel}>Warehouse Hubs</span>
              </div>
            </div>
            <div className={styles.fleetHubs}>
              <div className={styles.hubCard}>
                <div>
                  <p className={styles.hubName}>LIMA HUB</p>
                  <p className={styles.hubValue}>42 Departures Today</p>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>arrow_forward</span>
              </div>
              <div className={styles.hubCard}>
                <div>
                  <p className={styles.hubName}>CUZCO HUB</p>
                  <p className={styles.hubValue}>18 Departures Today</p>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>arrow_forward</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carrier Performance + Incident */}
        <div className={styles.insightCard}>
          <h4 className={styles.insightTitle}>Carrier Performance</h4>
          <div className={styles.carrierList}>
            {carrierPerformance.map((c, i) => (
              <div key={i} className={styles.carrierPerfRow}>
                <div className={styles.carrierPerfHeader}>
                  <span className={styles.carrierPerfName}>{c.name}</span>
                  <span className={styles.carrierPerfPct}>{c.pct}% OTD</span>
                </div>
                <div className={styles.perfBarTrack}>
                  <div className={styles.perfBarFill} style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.incidentSection}>
            <h5 className={styles.incidentTitle}>Recent Incident Report</h5>
            <div className={styles.incidentCard}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-error)' }}>warning</span>
              <div>
                <p className={styles.incidentText}>Weather delay in Chicago hub affecting 4 shipments to NYC Boutique.</p>
                <button className={styles.incidentBtn}>Notify Customers</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
