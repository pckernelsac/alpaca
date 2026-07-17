import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductMedia.module.css';

const initialAssets = [
  {
    id: 'asset-1',
    name: 'manta_gold_frontal.jpg',
    size: '4.2 MB',
    optimizedSize: '850 KB',
    type: 'JPG',
    dimensions: '2400x1600 px',
    isPrincipal: true,
    optimized: true,
    altText: 'Manta de Alpaca Imperial Gold - Vista Frontal',
    description: 'Fotografía de alta resolución para la ficha de producto del catálogo premium 2024.',
    visible: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYPh-lyNskM1oEaT8vtwUb31zqx4QZc2_FaIg63cc5UUclRrkbXa8TETdhLBtE4jS7UbkdfXE94aj8NQNI9GZ3padDr_y4GHn23HxLUm9xQ_KurpN29UzjypafausIoFFeNf6Z9YAnvyeP8TrRCxY96mmJkGQ9N4yD37lxK3jAvT9XlDMQiRqFbzZ-J89_mMhBTmEKKd_uy3SANDGwtQN3WAy2cRBU693ZntOaMvgcJsDMli21izN8qK8vs_rKCjcpWtzdbnOHxOa_',
  },
  {
    id: 'asset-2',
    name: 'textura_macro_01.png',
    size: '2.4 MB',
    type: 'PNG',
    dimensions: '1800x1800 px',
    isPrincipal: false,
    optimized: false,
    altText: 'Textura macro de fibra de alpaca',
    description: '',
    visible: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7_gJtIZZas-nL1rb40vRdOp0VWDWqnLUC7lKwZJOATIqaKuXzAENZe4kam9kxDWAvOBPD2FGHNWhJoo9a3aUmF5tVwDhtbFJMQ8xkv--Jxo1D8ce3pFII_mYKUPuNFwvPOC1cUQiwuUcfhzyJhXKGIH_ovUnA5eIK4KIY19jJQg6ZVrlFPe3E2MkulQTYocJAIAvnjLgiamaqZYFjn5oXMs1FeZLSQAkWKBWsIfPCf_6RAHNh2hzauU3O6eAnXSarUrGYPS08cLDI',
  },
  {
    id: 'asset-3',
    name: 'lifestyle_promo.mp4',
    size: '0:15 seg',
    type: 'VIDEO',
    isPrincipal: false,
    optimized: false,
    altText: 'Video promocional estilo de vida',
    description: '',
    visible: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoY9IqdzEP20y4KN0JK4L_g32DE7YoYXi6r7a_wOwEiExl5R5VjDaNRCCsOyNj2PaNJqvVAPN9NIcNjYdcwpe2X4JqIWIakuMaUDqv5Osk0oZCEgbSBkvQO3LjN_nCAwmdyIoOQRIJadZARmvwBHqjS8D_UgTalnm24l0y68jVRgfyuS_Ldb2csQfADc9zK6ZaclGTEZ8J2mnNnO4oUyWQtjnHN_Axba7lZB0yDRid2VHhhjiZb3Hmhx6Vp43p0SXIqgG31draGKRl',
  },
  {
    id: 'asset-4',
    name: 'campana_modelo_04.jpg',
    size: '3.1 MB',
    optimizedSize: '920 KB',
    type: 'JPG',
    dimensions: '3200x2400 px',
    isPrincipal: false,
    optimized: true,
    altText: 'Modelo usando manta de alpaca',
    description: '',
    visible: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiFWOxRHZGxGZlMxyPC2UjjZ-AZiMiA4xgNOK2r2yelX2r4li-yZ2iNeFO2BgcmdWUWW5OHSRbN4w7i8ArqpxP6xMrzOzAbU3mQIx_tchdrnoHrEosYHjaf5KUrOV6-lj33fFyUVD8pV1fU104UCnuZc5TF8MIrN1agcZBx9D840F0c2SUihpu6acAfWiNhs8t0SE5T9cDA2z71bOZ8TtTif7WvbPmd7nStxxpVGxQb8Iwy1_179LKOk3ehf-qEJYd6OkbLEJ3-9Nc',
  },
];

