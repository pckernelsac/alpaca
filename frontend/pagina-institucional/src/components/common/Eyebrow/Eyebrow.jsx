import styles from './Eyebrow.module.css';

export default function Eyebrow({ children, className = '' }) {
  return <span className={[styles.eyebrow, className].filter(Boolean).join(' ')}>{children}</span>;
}
