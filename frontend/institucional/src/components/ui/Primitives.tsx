import type { CSSProperties, ReactNode } from 'react';

import { IconStar } from './Icon';
import styles from './Primitives.module.css';

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */
type BadgeTone = 'neutral' | 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'solid';

const badgeTone: Record<BadgeTone, string> = {
  neutral: styles.badgeNeutral,
  gold: styles.badgeGold,
  success: styles.badgeSuccess,
  warning: styles.badgeWarning,
  danger: styles.badgeDanger,
  info: styles.badgeInfo,
  solid: styles.badgeSolid,
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span className={[styles.badge, badgeTone[tone], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Skeleton                                                                   */
/* -------------------------------------------------------------------------- */
export function Skeleton({
  width,
  height,
  radius,
  className,
  style,
}: {
  width?: string | number;
  height?: string | number;
  radius?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={[styles.skeleton, className].filter(Boolean).join(' ')}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={className} style={{ display: 'grid', gap: 'var(--space-2)' }} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${styles.skeleton} ${styles.skeletonText}`}
          // La última línea corta: imita el final natural de un párrafo.
          style={{ width: index === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Price                                                                      */
/* -------------------------------------------------------------------------- */
const formatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  minimumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return formatter.format(Number.isFinite(value) ? value : 0);
}

export function Price({
  value,
  originalValue,
  size = 'md',
  showFrom = false,
  className,
}: {
  value: number;
  originalValue?: number | null;
  size?: 'sm' | 'md' | 'lg';
  showFrom?: boolean;
  className?: string;
}) {
  const sizeClass = size === 'lg' ? styles.priceLg : size === 'sm' ? styles.priceSm : undefined;
  const hasDiscount = typeof originalValue === 'number' && originalValue > value;

  return (
    <span className={[styles.price, sizeClass, className].filter(Boolean).join(' ')}>
      {showFrom && <span className={styles.priceFrom}>desde</span>}
      {hasDiscount && <span className={styles.priceOriginal}>{formatPrice(originalValue!)}</span>}
      <span className={styles.priceCurrent}>{formatPrice(value)}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Rating                                                                     */
/* -------------------------------------------------------------------------- */
export function Rating({
  value,
  count,
  size = 14,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  const rounded = Math.round(value);

  return (
    <span className={[styles.rating, className].filter(Boolean).join(' ')}>
      <span
        className={styles.stars}
        role="img"
        aria-label={`${value.toFixed(1)} de 5 estrellas`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <IconStar
            key={index}
            size={size}
            filled={index < rounded}
            className={index < rounded ? undefined : styles.starEmpty}
          />
        ))}
      </span>
      {typeof count === 'number' && (
        <span className={styles.ratingCount}>
          ({count} {count === 1 ? 'reseña' : 'reseñas'})
        </span>
      )}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* EmptyState                                                                 */
/* -------------------------------------------------------------------------- */
export function EmptyState({
  icon,
  title,
  description,
  actions,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className={styles.empty}>
      {icon && <div className={styles.emptyIcon}>{icon}</div>}
      <h2 className={styles.emptyTitle}>{title}</h2>
      {description && <p className={styles.emptyText}>{description}</p>}
      {actions && <div className={styles.emptyActions}>{actions}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Spinner / Divider / Alert                                                  */
/* -------------------------------------------------------------------------- */
export function Spinner({ size = 24 }: { size?: number }) {
  return <span className={styles.spinner} style={{ width: size, height: size }} aria-hidden="true" />;
}

export function LoadingBlock({ label = 'Cargando' }: { label?: string }) {
  return (
    <div className={styles.spinnerCenter} role="status" aria-live="polite">
      <Spinner size={28} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function Divider({ label, className }: { label?: string; className?: string }) {
  if (label) {
    return <div className={[styles.dividerLabel, className].filter(Boolean).join(' ')}>{label}</div>;
  }
  return <hr className={[styles.divider, className].filter(Boolean).join(' ')} />;
}

export function Alert({
  tone = 'info',
  icon,
  children,
  className,
}: {
  tone?: 'danger' | 'success' | 'info' | 'warning';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const toneClass = {
    danger: styles.alertDanger,
    success: styles.alertSuccess,
    info: styles.alertInfo,
    warning: styles.alertWarning,
  }[tone];

  return (
    <div className={[styles.alert, toneClass, className].filter(Boolean).join(' ')} role="alert">
      {icon}
      <div>{children}</div>
    </div>
  );
}
