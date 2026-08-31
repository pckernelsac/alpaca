/** Tipos del dominio, alineados con los schemas del backend. */

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface Paginated<T> {
  success: boolean;
  data: T[];
  meta: PageMeta;
}

export interface ApiError {
  message: string;
  status: number;
  details?: { field: string; message: string }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: number | null;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  piece_count: number | null;
  active: boolean;
}

export interface Variant {
  id: string;
  sku: string;
  color_name: string | null;
  color_hex: string | null;
  size_id: number | null;
  size: { id: number; name: string } | null;
  price: number;
  stock: number;
  status: string;
  /** Color y talla combinados; el backend garantiza que sea distinguible. */
  label: string;
}

export interface Media {
  id: string;
  url: string;
  alt_text: string | null;
  is_principal: boolean;
  visible: boolean;
  type: string;
}

export interface Product {
  id: string;
  sku: string;
  /** Identificador legible que va en la URL: /producto/manta-imperial-gold */
  slug: string;
  name: string;
  description: string | null;
  material: string | null;
  status: string;
  category: Category | null;
  collection: Collection | null;
  variants: Variant[];
  media: Media[];
  created_at: string | null;
  /** Resueltos por el backend: mínimo de variantes activas, stock agregado. */
  price: number;
  stock: number;
  image: string | null;
  images: string[];
}

export interface CartItem {
  id: number;
  productId: string | null;
  productSlug: string | null;
  variantId: string | null;
  name: string;
  sku: string;
  variantLabel: string | null;
  image: string | null;
  unitPrice: number;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  total: number;
  couponId: number | null;
}

export interface WishlistEntry {
  id: number;
  productId: string;
  productSlug: string | null;
  name: string;
  sku: string;
  price: number;
  image: string | null;
}

export interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string | null;
  zip: string | null;
  country: string;
  phone: string | null;
  is_default: boolean;
  type: string;
}

export interface OrderItem {
  id: number;
  productId: string | null;
  productSlug: string | null;
  name: string;
  sku: string;
  variantLabel: string | null;
  image: string | null;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface OrderEvent {
  id: number;
  type: string;
  title: string | null;
  description: string | null;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  channel: string | null;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  paid: boolean;
  paidAt: string | null;
  placedAt: string | null;
  createdAt: string;
  customerId: string | null;
  itemCount: number;
  items: OrderItem[];
  notes?: string | null;
  events?: OrderEvent[];
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  phone: string | null;
  language?: string;
  currency?: string;
  loyaltyTier?: string | null;
  loyaltyPoints?: number;
  type: 'customer';
}

export interface AuthPayload {
  accessToken: string;
  tokenType: string;
  actor: 'customer' | 'staff';
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
  };
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  image: string | null;
  order: number;
}

export interface Benefit {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  order: number;
}

export interface Testimonial {
  id: number;
  author: string;
  role: string | null;
  company: string | null;
  avatar: string | null;
  text: string;
  rating: number | null;
  featured: boolean;
}

export interface FaqCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  items: { id: number; question: string; answer: string; order: number }[];
}

export interface ReviewSummary {
  average: number;
  count: number;
  items: {
    id: number;
    author: string;
    rating: number;
    text: string;
    tag: string | null;
    createdAt: string;
  }[];
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: number;
  collection_id?: string;
  sort?: 'recent' | 'name' | 'price_asc' | 'price_desc';
}

/* -------------------------------------------------------------------------- */
/* Pagos                                                                      */
/* -------------------------------------------------------------------------- */
/** Lo que publica el backend en `/payments/config`.
 *
 *  La clave pública llega en tiempo de ejecución y no compilada dentro del
 *  bundle: las `VITE_*` se incrustan al construir la imagen, así que cambiarla
 *  obligaría a recompilar las tres apps. */
export interface PaymentConfig {
  provider: string;
  enabled: boolean;
  publicKey: string;
  currency: string;
  locale: string;
  methods: string[];
}

export type PaymentStatus =
  | 'approved'
  | 'pending'
  | 'in_process'
  | 'authorized'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'charged_back'
  | 'error';

export interface PaymentResult {
  id: string;
  transactionId: string;
  orderId: string | null;
  provider: string;
  method: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  statusDetail: string | null;
  paymentId: string | null;
  externalReference: string | null;
  /** Cupón de pago en efectivo: sin esta URL el cliente no puede abonarlo. */
  voucherUrl: string | null;
  createdAt: string;
  message: string;
  orderNumber?: string;
  paid: boolean;
}

export interface PaymentStatusResponse {
  orderNumber: string;
  paid: boolean;
  status?: OrderStatus;
  transaction: PaymentResult | null;
}

/** El importe no está: lo fija el servidor leyéndolo del pedido. */
export interface PaymentCharge {
  order_id: string;
  token?: string;
  payment_method_id: string;
  payment_type_id?: string;
  issuer_id?: string;
  installments?: number;
  payer_email: string;
  payer_first_name?: string;
  payer_last_name?: string;
  identification_type?: string;
  identification_number?: string;
}
