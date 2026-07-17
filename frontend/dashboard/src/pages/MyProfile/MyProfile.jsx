import { useState } from 'react';
import styles from './MyProfile.module.css';

export default function MyProfile() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [password, setPassword] = useState('');

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  function getCheckIcon(met) {
    return met ? 'check_circle' : 'radio_button_unchecked';
  }

  function getCheckClass(met) {
    return met ? styles.checkMet : styles.checkUnmet;
  }

  return (
    <div className={styles.container}>
      {/* Profile Header */}
      <section className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarBox}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCov-EGesvE0yNug0nXqYlafMIWD9jn9He4ypq9ZxzjLkKUYD615gDX95tyLvpYiwGCQg8cO3a3ZBWRup6ELtb517a6cUXef9VBWKWk3y_NCWDjTWf5HE50S7mrG20zi-cP5h3NhqGJ0YqQkj2PtpnJM1bo1vCqABIZsJ2DKlliaWh3XLXxZ4AZqh8T84rNScnjSUy60cV7iIg24iuS0xMjmlRN-rSB_4TMqmRfgzJ377uGbdApp4r7qhPCoLYBX-Bc0WlCgvDCSBp5"
              alt="Alejandro Vicuña"
            />
            <div className={styles.avatarOverlay}>
              <span className="material-symbols-outlined">photo_camera</span>
            </div>
          </div>
          <div className={styles.verifiedBadge}>
            <span className="material-symbols-outlined">verified_user</span>
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>Alejandro Vicuña</h1>
          <div className={styles.profileTags}>
            <span className={styles.roleChip}>Director Global</span>
            <span className={styles.adminChip}>
              <span className="material-symbols-outlined">security</span>
              Administrador del Sistema
            </span>
          </div>
        </div>
        <button className={styles.saveBtn}>Guardar Cambios</button>
      </section>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* LEFT COLUMN */}
        <div className={styles.leftCol}>
          {/* Personal Info */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className="material-symbols-outlined">person</span>
              <h3>Información Personal</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Nombre Completo</label>
                <input type="text" defaultValue="Alejandro Vicuña" />
              </div>
              <div className={styles.field}>
                <label>Cargo</label>
                <input type="text" defaultValue="Director Global" />
              </div>
              <div className={styles.field}>
                <label>Correo Institucional</label>
                <input type="email" defaultValue="a.vicuna@alpacart.com" />
              </div>
              <div className={styles.field}>
                <label>Teléfono Directo</label>
                <input type="tel" defaultValue="+51 987 654 321" />
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className="material-symbols-outlined">lock_reset</span>
              <h3>Cambio de Contraseña</h3>
            </div>
            <div className={styles.pwdSection}>
              <div className={styles.pwdGrid}>
                <div className={styles.field}>
                  <label>Contraseña Actual</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className={styles.field}>
                  <label>Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="Min. 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.securityChecklist}>
                <p>Requisitos de seguridad:</p>
                <ul className={styles.checklistGrid}>
                  <li className={styles.checklistItem}>
                    <span className={`material-symbols-outlined ${styles.checkIcon} ${getCheckClass(hasMinLength)}`}>
                      {getCheckIcon(hasMinLength)}
                    </span>
                    Al menos 8 caracteres
                  </li>
                  <li className={styles.checklistItem}>
                    <span className={`material-symbols-outlined ${styles.checkIcon} ${getCheckClass(hasNumber)}`}>
                      {getCheckIcon(hasNumber)}
                    </span>
                    Un número o símbolo
                  </li>
                  <li className={styles.checklistItem}>
                    <span className={`material-symbols-outlined ${styles.checkIcon} ${getCheckClass(hasUppercase)}`}>
                      {getCheckIcon(hasUppercase)}
                    </span>
                    Letras mayúsculas
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className={styles.card}>
            <div className={styles.sessionsHeader}>
              <div className={styles.cardHeader} style={{ marginBottom: 0 }}>
                <span className="material-symbols-outlined">devices</span>
                <h3>Sesiones Activas</h3>
              </div>
              <button className={styles.closeAllBtn}>Cerrar todas las sesiones</button>
            </div>
            <div className={styles.sessionList}>
              <div className={styles.sessionItem}>
                <div className={styles.sessionLeft}>
                  <div className={styles.sessionIconBox}>
                    <span className="material-symbols-outlined">laptop_mac</span>
                  </div>
                  <div>
                    <p className={styles.sessionName}>MacBook Pro - Lima, PE</p>
                    <p className={styles.sessionMeta}>Chrome v120 • Sesión actual</p>
                  </div>
                </div>
                <span className={styles.sessionActiveBadge}>Activo</span>
              </div>
              <div className={styles.sessionItem}>
                <div className={styles.sessionLeft}>
                  <div className={styles.sessionIconBox}>
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <div>
                    <p className={styles.sessionName}>iPhone 15 Pro - Arequipa, PE</p>
                    <p className={styles.sessionMeta}>App Alpacart Textiles • Hace 2 horas</p>
                  </div>
                </div>
                <button className={styles.sessionLogoutBtn}>
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightCol}>
          {/* Preferences */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className="material-symbols-outlined">translate</span>
              <h3>Preferencias</h3>
            </div>
            <div className={styles.prefSection}>
              <div className={styles.prefField}>
                <label>Idioma del Interfaz</label>
                <select defaultValue="Español (Castellano)">
                  <option>Español (Castellano)</option>
                  <option>English (US)</option>
                  <option>Français</option>
                </select>
              </div>
              <div className={styles.prefField}>
                <label>Zona Horaria</label>
                <select defaultValue="(GMT-05:00) Lima, Bogotá, Quito">
                  <option>(GMT-05:00) Lima, Bogotá, Quito</option>
                  <option>(GMT-04:00) La Paz, Santiago</option>
                  <option>(GMT-00:00) London, Lisbon</option>
                </select>
              </div>
              <hr className={styles.toggleDivider} />
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <p>Notificaciones Push</p>
                  <p>Alertas de producción crítica</p>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={() => setPushNotifications(!pushNotifications)}
                  />
                  <span className={styles.toggleTrack} />
                  <span className={styles.toggleThumb} />
                </label>
              </div>
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <p>Reportes Semanales</p>
                  <p>Resumen de inventario vía email</p>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={weeklyReports}
                    onChange={() => setWeeklyReports(!weeklyReports)}
                  />
                  <span className={styles.toggleTrack} />
                  <span className={styles.toggleThumb} />
                </label>
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div className={styles.activityCard}>
            <h4>Actividad de Cuenta</h4>
            <div className={styles.activityRow}>
              <p className={styles.activityLabel}>Último acceso</p>
              <p className={styles.activityValue}>Hoy, 09:42 AM</p>
            </div>
            <div className={styles.activityRow}>
              <p className={styles.activityLabel}>Creado el</p>
              <p className={styles.activityValue}>14 Ene, 2023</p>
            </div>
            <div className={styles.activityRow}>
              <p className={styles.activityLabel}>Departamento</p>
              <p className={styles.activityValue}>Dirección Ejecutiva</p>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actionList}>
            <button className={styles.actionBtn}>
              <span>Descargar mis datos (JSON)</span>
              <span className="material-symbols-outlined">download</span>
            </button>
            <button className={styles.dangerBtn}>
              <span>Desactivar cuenta</span>
              <span className="material-symbols-outlined">warning</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Alpacart Textiles ERP. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Operational Status</a>
        </div>
      </footer>
    </div>
  );
}
