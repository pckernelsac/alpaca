import { useState } from 'react';
import styles from './OrderTimeline.module.css';

const events = [
  {
    title: 'Pedido Creado',
    date: '24 May 2024, 09:15',
    actor: 'Elena Rodriguez',
    note: 'Pedido ingresado vía Showroom.',
    icon: 'add_shopping_cart',
    colorClass: 'created',
    active: true,
  },
  {
    title: 'Confirmado',
    date: '24 May 2024, 10:30',
    actor: 'Sistema',
    note: 'Inventario reservado exitosamente.',
    icon: 'check_circle',
    colorClass: 'confirmed',
    active: true,
  },
  {
    title: 'Pago recibido',
    date: '24 May 2024, 11:45',
    actor: 'Administrador',
    note: 'Transacción aprobada por pasarela de pagos.',
    icon: 'payments',
    colorClass: 'paid',
    active: true,
  },
  {
    title: 'En Preparación',
    date: '24 May 2024, 14:20',
    actor: 'Operador Almacén',
    note: 'Picking completado, iniciando empaquetado.',
    icon: 'inventory',
    colorClass: 'preparation',
    active: true,
  },
  {
    title: 'Despachado',
    date: '25 May 2024, 08:30',
    actor: 'Logística',
    note: 'Entregado a transportista externo.',
    icon: 'local_shipping',
    colorClass: 'shipped',
    active: true,
  },
  {
    title: 'En tránsito',
    date: '25 May 2024, 12:00',
    actor: 'DHL Express',
    note: 'En ruta al centro de distribución local.',
    icon: 'distance',
    colorClass: 'transit',
    active: true,
  },
  {
    title: 'Entregado',
    date: '26 May 2024, 16:45',
    actor: 'Repartidor',
    note: 'Recibido por el cliente en domicilio.',
    icon: 'task_alt',
    colorClass: 'delivered',
    active: true,
    signature: 'J. Quispe',
  },
  {
    title: 'Devuelto (Inactivo)',
    date: '',
    actor: '',
    note: 'Sin registros actuales para este hito.',
    icon: 'assignment_return',
    colorClass: 'inactive',
    active: false,
  },
  {
    title: 'Cancelado (Inactivo)',
    date: '',
    actor: '',
    note: 'Sin registros actuales para este hito.',
    icon: 'cancel',
    colorClass: 'inactive',
    active: false,
  },
];

const eventTypes = [
  { label: 'Eventos Críticos', checked: true },
  { label: 'Notas de Usuarios', checked: true },
  { label: 'Errores de Sistema', checked: false },
];

