import { useState, useEffect } from 'react';
import styles from './ScrollSpySidebar.module.css';

export default function ScrollSpySidebar({ items = [], className = '' }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.sidebar} ${className}`}>
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles.link} ${activeId === item.id ? styles.active : ''}`}
          onClick={() => scrollTo(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}