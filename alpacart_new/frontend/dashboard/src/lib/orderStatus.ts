import type { BadgeTone } from '../components/ui/Primitives';
import type { OrderStatus } from './types';

/** Etiqueta y color por estado. Mismos nombres que ve el cliente en la tienda:
 *  si el panel dice "En preparación", el cliente lee lo mismo. */
export const ORDER_STATUS: Record<OrderStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: 'Pendiente', tone: 'warning' },
  confirmed: { label: 'Confirmado', tone: 'info' },
  processing: { label: 'En preparación', tone: 'info' },
  shipped: { label: 'Enviado', tone: 'gold' },
  delivered: { label: 'Entregado', tone: 'success' },
  cancelled: { label: 'Cancelado', tone: 'danger' },
  refunded: { label: 'Reembolsado', tone: 'neutral' },
};

export const ORDER_STATUS_LIST = Object.keys(ORDER_STATUS) as OrderStatus[];

/** Estados a los que tiene sentido mover un pedido desde el actual.
 *  El backend acepta cualquiera; la interfaz no ofrece los sin sentido
 *  (reabrir un pedido entregado, por ejemplo). */
export function nextStatuses(current: OrderStatus): OrderStatus[] {
  const flow: Record<OrderStatus, OrderStatus[]> = {
    pending: ['confirmed', 'processing', 'cancelled'],
    confirmed: ['processing', 'shipped', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: ['refunded'],
    cancelled: [],
    refunded: [],
  };
  return flow[current];
}

/** Estados sueltos que devuelven otros módulos (usuarios, mayoristas,
 *  campañas, envíos, consultas). El backend los guarda en inglés o en
 *  español según la tabla; la interfaz muestra siempre español. */
const GENERIC_STATUS: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  suspended: 'Suspendido',
  blocked: 'Bloqueado',
  pending: 'Pendiente',
  paused: 'Pausada',
  scheduled: 'Programada',
  finished: 'Finalizada',
  completed: 'Completada',
  draft: 'Borrador',
  archived: 'Archivada',
  answered: 'Respondida',
  closed: 'Cerrada',
  in_transit: 'En tránsito',
  delivered: 'Entregado',
  returned: 'Devuelto',
};

export function statusLabel(value: string | null | undefined): string {
  if (!value) return '—';
  return GENERIC_STATUS[value.toLowerCase()] ?? value;
}

export const PRODUCT_STATUS: Record<string, { label: string; tone: BadgeTone }> = {
  active: { label: 'Activo', tone: 'success' },
  draft: { label: 'Borrador', tone: 'neutral' },
  inactive: { label: 'Inactivo', tone: 'neutral' },
  archived: { label: 'Archivado', tone: 'neutral' },
};
