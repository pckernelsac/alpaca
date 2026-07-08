import { useState } from 'react';
import styles from './CouponBox.module.css';

export default function CouponBox({ onApply, className = '' }) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle');

  const handleApply = () => {
    if (!code.trim()) return;
    setStatus('applied');
    onApply?.(code.trim());
  };

  return (
    <div className={[styles.box, className].filter(Boolean).join(' ')}>
      <label className={styles.label}>Código de descuento</label>
      <div className={styles.row}>
        <input className={styles.input} value={code} onChange={(e) => { setCode(e.target.value); setStatus('idle'); }} placeholder={status === 'applied' ? '' : 'Ingresa tu código'} disabled={status === 'applied'} />
        {status === 'applied' ? (
          <span className={styles.applied}>Aplicado</span>
        ) : (
          <button className={styles.applyBtn} onClick={handleApply}>Aplicar</button>
        )}
      </div>
    </div>
  );
}
