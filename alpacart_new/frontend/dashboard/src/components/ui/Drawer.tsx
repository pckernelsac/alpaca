import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import { Button } from './Button';
import { IconClose } from './Icon';
import styles from './Drawer.module.css';

interface DrawerProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  /** Pie fijo: acciones del formulario, siempre visibles aunque el cuerpo scrollee. */
  footer?: ReactNode;
  children: ReactNode;
  width?: string;
}

/**
 * Panel lateral para formularios.
 *
 * Se prefiere al modal centrado porque el contexto de la tabla queda a la
 * vista: al editar un producto se sigue viendo la lista detrás.
 */
export function Drawer({
  open,
  title,
  description,
  onClose,
  footer,
  children,
  width = '30rem',
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    // Bloquear el scroll de fondo: si no, la rueda mueve la tabla detrás.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // El foco entra al panel para que el teclado no siga en la tabla.
    const timer = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('input, select, textarea, button')?.focus();
    }, 60);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <aside
        ref={panelRef}
        className={styles.panel}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <Button variant="ghost" size="sm" iconOnly onClick={onClose} aria-label="Cerrar panel">
            <IconClose size={18} />
          </Button>
        </header>

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </aside>
    </div>
  );
}
