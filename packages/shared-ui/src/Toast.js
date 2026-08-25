import { useState, useEffect, useCallback } from 'react';

let toastId = 0;

export function Toast({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bg = { info: '#4a90d9', success: '#5cb85c', error: '#d9534f', warning: '#f0ad4e' }[type] || '#4a90d9';

  return (
    <div style={{
      position: 'fixed', top: 16, right: 16, zIndex: 9999,
      background: bg, color: '#fff', padding: '12px 20px',
      borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      display: 'flex', alignItems: 'center', gap: 8,
      animation: 'toast-in 0.3s ease',
    }}>
      <span style={{ flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>×</button>
      <style>{`@keyframes toast-in{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastElements = toasts.map((t) => (
    <Toast key={t.id} message={t.message} type={t.type} duration={t.duration} onClose={() => removeToast(t.id)} />
  ));

  return { toasts, addToast, removeToast, toastElements };
}
