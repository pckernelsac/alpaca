import { useState } from 'react';
import styles from './InventoryDashboard.module.css';

const kpiCards = [
  { id: 1, label: 'Stock Total', value: '45,280', subtitle: 'Unidades', accent: 'primary', icon: 'inventory_2' },
  { id: 2, label: 'Productos Agotados', value: '12 SKUs', subtitle: 'Acción Requerida', accent: 'error', icon: 'cancel_schedule_send' },
  { id: 3, label: 'Stock Crítico', value: '34 SKUs', subtitle: 'Nivel Bajo', accent: 'warning', icon: 'monitoring' },
  { id: 4, label: 'Entradas (Mes)', value: '+5,200', trend: '12% vs Ant.', accent: 'tertiary', icon: 'trending_up' },
  { id: 5, label: 'Salidas (Mes)', value: '-3,450', subtitle: 'Normalizado', accent: 'secondary', icon: 'sync' },
  { id: 6, label: 'Reservas', value: '1,200', subtitle: 'Pendiente Despacho', accent: 'outline', icon: 'bookmark' },
];

const warehouses = [
  { name: 'Lima', units: '18,500', width: 70 },
  { name: 'Cusco', units: '12,200', width: 45 },
  { name: 'Arequipa', units: '9,100', width: 35 },
  { name: 'Puno', units: '5,480', width: 20 },
];

const topRotation = [
  { name: 'Manta Imperial Gold', change: '+28%' },
  { name: 'Chaleco Alpaca Soft', change: '+15%' },
];

const lowRotation = [
  { name: 'Bufanda Lana Básica', change: '-4%' },
  { name: 'Gorro Andino XL', change: '-12%' },
];

const alerts = [
  { id: 'FIB-AL-012', label: 'Agotado', product: 'Lana de Alpaca Baby - Blanco Crudo (50kg)', color: 'error', icon: 'shopping_cart', action: 'Reabastecer Ahora' },
  { id: 'TEX-MJ-88', label: 'Crítico (8u)', product: 'Manta Jacquard \'Huacaya\' - Tonalidad Tierra', color: 'warning', icon: 'swap_horiz', action: 'Ver Transferencias' },
  { id: 'ACC-BT-05', label: 'Bajo (150u)', product: 'Botones de Madera Tallados - Colección Invierno', color: 'warning', icon: 'inventory', action: 'Revisar Inventario' },
];

const accentMap = {
  primary: 'var(--color-primary)',
  error: 'var(--color-error)',
  warning: 'var(--color-primary)',
  tertiary: 'var(--color-tertiary)',
  secondary: 'var(--color-secondary)',
  outline: 'var(--color-outline)',
};

const monthData = [
  { label: 'Ene', in: 60, out: 35 },
  { label: 'Feb', in: 45, out: 40 },
  { label: 'Mar', in: 70, out: 45 },
  { label: 'Abr', in: 50, out: 55 },
  { label: 'May', in: 80, out: 50 },
  { label: 'Jun', in: 65, out: 60 },
  { label: 'Jul', in: 90, out: 55 },
  { label: 'Ago', in: 75, out: 65 },
  { label: 'Sep', in: 55, out: 70 },
  { label: 'Oct', in: 85, out: 60 },
  { label: 'Nov', in: 70, out: 75 },
  { label: 'Dic', in: 95, out: 80 },
];

