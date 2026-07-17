import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import styles from './TrendIndicator.module.css';

export default function TrendIndicator({ value, isUp, className = '' }) {
  return (
    <span className={`${styles.trend} ${isUp ? styles.up : styles.down} ${className}`}>
      {isUp ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
      <span>{value}%</span>
    </span>
  );
}
