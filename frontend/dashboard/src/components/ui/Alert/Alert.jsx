import { FiCheck, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import styles from './Alert.module.css';

const iconMap = {
  success: FiCheck,
  error: FiAlertCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

export default function Alert({ type = 'info', title, message, onClose, className = '' }) {
  const Icon = iconMap[type] || FiInfo;

  return (
    <div className={`${styles.alert} ${styles[type]} ${className}`}>
      <Icon className={styles.icon} size={18} />
      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        {message && <span className={styles.message}>{message}</span>}
      </div>
      {onClose && (
        <button className={styles.close} onClick={onClose}>
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}
