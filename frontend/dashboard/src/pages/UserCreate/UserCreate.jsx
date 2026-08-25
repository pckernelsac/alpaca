import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { iamRepository } from '@/repositories/api';
import styles from './UserCreate.module.css';

export default function UserCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Staff');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Nombre y Correo electrónico son requeridos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await iamRepository.createUser({
        name,
        email,
        phone: phone || undefined,
        role,
        password: password || 'Alpacart2024!',
        status: 'active',
      });
      navigate('/usuarios');
    } catch (err) {
      setError(err?.message || 'Error al registrar usuario en backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1>Crear Nuevo Usuario</h1>
          <p>Conectado a la API REST NestJS — Alta de usuario Staff en PostgreSQL.</p>
        </div>
      </div>

      {error && (
        <div style={{ padding: 16, margin: '20px 0', backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)', color: 'var(--color-error)' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formScroll}>
          <div className={styles.form}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionBar} />
                <h2>Información de Usuario Staff</h2>
              </div>
              <div className={styles.fieldsGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Ej. Mateo Quispe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="mateo@alpacart.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    type="tel"
                    placeholder="+51 900 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="role">Rol del Sistema</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Admin">Administrador</option>
                    <option value="Staff">Staff General</option>
                    <option value="Logistics">Logística</option>
                    <option value="Sales">Ventas</option>
                  </select>
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="password">Contraseña Temporal</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Alpacart2024!"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className={styles.footer}>
          <Link to="/usuarios" className={styles.btnCancel}>Cancelar</Link>
          <div className={styles.footerActions}>
            <button type="submit" className={styles.btnSavePrimary} disabled={loading}>
              <span className="material-symbols-outlined">save</span>
              {loading ? 'Guardando...' : 'Guardar Usuario'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
