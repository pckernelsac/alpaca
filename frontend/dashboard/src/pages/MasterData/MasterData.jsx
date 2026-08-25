import styles from './MasterData.module.css';

const kpiCards = [
  { id: 1, label: 'Total de Entidades', value: '10', subtitle: 'Activas', accent: 'primary' },
  { id: 2, label: 'Registros Totales', value: '42,850', subtitle: '+12% este mes', accent: 'success' },
  { id: 3, label: 'Última Sincronización', value: '14:20', subtitle: 'Hace 12 minutos', accent: 'primary' },
];

const entities = [
  { icon: 'category', name: 'Categorías', count: '1,240', desc: 'Estructura jerárquica de productos y subproductos textiles.' },
  { icon: 'loyalty', name: 'Marcas', count: '24', desc: 'Líneas de producto y colecciones exclusivas de la casa.' },
  { icon: 'texture', name: 'Materiales', count: '86', desc: 'Fibras (Alpaca, Vicuña, Algodón) y composiciones químicas.' },
  { icon: 'palette', name: 'Colores', count: '312', desc: 'Muestrario maestro y equivalencias Pantone/Laboratorio.' },
  { icon: 'straighten', name: 'Tallas', count: '45', desc: 'Curvas de tallaje para exportación y mercado local.' },
  { icon: 'ac_unit', name: 'Temporadas', count: '12', desc: 'Calendario de colecciones Otoño-Invierno / Primavera-Verano.' },
  { icon: 'public', name: 'Países', count: '195', desc: 'Destinos de exportación y origen de insumos importados.' },
  { icon: 'location_city', name: 'Ciudades', count: '4,500', desc: 'Localidades logísticas para despacho y puntos de venta.' },
  { icon: 'payments', name: 'Monedas', count: '6', desc: 'Gestión multimoneda (USD, PEN, EUR) y tasas de cambio.' },
  { icon: 'account_balance_wallet', name: 'Impuestos', count: '18', desc: 'Configuración fiscal, IGV, Detracciones y aranceles.' },
];

const activities = [
  { dot: 'success', title: 'Actualización de ', highlight: 'Tipos de Cambio', desc: 'Sincronización automática con BCRP completada.', time: 'Hace 10 min' },
  { dot: 'primary', title: 'Nueva ', highlight: 'Marca', desc: ' agregada: "Alpaca Gold Collection"', sub: 'Creado por Usuario Admin en el módulo Catálogo.', time: 'Hace 2 horas' },
  { dot: 'error', title: 'Error de validación en ', highlight: 'Categorías', desc: 'Duplicidad de código detectada en subcategoría "Hilado-45".', time: 'Hace 5 horas' },
];

export default function MasterData() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <span>ERP</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Master Data</span>
          </nav>
          <h2 className={styles.pageTitle}>Centro de Control de Datos Maestros</h2>
          <p className={styles.pageDesc}>Gestión centralizada de entidades fundamentales del sistema textil.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>sync</span>
            Sincronizar Todo
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Nueva Entidad
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{
              backgroundColor: kpi.accent === 'success' ? 'var(--color-success)' : 'var(--color-primary)'
            }} />
            <p className={styles.kpiLabel}>{kpi.label}</p>
            <div className={styles.kpiRow}>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <span className={styles.kpiSub} style={{
                color: kpi.accent === 'success' ? 'var(--color-success)' : 'var(--color-tertiary)'
              }}>{kpi.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Entity Cards Bento Grid */}
      <div className={styles.entityGrid}>
        {entities.map((entity) => (
          <div key={entity.name} className={styles.entityCard}>
            <div className={styles.entityTop}>
              <div className={styles.entityIconWrap}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>{entity.icon}</span>
              </div>
              <span className={styles.entityCount}>{entity.count}</span>
            </div>
            <h4 className={styles.entityName}>{entity.name}</h4>
            <p className={styles.entityDesc}>{entity.desc}</p>
            <div className={styles.entityActions}>
              <button className={styles.entityActionPrimary}>Gestionar</button>
              <button className={styles.entityActionSecondary}>Nuevo</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Activity & Integrity */}
      <div className={styles.bottomGrid}>
        {/* Activity Feed */}
        <div className={styles.activityCard}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>history</span>
              Actividad Reciente
            </h4>
            <button className={styles.viewAllBtn}>Ver historial completo</button>
          </div>
          <div className={styles.activityFeed}>
            {activities.map((a, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityDot} style={{ backgroundColor: `var(--color-${a.dot})` }} />
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>{a.title}<strong>{a.highlight}</strong>{a.desc}</p>
                  {a.sub && <p className={styles.activitySub}>{a.sub}</p>}
                  <p className={styles.activityTime}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Integrity */}
        <div className={styles.integrityCard}>
          <h4 className={styles.sectionTitle}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>verified_user</span>
            Integridad de Datos
          </h4>
          <div className={styles.integrityBody}>
            <div className={styles.integrityHeader}>
              <span className={styles.integrityLabel}>Consistencia Global</span>
              <span className={styles.integrityPercent}>98.4%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: '98.4%' }} />
            </div>
            <div className={styles.quoteCard}>
              <p className={styles.quoteText}>"Los datos maestros son la fibra que une toda la operación. Mantenerlos limpios es prioridad."</p>
              <p className={styles.quoteAuthor}>— Auditor de Sistema</p>
            </div>
            <button className={styles.diagnosticBtn}>Ejecutar Diagnóstico</button>
          </div>
        </div>
      </div>
    </div>
  );
}
