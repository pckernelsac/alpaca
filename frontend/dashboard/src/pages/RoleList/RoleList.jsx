import PageHeader from '@/components/layout/PageHeader/PageHeader';
import styles from './RoleList.module.css';

const roles = [
  {
    id: 1,
    name: 'Super Administrador',
    category: 'Crítico',
    categoryClass: 'critical',
    barColor: 'primary',
    description: 'Acceso total a todos los módulos del sistema, configuraciones globales y auditoría de transacciones.',
    users: 3,
    permissions: 'Todos activos',
    status: 'Activo',
    statusClass: 'active',
  },
  {
    id: 2,
    name: 'Gestor de Producción',
    category: 'Operativo',
    categoryClass: 'operativo',
    barColor: 'tertiary',
    description: 'Gestión de órdenes de trabajo, control de calidad y asignación de maquinaria en planta.',
    users: 12,
    permissions: '24 permisos',
    status: 'Activo',
    statusClass: 'active',
  },
  {
    id: 3,
    name: 'Analista Financiero',
    category: 'Administrativo',
    categoryClass: 'administrativo',
    barColor: 'secondary',
    description: 'Visualización de reportes de rentabilidad, costos operativos y proyecciones de ventas.',
    users: 5,
    permissions: '8 permisos',
    status: 'Activo',
    statusClass: 'active',
  },
  {
    id: 4,
    name: 'Consultor Temporal',
    category: 'Externo',
    categoryClass: 'externo',
    barColor: 'outline',
    description: 'Acceso restringido de solo lectura para auditorías externas de procesos textiles.',
    users: 0,
    permissions: '4 permisos',
    status: 'Inactivo',
    statusClass: 'inactive',
  },
];

export default function RoleList() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <span>Inicio</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>Configuración</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <span className={styles.breadcrumbActive}>Gestión de Roles</span>
      </div>

      <PageHeader
        title="Gestión de Roles y Permisos"
        description="Define y administra los niveles de acceso y responsabilidades de los colaboradores en la plataforma."
      >
        <button className={styles.btnOutline}>
          <span className="material-symbols-outlined">download</span>
          Exportar
        </button>
        <button className={styles.btnPrimary}>
          <span className="material-symbols-outlined">add</span>
          Crear Nuevo Rol
        </button>
      </PageHeader>

      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input className={styles.searchInput} type="text" placeholder="Buscar roles por nombre..." />
        </div>
        <div className={styles.filterControls}>
          <select className={styles.select}>
            <option value="">Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <select className={styles.select}>
            <option value="">Categoría</option>
            <option value="administrativo">Administrativo</option>
            <option value="operativo">Operativo</option>
            <option value="logistico">Logístico</option>
          </select>
          <button className={styles.filterBtn}>
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Rol</th>
              <th className={styles.th}>Descripción</th>
              <th className={styles.th}>Usuarios</th>
              <th className={styles.th}>Permisos</th>
              <th className={styles.th}>Estado</th>
              <th className={`${styles.th} ${styles.thRight}`}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className={`${styles.tr} ${role.statusClass === 'inactive' ? styles.trInactive : ''}`}
              >
                <td className={styles.td}>
                  <div className={styles.roleCell}>
                    <div className={`${styles.accentBar} ${styles[`bar_${role.barColor}`]}`} />
                    <div>
                      <p className={styles.roleName}>{role.name}</p>
                      <span className={`${styles.categoryBadge} ${styles[`cat_${role.categoryClass}`]}`}>
                        {role.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <p className={styles.desc}>{role.description}</p>
                </td>
                <td className={styles.td}>
                  <div className={styles.metaCell}>
                    <span className="material-symbols-outlined">group</span>
                    <span>{role.users} usuarios</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.metaCell}>
                    <span className="material-symbols-outlined">verified_user</span>
                    <span>{role.permissions}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${styles[`status_${role.statusClass}`]}`}>
                    <span className={styles.statusDot} />
                    {role.status}
                  </span>
                </td>
                <td className={`${styles.td} ${styles.tdRight}`}>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Duplicar">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                    <button className={styles.actionBtn} title="Editar">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} title="Eliminar">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>Mostrando 1-10 de 128 roles</span>
          <div className={styles.paginationControls}>
            <button className={styles.pagBtn} disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className={`${styles.pagBtn} ${styles.pagBtnActive}`}>1</button>
            <button className={styles.pagBtn}>2</button>
            <button className={styles.pagBtn}>3</button>
            <span className={styles.pagEllipsis}>...</span>
            <button className={styles.pagBtn}>13</button>
            <button className={styles.pagBtn}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
