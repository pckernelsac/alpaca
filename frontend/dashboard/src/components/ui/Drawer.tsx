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

  // `onClose` casi siempre llega como funcion nueva en cada render (los
  // llamadores la declaran en el cuerpo del componente). Si entrara como
  // dependencia del efecto de abajo, ese efecto se repetiria con CADA tecla
  // que se escribe en el panel, y con el el temporizador que mueve el foco:
  // al pausar entre palabras, el cursor saltaba al primer campo. Guardada en
  // una ref, el handler siempre ve la version actual sin reejecutar nada.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Depende solo de `open`: esto tiene que correr al abrir el panel, no cada
  // vez que el formulario de dentro se vuelve a pintar.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
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
  }, [open]);

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
