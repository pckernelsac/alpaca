import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Skeleton } from './Primitives';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  tone?: 'neutral' | 'gold' | 'warning' | 'danger';
  to?: string;
  loading?: boolean;
}

/** Cifra sola, sin gráfico: cuando el dato es un número y no una serie, la
 *  forma correcta es el número grande, no una barra de un solo valor. */
export function StatCard({ label, value, hint, icon, tone = 'neutral', to, loading }: StatCardProps) {
  const content = (
    <>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={[styles.icon, styles[tone]].join(' ')}>{icon}</span>}
      </div>
      {loading ? (
        <Skeleton height="1.9rem" width="60%" />
      ) : (
        <p className={styles.value}>{value}</p>
      )}
      {hint && <p className={styles.hint}>{hint}</p>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${styles.card} ${styles.linkCard}`}>
        {content}
      </Link>
    );
  }

  return <div className={styles.card}>{content}</div>;
}
