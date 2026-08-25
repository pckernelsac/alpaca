import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger' | 'link';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
}

export interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {}

function classes({ variant = 'primary', size = 'md', loading, fullWidth, iconOnly }: BaseProps) {
  return [
    styles.button,
    styles[variant],
    size !== 'md' && styles[size],
    fullWidth && styles.full,
    iconOnly && styles.iconOnly,
    loading && styles.loading,
  ]
    .filter(Boolean)
    .join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, loading, fullWidth, iconOnly, children, className, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={[classes({ variant, size, loading, fullWidth, iconOnly }), className]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
      {loading && <span className={styles.spinner} aria-hidden="true" />}
    </button>
  );
});

interface ButtonLinkProps extends BaseProps {
  to: string;
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
}

/** Misma apariencia que Button, pero navega. Un enlace debe ser un <a>. */
export function ButtonLink({
  to,
  variant,
  size,
  fullWidth,
  iconOnly,
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={[classes({ variant, size, fullWidth, iconOnly }), className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Link>
  );
}
