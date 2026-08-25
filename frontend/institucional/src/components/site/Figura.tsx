/**
 * Imagen con respaldo de marca.
 *
 * Buena parte de las fotos del sitio son remotas (Unsplash) y las carga el CMS:
 * una URL que caduca no debe dejar el ícono roto del navegador en medio de una
 * portada. Cuando falta la foto —o falla— se dibuja un monograma sobre una
 * trama que evoca el tejido. El monograma va en `currentColor`, así hereda el
 * color del contexto y nunca queda invisible.
 */

import { useId, useState } from 'react';

import styles from './Figura.module.css';

interface Props {
  src: string | null | undefined;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

function iniciales(texto: string): string {
  return texto
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .join('');
}

function Respaldo({ alt, className }: { alt: string; className?: string }) {
  const degradado = useId();

  return (
    <svg
      className={[styles.respaldo, className].filter(Boolean).join(' ')}
      viewBox="0 0 300 400"
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={degradado} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <rect width="300" height="400" className={styles.fondo} />
      <rect width="300" height="400" fill={`url(#${degradado})`} />

      <g stroke="currentColor" strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 16 }).map((_, indice) => (
          <line key={indice} x1="0" y1={indice * 30} x2="300" y2={indice * 30 - 70} />
        ))}
      </g>

      <text
        x="150"
        y="200"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="66"
        fill="currentColor"
        fillOpacity="0.6"
      >
        {iniciales(alt)}
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

export function Figura({ src, alt, className, loading = 'lazy' }: Props) {
  const [fallo, setFallo] = useState(false);

  if (!src || fallo) return <Respaldo alt={alt} className={className} />;

  return (
    <img src={src} alt={alt} className={className} loading={loading} onError={() => setFallo(true)} />
  );
}
