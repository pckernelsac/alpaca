import { useState } from 'react';
import styles from './CampaignList.module.css';

const tabs = [
  { icon: 'campaign', label: 'Campañas', active: true },
  { icon: 'trending_up', label: 'Promociones' },
  { icon: 'local_activity', label: 'Cupones' },
  { icon: 'percent', label: 'Descuentos' },
  { icon: 'auto_awesome_motion', label: 'Landing Pages' },
  { icon: 'groups', label: 'Segmentos' },
];

const campaigns = [
  {
    name: "Lanzamiento Invierno '24",
    meta: 'Vigente hasta 15 Nov',
    type: 'Estacional',
    channel: 'EMAIL + WEB',
    channelIcon: 'mail',
    budget: '$12,400.00',
    roi: '4.2x ROI',
    conv: '8.5% Conv.',
    status: 'ACTIVA',
    statusClass: 'active',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf2GRKIwVhih7CwKjjig0QQTe7hHtCMaNU7EpbtQLZGQZYapjPCEk1_5cLHtUWqOD_m_8pqp8aba3FVU7psGeVRaEHBENdTiG37hEU0P8wlUgR4CsY9q_-cb3QvNpTFvkvUpfWXpXUiCTli74Dx-Wsvk5AK8J6aTl5CZKoGRTis3t_WzjPRFhOzIFnnrIpbwl4Z0Gg99VimbAkJOS0QkXHxUuP-FHx5tuLakiMTmUz-0MCmzn5v_ds-MRFuuMOwt_wpKRCKzTbEF9n',
  },
  {
    name: 'Black Friday Alpaca',
    meta: 'Inicia en 12 días',
    type: 'Promocional',
    channel: 'SOCIAL ADS',
    channelIcon: 'share',
    budget: '$25,000.00',
    roi: '—',
    conv: null,
    status: 'PROGRAMADA',
    statusClass: 'scheduled',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNBpup6EsbASZaIV6_zShNIKerI3sszaOHsSHNt5lgjdtvUDmu_xin0kazQWFWm1cudOhxKs8nvhzOju-GKmEZb9xEeEm0CIOAm4pm65CbvYOCic9xg167S1Hmf2DDq19D595J6qSJzEGAwqobzCMSHFc6X23D5eyDYPji4mA-YvEFe89L9CXuX6-EyuKFLuMBaYWKDE_ghsXyt3eKBEDUwINZ2ix3yaFQTbJ6-M1yft3Wg8n3UcCIk91MOTKWKQisuGgYUM22_fIC',
  },
  {
    name: 'Retargeting Abandonados',
    meta: 'Siempre activa',
    type: 'Recurrente',
    channel: 'AUTOMATIZACIÓN',
    channelIcon: 'smart_toy',
    budget: '$2,500.00 / mes',
    roi: '12.8x ROI',
    conv: '22% Conv.',
    status: 'ACTIVA',
    statusClass: 'active',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz0-QI0QBY2J0dZgGWJoL_W9dnM74QnK8KhLbjKx3i8WSLe9ryLkixpY2Z2ZiQzaaU86okXPJp57cs-vOVOvMEzSje8euDjDSRgqw2uvakYZ0nLpppyL9FGC4P3btH8GElnYFLJE0AA1f3Use0rpXQcgLXHFd5Isa3NBFHzJZw9HOREfZHLD91HzDuWETfJn65lK3mwbDLduut_Qq2JZ9gpb5zQ5VIlXVopko3e-IALqSCBz-r2H_lyfHULYtyRZg21TMI7Eh_Oajd',
  },
  {
    name: "Colección Otoño '24",
    meta: 'En revisión final',
    type: 'Estacional',
    channel: 'EMAIL',
    channelIcon: 'mail',
    budget: '$8,900.00',
    roi: '3.1x ROI',
    conv: '5.2% Conv.',
    status: 'BORRADOR',
    statusClass: 'draft',
    img: null,
  },
  {
    name: 'Anuncios LinkedIn B2B',
    meta: 'Finalizada el 30 Sep',
    type: 'Profesional',
    channel: 'SOCIAL ADS',
    channelIcon: 'share',
    budget: '$6,200.00',
    roi: '2.8x ROI',
    conv: '3.4% Conv.',
    status: 'FINALIZADA',
    statusClass: 'finished',
    img: null,
  },
];

const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const calendarDays = [
  null, null, null, null, 1, 2, 3,
  4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30, 31,
];

const scheduleItems = [
  { time: 'Mañana, 09:00 AM', title: 'Email Blast: VIP Early Access', status: 'En espera de publicación', icon: 'schedule', color: 'primary' },
  { time: 'Viernes, 18:00 PM', title: 'Post IG: Artesanía Alpaca', status: 'Aprobado por Diseño', icon: 'done_all', color: 'outline' },
  { time: '15 Oct, 00:00 AM', title: 'Landing: New Collections', status: 'Generación automática', icon: 'auto_mode', color: 'tertiary' },
];

