export function createCustomer(raw) {
  if (!raw) return null;
  return {
    id: raw.id, firstName: raw.firstName || raw.name?.split(' ')[0] || '',
    lastName: raw.lastName || raw.name?.split(' ').slice(1).join(' ') || '',
    email: raw.email, phone: raw.phone || '',
    language: raw.language || 'es', currency: raw.currency || 'PEN',
  };
}
