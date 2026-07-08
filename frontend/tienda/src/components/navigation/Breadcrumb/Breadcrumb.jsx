import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.path || index} className={styles.item}>
            {isLast ? (
              <span className={styles.current}>{item.label}</span>
            ) : (
              <Link to={item.path} className={styles.link}>
                {item.label}
              </Link>
            )}
            {!isLast && <FiChevronRight className={styles.separator} size={14} />}
          </span>
        );
      })}
    </nav>
  );
}