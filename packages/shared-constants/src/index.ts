export const API_PREFIX = '/api/v1';
export const ROUTES = {
  DASHBOARD: { LOGIN: '/login', HOME: '/', CATALOG: '/catalog', ORDERS: '/orders', CRM: '/crm', PAYMENTS: '/payments', INVENTORY: '/inventory', LOGISTICS: '/logistics', MARKETING: '/marketing', CMS: '/cms', TEXTILE: '/textile', USERS: '/usuarios', ANALYTICS: '/analytics', AUDIT: '/audit', SETTINGS: '/settings' },
  TIENDA: { HOME: '/', CART: '/cart', CHECKOUT: '/checkout', PRODUCT: '/product/:id', CATEGORY: '/category/:slug', SEARCH: '/search', ACCOUNT: '/account', WISHLIST: '/wishlist' },
  INSTITUCIONAL: { HOME: '/', ABOUT: '/about', CATALOG: '/catalogo', CONTACT: '/contacto', FAQ: '/preguntas', TERMS: '/terminos' },
};
export const STORAGE_KEYS = { TOKEN: 'auth_token', USER: 'auth_user', THEME: 'app_theme', CART: 'tienda_cart', WISHLIST: 'tienda_wishlist' };
export const THEME = { LIGHT: 'light', DARK: 'dark' };
export const BREAKPOINTS = { MOBILE: 768, TABLET: 1024, DESKTOP: 1366, WIDE: 1920 };
export const ROLES = { SUPER_ADMIN: 'super_admin', PRODUCTION: 'production_manager', INVENTORY: 'inventory_op', SALES: 'sales_agent', ANALYST: 'analyst', LOGISTICS: 'logistics', EDITOR: 'editor', CUSTOMER: 'customer' };
export const ORDER_STATUS = ['pending','confirmed','paid','preparing','shipped','in_transit','delivered','cancelled','returned'];
