import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { catalogRepository } from '@/repositories/api';
import styles from './ProductCreate.module.css';

export default function ProductCreate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Nombre y Precio son requeridos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await catalogRepository.createProduct({
        name,
        sku: sku || undefined,
        price: Number(price),
        stock: Number(stock) || 0,
        categoryId: categoryId || undefined,
        description: description || undefined,
        status: 'active',
      });
      navigate('/catalog/productos');
    } catch (err) {
      setError(err?.message || 'Error al crear producto en backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/catalog" className={styles.breadcrumbLink}>Catálogo</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <Link to="/catalog/productos" className={styles.breadcrumbLink}>Productos</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <span className={styles.breadcrumbActive}>Nuevo Producto</span>
      </nav>

      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Crear Nuevo Producto</h1>
          <p className={styles.pageDesc}>Conectado a la API REST NestJS — Registro en PostgreSQL.</p>
        </div>
      </div>

      {error && (
        <div style={{ padding: 16, marginBottom: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)', color: 'var(--color-error)' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.body}>
          <div className={styles.content}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionBar} />
                <h3>Detalles Base del Producto</h3>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldFull}>
                  <label className={styles.fieldLabel}>NOMBRE DEL PRODUCTO *</label>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="Ej: Manta Baby Alpaca Imperial"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>SKU (CÓDIGO ÚNICO)</label>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="ALP-MNTA-001"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>PRECIO (USD) *</label>
                  <input
                    className={styles.fieldInput}
                    type="number"
                    step="0.01"
                    placeholder="185.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldHalf}>
                  <label className={styles.fieldLabel}>STOCK INICIAL</label>
                  <input
                    className={styles.fieldInput}
                    type="number"
                    placeholder="50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldFull}>
                  <label className={styles.fieldLabel}>DESCRIPCIÓN</label>
                  <textarea
                    className={styles.fieldTextarea}
                    rows={4}
                    placeholder="Descripción detallada de la composición textil..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className={styles.footer}>
          <Link to="/catalog/productos" className={styles.btnCancel}>Cancelar</Link>
          <div className={styles.footerActions}>
            <button type="submit" className={styles.btnPublish} disabled={loading}>
              {loading ? 'Guardando...' : 'Publicar Producto'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
