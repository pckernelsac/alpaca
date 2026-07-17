import { useState } from 'react';
import styles from './UserCreate.module.css';

export default function UserCreate() {
  const [accountActive, setAccountActive] = useState(true);
  const [forcePasswordChange, setForcePasswordChange] = useState(true);
  const [passwordType, setPasswordType] = useState('auto');

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1>Crear Nuevo Usuario</h1>
          <p>Configura las credenciales y el nivel de acceso del nuevo miembro del equipo.</p>
        </div>
        <span className={styles.statusBadge}>Estado: Borrador</span>
      </div>

      <div className={styles.formScroll}>
        <div className={styles.form}>
          {/* Section 1: Personal Information */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionBar} />
              <h2>1. Información Personal</h2>
            </div>
            <div className={styles.personalGrid}>
              <div className={styles.avatarUpload}>
                <div className={styles.avatarCircle}>
                  <span className={`material-symbols-outlined ${styles.avatarPlaceholder}`}>person</span>
                </div>
                <span className={styles.uploadLabel}>Subir Foto</span>
                <span className={styles.uploadHint}>JPG, PNG o WEBP (Máx 2MB)</span>
              </div>
              <div className={styles.fieldsGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="nombre">Nombre Completo</label>
                  <input id="nombre" type="text" placeholder="Ej. Mateo Quispe" />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input id="email" type="email" placeholder="mateo@alpacart.com" />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="telefono">Teléfono</label>
                  <input id="telefono" type="tel" placeholder="+51 900 000 000" />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="empleado">ID de Empleado</label>
                  <input id="empleado" type="text" placeholder="ALP-0000" />
                </div>
              </div>
            </div>
          </section>

          <hr className={styles.divider} />

          {/* Section 2: Professional Information */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionBar} />
              <h2>2. Información Profesional</h2>
            </div>
            <div className={styles.professionalGrid}>
              <div className={styles.fieldGroup}>
                <label htmlFor="departamento">Departamento</label>
                <select id="departamento">
                  <option>Producción de Fibra</option>
                  <option>Logística Internacional</option>
                  <option>Control de Calidad</option>
                  <option>Ventas y Exportación</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="cargo">Cargo / Título</label>
                <input id="cargo" type="text" placeholder="Ej. Supervisor de Planta" />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="sede">Sede / Ubicación</label>
                <select id="sede">
                  <option>Sede Central Arequipa</option>
                  <option>Planta de Hilado Puno</option>
                  <option>Oficina Lima</option>
                  <option>Showroom Cusco</option>
                </select>
              </div>
            </div>
          </section>

          <hr className={styles.divider} />

          {/* Section 3: Access & Roles */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionBar} />
              <h2>3. Acceso y Roles</h2>
            </div>
            <div className={styles.accessGrid}>
              <div className={styles.roleGroup}>
                <label>Rol del Sistema</label>
                <label className={styles.roleCard}>
                  <input type="radio" name="role" defaultChecked />
                  <div className={styles.roleInfo}>
                    <p>Admin</p>
                    <p>Acceso total a configuraciones y auditoría.</p>
                  </div>
                </label>
                <label className={styles.roleCard}>
                  <input type="radio" name="role" />
                  <div className={styles.roleInfo}>
                    <p>Logistics</p>
                    <p>Gestión de inventarios, envíos y proveedores.</p>
                  </div>
                </label>
                <label className={styles.roleCard}>
                  <input type="radio" name="role" />
                  <div className={styles.roleInfo}>
                    <p>Sales</p>
                    <p>Órdenes de compra, clientes y facturación.</p>
                  </div>
                </label>
              </div>

              <div className={styles.permissionsSection}>
                <div className={styles.accountStatusRow}>
                  <label>Estado de Cuenta</label>
                  <div className={styles.statusToggle}>
                    <span>Activo</span>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={accountActive}
                        onChange={() => setAccountActive(!accountActive)}
                      />
                      <span className={styles.toggleTrack} />
                      <span className={styles.toggleThumb} />
                    </label>
                  </div>
                </div>

                <div className={styles.permissionsBox}>
                  <p>Permisos Granulares</p>
                  <label className={styles.checkboxRow}>
                    <input type="checkbox" defaultChecked />
                    <span>Puede exportar reportes (Excel/PDF)</span>
                  </label>
                  <label className={styles.checkboxRow}>
                    <input type="checkbox" defaultChecked />
                    <span>Acceso a costos de producción</span>
                  </label>
                  <label className={styles.checkboxRow}>
                    <input type="checkbox" />
                    <span>Eliminar registros históricos</span>
                  </label>
                  <label className={styles.checkboxRow}>
                    <input type="checkbox" defaultChecked />
                    <span>Validar control de calidad final</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <hr className={styles.divider} />

          {/* Section 4: Security */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionBar} />
              <h2>4. Seguridad</h2>
            </div>
            <div className={styles.securityCard}>
              <div className={styles.securityBody}>
                <div className={styles.securityGrid}>
                  <div className={styles.passwordConfig}>
                    <label>Configuración de Contraseña Temporal</label>
                    <div className={styles.passRadioGroup}>
                      <label className={styles.passRadio}>
                        <input
                          type="radio"
                          name="pass_type"
                          checked={passwordType === 'auto'}
                          onChange={() => setPasswordType('auto')}
                        />
                        <span>Auto-generar</span>
                      </label>
                      <label className={styles.passRadio}>
                        <input
                          type="radio"
                          name="pass_type"
                          checked={passwordType === 'manual'}
                          onChange={() => setPasswordType('manual')}
                        />
                        <span>Manual</span>
                      </label>
                    </div>
                  </div>
                  <div className={styles.forceChangeBox}>
                    <div>
                      <p>Forzar cambio de clave</p>
                      <p>En el primer inicio de sesión</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={forcePasswordChange}
                        onChange={() => setForcePasswordChange(!forcePasswordChange)}
                      />
                      <span className={styles.toggleTrack} />
                      <span className={styles.toggleThumb} />
                    </label>
                  </div>
                </div>
                <div className={styles.infoBanner}>
                  <span className={`material-symbols-outlined ${styles.infoIcon}`}>info</span>
                  <p>
                    Se enviará un correo de bienvenida al usuario con sus credenciales temporales y
                    el enlace de acceso una vez guardado el perfil.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className={styles.footer}>
        <button className={styles.btnCancel}>Cancelar</button>
        <div className={styles.footerActions}>
          <button className={styles.btnSaveContinue}>Guardar y continuar</button>
          <button className={styles.btnSavePrimary}>
            <span className="material-symbols-outlined">save</span>
            Guardar Usuario
          </button>
        </div>
      </footer>
    </div>
  );
}
