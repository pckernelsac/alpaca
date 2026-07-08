import { FiMinus, FiPlus } from 'react-icons/fi';
import styles from './QuantitySelector.module.css';

export default function QuantitySelector({ value = 1, min = 1, max = 99, onChange, className = '' }) {
  const dec = () => { if (value > min) onChange(value - 1); };
  const inc = () => { if (value < max) onChange(value + 1); };
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <button className={styles.btn} onClick={dec} disabled={value <= min}><FiMinus size={14} /></button>
      <span className={styles.value}>{value}</span>
      <button className={styles.btn} onClick={inc} disabled={value >= max}><FiPlus size={14} /></button>
    </div>
  );
}