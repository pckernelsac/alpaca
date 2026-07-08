import styles from './Loader.module.css';

export default function Loader({ fullPage = false, size = 'md', text = '' }) {
  const classNames = [styles.loader, styles[size], fullPage ? styles.fullPage : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className={styles.spinner} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
