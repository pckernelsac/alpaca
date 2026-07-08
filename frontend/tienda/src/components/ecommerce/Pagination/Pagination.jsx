import styles from './Pagination.module.css';

export default function Pagination({ current = 1, total = 5, onPageChange, className = '' }) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }
  return (
    <nav className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={'e' + i} className={styles.ellipsis}>...</span>
        ) : (
          <button key={p} className={[styles.page, p === current ? styles.active : ''].filter(Boolean).join(' ')} onClick={() => onPageChange?.(p)}>{p}</button>
        )
      )}
      <button className={styles.next} onClick={() => onPageChange?.(current + 1)} disabled={current >= total}>
        Siguiente <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
      </button>
    </nav>
  );
}