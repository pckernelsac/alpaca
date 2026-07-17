import { useState } from 'react';
import styles from './CmsDashboard.module.css';

const kpiCards = [
  { label: 'Total Pages', value: '48', icon: 'description', accent: 'primary', subtitle: 'All content types' },
  { label: 'Published', value: '32', icon: 'check_circle', accent: 'success', trend: '+3 this week' },
  { label: 'Drafts', value: '8', icon: 'edit_note', accent: 'neutral', subtitle: 'Awaiting review' },
  { label: 'Scheduled', value: '5', icon: 'schedule', accent: 'tertiary', subtitle: 'Next 7 days' },
  { label: 'Monthly Visitors', value: '18.4k', icon: 'visitors', accent: 'primary', trend: '+12% vs last month' },
  { label: 'Avg Engagement', value: '4m 32s', icon: 'timer', accent: 'secondary', trend: '+8% vs last month' },
];

const barData = [
  { h: 40 }, { h: 60 }, { h: 80 }, { h: 45 },
  { h: 30 }, { h: 90 }, { h: 50 }, { h: 40 },
  { h: 65 }, { h: 75 }, { h: 40 }, { h: 55 },
  { h: 100 }, { h: 20 }, { h: 45 }, { h: 70 },
];

const activityData = [
  { title: 'Summer Vicuña Collection', type: 'Collection', author: 'Jane Doe', initials: 'JD', avatarBg: 'var(--color-tertiary-container)', status: 'Published', statusColor: 'var(--color-success)', time: '2h ago' },
  { title: 'Artisanal Weaving Process', type: 'Page', author: 'Aris M.', initials: 'AM', avatarBg: 'var(--color-primary-container)', status: 'Draft', statusColor: 'var(--color-outline-variant)', time: '5h ago' },
  { title: 'Homepage Hero V2', type: 'Banner', author: 'S. Lopez', initials: 'SL', avatarBg: 'var(--color-secondary-container)', status: 'Published', statusColor: 'var(--color-success)', time: 'Oct 23, 14:20' },
  { title: 'Sustainable Farming Blog', type: 'Blog Post', author: 'Jane Doe', initials: 'JD', avatarBg: 'var(--color-tertiary-container)', status: 'Scheduled', statusColor: 'var(--color-tertiary)', time: 'Oct 22, 09:15' },
  { title: 'Q4 Textiles Catalog', type: 'Landing Page', author: 'Aris M.', initials: 'AM', avatarBg: 'var(--color-primary-container)', status: 'Published', statusColor: 'var(--color-success)', time: 'Oct 21, 11:45' },
];

const accentMap = {
  primary: 'var(--color-primary)',
  success: '#22c55e',
  tertiary: 'var(--color-tertiary)',
  secondary: 'var(--color-secondary)',
  neutral: 'var(--color-outline)',
};

const donutGradient = 'conic-gradient(var(--color-primary) 0% 45%, var(--color-outline-variant) 45% 75%, var(--color-secondary) 75% 100%)';

