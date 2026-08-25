import type { OrderStatus } from '../lib/types';

type Tone = 'neutral' | 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'solid';

/** Etiqueta y color por estado. Una sola fuente para toda la tienda. */
export const ORDER_STATUS: Record<OrderStatus, { label: string; tone: Tone }> = {
  pending: { label: 'Pendiente', tone: 'warning' },
  confirmed: { label: 'Confirmado', tone: 'info' },
  processing: { label: 'En preparación', tone: 'info' },
  shipped: { label: 'Enviado', tone: 'gold' },
  delivered: { label: 'Entregado', tone: 'success' },
  cancelled: { label: 'Cancelado', tone: 'danger' },
  refunded: { label: 'Reembolsado', tone: 'neutral' },
};