export default function InventoryDashboard() {
  const [warehouse, setWarehouse] = useState('Todos los Almacenes');
  const [period, setPeriod] = useState('Últimos 30 días');

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard de Inventario</h2>
          <p className={styles.pageDesc}>Seguimiento en tiempo real de fibras y productos terminados.</p>
        </div>
        <div className={styles.headerFilters}>
          <select className={styles.select} value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
            <option>Todos los Almacenes</option>
            <option>Lima (Sede Central)</option>
            <option>Cusco (Hilados)</option>
            <option>Arequipa (Tintorería)</option>
            <option>Puno (Acopio)</option>
          </select>
          <select className={styles.select} value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option>Últimos 30 días</option>
            <option>Este Trimestre</option>
            <option>Año Fiscal 2024</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: accentMap[kpi.accent] }} />
            <div className={styles.kpiContent}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: accentMap[kpi.accent] }}>{kpi.icon}</span>
              </div>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              {kpi.trend ? (
                <span className={styles.kpiTrend} style={{ color: accentMap[kpi.accent] }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>
                  {kpi.trend}
                </span>
              ) : (
                <span className={styles.kpiSubtitle} style={kpi.accent === 'error' ? { color: accentMap.error } : {}}>
                  {kpi.subtitle}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Left Column */}
        <div className={styles.bentoLeft}>
          {/* Bar Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h4 className={styles.chartTitle}>Movimientos Mensuales: Entradas vs Salidas</h4>
              <div className={styles.chartLegend}>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-primary)' }} />
                  Entradas
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-secondary)' }} />
                  Salidas
                </span>
              </div>
            </div>
            <div className={styles.barChart}>
              {monthData.map((m) => (
                <div key={m.label} className={styles.barGroup}>
                  <div className={styles.barCol}>
                    <div className={styles.bar} style={{ height: `${m.in}%`, backgroundColor: 'var(--color-primary)' }} />
                  </div>
                  <div className={styles.barCol}>
                    <div className={styles.bar} style={{ height: `${m.out}%`, backgroundColor: 'var(--color-secondary)' }} />
                  </div>
                  <span className={styles.barLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warehouse Distribution + Performance */}
          <div className={styles.bentoInner}>
            <div className={styles.warehouseCard}>
              <h4 className={styles.chartTitle}>Distribución por Almacén</h4>
              <div className={styles.warehouseList}>
                {warehouses.map((w) => (
                  <div key={w.name} className={styles.warehouseRow}>
                    <div className={styles.warehouseInfo}>
                      <span className={styles.warehouseName}>{w.name}</span>
                      <span className={styles.warehouseUnits}>{w.units} u.</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${w.width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.performanceCard}>
              <h4 className={styles.chartTitle}>Rendimiento de Productos</h4>
              <div className={styles.perfSection}>
                <p className={styles.perfSectionLabel}>Top Rotación</p>
                {topRotation.map((p) => (
                  <div key={p.name} className={styles.perfRow}>
                    <span className={styles.perfName}>{p.name}</span>
                    <span className={styles.perfBadge} style={{ backgroundColor: 'var(--color-tertiary-container)', color: 'var(--color-on-tertiary-fixed)' }}>{p.change}</span>
                  </div>
                ))}
              </div>
              <div className={styles.perfSection}>
                <p className={styles.perfSectionLabel} style={{ color: 'var(--color-error)' }}>Baja Rotación</p>
                {lowRotation.map((p) => (
                  <div key={p.name} className={styles.perfRow}>
                    <span className={styles.perfName}>{p.name}</span>
                    <span className={styles.perfBadge} style={{ backgroundColor: 'var(--color-error-container)', color: 'var(--color-on-error-container)' }}>{p.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Alerts Panel */}
        <div className={styles.bentoRight}>
          <section className={styles.alertsCard}>
            <div className={styles.alertsHeader}>
              <div className={styles.alertsHeaderLeft}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-error)' }}>warning</span>
                <h4 className={styles.alertsTitle}>Alertas de Stock</h4>
              </div>
              <span className={styles.alertsCount}>4 Críticas</span>
            </div>
            <div className={styles.alertsList}>
              {alerts.map((a) => (
                <div key={a.id} className={styles.alertItem}>
                  <div className={styles.alertTop}>
                    <span className={styles.alertId}>{a.id}</span>
                    <span
                      className={styles.alertLabel}
                      style={{
                        backgroundColor: a.color === 'error' ? 'var(--color-error-container)' : 'var(--color-primary-fixed)',
                        color: a.color === 'error' ? 'var(--color-on-error-container)' : 'var(--color-on-primary-fixed)',
                      }}
                    >
                      {a.label}
                    </span>
                  </div>
                  <p className={styles.alertProduct}>{a.product}</p>
                  <button
                    className={a.color === 'error' ? styles.alertBtnPrimary : styles.alertBtnOutline}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{a.icon}</span>
                    {a.action}
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.alertsFooter}>
              <a href="#" className={styles.alertsFooterLink}>Ver todas las alertas operativas</a>
            </div>
          </section>
        </div>
      </div>

      {/* FAB Cluster */}
      <div className={styles.fabCluster}>
        <button className={styles.fabItem}>
          <span className="material-symbols-outlined">swap_horiz</span>
          <span>Nueva Transferencia</span>
        </button>
        <button className={styles.fabItem}>
          <span className="material-symbols-outlined">edit_note</span>
          <span>Nuevo Ajuste</span>
        </button>
        <button className={styles.fabPrimary}>
          <span className="material-symbols-outlined">add_circle</span>
          <span>Nuevo Ingreso</span>
        </button>
      </div>
    </div>
  );
}
