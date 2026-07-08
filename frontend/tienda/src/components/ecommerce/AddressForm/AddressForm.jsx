import { useState } from 'react';
import styles from './AddressForm.module.css';

const countries = ['Perú', 'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Surinam', 'Uruguay', 'Venezuela'];

export default function AddressForm({ onSubmit, initial = {}, className = '' }) {
  const [form, setForm] = useState({
    name: initial.name || '', street: initial.street || '', apt: initial.apt || '',
    city: initial.city || '', zip: initial.zip || '', country: initial.country || 'Peru',
    email: initial.email || '', phone: initial.phone || '',
  });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit?.(form); };
  return (
    <form className={[styles.form, className].filter(Boolean).join(' ')} onSubmit={handleSubmit}>
      <div className={styles.full}><label className={styles.label}>Nombre completo</label><input className={styles.input} name="name" value={form.name} onChange={handleChange} placeholder="Nombres y Apellidos" /></div>
      <div className={styles.row}>
        <div className={styles.field}><label className={styles.label}>Correo electrónico</label><input className={styles.input} name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" type="email" /></div>
        <div className={styles.field}><label className={styles.label}>Teléfono</label><input className={styles.input} name="phone" value={form.phone} onChange={handleChange} placeholder="+51 999 888 777" type="tel" /></div>
      </div>
      <div className={styles.full}><label className={styles.label}>Dirección</label><input className={styles.input} name="street" value={form.street} onChange={handleChange} placeholder="Calle y numero" /></div>
      <div className={styles.row}>
        <div className={styles.field}><label className={styles.label}>Ciudad</label><input className={styles.input} name="city" value={form.city} onChange={handleChange} placeholder="Ciudad" /></div>
        <div className={styles.field}><label className={styles.label}>Código postal</label><input className={styles.input} name="zip" value={form.zip} onChange={handleChange} placeholder="00000" /></div>
      </div>
      <div className={styles.field}><label className={styles.label}>País</label>
        <select className={styles.select} name="country" value={form.country} onChange={handleChange}>
          {countries.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>
    </form>
  );
}
