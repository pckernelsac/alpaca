/**
 * Gráficos dibujados a mano en SVG.
 *
 * Sin librería: son dos formas, ambas de una sola serie, y una dependencia de
 * 60 kB para eso no se justifica. Al ser serie única el color no codifica
 * identidad — un solo tono (--chart-1) alcanza y no hace falta leyenda.
 * La cuadrícula queda recesiva y solo se etiqueta el valor máximo; el resto
 * se lee al pasar el mouse.
 */

import { useState } from 'react';

import { formatCompact, formatMonthKey, formatNumber, formatPrice } from '../../lib/format';
import type { MonthlySales, TopProduct } from '../../lib/types';
import styles from './Charts.module.css';

/** Rectángulo con las esquinas superiores redondeadas, apoyado en la línea
 *  base. Un `rx` redondearía también abajo y la barra se vería flotando. */
function barPath(x: number, y: number, width: number, height: number, radius = 4): string {
  const r = Math.min(radius, width / 2, Math.max(height, 0));
  if (height <= 0) return '';
  return [
    `M${x},${y + height}`,
    `V${y + r}`,
    `q0,${-r} ${r},${-r}`,
    `h${width - r * 2}`,
    `q${r},0 ${r},${r}`,
    `V${y + height}`,
    'Z',
  ].join(' ');
}

/* -------------------------------------------------------------------------- */
/* Ventas por mes                                                             */
/* -------------------------------------------------------------------------- */
const WIDTH = 560;
const HEIGHT = 220;
const PAD = { top: 16, right: 8, bottom: 28, left: 44 };

export function MonthlySalesChart({ data }: { data: MonthlySales[] }) {
  const [hover, setHover] = useState<number | null>(null);

  if (data.length === 0) {
    return <p className={styles.empty}>Todavía no hay ventas registradas.</p>;
  }

  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;
  const max = Math.max(...data.map((row) => row.total), 1);
  const step = plotWidth / data.length;
  // 2px de aire entre barras: el hueco lo dibuja la superficie, no un borde.
  const barWidth = Math.min(38, Math.max(step - 12, 6));
  const ticks = [0, max / 2, max];
  const peak = data.reduce((best, row) => (row.total > best.total ? row : best), data[0]);

  return (
    <div className={styles.chart}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className={styles.svg}
        role="img"
        aria-label="Ventas por mes"
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((tick) => {
          const y = PAD.top + plotHeight - (tick / max) * plotHeight;
          return (
            <g key={tick}>
              <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y} y2={y} className={styles.grid} />
              <text x={PAD.left - 8} y={y + 4} textAnchor="end" className={styles.axisLabel}>
                {formatCompact(tick)}
              </text>
            </g>
          );
        })}

        {data.map((row, index) => {
          const height = (row.total / max) * plotHeight;
          const x = PAD.left + index * step + (step - barWidth) / 2;
          const y = PAD.top + plotHeight - height;
          const active = hover === index;

          return (
            <g key={row.month} onMouseEnter={() => setHover(index)}>
              {/* Zona sensible del ancho completo: apuntar a una barra baja
                  con el mouse sería imposible si solo respondiera el relleno. */}
              <rect
                x={PAD.left + index * step}
                y={PAD.top}
                width={step}
                height={plotHeight}
                fill="transparent"
              />
              <path
                d={barPath(x, y, barWidth, height)}
                className={active ? styles.barActive : styles.bar}
              />
              <text
                x={PAD.left + index * step + step / 2}
                y={HEIGHT - 8}
                textAnchor="middle"
                className={styles.axisLabel}
              >
                {formatMonthKey(row.month)}
              </text>
              {row.month === peak.month && !active && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" className={styles.value}>
                  {formatCompact(row.total)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hover !== null && (
        <div
          className={styles.tooltip}
          style={{ left: `${((hover + 0.5) / data.length) * 100}%` }}
          role="status"
        >
          <p className={styles.tooltipTitle}>{formatMonthKey(data[hover].month)}</p>
          <p className={styles.tooltipValue}>{formatPrice(data[hover].total)}</p>
          <p className={styles.tooltipHint}>
            {formatNumber(data[hover].orders)} {data[hover].orders === 1 ? 'pedido' : 'pedidos'}
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Productos más vendidos                                                     */
/* -------------------------------------------------------------------------- */
export function RankedProducts({ data }: { data: TopProduct[] }) {
  if (data.length === 0) {
    return <p className={styles.empty}>Todavía no hay unidades vendidas.</p>;
  }

  const max = Math.max(...data.map((row) => row.units), 1);

  return (
    <ul className={styles.ranked}>
      {data.map((row) => (
        <li key={`${row.productId ?? row.name}`} className={styles.rankedRow}>
          <span className={styles.rankedName} title={row.name}>
            {row.name}
          </span>
          <span className={styles.rankedTrack}>
            <span className={styles.rankedBar} style={{ width: `${(row.units / max) * 100}%` }} />
          </span>
          <span className={styles.rankedValue}>
            {formatNumber(row.units)} u · {formatPrice(row.revenue)}
          </span>
        </li>
      ))}
    </ul>
  );
}
