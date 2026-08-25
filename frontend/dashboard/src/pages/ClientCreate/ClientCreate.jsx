import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { crmRepository } from '@/repositories/api';
import styles from './ClientCreate.module.css';

export default function ClientCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('retail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Nombre y Email son requeridos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await crmRepository.createClient({
        name,
        company: company || undefined,
        email,
        phone: phone || undefined,
        type,
        status: 'active',
      });
      navigate('/crm/clientes');
    } catch (err) {
      setError(err?.message || 'Error al registrar cliente en backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <Link to="/crm/clientes" className={styles.breadcrumbLink}>Clientes</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <span className={styles.breadcrumbActive}>Nuevo Cliente</span>
      </nav>

      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Crear Nuevo Cliente</h1>
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
              <div className={styles.sectionGrid}>
                <div className={styles.sectionInfo}>
                  <h3 className={styles.sectionTitle}>Datos del Cliente</h3>
                  <p className={styles.sectionDesc}>Información básica de contacto y perfil comercial.</p>
                </div>
                <div className={styles.sectionForm}>
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldFull}>
                      <label className={styles.fieldLabel}>NOMBRE COMPLETO *</label>
                      <input
                        className={styles.fieldInput}
                        type="text"
                        placeholder="Ej. Juan Pérez"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldHalf}>
                      <label className={styles.fieldLabel}>EMPRESA / RAZÓN SOCIAL</label>
                      <input
                        className={styles.fieldInput}
                        type="text"
                        placeholder="Textiles del Sur S.A.C."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    <div className={styles.fieldHalf}>
                      <label className={styles.fieldLabel}>TIPO DE CLIENTE</label>
                      <select
                        className={styles.fieldSelect}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="retail">Minorista</option>
                        <option value="wholesale">Mayorista</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldHalf}>
                      <label className={styles.fieldLabel}>CORREO ELECTRÓNICO *</label>
                      <input
                        className={styles.fieldInput}
                        type="email"
                        placeholder="contacto@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.fieldHalf}>
                      <label className={styles.fieldLabel}>TELÉFONO</label>
                      <input
                        className={styles.fieldInput}
                        type="tel"
                        placeholder="+51 987 654 321"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerActions}>
            <Link to="/crm/clientes" className={styles.btnCancel}>Cancelar</Link>
            <button type="submit" className={styles.btnSave} disabled={loading}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>
              {loading ? 'Guardando...' : 'Guardar Cliente'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