export default function CmsDashboard() {
  const [selectedBars, setSelectedBars] = useState([2, 5, 9, 12, 15]);

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard CMS</h2>
          <p className={styles.pageDesc}>Manage institutional and e-commerce digital assets.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.dateBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_today</span>
            <span>Oct 24, 2023 - Today</span>
          </div>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: accentMap[kpi.accent] || accentMap.primary }} />
            <div className={styles.kpiContent}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-primary-container)' }}>{kpi.icon}</span>
              </div>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <div className={styles.kpiFooter}>
                {kpi.trend && <span className={styles.kpiTrend}>{kpi.trend}</span>}
                {kpi.subtitle && <span className={styles.kpiSubtitle}>{kpi.subtitle}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <div>
              <h4 className={styles.chartTitle}>Publishing Activity</h4>
              <p className={styles.chartSub}>Content publication frequency (last 30 days)</p>
            </div>
            <div className={styles.chartLegend}>
              <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-primary)' }} />
              <span className={styles.legendLabel}>Live Content</span>
            </div>
          </div>
          <div className={styles.barChart}>
            {barData.map((b, i) => (
              <div key={i} className={styles.barWrapper}>
                <div
                  className={selectedBars.includes(i) ? styles.barActive : styles.barDefault}
                  style={{ height: `${b.h}%` }}
                />
              </div>
            ))}
          </div>
          <div className={styles.barLabels}>
            <span>OCT 01</span>
            <span>OCT 10</span>
            <span>OCT 20</span>
            <span>OCT 30</span>
          </div>
        </div>

        <div className={styles.chartsRight}>
          <div className={styles.quickActionsCard}>
            <h4 className={styles.chartTitle}>Quick Actions</h4>
            <div className={styles.quickActionsList}>
              <button className={styles.actionPrimary}>
                <div className={styles.actionLeft}>
                  <span className="material-symbols-outlined">add_circle</span>
                  New Page
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
              <button className={styles.actionOutline}>
                <div className={styles.actionLeft}>
                  <span className="material-symbols-outlined">view_carousel</span>
                  New Banner
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
              <button className={styles.actionOutline}>
                <div className={styles.actionLeft}>
                  <span className="material-symbols-outlined">campaign</span>
                  New Campaign
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>

            <div className={styles.donutSection}>
              <h5 className={styles.donutTitle}>Content Status</h5>
              <div className={styles.donutWrap}>
                <div className={styles.donut} style={{ background: donutGradient }}>
                  <div className={styles.donutCenter}>
                    <span className={styles.donutValue}>188</span>
                    <span className={styles.donutLabel}>Total Items</span>
                  </div>
                </div>
              </div>
              <div className={styles.donutLegend}>
                <div className={styles.donutLegendItem}>
                  <span className={styles.donutDot} style={{ backgroundColor: 'var(--color-primary)' }} />
                  <span>Published</span>
                </div>
                <div className={styles.donutLegendItem}>
                  <span className={styles.donutDot} style={{ backgroundColor: 'var(--color-outline-variant)' }} />
                  <span>Draft</span>
                </div>
                <div className={styles.donutLegendItem}>
                  <span className={styles.donutDot} style={{ backgroundColor: 'var(--color-secondary)' }} />
                  <span>Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentRow}>
        <div className={styles.distributionCard}>
          <h4 className={styles.chartTitle}>Content Distribution</h4>
          <p className={styles.chartSub}>Institutional vs. E-commerce split</p>
          <div className={styles.progressList}>
            <div className={styles.progressItem}>
              <div className={styles.progressLabelRow}>
                <span className={styles.progressLabel}>Institutional Content</span>
                <span className={styles.progressValue}>62%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '62%', backgroundColor: 'var(--color-primary)' }} />
              </div>
            </div>
            <div className={styles.progressItem}>
              <div className={styles.progressLabelRow}>
                <span className={styles.progressLabel}>E-commerce Assets</span>
                <span className={styles.progressValue}>38%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '38%', backgroundColor: 'var(--color-secondary)' }} />
              </div>
            </div>
          </div>
          <div className={styles.insightBanner}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>auto_awesome</span>
            <p>Optimize: E-commerce assets are 12% lower than Q3 average.</p>
          </div>
        </div>

        <div className={styles.activityCard}>
          <div className={styles.activityHeader}>
            <h4 className={styles.chartTitle}>Recent Activity</h4>
            <button className={styles.viewAllBtn}>View All Updates</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Last Edit</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((row, i) => (
                  <tr key={i} className={styles.tableRow}>
                    <td className={styles.tdTitle}>{row.title}</td>
                    <td>
                      <span className={styles.typeBadge}>{row.type}</span>
                    </td>
                    <td>
                      <div className={styles.authorCell}>
                        <span className={styles.authorAvatar} style={{ backgroundColor: row.avatarBg }}>{row.initials}</span>
                        {row.author}
                      </div>
                    </td>
                    <td>
                      <span className={styles.statusBadge} style={{ color: row.statusColor }}>
                        <span className={styles.statusDot} style={{ backgroundColor: row.statusColor }} />
                        {row.status}
                      </span>
                    </td>
                    <td className={styles.tdTime}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span>Handcrafted Precision</span>
        <span className={styles.footerDivider} />
        <span>Alpacart Textiles ERP</span>
        <span className={styles.footerDivider} />
        <span>v2.4.0</span>
      </div>
    </div>
  );
}
