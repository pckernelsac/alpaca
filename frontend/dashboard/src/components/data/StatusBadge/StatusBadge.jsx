import styles from './StatusBadge.module.css';

const statusColorMap = {
  active: 'success',
  paid: 'success',
  completed: 'success',
  delivered: 'success',
  success: 'success',
  pending: 'warning',
  processing: 'warning',
  shipping: 'warning',
  in_transit: 'warning',
  cancelled: 'error',
  failed: 'error',
  rejected: 'error',
  error: 'error',
  draft: 'neutral',
  inactive: 'neutral',
};

export default function StatusBadge({ status, label, size = 'md', className = '' }) {
  const colorClass = statusColorMap[status] || 'default';
  const classNames = [styles.badge, styles[colorClass], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      <span className={styles.dot} />
      {label || status}
    </span>
  );
}
