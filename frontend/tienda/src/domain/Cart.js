export function createCart(raw) {
  if (!raw) return { id: null, items: [], subtotal: 0, total: 0, couponId: null };
  return {
    id: raw.id, items: (raw.items || []).map(createCartItem),
    subtotal: raw.subtotal || 0, total: raw.total || 0, couponId: raw.couponId || null,
  };
}

export function createCartItem(raw) {
  return {
    id: raw.id, cartId: raw.cartId, productId: raw.productId,
    variantId: raw.variantId, name: raw.name, sku: raw.sku,
    variantLabel: raw.variantLabel || '', imageUrl: raw.imageUrl || '',
    unitPrice: raw.unitPrice || 0, quantity: raw.quantity || 0, total: raw.total || 0,
  };
}