export default function CampaignList() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h1 className={styles.pageTitle}>Gestión de Marketing</h1>
          <p className={styles.pageDesc}>Control centralizado de estrategias comerciales y activos digitales.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">add_circle</span>
            Nueva Campaña
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">confirmation_number</span>
            Crear Cupón
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">web</span>
            Nueva Landing Page
          </button>
        </div>
      </section>

      <div className={styles.tabBar}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={`${styles.tab} ${i === activeTab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <span className="material-symbols-outlined">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.mainContent}>
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Estado</label>
              <select className={styles.filterSelect}>
                <option>Todos los Estados</option>
                <option>Activa</option>
                <option>Programada</option>
                <option>Borrador</option>
                <option>Finalizada</option>
                <option>Pausada</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Canal</label>
              <select className={styles.filterSelect}>
                <option>Todos los Canales</option>
                <option>Email</option>
                <option>Social</option>
                <option>Web</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Fecha</label>
              <div className={styles.dateInput}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
                <input className={styles.dateField} type="text" defaultValue="Oct 01 - Oct 31, 2023" />
              </div>
            </div>
            <div className={styles.filterSpacer} />
            <button className={styles.moreFilters}>
              <span className="material-symbols-outlined">filter_list</span>
              Más Filtros
            </button>
          </div>

          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Campaña</th>
                    <th>Tipo / Canal</th>
                    <th>Presupuesto</th>
                    <th>ROI / Conv.</th>
                    <th>Estado</th>
                    <th style={{ textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.name} className={styles.tableRow}>
                      <td>
                        <div className={styles.campaignCell}>
                          <div className={styles.campaignImg}>
                            {c.img ? (
                              <img src={c.img} alt="" />
                            ) : (
                              <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)', fontSize: 20 }}>campaign</span>
                            )}
                          </div>
                          <div>
                            <div className={styles.campaignName}>{c.name}</div>
                            <div className={styles.campaignMeta}>{c.meta}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.channelInfo}>
                          <span className={styles.channelType}>{c.type}</span>
                          <span className={styles.channelBadge}>
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{c.channelIcon}</span>
                            {c.channel}
                          </span>
                        </div>
                      </td>
                      <td className={styles.cellMono}>{c.budget}</td>
                      <td>
                        {c.roi !== '—' ? (
                          <div>
                            <div className={styles.roiHighlight}>{c.roi}</div>
                            <div className={styles.convSub}>{c.conv}</div>
                          </div>
                        ) : (
                          <div className={styles.roiDash}>—</div>
                        )}
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[c.statusClass]}`}>{c.status}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className={styles.actionGroup}>
                          <button className={styles.actionBtn} title="Vista Previa"><span className="material-symbols-outlined">visibility</span></button>
                          <button className={styles.actionBtn} title="Editar"><span className="material-symbols-outlined">edit</span></button>
                          <button className={styles.actionBtn} title="Analíticas"><span className="material-symbols-outlined">insights</span></button>
                          <button className={styles.actionBtn} title="Más"><span className="material-symbols-outlined">more_vert</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.pagination}>
              <span className={styles.paginationInfo}>Mostrando 1-5 de 48 campañas</span>
              <div className={styles.paginationBtns}>
                <button className={styles.pageBtn} disabled>Anterior</button>
                <button className={styles.pageBtn}>Siguiente</button>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.calendarHeader}>
              <h4 className={styles.sidebarTitle}>Calendario</h4>
              <div className={styles.calendarNav}>
                <button className={styles.calNavBtn}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span></button>
                <button className={styles.calNavBtn}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span></button>
              </div>
            </div>
            <div className={styles.calGrid}>
              {weekDays.map((d) => (
                <div key={d} className={styles.calDayHeader}>{d}</div>
              ))}
              {calendarDays.map((d, i) => (
                <div key={i} className={`${styles.calDay} ${d === 1 ? styles.calToday : ''} ${d === 10 ? styles.calEvent : ''} ${d === 3 ? styles.calActive : ''}`}>
                  {d ?? ''}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarTitle}>Programación</h4>
            <div className={styles.scheduleList}>
              {scheduleItems.map((item) => (
                <div key={item.title} className={styles.scheduleItem} style={{ borderLeftColor: item.color === 'primary' ? 'var(--color-primary)' : item.color === 'tertiary' ? 'var(--color-tertiary)' : 'var(--color-outline)' }}>
                  <div className={`${styles.scheduleTime} ${styles[item.color]}`}>{item.time}</div>
                  <div className={styles.scheduleTitle}>{item.title}</div>
                  <div className={styles.scheduleStatus}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{item.icon}</span>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.scheduleBtn}>Ver todo el planning</button>
          </div>

          <div className={styles.kpiPanel}>
            <div className={styles.kpiBar} />
            <h4 className={styles.kpiPanelTitle}>Rendimiento Mensual</h4>
            <div className={styles.kpiPanelGrid}>
              <div>
                <div className={styles.kpiPanelLabel}>Inversión</div>
                <div className={styles.kpiPanelValue}>$18.2k</div>
              </div>
              <div>
                <div className={styles.kpiPanelLabel}>Conversiones</div>
                <div className={styles.kpiPanelValue}>+12%</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <button className={styles.fab}>
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
