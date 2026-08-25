import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDashboardStore from '@/stores/useDashboardStore';
import styles from './Dashboard.module.css';

const colorMap = {
  primary: { bg: 'var(--color-primary)', text: 'var(--color-primary)' },
  secondary: { bg: 'var(--color-secondary)', text: 'var(--color-secondary)' },
  tertiary: { bg: 'var(--color-tertiary)', text: 'var(--color-tertiary)' },
  error: { bg: 'var(--color-error)', text: 'var(--color-error)' },
};

const quickActions = [
  { icon: 'add_box', label: 'Nuevo Producto', desc: 'Catálogo textil', link: '/catalog/productos/nuevo' },
  { icon: 'receipt_long', label: 'Pedidos', desc: 'Venta mayorista', link: '/orders/list' },
  { icon: 'person_add_alt', label: 'Nuevo Cliente', desc: 'Base de datos', link: '/crm/clientes/nuevo' },
  { icon: 'celebration', label: 'Promociones', desc: 'Campañas de mkt', link: '/marketing/campanas' },
];

export default function Dashboard() {
  const { kpis, loading, error, fetchKpis } = useDashboardStore();

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 40, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando métricas en tiempo real del servidor backend NestJS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div style={{ padding: '40px 20px', backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h3 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined">error</span>
            Error de conexión con Backend
          </h3>
          <p style={{ marginTop: 8, color: 'var(--color-on-surface)' }}>{error}</p>
          <button
            onClick={() => fetchKpis()}
            style={{ marginTop: 16, padding: '8px 16px', backgroundColor: 'var(--color-error)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const kpiCards = [
    { id: 1, icon: 'payments', label: 'Ventas Totales', value: `$${(kpis?.totalSales || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, subtitle: 'Acumulado histórico real', color: 'primary' },
    { id: 2, icon: 'calendar_month', label: 'Ventas del Mes', value: `$${(kpis?.monthlySales || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, subtitle: 'Últimos 30 días', color: 'primary' },
    { id: 3, icon: 'person_add', label: 'Clientes Registrados', value: `${kpis?.totalCustomers || 0}`, subtitle: 'Base de clientes B2B/B2C', color: 'primary' },
    { id: 4, icon: 'inventory_2', label: 'Productos Registrados', value: `${kpis?.totalProducts || 0}`, subtitle: 'Catálogo activo', color: 'primary' },
    { id: 5, icon: 'pending_actions', label: 'Pedidos Pendientes', value: `${kpis?.pendingOrders || 0}`, subtitle: 'En cola de producción', color: 'secondary' },
    { id: 6, icon: 'task_alt', label: 'Pedidos Entregados', value: `${kpis?.completedOrders || 0}`, subtitle: 'Despachados con éxito', color: 'tertiary' },
    { id: 7, icon: 'warning', label: 'Stock Crítico', value: `${kpis?.criticalItems || 0}`, subtitle: 'Atención requerida', color: 'error' },
    { id: 8, icon: 'block', label: 'Agotados', value: `${kpis?.outOfStock || 0}`, subtitle: 'Sin existencias', color: 'error' },
  ];

  const isEmpty = !kpis || (kpis.totalSales === 0 && kpis.totalProducts === 0 && kpis.totalCustomers === 0);

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Panel de Control Ejecutivo</h2>
          <p className={styles.pageDesc}>Métricas en tiempo real desde la API REST NestJS y PostgreSQL.</p>
        </div>
        <button
          onClick={() => fetchKpis()}
          style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-outline)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
          Actualizar
        </button>
      </section>

      {isEmpty && (
        <div style={{ padding: 24, marginBottom: 24, backgroundColor: 'var(--color-surface-variant)', borderRadius: 12 }}>
          <p style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
            <strong>Estado Inicial Vacío:</strong> No hay registros suficientes en la base de datos para calcular tendencias avanzadas.
          </p>
        </div>
      )}

      {/* KPI Grid Real */}
      <section className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: colorMap[kpi.color]?.bg || 'var(--color-primary)' }} />
            <div className={styles.kpiContent}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: colorMap[kpi.color]?.text || 'var(--color-primary)' }}>{kpi.icon}</span>
              </div>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <div className={styles.kpiFooter}>
                <span className={styles.kpiSubtitle} style={kpi.color === 'error' ? { color: 'var(--color-error)' } : {}}>
                  {kpi.subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className={styles.quickSection}>
        <h4 className={styles.quickSectionLabel}>Accesos Rápidos</h4>
        <div className={styles.quickGrid}>
          {quickActions.map((qa) => (
            <Link key={qa.label} to={qa.link} className={styles.quickCard}>
              <div className={styles.quickIcon}>
                <span className="material-symbols-outlined">{qa.icon}</span>
              </div>
              <div>
                <p className={styles.quickLabel}>{qa.label}</p>
                <p className={styles.quickDesc}>{qa.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
