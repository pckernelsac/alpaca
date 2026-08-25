import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './Dropdown.module.css';

export default function Dropdown({ trigger, items, align = 'left', className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${styles.container} ${className}`} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        {trigger}
        <FiChevronDown className={`${styles.arrow} ${open ? styles.arrowUp : ''}`} size={14} />
      </button>
      {open && (
        <div className={`${styles.menu} ${align === 'right' ? styles.right : ''}`}>
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className={styles.divider} />
            ) : (
              <button
                key={i}
                className={styles.item}
                onClick={() => { item.onClick?.(); setOpen(false); }}
              >
                {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
