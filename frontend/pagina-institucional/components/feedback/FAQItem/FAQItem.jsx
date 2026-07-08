import { FiChevronDown } from 'react-icons/fi';
import { useAccordion } from './Accordion';
import styles from './FAQItem.module.css';

export default function FAQItem({ index = 0, title, children, className = '' }) {
  const { openIndex, toggle } = useAccordion();
  const isOpen = openIndex === index;

  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ''} ${className}`}>
      <button
        className={styles.trigger}
        onClick={() => toggle(index)}
        aria-expanded={isOpen}
      >
        <span className={styles.title}>{title}</span>
        <FiChevronDown className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} size={20} />
      </button>
      <div
        className={styles.content}
        style={{ maxHeight: isOpen ? '500px' : '0' }}
      >
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}