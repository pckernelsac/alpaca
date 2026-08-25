import { useEffect, useState } from 'react';
import { authRepository } from '@/repositories/api';
import styles from './MyProfile.module.css';

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError('');
      try {
        const res = await authRepository.getProfile();
        setProfile(res?.data || res);
      } catch (err) {
        setError(err?.message || 'Error al cargar perfil de usuario desde backend');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando perfil de usuario desde la API REST...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarBox}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-primary)' }}>account_circle</span>
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{profile?.name || profile?.email || 'Usuario Staff'}</h1>
          <div className={styles.profileTags}>
            <span className={styles.roleChip}>{profile?.role || 'Staff ERP'}</span>
            <span className={styles.adminChip}>
              <span className="material-symbols-outlined">security</span>
              Sesión Autenticada NestJS JWT
            </span>
          </div>
        </div>
      </section>

      {error && (
        <div style={{ padding: 16, margin: '20px 0', backgroundColor: 'var(--color-error-container)', color: 'var(--color-error)', borderRadius: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className={styles.contentGrid}>
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className="material-symbols-outlined">person</span>
              <h3>Información de Perfil</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Nombre Completo</label>
                <input type="text" readOnly value={profile?.name || 'Mateo Quispe'} />
              </div>
              <div className={styles.field}>
                <label>Correo Institucional</label>
                <input type="email" readOnly value={profile?.email || 'mateo.q@alpacart.com'} />
              </div>
              <div className={styles.field}>
                <label>Rol asignado</label>
                <input type="text" readOnly value={profile?.role || 'ADMIN'} />
              </div>
              <div className={styles.field}>
                <label>Estado de Cuenta</label>
                <input type="text" readOnly value={profile?.status || 'ACTIVE'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
