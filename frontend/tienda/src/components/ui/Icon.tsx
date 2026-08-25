/**
 * Iconos SVG inline con trazo consistente (1.5, redondeado).
 * Se dibujan a mano en vez de traer una librería: son pocos, pesan nada y
 * heredan color y grosor del contexto.
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

export function IconSearch({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
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

export function IconHeart({ size = 20, strokeWidth = 1.5, className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(size, strokeWidth, className)} fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 20s-7-4.5-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5C19 15.5 12 20 12 20Z" />
    </svg>
  );
}

export function IconUser({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
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

export function IconClose({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M6 6l12 12M18 6L6 18" />
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

export function IconArrowRight({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 12h15M14 7l5 5-5 5" />
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

export function IconMinus({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M5 12h14" />
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

export function IconTrash({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
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

export function IconStar({ size = 16, className, filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="m12 3.5 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.5Z" />
    </svg>
  );
}

export function IconTruck({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

export function IconSwap({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  );
}

export function IconHand({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11M12 11V4.5a1.5 1.5 0 0 1 3 0V11M15 11V6.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-3a1.5 1.5 0 0 1 3 0" />
    </svg>
  );
}

export function IconLeaf({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 20c0-8 5-13 16-14 0 11-5 15-11 15a5 5 0 0 1-5-1Z" />
      <path d="M9 15c2-3 4-4.5 7-5.5" />
    </svg>
  );
}

export function IconHeartHands({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M12 10s-2.5-2-4 0 4 5 4 5 5.5-3 4-5-4 0-4 0Z" />
      <path d="M4 21v-5a3 3 0 0 1 3-3M20 21v-5a3 3 0 0 0-3-3" />
    </svg>
  );
}

export function IconPackage({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
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

export function IconFilter({ size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg {...base(size, strokeWidth, className)}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}
