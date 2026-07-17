import { useState } from 'react';
import logo from '@/assets/images/logo.png';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Credenciales incorrectas. Inténtelo de nuevo.');
    }, 1500);
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.card}>
        <header className={styles.header}>
          <img src={logo} alt="Alpacart" className={styles.logo} />
          <h1 className={styles.title}>ERP de Gestión Textil</h1>
          <p className={styles.subtitle}>Bienvenido al Centro de Operaciones</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && (
            <div className={styles.errorMsg}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>error</span>
              <span>{error}</span>
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Correo Electrónico</label>
            <div className={styles.inputWrap}>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="nombre@alpacart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <div className={styles.inputWrap}>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.togglePw}
                onClick={() => setShowPw((p) => !p)}
                aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  {showPw ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className={styles.checkboxLabel}>Recordarme</span>
            </label>
            <a href="#" className={styles.forgot}>¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={`material-symbols-outlined ${styles.spinner}`}>progress_activity</span>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>¿Problemas de acceso? <a href="#" className={styles.helpLink}>Contactar soporte IT</a></p>
        </div>
      </main>

      <footer className={styles.copy}>
        © 2024 Alpacart Textiles. Acceso restringido a personal autorizado.
      </footer>
    </div>
  );
}
