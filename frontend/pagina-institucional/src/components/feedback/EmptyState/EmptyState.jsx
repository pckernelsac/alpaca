import { FiInbox } from 'react-icons/fi';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon: Icon = FiInbox, title, description, action }) {
  return (
    <div className={styles.empty}>
      <Icon className={styles.icon} size={48} />
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
