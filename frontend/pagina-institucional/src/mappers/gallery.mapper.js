export function mapGalleryImage(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    url: raw.url,
    altText: raw.altText || '',
    caption: raw.caption || '',
    category: raw.category || '',
    order: raw.order || 0,
    visible: raw.visible !== false,
  };
}

export function mapGallery(rawList) {
  return (rawList || []).map(mapGalleryImage).filter((img) => img.visible);
}
