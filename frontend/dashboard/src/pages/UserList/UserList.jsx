import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import styles from './UserList.module.css';

const users = [
  {
    id: 1,
    name: 'Mateo Quispe',
    email: 'mateo.q@alpacart.com',
    role: 'Admin',
    department: 'IT & Sistemas',
    status: 'Activo',
    lastAccess: 'Hace 10 min',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwFBHZ26LSIIXnVvrETaVWx48JhREhO7wRve2YpN-iM_1bxO7PkZ9G_StDdwYy-Od1DnSzDCofiEY7pe5S15H6fHAb79Art3b10GxpkVZE0O34h2Rw2LclIjv9m6AeL0gxcbPInKJLPdfC5YPjcaMFIAMYbT-JQ-Fg2DH2fjR7Sud8k_JZlL2SvI-GY5Xou7AsZHYnvWhLWKCg8Rs9UYe5nWsKOAR6gYTNXYvUhfP1PlEMsOt2r4zmnSRdcinkCVwfXVE5pv7DREzH',
    avatarClass: 'avatarMateo',
  },
  {
    id: 2,
    name: 'Sofía Mendoza',
    email: 'sofia.m@alpacart.com',
    role: 'Logística',
    department: 'Almacén Central',
    status: 'Activo',
    lastAccess: 'Ayer, 14:20',
    initials: 'SM',
    avatarClass: 'avatarSofia',
  },
  {
    id: 3,
    name: 'Carlos Huamán',
    email: 'carlos.h@alpacart.com',
    role: 'Ventas',
    department: 'Comercial',
    status: 'Suspendido',
    lastAccess: 'Hace 3 días',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALzHqWRxTe5G9JDS6BoRfiQMQUen7uS7xqfxR-shXA64VhQWObe77Fu-zcvSjrSDjl4Lc2320lVk2QMuVLiO4UxCM89u2GiMhTM9WOPJDGPQJeALjVfkTrK7SNa86Yd1veA2_o63lZb7j8-BFl-Z1En_18t4WTJI3dyDGn42JXMuw5_LgbbEoaZ8HwTKe4g0Y0-KvcmopUNsqEUJc6wY7x3WKC8OjpukrILtKjP6Td6R9DDrQZ0UtvxI07eKis3vsOmq1EZbKy84yc',
    avatarClass: 'avatarCarlos',
  },
  {
    id: 4,
    name: 'Elena Arrieta',
    email: 'elena.a@alpacart.com',
    role: 'Editor',
    department: 'Producción',
    status: 'Inactivo',
    lastAccess: '22 May, 09:15',
    initials: 'EA',
    avatarClass: 'avatarElena',
  },
  {
    id: 5,
    name: 'Roberto Paredes',
    email: 'r.paredes@alpacart.com',
    role: 'Admin',
    department: 'Finanzas',
    status: 'Activo',
    lastAccess: 'Hace 2 horas',
    initials: 'RP',
    avatarClass: 'avatarRoberto',
  },
];

export default function UserList() {
  return (
    <div className={styles.container}>
      <PageHeader
        title="Gestión de Usuarios"
        description="Administra las cuentas de acceso, roles y niveles de seguridad de los colaboradores para mantener el control total sobre la cadena de producción textil."
      >
        <button className={styles.exportBtn}>
          <span className="material-symbols-outlined">download</span>
          Exportar
        </button>
        <Link to="/usuarios/nuevo" className={styles.createBtn}>
          <span className="material-symbols-outlined">add</span>
          Crear Usuario
        </Link>
      </PageHeader>

      <div className={styles.filtersBar}>
        <div className={styles.searchWrapper}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar por nombre o correo electrónico..."
          />
        </div>
        <div className={styles.filtersGroup}>
          <select className={styles.select}>
            <option value="">Rol: Todos</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="logistica">Logística</option>
            <option value="ventas">Ventas</option>
          </select>
          <select className={styles.select}>
            <option value="">Estado: Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="suspendido">Suspendido</option>
          </select>
          <select className={styles.select}>
            <option value="">Departamento: Todos</option>
            <option value="it">IT &amp; Sistemas</option>
            <option value="ops">Operaciones</option>
            <option value="finances">Finanzas</option>
            <option value="hr">Recursos Humanos</option>
          </select>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Departamento</th>
              <th>Estado</th>
              <th>Último Acceso</th>
              <th className={styles.actionsCol}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={`${styles.avatar} ${styles[user.avatarClass]}`}>
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{user.initials}</span>
                      )}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.userEmail}>{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[`role${user.role}`]}`}>
                    {user.role}
                  </span>
                </td>
                <td className={styles.bodyMd}>{user.department}</td>
                <td>
                  <div className={styles.statusCell}>
                    <span className={`${styles.statusDot} ${styles[`status${user.status}`]}`} />
                    <span>{user.status}</span>
                  </div>
                </td>
                <td className={styles.bodySm}>{user.lastAccess}</td>
                <td className={styles.actionsCol}>
                  <button className={styles.actionBtn}>
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Mostrando <strong>1-10</strong> de <strong>154</strong> usuarios
          </span>
          <div className={styles.paginationButtons}>
            <button className={styles.pageArrow} disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className={styles.pageActive}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageBtn}>16</button>
            <button className={styles.pageArrow}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
