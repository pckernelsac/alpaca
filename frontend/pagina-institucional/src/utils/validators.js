export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export function isRequired(value) {
  return value !== null && value !== undefined && value !== '';
}
export function isMinLength(value, min) {
  return String(value).length >= min;
}
export function isMaxLength(value, max) {
  return String(value).length <= max;
}
