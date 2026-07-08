import { FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';
import styles from './Alert.module.css';

const iconMap = {
  success: FiCheck,
  error: FiAlertCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

export default function Alert({ children, type = 'info', dismissible = false, onDismiss }) {
  const Icon = iconMap[type] || FiInfo;

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <Icon className={styles.icon} size={18} />
      <span className={styles.message}>{children}</span>
      {dismissible && onDismiss && (
        <button className={styles.close} onClick={onDismiss}>
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}
