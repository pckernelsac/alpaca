import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.firstName.trim()) err.firstName = 'El nombre es obligatorio';
    if (!form.lastName.trim()) err.lastName = 'El apellido es obligatorio';
    if (!form.email.trim()) err.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email inválido';
    if (!form.password) err.password = 'La contraseña es obligatoria';
    else if (form.password.length < 6) err.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) err.confirmPassword = 'Las contraseñas no coinciden';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) { setErrors(err); return; }
    setLoading(true);
    setTimeout(() => {
      login('simulated_token_' + Date.now(), { name: form.firstName + ' ' + form.lastName, email: form.email });
      setLoading(false);
      navigate('/account');
    }, 1000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <p className={styles.subtitle}>Únete a Alpacart y descubre nuestra colección</p>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Nombre</label>
              <input className={[styles.input, errors.firstName && styles.hasError].filter(Boolean).join(' ')} name="firstName" value={form.firstName} onChange={handleChange} placeholder="Tu nombre" />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Apellido</label>
              <input className={[styles.input, errors.lastName && styles.hasError].filter(Boolean).join(' ')} name="lastName" value={form.lastName} onChange={handleChange} placeholder="Tu apellido" />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={[styles.input, errors.email && styles.hasError].filter(Boolean).join(' ')} name="email" type="email" value={form.email} onChange={handleChange} placeholder="ejemplo@correo.com" />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input className={[styles.input, errors.password && styles.hasError].filter(Boolean).join(' ')} name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Confirmar Contraseña</label>
            <input className={[styles.input, errors.confirmPassword && styles.hasError].filter(Boolean).join(' ')} name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repite la contraseña" />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? 'Registrando...' : 'Crear Cuenta'}</button>
        </form>
        <p className={styles.loginLink}>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
}
