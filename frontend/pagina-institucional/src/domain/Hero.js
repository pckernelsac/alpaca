export function createHeroSlide(data) {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle || '',
    image: data.image || '',
    cta: data.cta || null,
    order: data.order || 0,
    active: data.active !== false,
  };
}
