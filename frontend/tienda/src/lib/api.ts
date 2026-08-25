/**
 * Cliente HTTP tipado.
 *
 * Una sola función hace el trabajo: adjunta el token, desempaqueta el sobre
 * { success, data } y convierte los errores del backend en ApiRequestError,
 * de modo que las pantallas nunca tocan `response.ok` ni `res.data.data`.
 */

import type {
  Address,
  ApiEnvelope,
  ApiError,
  AuthPayload,
  Benefit,
  Cart,
  Category,
  Collection,
  CustomerProfile,
  FaqCategory,
  HeroSlide,
  Order,
  Paginated,
  Product,
  ProductQuery,
  ReviewSummary,
  Testimonial,
  WishlistEntry,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8010/api/v1';
const TOKEN_KEY = 'alpacart.token';

export class ApiRequestError extends Error {
  status: number;
  details?: ApiError['details'];

  constructor(message: string, status: number, details?: ApiError['details']) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.details = details;
  }
}

export const tokenStore = {
  get: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* modo privado sin storage: la sesión dura lo que la pestaña */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* nada que limpiar */
    }
  },
};

/** Se dispara en un 401 para que AuthProvider cierre la sesión. */
export const UNAUTHORIZED_EVENT = 'alpacart:unauthorized';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
  signal?: AbortSignal;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, auth = true, signal } = options;

  const finalHeaders: Record<string, string> = { ...headers };
  if (body !== undefined) finalHeaders['Content-Type'] = 'application/json';

  if (auth) {
    const token = tokenStore.get();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;
    throw new ApiRequestError('No pudimos conectar con el servidor', 0);
  }

  if (response.status === 204) return undefined as T;

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = (payload as { error?: ApiError } | null)?.error;
    if (response.status === 401 && auth) {
      tokenStore.clear();
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
    throw new ApiRequestError(
      error?.message ?? messageForStatus(response.status),
      response.status,
      error?.details,
    );
  }

  return payload as T;
}

function messageForStatus(status: number): string {
  const map: Record<number, string> = {
    400: 'La solicitud no es válida',
    401: 'Tu sesión expiró',
    403: 'No tenés permiso para esto',
    404: 'No encontramos lo que buscabas',
    409: 'Hubo un conflicto con el estado actual',
    422: 'Revisá los datos ingresados',
    500: 'Error del servidor',
  };
  return map[status] ?? 'Algo salió mal';
}

/** Desempaqueta { success, data } y devuelve solo data. */
async function unwrap<T>(path: string, options?: RequestOptions): Promise<T> {
  const envelope = await request<ApiEnvelope<T>>(path, options);
  return envelope.data;
}

function query(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });
  const str = search.toString();
  return str ? `?${str}` : '';
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export const authApi = {
  login: (email: string, password: string) =>
    unwrap<AuthPayload>('/auth/customer-login', {
      method: 'POST',
      body: { email, password },
      auth: false,
    }),

  register: (input: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }) => unwrap<AuthPayload>('/auth/register', { method: 'POST', body: input, auth: false }),

  me: () => unwrap<CustomerProfile>('/auth/me'),

  updateProfile: (input: Partial<{ first_name: string; last_name: string; phone: string }>) =>
    unwrap<CustomerProfile>('/customers/me', { method: 'PUT', body: input }),
};

// ---------------------------------------------------------------------------
// Catálogo
// ---------------------------------------------------------------------------
export const catalogApi = {
  products: (params: ProductQuery = {}, signal?: AbortSignal) =>
    request<Paginated<Product>>(`/products${query(params as Record<string, unknown>)}`, {
      auth: false,
      signal,
    }),

  product: (id: string, signal?: AbortSignal) =>
    unwrap<Product>(`/products/${id}`, { auth: false, signal }),

  categories: (signal?: AbortSignal) =>
    unwrap<Category[]>('/categories', { auth: false, signal }),

  collections: (signal?: AbortSignal) =>
    unwrap<Collection[]>('/collections', { auth: false, signal }),

  reviews: (productId: string, signal?: AbortSignal) =>
    unwrap<ReviewSummary>(`/products/${productId}/reviews`, { auth: false, signal }),
};

