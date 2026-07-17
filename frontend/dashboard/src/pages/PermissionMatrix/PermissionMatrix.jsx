import PageHeader from '@/components/layout/PageHeader/PageHeader';
import styles from './PermissionMatrix.module.css';

const roles = [
  { id: 'sa', name: 'Super Admin', subtitle: 'Acceso Total', initials: 'SA', avatarBg: 'primary' },
  { id: 'pm', name: 'Prod. Manager', subtitle: 'Operacional', initials: 'PM', avatarBg: 'secondary' },
  { id: 'io', name: 'Inventory Op', subtitle: 'Logística', initials: 'IO', avatarBg: 'tertiary' },
  { id: 'sag', name: 'Sales Agent', subtitle: 'Comercial', initials: 'SA', avatarBg: 'outline' },
  { id: 'an', name: 'Analyst', subtitle: 'Lectura', initials: 'AN', avatarBg: 'primary' },
];

const modules = [
  {
    name: 'Inventory',
    icon: 'inventory_2',
    permissions: [
      { name: 'View Stock levels', desc: 'Visualización global de existencias', checks: [true, true, true, true, true] },
      { name: 'Edit Stock counts', desc: 'Ajustes manuales y auditoría física', checks: [true, true, true, false, false] },
    ],
  },
  {
    name: 'Orders',
    icon: 'shopping_cart',
    permissions: [
      { name: 'Approve Sales Orders', desc: 'Validación de crédito y stock', checks: [true, true, false, false, false] },
      { name: 'Modify Order Pricing', desc: 'Aplicar descuentos y recargos manuales', checks: [true, false, false, true, false] },
    ],
  },
  {
    name: 'Master Data',
    icon: 'database',
    permissions: [
      { name: 'Configure SKU Patterns', desc: 'Gestión de nomenclatura técnica', checks: [true, false, false, false, false] },
      { name: 'Define Fiber Specs', desc: 'Parámetros de calidad de alpaca', checks: [true, true, false, false, false] },
    ],
  },
  {
    name: 'Audit & Compliance',
    icon: 'security',
    permissions: [
      { name: 'Access System Logs', desc: 'Trazabilidad de operaciones críticas', checks: [true, false, false, false, true] },
    ],
  },
];

export default function PermissionMatrix() {
  return (
    <div className={styles.page}>
      <div className={styles.stickyHeader}>
        <nav className={styles.breadcrumb}>
          <span>Inicio</span>
          <span className="material-symbols-outlined">chevron_right</span>
          <span>IAM</span>
          <span className="material-symbols-outlined">chevron_right</span>
          <span className={styles.breadcrumbActive}>Permisos</span>
        </nav>

        <div className={styles.headerRow}>
          <div className={styles.headerTitle}>
            <div className={styles.headerAccent} />
            <div>
              <h1 className={styles.title}>Matriz de Permisos</h1>
              <p className={styles.subtitle}>Gestión granular de accesos por rol y módulo operacional.</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnOutline}>
              <span className="material-symbols-outlined">download</span>
              Exportar Matriz
            </button>
            <button className={styles.btnPrimary}>
              <span className="material-symbols-outlined">save</span>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input className={styles.searchInput} type="text" placeholder="Buscar permisos o módulos..." />
        </div>
        <div className={styles.filterRight}>
          <span className={styles.filterLabel}>Mostrar Roles:</span>
          <div className={styles.avatarStack}>
            {roles.slice(0, 3).map((r) => (
              <div key={r.id} className={`${styles.avatar} ${styles[`avatar_${r.avatarBg}`]}`} title={r.name}>
                {r.initials}
              </div>
            ))}
            <div className={`${styles.avatar} ${styles.avatarMore}`}>+4</div>
          </div>
          <button className={styles.filterIconBtn}>
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      <div className={styles.matrixContainer}>
        <table className={styles.matrixTable}>
          <thead>
            <tr className={styles.stickyRow}>
              <th className={`${styles.thFirst} ${styles.stickyCol} ${styles.stickyHeader}`}>
                <span className={styles.thLabel}>Módulos & Permisos</span>
              </th>
              {roles.map((r) => (
                <th key={r.id} className={`${styles.thRole} ${styles.stickyHeader}`}>
                  <div className={styles.thRoleName}>{r.name}</div>
                  <div className={styles.thRoleSub}>{r.subtitle}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((mod) => (
              <tr key={mod.name}>
                <td className={`${styles.moduleSection} ${styles.stickyCol}`} colSpan={6}>
                  <div className={styles.moduleHeader}>
                    <span className="material-symbols-outlined">{mod.icon}</span>
                    <span className={styles.moduleName}>{mod.name}</span>
                  </div>
                </td>
              </tr>
            ))}
            {modules.map((mod) =>
              mod.permissions.map((perm) => (
                <tr key={perm.name} className={styles.permRow}>
                  <td className={`${styles.permCell} ${styles.stickyCol}`}>
                    <div className={styles.permInfo}>
                      <span className={styles.permName}>{perm.name}</span>
                      <span className={styles.permDesc}>{perm.desc}</span>
                    </div>
                  </td>
                  {perm.checks.map((checked, i) => (
                    <td key={i} className={styles.checkCell}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        defaultChecked={checked}
                      />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span>© 2024 Alpacart Textiles ERP. All rights reserved.</span>
          <div className={styles.footerLinks}>
            <span>Privacy Policy</span>
            <span>Operational Status</span>
          </div>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.footerStat}>
            <span className={styles.footerDot} />
            <span>42 Permisos cargados</span>
          </div>
          <div className={styles.footerStat}>
            <span className="material-symbols-outlined">update</span>
            <span>Último cambio: Hace 12 min</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
