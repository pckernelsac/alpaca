import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar({ text = 'Envio gratis en pedidos mayores a S/500', className = '' }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className={[styles.bar, className].filter(Boolean).join(' ')}>
      <span className={styles.text}>{text}</span>
      <button className={styles.close} onClick={() => setVisible(false)} aria-label="Cerrar"><FiX size={16} /></button>
    </div>
  );
}