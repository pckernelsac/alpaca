import type { CSSProperties, ReactNode } from 'react';

import styles from './Primitives.module.css';

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */
export type BadgeTone = 'neutral' | 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'solid';

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
/* Card                                                                       */
/* -------------------------------------------------------------------------- */
export function Card({
  title,
  action,
  children,
  className,
  padded = true,
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={[styles.card, className].filter(Boolean).join(' ')}>
      {(title || action) && (
        <header className={styles.cardHeader}>
          {typeof title === 'string' ? <h2 className={styles.cardTitle}>{title}</h2> : title}
          {action}
        </header>
      )}
      <div className={padded ? styles.cardBody : undefined}>{children}</div>
    </section>
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

/* -------------------------------------------------------------------------- */
/* Estados                                                                    */
/* -------------------------------------------------------------------------- */
export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <span className={styles.spinner} style={{ width: size, height: size }} aria-hidden="true" />
  );
}

export function LoadingBlock({ label = 'Cargando' }: { label?: string }) {
  return (
    <div className={styles.spinnerCenter} role="status" aria-live="polite">
      <Spinner size={26} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

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
      <p className={styles.emptyTitle}>{title}</p>
      {description && <p className={styles.emptyText}>{description}</p>}
      {actions && <div className={styles.emptyActions}>{actions}</div>}
    </div>
  );
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

/* -------------------------------------------------------------------------- */
/* Tabs                                                                       */
/* -------------------------------------------------------------------------- */
export function Tabs<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; count?: number }[];
  onChange: (next: T) => void;
}) {
  return (
    <div className={styles.tabs} role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={option.value === value}
          className={[styles.tab, option.value === value && styles.tabActive]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {typeof option.count === 'number' && (
            <span className={styles.tabCount}>{option.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
