import styles from './Settings.module.css';

const localizationSettings = {
  currency: 'PEN - Sol Peruano',
  timezone: '(GMT-05:00) Lima, Peru',
  language: 'English (International)',
};

export default function Settings() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <span>Admin</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span>Configuration</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Company</span>
          </nav>
          <h2 className={styles.pageTitle}>Consola de Configuración</h2>
          <p className={styles.pageDesc}>Actualiza la identidad legal de tu organización y sus ajustes operativos globales.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
            Descartar
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check</span>
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Logo Upload */}
        <div className={`${styles.bentoCard} ${styles.logoCard}`}>
          <div className={styles.cardAccent} />
          <label className={styles.fieldLabel}>Corporate Identity</label>
          <div className={styles.logoUpload}>
            <div className={styles.logoPreview}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--color-primary)' }}>add_a_photo</span>
            </div>
            <p className={styles.logoText}>Click to upload or drag and drop <br /><span className={styles.logoHint}>SVG, PNG, or JPG (max. 5MB)</span></p>
          </div>
          <div className={styles.brandTone}>
            <span className={styles.toneLabel}>Brand Tone</span>
            <div className={styles.toneDots}>
              <div className={styles.toneDot} style={{ backgroundColor: 'var(--color-primary)' }} />
              <div className={styles.toneDot} style={{ backgroundColor: 'var(--color-secondary)' }} />
              <div className={styles.toneDot} style={{ backgroundColor: 'var(--color-outline)' }} />
            </div>
          </div>
        </div>

        {/* General Details */}
        <div className={`${styles.bentoCard} ${styles.generalCard}`}>
          <div className={styles.cardAccent} />
          <h3 className={styles.cardTitle}>General Details</h3>
          <div className={styles.formGrid2Col}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Legal Name</label>
              <input className={styles.formInput} type="text" defaultValue="Alpacart Textiles S.A.C." />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Tax ID (RUC)</label>
              <input className={styles.formInput} type="text" defaultValue="20601234567" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Industry</label>
              <select className={styles.formInput}>
                <option>Textile Manufacturing</option>
                <option>Retail & Export</option>
                <option>Agricultural Services</option>
              </select>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Website</label>
              <input className={styles.formInput} type="url" defaultValue="https://alpacart.com" />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`${styles.bentoCard} ${styles.contactCard}`}>
          <div className={styles.cardAccent} />
          <h3 className={styles.cardTitle}>Contact Information</h3>
          <div className={styles.contactGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Corporate Email</label>
              <input className={styles.formInput} type="email" defaultValue="ops@alpacart.com" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Phone Number</label>
              <input className={styles.formInput} type="tel" defaultValue="+51 01 445 6789" />
            </div>
            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.fieldLabel}>HQ Address</label>
              <textarea className={`${styles.formInput} ${styles.formTextarea}`} defaultValue="Av. El Sol 1230, Cusco 08002, Peru" />
            </div>
          </div>
        </div>

        {/* Localization */}
        <div className={`${styles.bentoCard} ${styles.localizationCard}`}>
          <div className={styles.cardAccent} />
          <h3 className={styles.cardTitle}>Localization</h3>
          <div className={styles.localizationGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Primary Currency</label>
              <div className={styles.selectWrap}>
                <select className={`${styles.formInput} ${styles.formSelect}`} defaultValue={localizationSettings.currency}>
                  <option>USD - US Dollar</option>
                  <option>PEN - Sol Peruano</option>
                  <option>EUR - Euro</option>
                </select>
                <span className={`material-symbols-outlined ${styles.selectArrow}`}>expand_more</span>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Default Timezone</label>
              <div className={styles.selectWrap}>
                <select className={`${styles.formInput} ${styles.formSelect}`} defaultValue={localizationSettings.timezone}>
                  <option>(GMT-05:00) Lima, Peru</option>
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT+00:00) UTC</option>
                </select>
                <span className={`material-symbols-outlined ${styles.selectArrow}`}>expand_more</span>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>System Language</label>
              <div className={styles.selectWrap}>
                <select className={`${styles.formInput} ${styles.formSelect}`} defaultValue={localizationSettings.language}>
                  <option>English (International)</option>
                  <option>Spanish (Latin America)</option>
                  <option>Quechua</option>
                </select>
                <span className={`material-symbols-outlined ${styles.selectArrow}`}>expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className={styles.footerCard}>
          <div className={styles.footerInfo}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>info</span>
            <p className={styles.footerText}>Last updated by <strong>Admin_Maria</strong> on Oct 12, 2023 at 14:30 PET</p>
          </div>
          <div className={styles.footerActions}>
            <button className={styles.btnOutline}>Discard</button>
            <button className={styles.btnPrimary}>Review &amp; Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}
