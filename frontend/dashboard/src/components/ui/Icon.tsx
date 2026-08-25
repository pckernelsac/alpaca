/**
 * Iconos SVG inline con trazo consistente (1.5, redondeado).
 * Mismo criterio que en la tienda: se dibujan a mano porque son pocos, pesan
 * nada y heredan color y grosor del contexto.
 */

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

function base(size: number, strokeWidth: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
    focusable: false,
  };
}

/* --- Navegación ----------------------------------------------------------- */
export function IconGrid({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconTag({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
      <circle cx="8" cy="8" r="1.3" />
    </svg>
  );
}

export function IconBag({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export function IconBoxes({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
    </svg>
  );
}

export function IconUsers({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3.2 3.2 0 0 1 0 6M17.5 20a6 6 0 0 0-2-4.5" />
    </svg>
  );
}

export function IconShield({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M12 3 5 6v6c0 4.4 3 7.8 7 9 4-1.2 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconMegaphone({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 10v4a1 1 0 0 0 1 1h3l8 4V5L8 9H5a1 1 0 0 0-1 1Z" />
      <path d="M8 15v4M19 10.5a3 3 0 0 1 0 3" />
    </svg>
  );
}

export function IconList({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M8 6h12M8 12h12M8 18h12" />
      <circle cx="4.2" cy="6" r="1" />
      <circle cx="4.2" cy="12" r="1" />
      <circle cx="4.2" cy="18" r="1" />
    </svg>
  );
}

export function IconSettings({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </svg>
  );
}

export function IconTruck({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

/* --- Acciones ------------------------------------------------------------- */
export function IconSearch({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function IconPlus({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMinus({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconPencil({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="m14 6 4 4" />
    </svg>
  );
}

export function IconTrash({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function IconRefresh({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M20 11a8 8 0 0 0-14-4.5L4 9" />
      <path d="M4 13a8 8 0 0 0 14 4.5L20 15" />
      <path d="M4 5v4h4M20 19v-4h-4" />
    </svg>
  );
}

export function IconCheck({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function IconClose({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconAlert({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </svg>
  );
}

export function IconLogout({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M14 5h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4" />
      <path d="M10 8 6 12l4 4M6 12h9" />
    </svg>
  );
}

export function IconMenu({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconChevronLeft({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="m14 6-6 6 6 6" />
    </svg>
  );
}

export function IconChevronRight({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="m10 6 6 6-6 6" />
    </svg>
  );
}

export function IconChevronDown({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="m6 10 6 6 6-6" />
    </svg>
  );
}

export function IconArrowUp({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M12 19V5M7 10l5-5 5 5" />
    </svg>
  );
}

export function IconArrowDown({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M12 5v14M7 14l5 5 5-5" />
    </svg>
  );
}

export function IconSun({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </svg>
  );
}

export function IconMoon({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function IconCoin({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.2A3 3 0 0 0 12 8c-1.4 0-2.5.8-2.5 1.9 0 2.6 5 1.3 5 3.9 0 1.1-1.1 2-2.5 2a3 3 0 0 1-2.5-1.2M12 6.5v11" />
    </svg>
  );
}

export function IconLayout({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M9 9.5v10" />
    </svg>
  );
}

export function IconMail({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
