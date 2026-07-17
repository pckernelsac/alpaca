export function createBenefit(data) {
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    icon: data.icon || '',
    image: data.image || '',
    order: data.order || 0,
    active: data.active !== false,
  };
}
