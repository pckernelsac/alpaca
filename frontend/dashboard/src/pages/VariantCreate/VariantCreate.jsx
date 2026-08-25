import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VariantCreate.module.css';

const tabs = [
  { id: 'general', label: 'Información General', icon: 'info' },
  { id: 'technical', label: 'Especificaciones Técnicas', icon: 'engineering' },
  { id: 'visual', label: 'Atributos Visuales', icon: 'palette' },
  { id: 'care', label: 'Cuidado y Multimedia', icon: 'photo_library' },
];

const sizes = ['XS', 'S', 'M', 'L'];

const careItems = [
  { icon: 'wash', label: 'Lavado a mano', active: true },
  { icon: 'dry_cleaning', label: 'Seco', active: false },
  { icon: 'iron', label: 'Planchar bajo', active: true },
];

const auditItems = [
  { icon: 'check_circle', text: 'SKU único validado', color: '#2e7d32' },
  { icon: 'check_circle', text: 'Composición completa', color: '#2e7d32' },
  { icon: 'warning', text: 'Faltan imágenes adicionales', color: '#ef6c00' },
];

export default function VariantCreate() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <nav className={styles.breadcrumb}>
          <Link to="/textile" className={styles.breadcrumbLink}>Textile Management</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
          <Link to="/catalog/variantes" className={styles.breadcrumbLink}>Variantes</Link>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
          <span className={styles.breadcrumbActive}>Nueva Variante</span>
        </nav>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.pageTitle}>Crear Nueva Variante Textil</h1>
            <p className={styles.pageDesc}>Gestión de especificaciones técnicas y visuales para hilos de alpaca premium.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnOutline}>Cancelar</button>
            <button className={styles.btnOutlineAlt}>Guardar Borrador</button>
            <button className={styles.btnPrimary}>Guardar Variante</button>
          </div>
        </div>
      </div>

      <div className={styles.tabNav}>
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

      <div className={styles.contentGrid}>
        <div className={styles.formArea}>
          {activeTab === 'general' && (
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardAccent} />
                <h2 className={styles.cardTitle}>Identificación del Producto</h2>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>SKU de Variante <span className={styles.required}>*</span></label>
                  <input className={styles.input} type="text" placeholder="Ej: SKU-001" defaultValue="VAR-ALP-789-2024" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Referencia Padre (Product Parent)</label>
                  <select className={styles.select} defaultValue="Alpaca Royal Blend - Fine">
                    <option>Alpaca Royal Blend - Fine</option>
                    <option>Baby Alpaca Luxury</option>
                    <option>Andean Suri Classic</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Temporada</label>
                  <select className={styles.select} defaultValue="Primavera / Verano 2024">
                    <option>Primavera / Verano 2024</option>
                    <option>Otoño / Invierno 2024</option>
                    <option>Atemporal (Basics)</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Colección</label>
                  <input className={styles.input} type="text" placeholder="Ej: Andean Heritage" />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Estado de Variante</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radio}>
                      <input type="radio" name="status" defaultChecked className={styles.radioInput} />
                      Activa
                    </label>
                    <label className={styles.radio}>
                      <input type="radio" name="status" className={styles.radioInput} />
                      En Desarrollo
                    </label>
                    <label className={styles.radio}>
                      <input type="radio" name="status" className={styles.radioInput} />
                      Descontinuada
                    </label>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'technical' && (
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardAccent} />
                <h2 className={styles.cardTitle}>Ficha Técnica de Composición</h2>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Material Principal</label>
                  <select className={styles.select} defaultValue="100% Baby Alpaca">
                    <option>100% Baby Alpaca</option>
                    <option>Mezcla Alpaca / Seda</option>
                    <option>Alpaca Royal 18 Micrones</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Peso (Gramos por m²)</label>
                  <input className={styles.input} type="number" placeholder="Ej: 320" />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Composición Detallada (%)</label>
                  <textarea className={styles.textarea} placeholder="Ej: 70% Baby Alpaca, 30% Mulberry Silk" rows={3} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Dimensiones (Ancho útil cm)</label>
                  <input className={styles.input} type="text" placeholder="Ej: 150 cm" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Torsión del Hilo</label>
                  <input className={styles.input} type="text" placeholder="Ej: 2/28 NM" />
                </div>
              </div>
            </section>
          )}

          {activeTab === 'visual' && (
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardAccent} />
                <h2 className={styles.cardTitle}>Atributos Estéticos</h2>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Color y Swatch</label>
                  <div className={styles.colorPickerRow}>
                    <input type="color" className={styles.colorPicker} defaultValue="#4A3428" />
                    <input className={styles.input} type="text" defaultValue="Vicuña Gold Deep" />
                  </div>
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Talla / Tamaño</label>
                  <div className={styles.sizeGrid}>
                    {sizes.map((s) => (
                      <button key={s} className={`${styles.sizeBtn} ${s === 'S' ? styles.sizeActive : ''}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Patrón / Acabado</label>
                  <select className={styles.select} defaultValue="Liso / Solid">
                    <option>Liso / Solid</option>
                    <option>Melange / Jaspeado</option>
                    <option>Herringbone / Espiga</option>
                    <option>Bouclé</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'care' && (
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardAccent} />
                <h2 className={styles.cardTitle}>Cuidado y Activos Digitales</h2>
              </div>
              <div className={styles.formStack}>
                <div className={styles.field}>
                  <label className={styles.label}>Instrucciones de Lavado</label>
                  <div className={styles.careGrid}>
                    {careItems.map((item) => (
                      <div key={item.label} className={`${styles.careItem} ${item.active ? '' : styles.careItemMuted}`}>
                        <span className={`material-symbols-outlined ${styles.careIcon} ${item.active ? styles.careIconActive : ''}`}>{item.icon}</span>
                        <span className={styles.careLabel}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Galería de Imágenes</label>
                  <div className={styles.galleryGrid}>
                    <div className={styles.uploadBox}>
                      <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--color-on-surface-variant)' }}>add_a_photo</span>
                      <span className={styles.uploadLabel}>Subir</span>
                    </div>
                    <div className={styles.galleryItem}>
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHvmX-kD1hMocnD0kfUgWNkh0Jz5LMzUX3Wxx1SbV2CZ52MMNVqWk1Xf6u-W5Oc7y4EXNPJCMAaJKu6c5HH70kuuvD4eh8z7ACzqczB9vIxALqePLrTihmEw5T8rk6nKd_iwaDXNEpAMOYnSeaHtey-zVfik_656mRyj7EXaIzgOZvRziqyQIdMX20DnOBSewelBtKGb3gMOb3VgBPaHJNWR4RRELB_sEHhde6L-mGt9e_lwEN8eFz2gFeQPy-4tlxmUl9wzP4jCfi"
                        alt="Textile"
                        className={styles.galleryImg}
                      />
                      <div className={styles.galleryOverlay}>
                        <button className={styles.galleryBtn}><span className="material-symbols-outlined">visibility</span></button>
                        <button className={styles.galleryBtn}><span className="material-symbols-outlined">delete</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <h3 className={styles.previewTitle}>Vista Previa</h3>
              <span className={styles.draftBadge}>Borrador</span>
            </div>
            <div className={styles.previewImageWrap}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcc1QV82J6xeZsaJ1qleX65N5AzUlME8BukhqQZfznn57bwkK3edt-jm_fIFgX6y7sMg8F5FPmC37g1Vt0Mj2bZPaSCx42ETAihslXKhKun9g4Cv_QzpL_OOpHoLE_qHbWtlVCmkA10QPifj7rMwSm-UF_5BZgQQmDTDl8vDWEIp--Q6puMaQjOEb4S3oU_tddVc141PbASvXScmOj0gVUsBKq5qHYjazpi5JnoElYSVidSzTCIxW46AbL_aVY3KDj6T3NYIbJnEo7"
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewNameRow}>
                <h4 className={styles.previewName}>Alpaca Royal Blend</h4>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>verified</span>
              </div>
              <p className={styles.previewSku}>VAR-ALP-789-2024</p>
              <div className={styles.previewTags}>
                <span className={styles.previewTag}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>scale</span> 320g
                </span>
                <span className={styles.previewTag}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>straighten</span> 150cm
                </span>
                <span className={styles.previewTag}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span> 100% Baby Alpaca
                </span>
              </div>
              <div className={styles.previewMeta}>
                <div className={styles.previewMetaRow}>
                  <span className={styles.previewMetaLabel}>Colección</span>
                  <span className={styles.previewMetaValue}>Andean Heritage</span>
                </div>
                <div className={styles.previewMetaRow}>
                  <span className={styles.previewMetaLabel}>Color Ref.</span>
                  <div className={styles.previewColor}>
                    <span className={styles.previewMetaValue}>Vicuña Gold</span>
                    <div className={styles.previewSwatch} style={{ backgroundColor: '#4A3428' }} />
                  </div>
                </div>
              </div>
              <div className={styles.previewNote}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-primary)' }}>info</span>
                <p className={styles.previewNoteText}>Esta variante será indexada en el catálogo global y visible para el equipo de producción una vez guardada.</p>
              </div>
            </div>
          </div>

          <div className={styles.auditCard}>
            <h4 className={styles.auditTitle}>Auditoría Técnica</h4>
            <div className={styles.auditList}>
              {auditItems.map((item) => (
                <div key={item.text} className={styles.auditItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: item.color }}>{item.icon}</span>
                  <span className={styles.auditText}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stickyFooter}>
        <div className={styles.footerInner}>
          <button className={styles.btnOutline}>Cancelar</button>
          <div className={styles.footerRight}>
            <button className={styles.btnOutlineAlt}>Guardar Borrador</button>
            <button className={styles.btnPrimary}>Guardar Variante</button>
          </div>
        </div>
      </div>
    </div>
  );
}
