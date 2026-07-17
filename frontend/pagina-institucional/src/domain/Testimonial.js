export function createTestimonial(data) {
  return {
    id: data.id,
    author: data.author,
    role: data.role || '',
    company: data.company || '',
    avatar: data.avatar || '',
    text: data.text,
    rating: data.rating || 0,
    featured: data.featured !== false,
    order: data.order || 0,
    active: data.active !== false,
  };
}
