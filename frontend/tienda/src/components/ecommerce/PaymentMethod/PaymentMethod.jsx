import { useState } from 'react';
import styles from './PaymentMethod.module.css';


export default function PaymentMethod({ onSubmit, className = '' }) {
  const [form, setForm] = useState({ number: '', expiry: '', cvc: '', name: '', saveCard: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.number.trim()) err.number = 'Requerido';
    if (!form.expiry.trim()) err.expiry = 'Requerido';
    if (!form.cvc.trim()) err.cvc = 'Requerido';
    if (!form.name.trim()) err.name = 'Requerido';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) { setErrors(err); return; }
    if (onSubmit) onSubmit(form);
  };

  return (
    <form className={[styles.form, className].filter(Boolean).join(' ')} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.title}>Pago con tarjeta</h3>
      <div className={styles.field}>
        <label className={styles.label}>Número de tarjeta</label>
        <input className={[styles.input, errors.number ? styles.hasError : ''].filter(Boolean).join(' ')} name="number" value={form.number} onChange={handleChange} placeholder="1234 5678 9012 3456" />
        {errors.number && <span className={styles.error}>{errors.number}</span>}
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Vencimiento</label>
          <input className={[styles.input, errors.expiry ? styles.hasError : ''].filter(Boolean).join(' ')} name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/AA" />
          {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>CVC</label>
          <input className={[styles.input, errors.cvc ? styles.hasError : ''].filter(Boolean).join(' ')} name="cvc" value={form.cvc} onChange={handleChange} placeholder="123" />
          {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Titular de la tarjeta</label>
        <input className={[styles.input, errors.name ? styles.hasError : ''].filter(Boolean).join(' ')} name="name" value={form.name} onChange={handleChange} placeholder="Nombre completo" />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <label className={styles.checkbox}>
        <input type="checkbox" checked={form.saveCard} onChange={(e) => setForm({ ...form, saveCard: e.target.checked })} />
        <span>Guardar tarjeta para futuras compras</span>
      </label>
      <button type="submit" className={styles.submit}>Pagar</button>
    </form>
  );
}