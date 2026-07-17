export function mapFaqCategory(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    icon: raw.icon || '',
    order: raw.order || 0,
    items: (raw.items || []).map(mapFaqItem),
  };
}

export function mapFaqItem(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    question: raw.question,
    answer: raw.answer,
    order: raw.order || 0,
  };
}

export function mapFaq(rawList) {
  return (rawList || []).map(mapFaqCategory);
}
