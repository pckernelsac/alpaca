import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCreate.module.css';

const collections = [
  { value: '', label: 'Seleccionar Colección' },
  { value: 'andean-autumn', label: 'Andean Autumn 2024' },
  { value: 'royal-suri', label: 'Royal Suri Heritage' },
];

const categories = [
  { value: 'hogar', label: 'Hogar & Textiles' },
  { value: 'prendas', label: 'Prendas de Vestir' },
  { value: 'accesorios', label: 'Accesorios' },
];

const initialVariants = [
  { status: 'active', color: 'Suri White / 100% Alpaca', size: 'Single (130x180)', price: 145.00, stock: 24 },
  { status: 'active', color: 'Charcoal Grey / Alpaca Blend', size: 'Single (130x180)', price: 125.00, stock: 12 },
];

const steps = [
  { label: 'Información Básica', icon: 'info' },
  { label: 'Multimedia', icon: 'photo_library' },
  { label: 'Variantes', icon: 'layers' },
  { label: 'SEO', icon: 'travel_explore' },
];

export default function ProductCreate() {
  const [activeTab, setActiveTab] = useState(0);
  const [tags, setTags] = useState(['Premium', 'Alpaca Baby']);
  const [tagInput, setTagInput] = useState('');
  const [autoPublish, setAutoPublish] = useState(false);

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (i) => {
    setTags(tags.filter((_, idx) => idx !== i));
  };

  const statusItems = [
    { label: 'General', status: 'complete' },
    { label: 'Media', status: 'pending' },
    { label: 'Variantes', status: 'empty' },
  ];

  const progressPct = activeTab === 0 ? 33 : activeTab === 1 ? 50 : activeTab === 2 ? 75 : 100;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/catalog" className={styles.breadcrumbLink}>Catálogo</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <span className={styles.breadcrumbActive}>Nuevo Producto</span>
      </nav>

      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Crear Nuevo Producto</h1>
          <p className={styles.pageDesc}>Define los detalles técnicos y visuales para el catálogo de Alpacart.</p>
        </div>
        <div className={styles.statusChip}>
          <span className={styles.statusDot} />
          Borrador
        </div>
      </div>

      <div className={styles.stepsBar}>
        {steps.map((step, i) => (
          <div
            key={step.label}
            className={`${styles.step} ${i === activeTab ? styles.stepActive : ''} ${i < activeTab ? styles.stepDone : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <div className={styles.stepCircle}>
              {i < activeTab ? (
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
              ) : (
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{step.icon}</span>
              )}
            </div>
            <span className={styles.stepLabel}>{step.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.tabsRow}>
        {steps.map((step, i) => (
          <button
            key={step.label}
            className={`${styles.tab} ${i === activeTab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          {activeTab === 0 && <InfoSection tags={tags} tagInput={tagInput} setTagInput={setTagInput} addTag={addTag} removeTag={removeTag} collections={collections} categories={categories} />}
          {activeTab === 1 && <MediaSection />}
          {activeTab === 2 && <VariantsSection />}
          {activeTab === 3 && <SeoSection />}
        </div>

        {activeTab === 0 && (
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarTitle}>Estado del Registro</h4>
              <div className={styles.statusList}>
                {statusItems.map((item) => (
                  <div key={item.label} className={styles.statusRow}>
                    <span className={styles.statusLabel}>{item.label}</span>
                    {item.status === 'complete' && (
                      <span className={styles.statusValueComplete}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span> Completo
                      </span>
                    )}
                    {item.status === 'pending' && (
                      <span className={styles.statusValuePending}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>error</span> Pendiente
                      </span>
                    )}
                    {item.status === 'empty' && (
                      <span className={styles.statusValueEmpty}>0 registradas</span>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
              </div>
              <p className={styles.progressText}>Progreso de creación: {progressPct}%</p>
              <hr className={styles.divider} />
              <div className={styles.autoPublishRow}>
                <span className={styles.autoPublishLabel}>PUBLICAR AUTOMÁTICAMENTE</span>
                <label className={styles.toggle}>
                  <input type="checkbox" checked={autoPublish} onChange={() => setAutoPublish(!autoPublish)} />
                  <span className={styles.toggleTrack} />
                  <span className={styles.toggleThumb} />
                </label>
              </div>
            </div>
            <div className={styles.aiCard}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>auto_awesome</span>
              <div>
                <p className={styles.aiTitle}>Sugerencia AI</p>
                <p className={styles.aiText}>Hemos notado que este SKU coincide con la línea Highland. ¿Deseas aplicar la plantilla de metadatos predeterminada?</p>
                <button className={styles.aiBtn}>APLICAR PLANTILLA</button>
              </div>
            </div>
          </aside>
        )}
      </div>

      <footer className={styles.footer}>
        <button className={styles.btnCancel}>Cancelar</button>
        <div className={styles.footerActions}>
          <button className={styles.btnDraft}>Guardar Borrador</button>
          <button className={styles.btnPublish}>Publicar Producto</button>
        </div>
      </footer>
    </div>
  );
}

function InfoSection({ tags, tagInput, setTagInput, addTag, removeTag, collections, categories }) {
  return (
    <div className={styles.sectionGroup}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBar} />
          <h3>Detalles Base</h3>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldFull}>
            <label className={styles.fieldLabel}>NOMBRE DEL PRODUCTO</label>
            <input className={styles.fieldInput} type="text" placeholder="Ej: Manta Alpaca Premium Highland" />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldHalf}>
            <label className={styles.fieldLabel}>SKU (IDENTIFICADOR)</label>
            <input className={styles.fieldInput} type="text" placeholder="ALP-MNTA-001" />
          </div>
          <div className={styles.fieldHalf}>
            <label className={styles.fieldLabel}>PESO ESTIMADO (G)</label>
            <input className={styles.fieldInput} type="number" placeholder="450" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBar} />
          <h3>Clasificación &amp; Organización</h3>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldHalf}>
            <label className={styles.fieldLabel}>COLECCIÓN</label>
            <select className={styles.fieldSelect}>
              {collections.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.fieldHalf}>
            <label className={styles.fieldLabel}>CATEGORÍA</label>
            <select className={styles.fieldSelect}>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldFull}>
            <label className={styles.fieldLabel}>METADATA (TAGS)</label>
            <div className={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                  <span className={styles.tagClose} onClick={() => removeTag(i)}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>close</span>
                  </span>
                </span>
              ))}
              <input
                className={styles.tagInput}
                type="text"
                placeholder="Agregar..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MediaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBar} />
        <h3>Product Images &amp; Gallery</h3>
      </div>
      <div className={styles.imageGrid}>
        <div className={styles.imageUpload}>
          <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--color-on-surface-variant)' }}>add_a_photo</span>
          <span className={styles.uploadLabel}>SUBIR IMAGEN</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.imagePlaceholder}>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--color-outline)' }}>image</span>
          </div>
        ))}
      </div>
      <div className={styles.richtextSection}>
        <label className={styles.fieldLabel}>DESCRIPCIÓN COMERCIAL (RICHTEXT)</label>
        <div className={styles.richtextBox}>
          <div className={styles.richtextToolbar}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_bold</span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_italic</span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>format_list_bulleted</span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>link</span>
          </div>
          <textarea className={styles.richtextArea} placeholder="Describe el origen de la fibra, el proceso de tejido y los beneficios del producto..." />
        </div>
      </div>
    </section>
  );
}

function VariantsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBar} />
        <h3>Variantes de Producto</h3>
        <button className={styles.btnGenerate}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
          GENERAR VARIANTES
        </button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.variantTable}>
          <thead>
            <tr>
              <th>ESTADO</th>
              <th>COLOR / MATERIAL</th>
              <th>TALLA / MEDIDA</th>
              <th>PRECIO (USD)</th>
              <th>STOCK</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {initialVariants.map((v, i) => (
              <tr key={i}>
                <td><span className={styles.statusDotGreen} /></td>
                <td>{v.color}</td>
                <td>{v.size}</td>
                <td className={styles.priceCell}>${v.price.toFixed(2)}</td>
                <td>{v.stock} und</td>
                <td className={styles.actionCell}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, cursor: 'pointer' }}>more_vert</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SeoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBar} />
        <h3>Optimización SEO</h3>
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.fieldHalf}>
          <label className={styles.fieldLabel}>SEO TITLE</label>
          <input className={styles.fieldInput} type="text" placeholder="Manta Alpaca | Alpacart Textiles" />
          <span className={styles.charHint}>60 caracteres recomendados</span>
        </div>
        <div className={styles.fieldHalf}>
          <label className={styles.fieldLabel}>SEO KEYWORDS</label>
          <input className={styles.fieldInput} type="text" placeholder="alpaca, peru, highland, manta" />
          <span className={styles.charHint}>Separadas por coma</span>
        </div>
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.fieldFull}>
          <label className={styles.fieldLabel}>DESCRIPCIÓN SEO</label>
          <textarea className={styles.fieldTextarea} rows={3} placeholder="Describe el producto para motores de búsqueda..." />
          <span className={styles.charHint}>Máximo 160 caracteres</span>
        </div>
      </div>
    </section>
  );
}
