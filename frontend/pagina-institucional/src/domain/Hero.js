export function createHeroSlide(data) {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle || '',
    image: data.image || '',
    primaryCta: data.primaryCta || { label: 'Explorar', to: '/catalogo' },
    secondaryCta: data.secondaryCta || null,
    order: data.order || 0,
    active: data.active !== false,
  };
}
