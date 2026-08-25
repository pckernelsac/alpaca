export function createOrder(raw) {
  if (!raw) return null;
  return {
    id: raw.id, orderNumber: raw.orderNumber, customerId: raw.customerId,
    status: raw.status || 'pending', subtotal: raw.subtotal || 0, total: raw.total || 0,
    paid: raw.paid || false, paidAt: raw.paidAt || null,
    items: (raw.items || []).map(createOrderItem),
    events: (raw.events || []).map(createOrderEvent),
    createdAt: raw.createdAt, updatedAt: raw.updatedAt,
  };
}

export function createOrderItem(raw) {
  return {
    id: raw.id, productId: raw.productId, productName: raw.productName, sku: raw.sku,
    unitPrice: raw.unitPrice || 0, quantity: raw.quantity || 0, total: raw.total || 0,
    imageUrl: raw.imageUrl || '', variantLabel: raw.variantLabel || '',
  };
}

export function createOrderEvent(raw) {
  return {
    id: raw.id, type: raw.type, title: raw.title || '', description: raw.description || '',
    actorId: raw.actorId, createdAt: raw.createdAt,
  };
}

export function createOrderList(rawList) {
  return (rawList || []).map(createOrder);
}
