import { useState } from 'react';
import { useContact } from '@/hooks/useContact';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const { send, loading, success, error: apiError, reset } = useContact();

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'El nombre es obligatorio';
    if (!form.email.trim()) err.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email inválido';
    if (!form.subject.trim()) err.subject = 'El asunto es obligatorio';
    if (!form.message.trim()) err.message = 'El mensaje es obligatorio';
    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    const ok = await send(form);
    if (ok) {
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }
  };

  if (success) {
    return (
      <div className={styles.successWrap}>
        <span className={[styles.successIcon, 'material-symbols-outlined'].join(' ')}>
          check_circle
        </span>
        <h3 className={styles.successTitle}>Mensaje Enviado</h3>
        <p className={styles.successDesc}>Gracias por contactarnos. Responderemos a la brevedad.</p>
        <button
          className={styles.submit}
          style={{ marginTop: 20 }}
          onClick={() => reset()}
          type="button"
        >
          ENVIAR OTRO MENSAJE
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {apiError && (
        <div style={{ color: 'var(--color-error)', marginBottom: 16, fontSize: '0.9rem' }}>
          {apiError?.message || 'Error al enviar la consulta. Intente nuevamente.'}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>NOMBRE COMPLETO</label>
          <input
            className={[styles.input, errors.name ? styles.hasError : ''].filter(Boolean).join(' ')}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Su nombre"
            type="text"
            disabled={loading}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>EMAIL</label>
          <input
            className={[styles.input, errors.email ? styles.hasError : ''].filter(Boolean).join(' ')}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            type="email"
            disabled={loading}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>ASUNTO</label>
        <input
          className={[styles.input, errors.subject ? styles.hasError : ''].filter(Boolean).join(' ')}
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Motivo de su consulta"
          type="text"
          disabled={loading}
        />
        {errors.subject && <span className={styles.error}>{errors.subject}</span>}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>MENSAJE</label>
        <textarea
          className={[styles.textarea, errors.message ? styles.hasError : ''].filter(Boolean).join(' ')}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Escriba su mensaje aquí..."
          rows="4"
          disabled={loading}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>
      <div className={styles.submitWrap}>
        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
        </button>
      </div>
    </form>
  );
}
