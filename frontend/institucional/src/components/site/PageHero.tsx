import type { ReactNode } from 'react';

import styles from './PageHero.module.css';

/**
 * Encabezado de página.
 *
 * Todas las páginas internas abren igual: volanta, título de display y una
 * bajada corta. La variante con `image` la usa sólo la portada de sección que
 * tiene una fotografía que valga la pena; el resto queda tipográfica, que es
 * lo que la marca pide.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`${styles.hero} ${image ? styles.withImage : ''}`}>
      {image && (
        <div className={styles.media} aria-hidden="true">
          <img src={image} alt="" loading="eager" />
          <span className={styles.scrim} />
        </div>
      )}

      <div className="container">
        <div className={styles.copy}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`display ${styles.title}`}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children && <div className={styles.actions}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
