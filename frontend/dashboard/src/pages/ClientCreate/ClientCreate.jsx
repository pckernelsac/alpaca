import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ClientCreate.module.css';

const tabs = [
  { id: 'info', label: 'Información General', icon: 'person' },
  { id: 'contact', label: 'Contacto', icon: 'mail' },
  { id: 'address', label: 'Dirección', icon: 'location_on' },
  { id: 'commercial', label: 'Comercial', icon: 'tune' },
  { id: 'notes', label: 'Notas', icon: 'sticky_note_2' },
  { id: 'config', label: 'Configuración', icon: 'settings' },
];

export default function ClientCreate() {
  const [activeTab, setActiveTab] = useState('info');
  const [active, setActive] = useState(true);

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <Link to="/crm" className={styles.breadcrumbLink}>CRM</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <Link to="/crm/clientes" className={styles.breadcrumbLink}>Clientes</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <span className={styles.breadcrumbActive}>Nuevo Cliente</span>
      </nav>

      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Crear Nuevo Cliente</h1>
          <p className={styles.pageDesc}>Complete los datos del nuevo cliente para registrarlo en el sistema CRM.</p>
        </div>
      </div>

      <div className={styles.tabsRow}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          {activeTab === 'info' && <InfoSection active={active} setActive={setActive} />}
          {activeTab === 'contact' && <ContactSection />}
          {activeTab === 'address' && <AddressSection />}
          {activeTab === 'commercial' && <CommercialSection />}
          {activeTab === 'notes' && <NotesSection />}
          {activeTab === 'config' && <ConfigSection />}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarTitle}>Resumen Estimado</h4>
            <div className={styles.summaryList}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Pedidos anuales</span>
                <span className={styles.summaryValue}>24</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Ticket promedio</span>
                <span className={styles.summaryValue}>$1,240</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>LTV estimado</span>
                <span className={styles.summaryValue}>$42,850</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Crédito sugerido</span>
                <span className={styles.summaryValue}>$15,000</span>
              </div>
            </div>
          </div>
          <div className={styles.helpCard}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>info</span>
            <p className={styles.helpText}>Los campos con <span style={{ color: 'var(--color-error)' }}>*</span> son obligatorios para el registro fiscal.</p>
          </div>
        </aside>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-on-surface-variant)' }}>info</span>
          <span className={styles.footerHint}>Se requieren campos marcados para el registro fiscal.</span>
        </div>
        <div className={styles.footerActions}>
          <Link to="/crm/clientes" className={styles.btnCancel}>Cancelar</Link>
          <button className={styles.btnDraft}>Guardar y Continuar</button>
          <button className={styles.btnSave}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>
            Guardar Cliente
          </button>
        </div>
      </footer>
    </div>
  );
}

