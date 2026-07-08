import { useContext } from 'react';
import { UIContext } from '@/context/UIContext';
import { FiX, FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import styles from './Toast.module.css';

const iconMap = {
  success: FiCheck,
  error: FiAlertCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

function ToastItem({ id, message, type, onRemove }) {
  const Icon = iconMap[type] || FiInfo;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <Icon className={styles.icon} size={18} />
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={() => onRemove(id)}>
        <FiX size={16} />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useContext(UIContext);

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onRemove={removeToast} />
      ))}
    </div>
  );
}