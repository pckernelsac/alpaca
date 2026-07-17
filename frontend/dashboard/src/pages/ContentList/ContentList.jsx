import { useState } from 'react';
import styles from './ContentList.module.css';

const statusStyles = {
  Published: { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
  Draft: { bg: 'transparent', color: 'var(--color-on-surface-variant)', border: 'var(--color-outline-variant)' },
  Scheduled: { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' },
  Review: { bg: '#fef9c3', color: '#854d0e', border: '#fde68a' },
};

const typeBadgeStyles = {
  Page: 'primary',
  Blog: 'tertiary',
  Banner: 'secondary',
  Collection: 'default',
  Promo: 'secondary',
};

const tableData = [
  { title: 'Winter Alpaca Essentials 2024', slug: '/collections/winter-24', type: 'Collection', author: 'Elena R.', initials: 'ER', avatarBg: 'var(--color-tertiary-container)', status: 'Published', statusClass: 'Published', date: 'Oct 12, 2023', image: true },
  { title: 'The Art of Andean Weaving', slug: '/blog/andean-weaving-art', type: 'Blog', author: 'Marco P.', initials: 'MP', avatarBg: 'var(--color-primary-container)', status: 'Scheduled', statusClass: 'Scheduled', date: 'Nov 01, 2023', image: false },
  { title: 'Holiday Season Promo Banner', slug: 'target: home_top_hero', type: 'Banner', author: 'System', initials: 'SY', avatarBg: 'var(--color-primary-fixed)', status: 'Draft', statusClass: 'Draft', date: 'Today', image: false },
  { title: 'About Us - Brand Story', slug: '/pages/about-us', type: 'Page', author: 'Elena R.', initials: 'ER', avatarBg: 'var(--color-tertiary-container)', status: 'Published', statusClass: 'Published', date: 'Oct 08, 2023', image: false },
  { title: 'Sustainable Practices Report', slug: '/blog/sustainability', type: 'Blog', author: 'Marco P.', initials: 'MP', avatarBg: 'var(--color-primary-container)', status: 'Review', statusClass: 'Review', date: 'Oct 05, 2023', image: false },
  { title: 'Homepage Hero Banner Q4', slug: 'target: home_hero', type: 'Banner', author: 'System', initials: 'SY', avatarBg: 'var(--color-primary-fixed)', status: 'Published', statusClass: 'Published', date: 'Sep 28, 2023', image: false },
  { title: 'FAQ - Shipping & Returns', slug: '/pages/faq-shipping', type: 'Page', author: 'Elena R.', initials: 'ER', avatarBg: 'var(--color-tertiary-container)', status: 'Draft', statusClass: 'Draft', date: 'Sep 25, 2023', image: false },
];

const typeMap = {
  primary: { bg: 'var(--color-primary-fixed)', color: 'var(--color-primary)' },
  tertiary: { bg: '#dbeafe', color: '#1e40af' },
  secondary: { bg: '#fef3c7', color: '#92400e' },
  default: { bg: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)' },
};

export default function ContentList() {
  const [view, setView] = useState('list');

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <span>Admin</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Content Management</span>
          </nav>
          <h2 className={styles.pageTitle}>Gestión de Contenido</h2>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>layers</span>
            Visual Editor
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>inventory</span>
            Bulk Actions
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Nuevo Contenido
          </button>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>TYPE:</span>
            <select className={styles.filterSelect}>
              <option>All Content</option>
              <option>Institutional Pages</option>
              <option>Banners</option>
              <option>Collections</option>
              <option>Blog</option>
              <option>FAQ</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>STATUS:</span>
            <select className={styles.filterSelect}>
              <option>All Statuses</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>AUTHOR:</span>
            <select className={styles.filterSelect}>
              <option>All Authors</option>
              <option>Me</option>
              <option>Editorial Team</option>
            </select>
          </div>
        </div>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === 'list' ? styles.viewActive : ''}`}
            onClick={() => setView('list')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>list</span>
          </button>
          <button
            className={`${styles.viewBtn} ${view === 'card' ? styles.viewActive : ''}`}
            onClick={() => setView('card')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>grid_view</span>
          </button>
        </div>
      </div>

      {view === 'list' && (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCheck}>
                  <input type="checkbox" className={styles.checkbox} />
                </th>
                <th>Content Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Author</th>
                <th>Date</th>
                <th className={styles.thActions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className={styles.tableRow}>
                  <td className={styles.tdCheck}>
                    <input type="checkbox" className={styles.checkbox} />
                  </td>
                  <td>
                    <div className={styles.titleCell}>
                      <div className={styles.titleThumb}>
                        {row.image ? (
                          <div className={styles.thumbPlaceholder} />
                        ) : (
                          <span className="material-symbols-outlined" style={{ color: 'var(--color-outline)', fontSize: 20 }}>
                            {row.type === 'Blog' ? 'article' : row.type === 'Banner' ? 'photo_size_select_actual' : 'description'}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className={styles.titleText}>{row.title}</p>
                        <p className={styles.titleSlug}>{row.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={styles.typeBadge}
                      style={{
                        backgroundColor: typeMap[typeBadgeStyles[row.type] || 'default'].bg,
                        color: typeMap[typeBadgeStyles[row.type] || 'default'].color,
                        border: `1px solid ${typeMap[typeBadgeStyles[row.type] || 'default'].bg}`,
                      }}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td>
                    <span
                      className={styles.statusBadge}
                      style={{
                        backgroundColor: statusStyles[row.statusClass].bg,
                        color: statusStyles[row.statusClass].color,
                        borderColor: statusStyles[row.statusClass].border,
                      }}
                    >
                      <span className={styles.statusDot} style={{ backgroundColor: statusStyles[row.statusClass].color }} />
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.authorCell}>
                      <span className={styles.authorAvatar} style={{ backgroundColor: row.avatarBg }}>{row.initials}</span>
                      <span className={styles.authorName}>{row.author}</span>
                    </div>
                  </td>
                  <td className={styles.tdDate}>{row.date}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} title="Edit">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                      </button>
                      <button className={styles.actionBtn} title="Preview">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                      </button>
                      <button className={styles.actionBtn} title="Duplicate">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>content_copy</span>
                      </button>
                      <button className={styles.actionDanger} title="Delete">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>Showing 1-7 of 154 entries</span>
            <div className={styles.paginationBtns}>
              <button className={styles.pageBtn} disabled>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              <button className={styles.pageActive}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <span className={styles.pageEllipsis}>...</span>
              <button className={styles.pageBtn}>12</button>
              <button className={styles.pageBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'card' && (
        <div className={styles.cardGrid}>
          {tableData.slice(0, 3).map((row, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImage}>
                {row.image ? (
                  <div className={styles.cardImageBg} />
                ) : (
                  <div className={styles.cardImageIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline-variant)' }}>
                      {row.type === 'Blog' ? 'article' : row.type === 'Banner' ? 'photo_size_select_actual' : 'description'}
                    </span>
                  </div>
                )}
                <div className={styles.cardStatus}>
                  <span
                    className={styles.cardStatusBadge}
                    style={{
                      backgroundColor: statusStyles[row.statusClass].bg,
                      color: statusStyles[row.statusClass].color,
                      borderColor: statusStyles[row.statusClass].border,
                    }}
                  >
                    {row.status.toUpperCase()}
                  </span>
                </div>
                <div className={styles.cardEditBtn}>
                  <button className={styles.cardEditIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                  </button>
                </div>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardType} style={{
                  color: typeMap[typeBadgeStyles[row.type] || 'default'].color,
                }}>{row.type}</p>
                <h3 className={styles.cardTitle}>{row.title}</h3>
                <div className={styles.cardFooter}>
                  <span className={styles.cardAuthor}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>
                    {row.author}
                  </span>
                  <span className={styles.cardDate}>{row.date}</span>
                </div>
              </div>
            </div>
          ))}
          <button className={styles.cardAdd}>
            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>add_circle</span>
            <span className={styles.cardAddText}>Create New Component</span>
          </button>
        </div>
      )}

      <div className={styles.statsFooter}>
        <div className={styles.statCard}>
          <div className={styles.statAccent} />
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-primary)' }}>
            <span className="material-symbols-outlined">description</span>
          </div>
          <div>
            <p className={styles.statLabel}>Total Pages</p>
            <h3 className={styles.statValue}>48</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statAccent} />
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-primary)' }}>
            <span className="material-symbols-outlined">auto_graph</span>
          </div>
          <div>
            <p className={styles.statLabel}>Active Promos</p>
            <h3 className={styles.statValue}>12</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statAccent} />
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-primary)' }}>
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <p className={styles.statLabel}>Scheduled</p>
            <h3 className={styles.statValue}>6</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statAccent} />
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-primary)' }}>
            <span className="material-symbols-outlined">history</span>
          </div>
          <div>
            <p className={styles.statLabel}>Recent Changes</p>
            <h3 className={styles.statValue}>142</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
