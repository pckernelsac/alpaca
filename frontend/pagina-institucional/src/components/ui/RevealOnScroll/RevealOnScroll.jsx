import { useEffect, useRef, useState } from 'react';
import styles from './RevealOnScroll.module.css';

export default function RevealOnScroll({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={[styles.reveal, styles[direction], isVisible ? styles.visible : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
