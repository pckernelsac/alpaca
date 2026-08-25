export function createGalleryImage(data) {
  return {
    id: data.id,
    url: data.url,
    altText: data.altText || '',
    caption: data.caption || '',
    category: data.category || '',
    order: data.order || 0,
    visible: data.visible !== false,
  };
}
