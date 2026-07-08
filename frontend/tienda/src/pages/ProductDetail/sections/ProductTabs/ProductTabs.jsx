import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './ProductTabs.module.css';

export default function ProductTabs({ tabs = [], className = '' }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {tabs.map((tab, i) => (
        <div key={i} className={styles.tab}>
          <button className={styles.trigger} onClick={() => setOpen(open === i ? null : i)}>
            <span className={styles.triggerLabel}>{tab.title}</span>
            <FiChevronDown className={[styles.arrow, open === i ? styles.arrowOpen : ''].filter(Boolean).join(' ')} size={20} />
          </button>
          <div className={styles.content} style={{ maxHeight: open === i ? '500px' : '0' }}>
            <div className={styles.body}>{tab.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}