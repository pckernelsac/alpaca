import { useState, useEffect } from 'react';
import { useAddresses, useProfile } from '@/hooks';
import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import styles from './Addresses.module.css';

const emptyForm = { name: '', street: '', city: '', zip: '', country: 'Perú', phone: '' };
const ipt = { padding: '10px 12px', border: '1px solid #d4c9b0', borderRadius: 6, fontSize: '0.9rem', width: '100%', boxSizing: 'border-box' };

export default function Addresses() {
  const { addresses, fetch, save, remove } = useAddresses();
  const { profile } = useProfile();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => { fetch(); }, []);

  const userName = profile?.firstName || profile?.name || 'Usuario';

  const openNew = () => { setForm(emptyForm); setEditingAddress(null); setShowForm(true); };
  const openEdit = (a) => { setForm({ name: a.name, street: a.street, city: a.city, zip: a.zip || '', country: a.country, phone: a.phone || '' }); setEditingAddress(a); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setForm(emptyForm); setEditingAddress(null); };

  const handleSave = async () => {
    if (editingAddress) {
      await remove(editingAddress.id);
    }
    await save(form);
    closeForm();
  };

  return (
    <div className={styles.layout}>
      <ProfileMenu userName={userName} />
      <div className={styles.main}>
        <h1 className={styles.title}>Direcciones</h1>

        {showForm && (
          <div style={{ border: '2px solid #8B4513', borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <h3 style={{ marginBottom: 12 }}>Dirección</h3>
            <input name="name" placeholder="Nombre completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={ipt} />
            <div style={{ height: 8 }} />
            <input name="phone" placeholder="Teléfono" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={ipt} />
            <div style={{ height: 8 }} />
            <input name="street" placeholder="Dirección" value={form.street} onChange={e => setForm({...form, street: e.target.value})} style={ipt} />
            <div style={{ height: 8 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <input name="city" placeholder="Ciudad" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={ipt} />
              <input name="zip" placeholder="Código postal" value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} style={ipt} />
            </div>
            <div style={{ height: 8 }} />
            <input name="country" placeholder="País" value={form.country} onChange={e => setForm({...form, country: e.target.value})} style={ipt} />
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button type="button" onClick={handleSave} style={{ background: '#8B4513', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', cursor: 'pointer' }}>Guardar</button>
              <button type="button" onClick={closeForm} style={{ background: 'none', border: '1px solid #ccc', borderRadius: 4, padding: '8px 20px', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        )}

        {!showForm && addresses.length === 0 && <p style={{ color: '#888', padding: 20 }}>No tienes direcciones guardadas.</p>}

        <div className={styles.grid}>
          {!showForm && addresses.map((addr) => (
            <div key={addr.id} style={{ border: '1px solid #e0d5c1', borderRadius: 8, padding: 16, position: 'relative' }}>
              {addr.isDefault && <span style={{ position: 'absolute', top: 8, right: 8, fontSize: '0.7rem', background: '#8B4513', color: '#fff', padding: '2px 8px', borderRadius: 4 }}>Principal</span>}
              <p><strong>{addr.name}</strong></p>
              <p style={{ color: '#555', fontSize: '0.85rem' }}>{addr.street}, {addr.city}</p>
              <p style={{ color: '#555', fontSize: '0.85rem' }}>{addr.country}{addr.zip ? ' — ' + addr.zip : ''}</p>
              {addr.phone && <p style={{ color: '#555', fontSize: '0.85rem' }}>{addr.phone}</p>}
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button type="button" onClick={() => openEdit(addr)} style={{ background: 'none', border: '1px solid #ccc', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' }}>Editar</button>
                <button type="button" onClick={() => remove(addr.id)} style={{ background: 'none', border: '1px solid #e74c3c', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem', color: '#e74c3c' }}>Eliminar</button>
              </div>
            </div>
          ))}
          {!showForm && (
            <button type="button" onClick={openNew} className={styles.addBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>add</span>
              <span>Añadir nueva dirección</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
