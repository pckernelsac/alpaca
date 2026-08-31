/**
 * Cliente HTTP del panel.
 *
 * Mismo mecanismo que el de la tienda: adjunta el token, desempaqueta el
 * sobre { success, data } y traduce los errores del backend a ApiRequestError.
 * La diferencia está en la sesión — acá el actor es `staff` — y en que casi
 * todos los listados son paginados, así que se devuelve la respuesta entera
 * (data + meta) en vez de solo data.
 */

import type {
  ApiEnvelope,
  ApiError,
  ArtisanProcess,
  AuditEntry,
  AuthPayload,
  Benefit,
  Campaign,
  Category,
  ClientRow,
  Collection,
  Company,
  CompanyInput,
  ContactMessage,
  Coupon,
  CustomerRow,
  Department,
  FiberMaterial,
  GalleryImage,
  HeroSlide,
  Kpis,
  MediaInput,
  MediaItem,
  MonthlySales,
  Order,
  OrderStatus,
  Paginated,
  Permission,
  Product,
  ProductInput,
  Promotion,
  Role,
  Shipment,
  StaffProfile,
  StaffUser,
  StockMovement,
  StockRow,
  Subscriber,
  Testimonial,
  TextileColor,
  TextileSize,
  TopProduct,
  UserInput,
  Variant,
  VariantInput,
  Warehouse,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8010/api/v1';
const TOKEN_KEY = 'alpacart.admin.token';

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

/** Clave propia: el panel y la tienda pueden convivir en el mismo navegador
 *  con sesiones distintas y no deben pisarse el token. */
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
      /* sin storage la sesión dura lo que la pestaña */
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

/** Origen de la API, para resolver las rutas de las imagenes subidas.
 *
 *  El backend guarda `/api/v1/files/<archivo>`, relativo a proposito: en
 *  produccion las tres apps y la API comparten dominio y la ruta ya apunta bien.
 *  En desarrollo, en cambio, el panel corre en :3300 y la API en :8010, asi que
 *  hay que anteponerle el origen o el navegador buscaria la foto en el panel. */
const API_ORIGIN = /^https?:\/\//.test(BASE_URL) ? new URL(BASE_URL).origin : '';

/** Deja lista una URL de imagen para un `<img src>`.
 *
 *  Las fotos viejas del catalogo son URLs absolutas (Unsplash) y las nuevas son
 *  rutas del backend: esto acepta las dos y no toca las primeras. */
export function mediaUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (/^(https?:)?\/\//.test(url) || url.startsWith('data:') || url.startsWith('blob:')) return url;
  return url.startsWith('/') ? `${API_ORIGIN}${url}` : url;
}

export interface UploadedFile {
  url: string;
  filename: string;
  size: number;
  content_type: string;
}

/** Sube una imagen y devuelve la ruta con la que guardarla.
 *
 *  No pasa por `request` porque el cuerpo es un FormData: el Content-Type lo
 *  tiene que poner el navegador, que es el unico que conoce el separador del
 *  multipart. Ponerlo a mano rompe la subida. */
export async function uploadImage(file: File, signal?: AbortSignal): Promise<UploadedFile> {
  const datos = new FormData();
  datos.append('file', file);

  const headers: Record<string, string> = {};
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/uploads`, {
      method: 'POST',
      headers,
      body: datos,
      signal,
    });
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;
    throw new ApiRequestError('No pudimos conectar con el servidor', 0);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = (payload as { error?: ApiError } | null)?.error;
    if (response.status === 401) {
      tokenStore.clear();
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
    throw new ApiRequestError(
      error?.message ?? messageForStatus(response.status),
      response.status,
      error?.details,
    );
  }

  return (payload as ApiEnvelope<UploadedFile>).data;
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

/** Acepta cualquier objeto de filtros: los tipos concretos (ListParams,
 *  ProductQuery…) no traen índice de string y no encajarían en un Record. */
function query(params: object): string {
  const search = new URLSearchParams();
  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });
  const str = search.toString();
  return str ? `?${str}` : '';
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
}

// ---------------------------------------------------------------------------
// Sesión
// ---------------------------------------------------------------------------
export const authApi = {
  login: (email: string, password: string) =>
    unwrap<AuthPayload>('/auth/login', {
      method: 'POST',
      body: { email, password },
      auth: false,
    }),

  me: () => unwrap<StaffProfile>('/auth/me'),
};

// ---------------------------------------------------------------------------
// Analítica
// ---------------------------------------------------------------------------
export const analyticsApi = {
  kpis: (signal?: AbortSignal) => unwrap<Kpis>('/analytics/kpis', { signal }),

  salesByMonth: (months = 6, signal?: AbortSignal) =>
    unwrap<MonthlySales[]>(`/analytics/sales-by-month${query({ months })}`, { signal }),

  topProducts: (limit = 8, signal?: AbortSignal) =>
    unwrap<TopProduct[]>(`/analytics/top-products${query({ limit })}`, { signal }),
};

// ---------------------------------------------------------------------------
// Catálogo
// ---------------------------------------------------------------------------
export interface ProductQuery extends ListParams {
  category_id?: number;
  collection_id?: string;
  status?: string;
  sort?: 'recent' | 'name' | 'price_asc' | 'price_desc';
}

export const catalogApi = {
  products: (params: ProductQuery = {}, signal?: AbortSignal) =>
    request<Paginated<Product>>(`/products${query(params as Record<string, unknown>)}`, { signal }),

  product: (id: string, signal?: AbortSignal) => unwrap<Product>(`/products/${id}`, { signal }),

  create: (input: ProductInput) => unwrap<Product>('/products', { method: 'POST', body: input }),

  update: (id: string, input: ProductInput) =>
    unwrap<Product>(`/products/${id}`, { method: 'PUT', body: input }),

  remove: (id: string) =>
    unwrap<{ deleted: boolean; id: string }>(`/products/${id}`, { method: 'DELETE' }),

  categories: (signal?: AbortSignal) => unwrap<Category[]>('/categories', { signal }),

  createCategory: (input: { name: string; slug: string; description?: string | null }) =>
    unwrap<Category>('/categories', { method: 'POST', body: input }),

  collections: (signal?: AbortSignal) => unwrap<Collection[]>('/collections', { signal }),

  // --- variantes ---
  createVariant: (input: VariantInput) =>
    unwrap<Variant>('/variants', { method: 'POST', body: input }),

  updateVariant: (id: string, input: VariantInput) =>
    unwrap<Variant>(`/variants/${id}`, { method: 'PUT', body: input }),

  removeVariant: (id: string) =>
    unwrap<{ deleted: boolean; deactivated: boolean; id: string; reason?: string }>(
      `/variants/${id}`,
      { method: 'DELETE' },
    ),

  // --- fotos ---
  addMedia: (productId: string, input: MediaInput) =>
    unwrap<MediaItem>(`/products/${productId}/media`, { method: 'POST', body: input }),

  updateMedia: (mediaId: string, input: MediaInput) =>
    unwrap<MediaItem>(`/media/${mediaId}`, { method: 'PUT', body: input }),

  removeMedia: (mediaId: string) =>
    unwrap<{ deleted: boolean; id: string }>(`/media/${mediaId}`, { method: 'DELETE' }),
};

// ---------------------------------------------------------------------------
// Catálogos textiles (alimentan el alta de variantes)
// ---------------------------------------------------------------------------
export const textileApi = {
  materials: (signal?: AbortSignal) =>
    unwrap<FiberMaterial[]>('/textile/materials', { signal }),

  colors: (signal?: AbortSignal) => unwrap<TextileColor[]>('/textile/colors', { signal }),

  sizes: (signal?: AbortSignal) => unwrap<TextileSize[]>('/textile/sizes', { signal }),
};

// ---------------------------------------------------------------------------
// Pedidos
// ---------------------------------------------------------------------------
export const ordersApi = {
  list: (params: ListParams & { status?: string } = {}, signal?: AbortSignal) =>
    request<Paginated<Order>>(`/orders${query(params as Record<string, unknown>)}`, { signal }),

  detail: (id: string, signal?: AbortSignal) => unwrap<Order>(`/orders/${id}`, { signal }),

  updateStatus: (id: string, status: OrderStatus, note?: string) =>
    unwrap<Order>(`/orders/${id}/status`, { method: 'PUT', body: { status, note } }),

  cancel: (id: string) => unwrap<Order>(`/orders/${id}/cancel`, { method: 'POST' }),
};

// ---------------------------------------------------------------------------
// Inventario y logística
// ---------------------------------------------------------------------------
export const inventoryApi = {
  warehouses: (signal?: AbortSignal) => unwrap<Warehouse[]>('/warehouses', { signal }),

  stock: (
    params: { page?: number; limit?: number; warehouse_id?: number; low_stock?: boolean } = {},
    signal?: AbortSignal,
  ) => request<Paginated<StockRow>>(`/stock${query(params)}`, { signal }),

  adjust: (input: { stock_item_id: number; quantity: number; reason?: string }) =>
    unwrap<{ id: number; quantity: number; available: number }>('/stock/adjust', {
      method: 'POST',
      body: input,
    }),

  movements: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<StockMovement>>(`/stock/movements${query(params)}`, { signal }),

  shipments: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<Shipment>>(`/shipments${query(params)}`, { signal }),
};

// ---------------------------------------------------------------------------
// Personas
// ---------------------------------------------------------------------------
export const iamApi = {
  users: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<StaffUser>>(`/users${query(params)}`, { signal }),

  createUser: (input: UserInput) => unwrap<StaffUser>('/users', { method: 'POST', body: input }),

  updateUser: (id: string, input: UserInput) =>
    unwrap<StaffUser>(`/users/${id}`, { method: 'PUT', body: input }),

  deleteUser: (id: string) =>
    unwrap<{ deleted: boolean; id: string }>(`/users/${id}`, { method: 'DELETE' }),

  roles: (signal?: AbortSignal) => unwrap<Role[]>('/roles', { signal }),

  permissions: (signal?: AbortSignal) => unwrap<Permission[]>('/permissions', { signal }),

  departments: (signal?: AbortSignal) => unwrap<Department[]>('/departments', { signal }),

  customers: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<CustomerRow>>(`/customers${query(params)}`, { signal }),

  clients: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<ClientRow>>(`/clients${query(params)}`, { signal }),
};

// ---------------------------------------------------------------------------
// Marketing
// ---------------------------------------------------------------------------
export const marketingApi = {
  coupons: recurso<Coupon>('/coupons', { includeHidden: false }),
  campaigns: recurso<Campaign>('/campaigns', { includeHidden: false }),
  promotions: recurso<Promotion>('/promotions'),

  /** Consulta pública: dice si un código sirve y cuánto descuenta, sin gastarlo. */
  validateCoupon: (code: string, subtotal?: number) =>
    unwrap<{ valid: boolean; reason: string | null; discount: number | null }>(
      '/coupons/validate',
      { method: 'POST', body: { code, subtotal } },
    ),

  subscribers: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<Subscriber>>(`/newsletter/subscribers${query(params)}`, { signal }),

  inquiries: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<ContactMessage>>(`/contact${query(params)}`, { signal }),
};

// ---------------------------------------------------------------------------
// Contenido de la web
//
// Los listados piden `include_hidden`: el panel tiene que ver también lo
// despublicado, que es justo lo que la web esconde.
// ---------------------------------------------------------------------------
function recurso<T>(ruta: string, opciones: { includeHidden?: boolean } = {}) {
  const listado = opciones.includeHidden === false ? ruta : `${ruta}?include_hidden=true`;
  return {
    list: (signal?: AbortSignal) => unwrap<T[]>(listado, { signal }),
    create: (input: Record<string, unknown>) =>
      unwrap<T>(ruta, { method: 'POST', body: input }),
    update: (id: number | string, input: Record<string, unknown>) =>
      unwrap<T>(`${ruta}/${id}`, { method: 'PUT', body: input }),
    remove: (id: number | string) =>
      unwrap<{ deleted: boolean; deactivated?: boolean; id: number | string; reason?: string }>(
        `${ruta}/${id}`,
        { method: 'DELETE' },
      ),
  };
}

export const cmsApi = {
  hero: recurso<HeroSlide>('/cms/hero'),
  benefits: recurso<Benefit>('/cms/benefits'),
  testimonials: recurso<Testimonial>('/cms/testimonials'),
  gallery: recurso<GalleryImage>('/cms/gallery'),
  processes: recurso<ArtisanProcess>('/cms/processes'),
};

// ---------------------------------------------------------------------------
// Sistema
// ---------------------------------------------------------------------------
export const systemApi = {
  audit: (params: ListParams = {}, signal?: AbortSignal) =>
    request<Paginated<AuditEntry>>(`/audit${query(params)}`, { signal }),

  company: (signal?: AbortSignal) => unwrap<Company>('/settings/company', { signal }),

  updateCompany: (input: CompanyInput) =>
    unwrap<{ updated: boolean }>('/settings/company', { method: 'PUT', body: input }),
};
