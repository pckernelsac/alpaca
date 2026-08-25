import type { ReactNode } from 'react';

import styles from './SectionHeading.module.css';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  actions?: ReactNode;
}) {
  return (
    <header
      className={`${styles.heading} ${align === 'center' ? styles.center : ''}`}
      data-reveal
    >
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className={`display ${styles.title}`}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}