function InfoSection({ active, setActive }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionInfo}>
          <h3 className={styles.sectionTitle}>Datos Generales</h3>
          <p className={styles.sectionDesc}>Ingrese la información básica de identidad del cliente para el registro fiscal y comercial.</p>
        </div>
        <div className={styles.sectionForm}>
          <div className={styles.avatarUpload}>
            <div className={styles.avatarCircle}>
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>person</span>
              <div className={styles.avatarOverlay}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff' }}>camera_alt</span>
              </div>
            </div>
            <span className={styles.avatarLabel}>Foto del cliente</span>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>NOMBRE / EMPRESA <span className={styles.required}>*</span></label>
              <input className={styles.fieldInput} type="text" placeholder="Ej. Textiles del Sur S.A.C." />
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>TIPO DE DOCUMENTO</label>
              <select className={styles.fieldSelect}>
                <option>RUC</option>
                <option>DNI</option>
                <option>Pasaporte</option>
                <option>Carné de Extranjería</option>
              </select>
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>NRO DOCUMENTO <span className={styles.required}>*</span></label>
              <input className={styles.fieldInput} type="text" placeholder="20123456789" />
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>EMAIL</label>
              <input className={styles.fieldInput} type="email" placeholder="contacto@empresa.com" />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>TELÉFONO</label>
              <input className={styles.fieldInput} type="tel" placeholder="+51 987 654 321" />
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>SITIO WEB</label>
              <input className={styles.fieldInput} type="url" placeholder="https://www.empresa.com" />
            </div>
          </div>
          <div className={styles.toggleRow}>
            <div>
              <h4 className={styles.toggleLabel}>Estado de la Cuenta</h4>
              <p className={styles.toggleDesc}>Permite al cliente realizar pedidos y transacciones activamente.</p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={active} onChange={() => setActive(!active)} />
              <span className={styles.toggleTrack} />
              <span className={styles.toggleThumb} />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionInfo}>
          <h3 className={styles.sectionTitle}>Canales de Contacto</h3>
          <p className={styles.sectionDesc}>Detalles para la comunicación operativa y marketing directo.</p>
        </div>
        <div className={styles.sectionForm}>
          <div className={styles.fieldRow}>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>CORREO ELECTRÓNICO PRINCIPAL <span className={styles.required}>*</span></label>
              <div className={styles.inputIconWrapper}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-outline)' }}>mail</span>
                <input className={styles.fieldInputIcon} type="email" placeholder="contacto@empresa.com" />
              </div>
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>TELÉFONO / WHATSAPP</label>
              <div className={styles.inputIconWrapper}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-outline)' }}>call</span>
                <input className={styles.fieldInputIcon} type="tel" placeholder="+51 987 654 321" />
              </div>
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>SITIO WEB</label>
              <input className={styles.fieldInput} type="url" placeholder="https://www.empresa.com" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AddressSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionInfo}>
          <h3 className={styles.sectionTitle}>Gestión de Direcciones</h3>
          <p className={styles.sectionDesc}>Administre múltiples puntos de entrega y facturación.</p>
        </div>
        <div className={styles.sectionForm}>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>CALLE / DIRECCIÓN <span className={styles.required}>*</span></label>
              <input className={styles.fieldInput} type="text" placeholder="Av. de la República 455, Miraflores" />
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>CIUDAD</label>
              <input className={styles.fieldInput} type="text" placeholder="Lima" />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>PAÍS</label>
              <select className={styles.fieldSelect}>
                <option>Perú</option>
                <option>Colombia</option>
                <option>Chile</option>
                <option>México</option>
              </select>
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldHalf}>
              <label className={styles.fieldLabel}>CÓDIGO POSTAL</label>
              <input className={styles.fieldInput} type="text" placeholder="15074" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommercialSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionInfo}>
          <h3 className={styles.sectionTitle}>Información Comercial</h3>
          <p className={styles.sectionDesc}>Configuración de tipo de cliente y asignación de vendedor.</p>
        </div>
        <div className={styles.sectionForm}>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>TIPO DE CLIENTE</label>
              <div className={styles.radioGroup}>
                <label className={styles.radio}>
                  <input type="radio" name="clientType" defaultChecked />
                  <span className={styles.radioDot} />
                  Mayorista
                </label>
                <label className={styles.radio}>
                  <input type="radio" name="clientType" />
                  <span className={styles.radioDot} />
                  Minorista
                </label>
                <label className={styles.radio}>
                  <input type="radio" name="clientType" />
                  <span className={styles.radioDot} />
                  Corporativo
                </label>
              </div>
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>VENDEDOR ASIGNADO</label>
              <select className={styles.fieldSelect}>
                <option>Seleccionar vendedor</option>
                <option>Carlos Mendoza</option>
                <option>María García</option>
                <option>Juan Pérez</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionInfo}>
          <h3 className={styles.sectionTitle}>Notas del CRM</h3>
          <p className={styles.sectionDesc}>Información interna para el equipo de ventas y atención al cliente.</p>
        </div>
        <div className={styles.sectionForm}>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>NOTAS INTERNAS</label>
              <textarea className={styles.fieldTextarea} rows={6} placeholder="Escriba aquí detalles relevantes sobre el comportamiento del cliente, preferencias de fibra, o acuerdos especiales..." />
            </div>
          </div>
          <div className={styles.lockHint}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-outline)' }}>lock</span>
            <span className={styles.lockText}>Estas notas son privadas y solo visibles para personal autorizado.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfigSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionInfo}>
          <h3 className={styles.sectionTitle}>Configuración de Cuenta</h3>
          <p className={styles.sectionDesc}>Ajustes adicionales y preferencias del cliente.</p>
        </div>
        <div className={styles.sectionForm}>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>ESTADO</label>
              <div className={styles.radioGroup}>
                <label className={styles.radio}>
                  <input type="radio" name="status" defaultChecked />
                  <span className={styles.radioDot} />
                  Activo
                </label>
                <label className={styles.radio}>
                  <input type="radio" name="status" />
                  <span className={styles.radioDot} />
                  Inactivo
                </label>
              </div>
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.fieldFull}>
              <label className={styles.fieldLabel}>LÍMITE DE CRÉDITO</label>
              <input className={styles.fieldInput} type="text" placeholder="$ 15,000.00" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
