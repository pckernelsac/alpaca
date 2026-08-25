export function required(value, field) {
  if (value === null || value === undefined || value === '') {
    throw new Error(`${field} es requerido`);
  }
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isUUID(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function minLength(value, min) {
  return typeof value === 'string' && value.trim().length >= min;
}
