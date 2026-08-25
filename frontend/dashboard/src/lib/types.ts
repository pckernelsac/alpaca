/**
 * Tipos del panel interno.
 *
 * El backend responde en camelCase para el dashboard (los serializadores de
 * `iam`, `orders`, `inventory` y `system` lo arman a mano) pero el catálogo
 * sale de Pydantic y conserva snake_case. Los tipos reflejan cada forma tal
 * como llega: traducirla en el cliente sería una capa de más para nada.
 */

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

/* -------------------------------------------------------------------------- */
/* Sesión                                                                     */
/* -------------------------------------------------------------------------- */
export interface StaffProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  employeeId: string | null;
  position: string | null;
  avatar: string | null;
  status: string;
  role: string | null;
  type: 'staff';
}

export interface AuthPayload {
  accessToken: string;
  tokenType: string;
  actor: string;
  user: { id: string; name: string; email: string; role: string | null };
}

/* -------------------------------------------------------------------------- */
/* Analítica                                                                  */
/* -------------------------------------------------------------------------- */
export interface Kpis {
  revenue: number;
  revenueMonth: number;
  ordersTotal: number;
  ordersPending: number;
  customersTotal: number;
  productsActive: number;
  lowStockCount: number;
  averageTicket: number;
}

export interface MonthlySales {
  month: string;
  total: number;
  orders: number;
}

export interface TopProduct {
  productId: string | null;
  name: string;
  units: number;
  revenue: number;
}

/* -------------------------------------------------------------------------- */
/* Catálogo                                                                   */
/* -------------------------------------------------------------------------- */
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
  label: string;
}

export interface MediaItem {
  id: string;
  url: string;
  alt_text: string | null;
  is_principal: boolean;
  visible: boolean;
  type: string;
}

export interface VariantInput {
  product_id?: string;
  sku?: string;
  color_name?: string | null;
  color_hex?: string | null;
  size_id?: number | null;
  material_id?: number | null;
  color_id?: number | null;
  price?: number;
  /** Solo al crear: después el stock se mueve por inventario, que deja
   *  movimiento en el historial. */
  stock?: number;
  min_stock?: number;
  status?: string;
}

export interface MediaInput {
  url?: string;
  alt_text?: string | null;
  is_principal?: boolean;
  visible?: boolean;
}

/* --- Catálogos textiles --- */
export interface FiberMaterial {
  id: number;
  name: string;
  category: string | null;
}

export interface TextileColor {
  id: number;
  name: string;
  hex: string;
  pantone: string | null;
}

export interface TextileSize {
  id: number;
  name: string;
  category: string | null;
  order: number;
}

export interface Product {
  id: string;
  sku: string;
  /** Lo que va en la URL pública: /producto/manta-imperial-gold */
  slug: string;
  name: string;
  description: string | null;
  material: string | null;
  status: string;
  category: Category | null;
  collection: Collection | null;
  variants: Variant[];
  media: MediaItem[];
  created_at: string | null;
  price: number;
  stock: number;
  image: string | null;
  images: string[];
}

export interface ProductInput {
  sku?: string;
  name?: string;
  /** Solo se manda cuando se quiere cambiar la URL: el backend lo normaliza
   *  y le agrega un sufijo si ya existe. */
  slug?: string;
  description?: string | null;
  material?: string | null;
  category_id?: number | null;
  collection_id?: string | null;
  status?: string;
}

/* -------------------------------------------------------------------------- */
/* Pedidos                                                                    */
/* -------------------------------------------------------------------------- */
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: number;
  productId: string | null;
  name: string;
  sku: string | null;
  variantLabel: string | null;
  image: string | null;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface OrderEvent {
  id: number;
  type: string;
  title: string;
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
  documents?: { id: number; type: string; name: string; url: string }[];
}

/* -------------------------------------------------------------------------- */
/* Inventario y logística                                                     */
/* -------------------------------------------------------------------------- */
export interface Warehouse {
  id: number;
  name: string;
  code: string | null;
  city: string | null;
  type: string | null;
  address: string | null;
}

