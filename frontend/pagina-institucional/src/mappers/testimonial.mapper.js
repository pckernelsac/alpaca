export function mapTestimonial(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    author: raw.author,
    role: raw.role || '',
    company: raw.company || '',
    avatar: raw.avatar || '',
    text: raw.text,
    rating: raw.rating || 0,
    featured: raw.featured !== false,
    order: raw.order || 0,
    active: raw.active !== false,
  };
}

export function mapTestimonials(rawList) {
  return (rawList || []).map(mapTestimonial).filter((t) => t.active);
}
