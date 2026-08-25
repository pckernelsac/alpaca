/** Formateadores compartidos. Se crean una sola vez: instanciar un
 *  Intl.NumberFormat por celda es caro en tablas de cientos de filas. */

const currency = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  minimumFractionDigits: 2,
});

const compact = new Intl.NumberFormat('es-PE', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const integer = new Intl.NumberFormat('es-PE');

const dateShort = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateTime = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatPrice(value: number | null | undefined): string {
  return currency.format(Number.isFinite(value as number) ? (value as number) : 0);
}

export function formatCompact(value: number | null | undefined): string {
  return compact.format(Number.isFinite(value as number) ? (value as number) : 0);
}

export function formatNumber(value: number | null | undefined): string {
  return integer.format(Number.isFinite(value as number) ? (value as number) : 0);
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : dateShort.format(date);
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : dateTime.format(date);
}

const MONTHS = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

/** "2026-03" → "mar 26". El backend agrupa con to_char, no con fechas. */
export function formatMonthKey(key: string): string {
  const [year, month] = key.split('-');
  const index = Number(month) - 1;
  if (!MONTHS[index]) return key;
  return `${MONTHS[index]} ${year.slice(2)}`;
}

/** Fechas que son un día, no un instante: una promoción "del 1 de agosto"
 *  no debe verse como 31 de julio porque el navegador esté en UTC-5. Se toma
 *  la parte YYYY-MM-DD del ISO y se arma la fecha en horario local. */
export function formatDayOnly(value: string | null | undefined): string {
  if (!value) return '—';
  const [y, m, d] = value.slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return formatDate(value);
  return dateShort.format(new Date(y, m - 1, d));
}

/** "hace 3 días" — para la bitácora, donde el momento relativo dice más. */
export function formatRelative(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'recién';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `hace ${days} d`;
  return formatDate(value);
}