// ---------------------------------------------------------------------------
// Carrito y favoritos
// ---------------------------------------------------------------------------
export const cartApi = {
  get: () => unwrap<Cart>('/cart'),

  addItem: (productId: string, quantity = 1, variantId?: string) =>
    unwrap<Cart>('/cart/items', {
      method: 'POST',
      body: { product_id: productId, quantity, variant_id: variantId },
    }),

  updateItem: (itemId: number, quantity: number) =>
    unwrap<Cart>(`/cart/items/${itemId}`, { method: 'PATCH', body: { quantity } }),

  removeItem: (itemId: number) => unwrap<Cart>(`/cart/items/${itemId}`, { method: 'DELETE' }),

  clear: () => unwrap<Cart>('/cart', { method: 'DELETE' }),

  applyCoupon: (code: string) =>
    unwrap<Cart>(`/cart/coupon${query({ code })}`, { method: 'POST' }),
};

export const wishlistApi = {
  list: () => unwrap<WishlistEntry[]>('/wishlist'),

  toggle: (productId: string) =>
    unwrap<{ added: boolean; productId: string }>('/wishlist/items', {
      method: 'POST',
      body: { product_id: productId },
    }),
};

// ---------------------------------------------------------------------------
// Checkout y pedidos
// ---------------------------------------------------------------------------
export const checkoutApi = {
  submit: (input: { payment_method?: string; notes?: string; address_id?: number }) =>
    unwrap<{
      id: string;
      orderNumber: string;
      status: string;
      subtotal: number;
      discount: number;
      tax: number;
      shippingFee: number;
      total: number;
      placedAt: string;
    }>('/checkout', {
      method: 'POST',
      body: input,
      // Una clave por intento evita que un doble clic genere dos pedidos.
      headers: { 'Idempotency-Key': crypto.randomUUID() },
    }),
};

export const ordersApi = {
  list: (params: { page?: number; limit?: number; status?: string } = {}) =>
    request<Paginated<Order>>(`/orders${query(params)}`),

  detail: (id: string) => unwrap<Order>(`/orders/${id}`),

  byNumber: (orderNumber: string) => unwrap<Order>(`/orders/number/${orderNumber}`),

  cancel: (id: string) => unwrap<Order>(`/orders/${id}/cancel`, { method: 'POST' }),
};

export const addressApi = {
  list: () => unwrap<Address[]>('/customers/addresses'),

  create: (input: Omit<Address, 'id'>) =>
    unwrap<Address>('/customers/addresses', { method: 'POST', body: input }),

  remove: (id: number) =>
    unwrap<{ deleted: boolean }>(`/customers/addresses/${id}`, { method: 'DELETE' }),
};

// ---------------------------------------------------------------------------
// Contenido
// ---------------------------------------------------------------------------
export const cmsApi = {
  hero: (signal?: AbortSignal) => unwrap<HeroSlide[]>('/cms/hero', { auth: false, signal }),

  benefits: (signal?: AbortSignal) => unwrap<Benefit[]>('/cms/benefits', { auth: false, signal }),

  testimonials: (signal?: AbortSignal) =>
    unwrap<Testimonial[]>('/cms/testimonials', { auth: false, signal }),

  faq: (signal?: AbortSignal) => unwrap<FaqCategory[]>('/faq', { auth: false, signal }),

  content: (slug: string, signal?: AbortSignal) =>
    unwrap<{ title: string; body: string | null; image: string | null }>(`/contents/${slug}`, {
      auth: false,
      signal,
    }),

  contact: (input: { name: string; email: string; subject: string; message: string }) =>
    unwrap<{ id: number }>('/contact', { method: 'POST', body: input, auth: false }),

  subscribe: (email: string) =>
    unwrap<{ subscribed: boolean; alreadyRegistered: boolean }>('/newsletter/subscribe', {
      method: 'POST',
      body: { email, source: 'footer' },
      auth: false,
    }),
};
