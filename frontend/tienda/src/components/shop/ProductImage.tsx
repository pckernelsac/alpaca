/**
 * Imagen de producto con respaldo de marca.
 *
 * Cuando una pieza no tiene fotografía, en vez de un recuadro gris se dibuja
 * un SVG con la inicial y una trama que evoca el tejido. El monograma usa
 * siempre el color de marca (`currentColor`), nunca el de la variante: un
 * tono claro como el Marfil Andino lo dejaría ilegible sobre el fondo crema.
 * El color de la variante solo tiñe el lavado de fondo.
 */

import { useId, useState } from 'react';

import { mediaUrl } from '../../lib/api';
import styles from './ProductImage.module.css';

interface Props {
  src: string | null;
  alt: string;
  /** Color de la variante principal; solo tiñe el degradado de fondo. */
  tint?: string | null;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

function initials(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

function Placeholder({ alt, tint, className }: Pick<Props, 'alt' | 'tint' | 'className'>) {
  const gradientId = useId();
  const wash = tint ?? '#C19A6B';

  return (
    <svg
      className={[styles.placeholder, className].filter(Boolean).join(' ')}
      viewBox="0 0 300 400"
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={wash} stopOpacity="0.18" />
          <stop offset="60%" stopColor={wash} stopOpacity="0.06" />
          <stop offset="100%" stopColor={wash} stopOpacity="0.22" />
        </linearGradient>
      </defs>

      <rect width="300" height="400" className={styles.ground} />
      <rect width="300" height="400" fill={`url(#${gradientId})`} />

      {/* Trama diagonal: sugiere el punto del tejido sin competir con el texto. */}
      <g stroke="currentColor" strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 16 }).map((_, index) => (
          <line key={index} x1="0" y1={index * 30} x2="300" y2={index * 30 - 70} />
        ))}
      </g>

      <text
        x="150"
        y="200"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="66"
        fill="currentColor"
        fillOpacity="0.62"
      >
        {initials(alt)}
      </text>
      <text
        x="150"
        y="236"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="9"
        letterSpacing="5"
        fill="currentColor"
        fillOpacity="0.45"
      >
        ALPACART
      </text>
    </svg>
  );
}

export function ProductImage({
  src,
  alt,
  tint,
  className,
  loading = 'lazy',
  width,
  height,
}: Props) {
  const [failed, setFailed] = useState(false);
  // Las fotos que sube el panel se guardan como ruta relativa a la API.
  const resuelta = mediaUrl(src);

  if (!resuelta || failed) {
    return <Placeholder alt={alt} tint={tint} className={className} />;
  }

  return (
    <img
      src={resuelta}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}
