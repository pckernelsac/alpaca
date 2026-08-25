export function formatCurrency(amount: number, currency = 'USD'): string { return new Intl.NumberFormat('es-PE', { style: 'currency', currency }).format(amount); }
export function formatDate(date: string | Date): string { return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date)); }
export function formatPercentage(value: number): string { return new Intl.NumberFormat('es-PE', { style: 'percent', minimumFractionDigits: 1 }).format(value / 100); }
export function slugify(text: string): string { return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
export function truncate(text: string, length = 100): string { return text.length > length ? text.substring(0, length) + '...' : text; }
export function generateUUID(): string { return crypto.randomUUID(); }
export function classNames(...args: (string | false | null | undefined)[]): string { return args.filter(Boolean).join(' '); }
export function debounce<T extends (...args: any[]) => any>(fn: T, ms = 300): (...args: Parameters<T>) => void { let timer: any; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); }; }
