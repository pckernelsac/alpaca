export function mapBenefit(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description || '',
    icon: raw.icon || '',
    image: raw.image || '',
    order: raw.order || 0,
    active: raw.active !== false,
  };
}

export function mapBenefits(rawList) {
  return (rawList || []).map(mapBenefit).filter((b) => b.active);
}