export default function OrderTimeline() {
  const [search, setSearch] = useState('');
  const [responsible, setResponsible] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [checks, setChecks] = useState(eventTypes.map((e) => e.checked));

  const handleCheck = (idx) => {
    const next = [...checks];
    next[idx] = !next[idx];
    setChecks(next);
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <a href="/">Inicio</a>
        <span className="material-symbols-outlined">chevron_right</span>
        <a href="/orders/list">Pedidos</a>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>Seguimiento</span>
      </nav>

      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <div className={styles.headerTop}>
            <h2 className={styles.pageTitle}>Pedido #ORD-2024-0892</h2>
            <span className={styles.statusBadge}>Entregado</span>
          </div>
          <p className={styles.pageDesc}>
            Ciclo de vida detallado del pedido desde su creación hasta la recepción final por parte del cliente.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">print</span>
            Imprimir Acta
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">mail</span>
            Notificar Cliente
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {/* Left: Timeline */}
        <div className={styles.timelineCol}>
          <div className={styles.timelineCard}>
            {events.map((evt, i) => (
              <div
                key={i}
                className={`${styles.event} ${evt.active ? '' : styles.eventInactive}`}
              >
                <div
                  className={`${styles.eventIcon} ${
                    evt.colorClass === 'delivered'
                      ? styles.eventIconDelivered
                      : evt.colorClass === 'inactive'
                      ? styles.eventIconInactive
                      : evt.active
                      ? styles.eventIconActive
                      : styles.eventIconInactive
                  }`}
                >
                  <span className={`material-symbols-outlined ${styles.eventIconSymbol}`}>
                    {evt.icon}
                  </span>
                </div>
                <div className={styles.eventBody}>
                  <div className={styles.eventHeader}>
                    <div>
                      <h3
                        className={`${styles.eventTitle} ${
                          evt.colorClass === 'delivered' ? styles.eventTitleDelivered : ''
                        }`}
                      >
                        {evt.title}
                      </h3>
                      {evt.date && (
                        <p className={styles.eventMeta}>
                          {evt.date}
                          {evt.actor && (
                            <>
                              {' '}
                              &bull; Usuario:{' '}
                              <span
                                className={
                                  evt.colorClass === 'confirmed'
                                    ? styles.actorSecondary
                                    : evt.colorClass === 'paid'
                                    ? styles.actorTertiary
                                    : evt.colorClass === 'transit'
                                    ? styles.actorTertiary
                                    : styles.actorDefault
                                }
                              >
                                {evt.actor}
                              </span>
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    {evt.colorClass === 'created' && (
                      <span className={styles.eventId}>ID: EV-1029</span>
                    )}
                  </div>
                  {evt.note && (
                    <div
                      className={`${styles.eventNote} ${
                        evt.colorClass === 'delivered' ? styles.eventNoteDelivered : ''
                      }`}
                    >
                      <p className={evt.colorClass === 'delivered' ? styles.noteTextPrimary : styles.noteTextMuted}>
                        &ldquo;{evt.note}&rdquo;
                      </p>
                      {evt.signature && (
                        <div className={styles.signatureRow}>
                          <div className={styles.signatureIcon}>
                            <span className="material-symbols-outlined">draw</span>
                          </div>
                          <span className={styles.signatureLabel}>Firma confirmada por: {evt.signature}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Filters & Summary */}
        <aside className={styles.sideCol}>
          {/* Filters */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>filter_list</span>
              <h3 className={styles.sideCardTitle}>Filtros de Eventos</h3>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Buscar por palabra clave</label>
              <input
                className={styles.filterInput}
                type="text"
                placeholder="Ej: DHL, Pago, Elena..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Responsable</label>
              <select
                className={styles.filterSelect}
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
              >
                <option value="">Todos los responsables</option>
                <option value="Sistemas">Sistemas</option>
                <option value="Administración">Administración</option>
                <option value="Logística">Logística</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Rango de fechas</label>
              <div className={styles.dateRange}>
                <input
                  className={styles.filterDate}
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
                <input
                  className={styles.filterDate}
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.checkGroup}>
              {eventTypes.map((et, i) => (
                <label key={i} className={styles.checkLabel}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={checks[i]}
                    onChange={() => handleCheck(i)}
                  />
                  <span>{et.label}</span>
                </label>
              ))}
            </div>
            <button className={styles.applyBtn}>Aplicar Filtros</button>
          </div>

          {/* Order Summary */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>info</span>
              <h3 className={styles.sideCardTitle}>Resumen de Pedido</h3>
            </div>
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Cliente</span>
                <span className={styles.summaryValue}>Santiago Velásquez</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Monto Total</span>
                <span className={styles.summaryValueBold}>$2,450.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Método Pago</span>
                <span className={styles.summaryValue}>Tarjeta Crédito (VISA)</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Envío</span>
                <span className={styles.summaryValue}>Standard Local (DHL)</span>
              </div>
            </div>
            <div className={styles.summaryProduct}>
              <div className={styles.summaryProductImg}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-EmzKg4kXJdMkRqxDP_gd54nRcQZMp4jxEa1AtXoMg4IDGtRKgNq7TsxclQ8mcWAxCDhz0v6Q2P52vU51O1VDkpX0Oo187Eo5J-LmwDyx3PgLILP48utHn9FTqv3Jj2dDS8uteSuxeISc41nuLT8s-ovWI2MW4ZxBPXXKk2suCKuZv-6WxjQIhLSIRHDdmORX17sV1KzoT3jnxQrMtaVaVh7ejD7Uaqq1bGHalcAj8kjnhtvMQ9zdhyIO_LA-35D8ZsetRGY9UUDI"
                  alt="Manta Alpaca Royal"
                />
              </div>
              <div>
                <p className={styles.summaryProductName}>Manta Alpaca Royal</p>
                <p className={styles.summaryProductSku}>SKU: ART-502 &bull; Cant: 12</p>
              </div>
            </div>
            <a className={styles.productsLink} href="#">Ver productos completos (5)</a>
          </div>

          {/* Quick Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Días Ciclo</p>
              <p className={styles.statValue}>2.3</p>
            </div>
            <div className={`${styles.statCard} ${styles.statCardTertiary}`}>
              <p className={styles.statLabel}>Efectividad</p>
              <p className={styles.statValue}>100%</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className={styles.mobileNav}>
        <button className={styles.mobileNavBtn}>
          <span className="material-symbols-outlined">dashboard</span>
          <span>Panel</span>
        </button>
        <button className={`${styles.mobileNavBtn} ${styles.mobileNavBtnActive}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
          <span>Pedidos</span>
        </button>
        <button className={styles.mobileNavBtnFab}>
          <span className="material-symbols-outlined">add</span>
        </button>
        <button className={styles.mobileNavBtn}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span>Stock</span>
        </button>
        <button className={styles.mobileNavBtn}>
          <span className="material-symbols-outlined">person</span>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}