export default function ProductMedia() {
  const [assets] = useState(initialAssets);
  const [selectedId, setSelectedId] = useState('asset-1');
  const [viewMode, setViewMode] = useState('grid');
  const [dragOver, setDragOver] = useState(false);

  const selectedAsset = assets.find((a) => a.id === selectedId) || assets[0];

  const handleDropZoneEvent = (e, isOver) => {
    e.preventDefault();
    setDragOver(isOver);
  };

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
        <Link to="/catalog" className={styles.breadcrumbLink}>Catálogo</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
        <Link to="/catalog/productos" className={styles.breadcrumbLink}>Productos</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
        <span className={styles.breadcrumbActive}>Multimedia</span>
      </nav>

      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Multimedia / Galería de Activos</h1>
          <p className={styles.pageDesc}>Gestiona las imágenes y videos asociados a este producto. Arrastra nuevos archivos o edita los existentes.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>Cancelar</button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>
            Guardar Cambios
          </button>
        </div>
      </div>

      <section>
        <div
          className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ''}`}
          onDragEnter={(e) => handleDropZoneEvent(e, true)}
          onDragOver={(e) => handleDropZoneEvent(e, true)}
          onDragLeave={(e) => handleDropZoneEvent(e, false)}
          onDrop={(e) => handleDropZoneEvent(e, false)}
        >
          <div className={styles.dropIcon}>
            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>cloud_upload</span>
          </div>
          <h3 className={styles.dropTitle}>Arrastra tus archivos aquí o haz clic para explorar</h3>
          <p className={styles.dropDesc}>
            Sube las imágenes de producto y videos promocionales en alta resolución.
            <span className={styles.dropHint}>Soportamos JPG, PNG, MP4 hasta 50MB</span>
          </p>
        </div>
      </section>

      <section>
        <div className={styles.galleryHeader}>
          <h3 className={styles.galleryTitle}>Galería de Activos</h3>
          <div className={styles.galleryControls}>
            <div className={styles.filterBar}>
              <div className={styles.searchWrap}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-on-surface-variant)' }}>search</span>
                <input className={styles.searchInput} type="text" placeholder="Buscar archivos..." />
              </div>
              <select className={styles.filterSelect}>
                <option>Todos los tipos</option>
                <option>Imágenes</option>
                <option>Videos</option>
              </select>
              <select className={styles.filterSelect}>
                <option>Más recientes</option>
                <option>Más antiguos</option>
                <option>Más pesados</option>
              </select>
            </div>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewActive : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewActive : ''}`}
                onClick={() => setViewMode('list')}
              >
                <span className="material-symbols-outlined">view_list</span>
              </button>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? styles.assetGrid : styles.assetList}>
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={`${styles.assetCard} ${selectedId === asset.id ? styles.assetSelected : ''}`}
              onClick={() => setSelectedId(asset.id)}
            >
              <div className={styles.assetBadges}>
                {asset.isPrincipal && <span className={styles.badgePrimary}>PRINCIPAL</span>}
                <span className={`${styles.badgeType} ${asset.type === 'VIDEO' ? styles.badgeVideo : ''}`}>
                  {asset.type}
                </span>
              </div>
              <div className={styles.assetActions}>
                <button className={styles.assetActionBtn}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>drag_indicator</span>
                </button>
              </div>
              <div className={styles.assetThumb}>
                {asset.type === 'VIDEO' && (
                  <div className={styles.videoOverlay}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'rgba(255,255,255,0.8)' }}>play_circle</span>
                  </div>
                )}
                <img src={asset.src} alt={asset.altText} />
              </div>
              <div className={styles.assetMeta}>
                <div>
                  <p className={styles.assetName}>{asset.name}</p>
                  {asset.optimized ? (
                    <span className={styles.assetStatus}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
                      Optimizado
                    </span>
                  ) : (
                    <span className={styles.assetSize}>{asset.size}</span>
                  )}
                </div>
                <div className={styles.assetActionsRow}>
                  <button className={styles.assetMetaBtn} title="Editar Metadatos">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                  </button>
                  <button className={styles.assetMetaBtnDanger} title="Eliminar">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className={styles.detailPanel}>
        <div className={styles.detailHeader}>
          <h4>Detalles del Activo</h4>
          <button className={styles.detailClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className={styles.detailBody}>
          <div className={styles.detailPreview}>
            <img src={selectedAsset.src} alt={selectedAsset.altText} />
          </div>
          <div className={styles.detailInfo}>
            <div>
              <h5 className={styles.detailName}>{selectedAsset.name}</h5>
              <p className={styles.detailDesc}>
                {selectedAsset.type === 'VIDEO' ? 'Video' : `Imagen ${selectedAsset.type}`}
                {selectedAsset.dimensions && ` • ${selectedAsset.dimensions}`}
              </p>
            </div>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>verified</span>
          </div>
          <div className={styles.detailStats}>
            <div>
              <p className={styles.statLabel}>Original</p>
              <p className={styles.statValue}>{selectedAsset.size}</p>
            </div>
            {selectedAsset.optimizedSize && (
              <div>
                <p className={styles.statLabel}>Optimizado</p>
                <p className={styles.statValuePrimary}>{selectedAsset.optimizedSize}</p>
              </div>
            )}
          </div>
          {!selectedAsset.optimized && (
            <button className={styles.optimizeBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_fix_high</span>
              Optimizar ahora
            </button>
          )}
          <div className={styles.detailForm}>
            <div>
              <label className={styles.detailLabel}>
                Alt Text (SEO)
                <span className="material-symbols-outlined" style={{ fontSize: 14, opacity: 0.4 }}>info</span>
              </label>
              <input className={styles.detailInput} type="text" defaultValue={selectedAsset.altText} />
            </div>
            <div>
              <label className={styles.detailLabel}>Descripción</label>
              <textarea className={styles.detailTextarea} rows={3} defaultValue={selectedAsset.description} />
            </div>
            <div className={styles.visibilityRow}>
              <div className={styles.visibilityLeft}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)' }}>visibility</span>
                <span className={styles.detailLabel}>Visibilidad Pública</span>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked={selectedAsset.visible} />
                <span className={styles.toggleTrack} />
                <span className={styles.toggleThumb} />
              </label>
            </div>
          </div>
          <div className={styles.detailActions}>
            <button className={styles.btnFullscreen}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>fullscreen</span>
              Ver Pantalla Completa
            </button>
            <button className={styles.btnDeleteIcon}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
