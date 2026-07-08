import styles from './Container.module.css';

export default function Container({ children, size = 'default', className = '' }) {
  return (
    <div className={[styles.container, styles[size], className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
