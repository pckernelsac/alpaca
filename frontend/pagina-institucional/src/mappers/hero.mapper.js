import { createHeroSlide } from '@/domain';

export function mapHeroSlide(raw) {
  if (!raw) return null;
  const cta = raw.ctaText ? { label: raw.ctaText, to: raw.ctaLink || '/' } : null;
  return createHeroSlide({
    id: raw.id,
    title: raw.title,
    subtitle: raw.subtitle,
    image: raw.image,
    primaryCta: cta || { label: 'Explorar', to: '/catalogo' },
    secondaryCta: null,
    order: raw.order,
    active: raw.active,
  });
}

export function mapHeroSlides(rawList) {
  return (rawList || []).map(mapHeroSlide).filter((s) => s.active);
}
