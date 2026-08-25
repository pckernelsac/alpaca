/**
 * Cliente HTTP tipado.
 *
 * Versión de sólo lectura del cliente de la tienda: la web institucional no
 * tiene sesión, así que no hay token, ni cabecera Authorization, ni manejo de
 * 401. Lo que sí conserva es desempaquetar el sobre { success, data } y
 * convertir los errores del backend en ApiRequestError, para que las pantallas
 * nunca toquen `response.ok` ni `res.data.data`.
 */

import type {
  ArtisanProcess,
  ApiEnvelope,
  ApiError,
  Benefit,
  Category,
  Collection,
  Content,
  ContentSummary,
  FaqCategory,
  GalleryImage,
  HeroSlide,
  Paginated,
  Product,
  Testimonial,
  TextileMaterial,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8010/api/v1';

/** La tienda es otra app en otro puerto: los enlaces de compra salen de acá. */
export const TIENDA_URL = import.meta.env.VITE_TIENDA_URL ?? 'http://localhost:3200';

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

interface RequestOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  signal?: AbortSignal;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
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
    404: 'No encontramos lo que buscabas',
    422: 'Revisá los datos ingresados',
    429: 'Demasiados intentos seguidos, probá en un minuto',
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
// Contenido editable desde el panel
// ---------------------------------------------------------------------------
export const cmsApi = {
  hero: (signal?: AbortSignal) => unwrap<HeroSlide[]>('/cms/hero', { signal }),

  benefits: (signal?: AbortSignal) => unwrap<Benefit[]>('/cms/benefits', { signal }),

  testimonials: (signal?: AbortSignal) => unwrap<Testimonial[]>('/cms/testimonials', { signal }),

  gallery: (category?: string, signal?: AbortSignal) =>
    unwrap<GalleryImage[]>(`/cms/gallery${query({ category })}`, { signal }),

  processes: (signal?: AbortSignal) => unwrap<ArtisanProcess[]>('/cms/processes', { signal }),

  faq: (signal?: AbortSignal) => unwrap<FaqCategory[]>('/faq', { signal }),

  contents: (type?: string, signal?: AbortSignal) =>
    unwrap<ContentSummary[]>(`/contents${query({ type })}`, { signal }),

  content: (slug: string, signal?: AbortSignal) => unwrap<Content>(`/contents/${slug}`, { signal }),
};

// ---------------------------------------------------------------------------
// Catálogo — sólo lectura, para exhibir piezas y mandar a la tienda
// ---------------------------------------------------------------------------
export const catalogApi = {
  products: (
    params: { limit?: number; collection_id?: string; category_id?: number; sort?: string } = {},
    signal?: AbortSignal,
  ) => request<Paginated<Product>>(`/products${query(params)}`, { signal }),

  categories: (signal?: AbortSignal) => unwrap<Category[]>('/categories', { signal }),

  collections: (signal?: AbortSignal) => unwrap<Collection[]>('/collections', { signal }),

  materials: (signal?: AbortSignal) => unwrap<TextileMaterial[]>('/textile/materials', { signal }),
};

// ---------------------------------------------------------------------------
// Formularios
// ---------------------------------------------------------------------------
export const contactApi = {
  send: (input: { name: string; email: string; subject: string; message: string }) =>
    unwrap<{ id: number; status: string; message: string }>('/contact', {
      method: 'POST',
      body: input,
    }),

  subscribe: (email: string, source = 'institucional') =>
    unwrap<{ subscribed: boolean; alreadyRegistered: boolean }>('/newsletter/subscribe', {
      method: 'POST',
      body: { email, source },
    }),
};