export interface StockRow {
  id: number;
  productId: string | null;
  productName: string | null;
  variantId: string | null;
  sku: string | null;
  variantLabel: string | null;
  warehouseId: number | null;
  warehouse: string | null;
  quantity: number;
  reserved: number;
  available: number;
  minStock: number;
  maxStock: number | null;
  lowStock: boolean;
}

export interface StockMovement {
  id: number;
  movementNumber: string;
  type: string;
  quantity: number;
  balance: number | null;
  reason: string | null;
  warehouseId: number | null;
  createdAt: string;
}

export interface Shipment {
  id: string;
  waybill: string | null;
  orderId: string;
  carrier: string | null;
  status: string;
  originCity: string | null;
  destinationCity: string | null;
  dispatchedAt: string | null;
  deliveredAt: string | null;
}

/* -------------------------------------------------------------------------- */
/* Personas                                                                   */
/* -------------------------------------------------------------------------- */
export interface StaffUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  employeeId: string | null;
  position: string | null;
  roleId: number | null;
  role: string | null;
  departmentId: number | null;
  department: string | null;
  avatar: string | null;
  status: string;
  lastAccessAt: string | null;
  createdAt: string;
}

export interface UserInput {
  name?: string;
  email?: string;
  password?: string;
  phone?: string | null;
  employee_id?: string | null;
  position?: string | null;
  role_id?: number;
  department_id?: number | null;
  status?: string;
}

export interface Role {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  status: string;
  permissions: string[];
}

export interface Permission {
  id: number;
  module: string;
  action: string;
  name: string;
  description: string | null;
}

export interface Department {
  id: number;
  name: string;
}

export interface CustomerRow {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string | null;
  loyaltyTier: string | null;
  loyaltyPoints: number;
  createdAt: string;
}

export interface ClientRow {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  type: string | null;
  status: string;
  creditLimit: number | null;
}

/* -------------------------------------------------------------------------- */
/* Marketing y sistema                                                        */
/* -------------------------------------------------------------------------- */
export interface Coupon {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number | null;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
}

export interface CouponInput {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_purchase?: number | null;
  max_uses?: number | null;
  active?: boolean;
  expires_at?: string | null;
}

export interface Promotion {
  id: number;
  name: string;
  type: string;
  discountValue: number;
  appliesTo: string;
  productIds: string[] | null;
  categoryId: number | null;
  collectionId: string | null;
  startsAt: string;
  endsAt: string;
  active: boolean;
  campaignId: string | null;
}

export interface Campaign {
  id: string;
  name: string;
  type: string | null;
  channel: string | null;
  status: string;
  budget: number | null;
  spent: number | null;
  conversions: number | null;
  image: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface Subscriber {
  id: number;
  email: string;
  source: string | null;
  active: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

/* --- Contenido de la web (CMS) --- */
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  image: string | null;
  order: number;
  active: boolean;
}

export interface Benefit {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  order: number;
  active: boolean;
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
  order: number;
  active: boolean;
}

export interface GalleryImage {
  id: number;
  url: string;
  altText: string | null;
  caption: string | null;
  category: string | null;
  order: number;
  visible: boolean;
}

export interface ArtisanProcess {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  stepOrder: number;
  active: boolean;
}

export interface AuditEntry {
  id: number;
  userId: string | null;
  action: string;
  module: string | null;
  description: string | null;
  severity: string | null;
  ipAddress: string | null;
  createdAt: string;
}

export interface Company {
  id: number;
  legalName: string | null;
  taxId: string | null;
  industry: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  primaryCurrency: string | null;
  defaultTimezone: string | null;
  systemLanguage: string | null;
  logo: string | null;
}

export interface CompanyInput {
  legal_name?: string | null;
  tax_id?: string | null;
  industry?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  primary_currency?: string | null;
}
