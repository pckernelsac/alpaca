export function createProduct(raw) {
  return {
    id: raw.id, sku: raw.sku, name: raw.name, description: raw.description || '',
    price: raw.price || 0, status: raw.status || 'active',
    image: raw.image || (raw.images && raw.images[0]) || '',
    categoryId: raw.categoryId, collectionId: raw.collectionId,
    material: raw.material || '',
    category: raw.category || null, collection: raw.collection || null,
    variants: raw.variants || [],
    images: raw.images || (raw.image ? [raw.image] : []),
    createdAt: raw.createdAt, updatedAt: raw.updatedAt,
  };
}

export function createProductList(rawList) {
  return (rawList || []).map(createProduct);
}
