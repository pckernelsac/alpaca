import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder = 'Buscar productos...', onSearch, className = '' }) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) onSearch(query.trim());
  };
  return (
    <form className={[styles.wrapper, className].filter(Boolean).join(' ')} onSubmit={handleSubmit}>
      <FiSearch className={styles.icon} size={18} />
      <input className={styles.input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
    </form>
  );
}