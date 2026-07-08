import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/images/logo.png';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Completa todos los campos');
      return;
    }
    login('simulated_token_' + Date.now(), { name: 'Cliente Alpacart', email: form.email });
    navigate('/account');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}><img src={logo} alt="ALPACART" className={styles.logoImg} /></Link>
        <h1 className={styles.title}>Iniciar Sesion</h1>
        <p className={styles.subtitle}>Accede a tu cuenta para gestionar tus pedidos y favoritos.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.field}>
            <label className={styles.label}>Correo Electronico</label>
            <input className={styles.input} name="email" value={form.email} onChange={handleChange} type="email" placeholder="tu@correo.com" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Contrasena</label>
            <input className={styles.input} name="password" value={form.password} onChange={handleChange} type="password" placeholder="********" />
          </div>
          <button className={styles.btn} type="submit">Ingresar</button>
        </form>
        <p className={styles.footer}>¿No tienes cuenta? <Link to="/register" className={styles.link}>Registrate</Link></p>
      </div>
    </div>
  );
}
