import { useEffect, useState } from 'react';
import { settingsRepository } from '@/repositories/api';
import styles from './Settings.module.css';

export default function Settings() {
  const [company, setCompany] = useState({
    name: 'Alpacart Textiles S.A.C.',
    taxId: '20601234567',
    email: 'ops@alpacart.com',
    phone: '+51 01 445 6789',
    currency: 'USD',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await settingsRepository.getCompany();
        if (res?.data || res) {
          setCompany((prev) => ({ ...prev, ...(res.data || res) }));
        }
      } catch (err) {
        console.warn('Error al cargar datos de empresa:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await settingsRepository.updateCompany(company);
      setMessage('Configuración de la empresa guardada exitosamente.');
    } catch (err) {
      setMessage('Error al guardar datos de la empresa: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Consola de Configuración de Empresa</h2>
          <p className={styles.pageDesc}>Identidad legal y ajustes globales de Alpacart ERP — API REST NestJS.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check</span>
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ margin: '20px 0', padding: 16, backgroundColor: 'var(--color-primary-container)', borderRadius: 12 }}>
          <strong>{message}</strong>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando configuración de la empresa desde la API REST...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className={styles.bentoGrid}>
          <div className={`${styles.bentoCard} ${styles.generalCard}`}>
            <h3 className={styles.cardTitle}>Datos Legales</h3>
            <div className={styles.formGrid2Col}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Razón Social</label>
                <input
                  className={styles.formInput}
                  type="text"
                  value={company.name || ''}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>RUC / Identificación Fiscal</label>
                <input
                  className={styles.formInput}
                  type="text"
                  value={company.taxId || company.ruc || ''}
                  onChange={(e) => setCompany({ ...company, taxId: e.target.value, ruc: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.bentoCard} ${styles.contactCard}`}>
            <h3 className={styles.cardTitle}>Información de Contacto</h3>
            <div className={styles.contactGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Correo Corporativo</label>
                <input
                  className={styles.formInput}
                  type="email"
                  value={company.email || ''}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Teléfono Central</label>
                <input
                  className={styles.formInput}
                  type="tel"
                  value={company.phone || ''}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
