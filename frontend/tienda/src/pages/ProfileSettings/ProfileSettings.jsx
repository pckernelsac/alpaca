import { useState, useEffect } from 'react';
import { useProfile } from '@/hooks';
import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import styles from './ProfileSettings.module.css';

export default function ProfileSettings() {
  const { profile, fetch, loading } = useProfile();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  useEffect(() => { fetch(); }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || profile.name?.split(' ')[0] || '',
        lastName: profile.lastName || profile.name?.split(' ').slice(1).join(' ') || '',
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className={styles.layout}>
      <ProfileMenu userName={form.firstName || 'Usuario'} />
      <div className={styles.main}>
        <h1 className={styles.title}>Configuración de perfil</h1>
        {loading && <p>Cargando...</p>}
        {!loading && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Información personal</h2>
              <div className={styles.grid}>
                <div className={styles.field}><label className={styles.label}>Nombre</label><input className={styles.input} name="firstName" value={form.firstName} onChange={handleChange} /></div>
                <div className={styles.field}><label className={styles.label}>Apellido</label><input className={styles.input} name="lastName" value={form.lastName} onChange={handleChange} /></div>
                <div className={styles.field}><label className={styles.label}>Correo electrónico</label><input className={styles.input} name="email" value={form.email} onChange={handleChange} disabled /></div>
                <div className={styles.field}><label className={styles.label}>Teléfono</label><input className={styles.input} name="phone" value={form.phone} onChange={handleChange} /></div>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Seguridad</h2>
              <div className={styles.grid}>
                <div className={styles.field}><label className={styles.label}>Contraseña actual</label><input className={styles.input} name="currentPw" type="password" placeholder="********" /></div>
                <div className={styles.field}><label className={styles.label}>Nueva contraseña</label><input className={styles.input} name="newPw" type="password" placeholder="Escribe tu nueva contraseña" /></div>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Preferencias</h2>
              <div className={styles.grid}>
                <div className={styles.field}><label className={styles.label}>Idioma</label><select className={styles.select} name="language" value={form.language} onChange={handleChange}><option value="es">Español</option><option value="en">English</option></select></div>
                <div className={styles.field}><label className={styles.label}>Moneda</label><select className={styles.select} name="currency" value={form.currency} onChange={handleChange}><option value="USD">USD ($)</option><option value="PEN">PEN (S/)</option></select></div>
              </div>
            </section>
            <div className={styles.actions}>
              <button className={styles.saveBtn}>Guardar cambios</button>
              <button className={styles.discardBtn}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
