export function createFaqCategory(data) {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    icon: data.icon || '',
    order: data.order || 0,
    items: (data.items || []).map(createFaqItem),
  };
}

export function createFaqItem(data) {
  return {
    id: data.id,
    question: data.question,
    answer: data.answer,
    order: data.order || 0,
  };
}
