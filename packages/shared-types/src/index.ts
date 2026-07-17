// Shared Types — Alpacart
// These match the backend entities from docs/backend-discovery/

export interface User { id: string; name: string; email: string; role: string; phone?: string; status: string; }
export interface Role { id: number; name: string; category: string; status: string; }
export interface Customer { id: string; firstName: string; lastName: string; email: string; phone?: string; language: string; currency: string; }
export interface Product { id: string; sku: string; name: string; description?: string; categoryId?: number; price?: number; status: string; }
export interface ProductVariant { id: string; productId: string; sku: string; price: number; stock: number; colorName?: string; sizeId?: number; status: string; }
export interface Category { id: number; name: string; slug: string; parentId?: number; }
export interface Collection { id: string; name: string; active: boolean; seasonId?: number; }
export interface Order { id: string; orderNumber: string; customerId?: string; status: string; subtotal: number; total: number; paid: boolean; }
export interface OrderItem { id: number; orderId: string; productId?: string; productName: string; sku: string; unitPrice: number; quantity: number; total: number; }
export interface Address { id?: number; street: string; city: string; state?: string; zip?: string; country: string; isDefault?: boolean; }
export interface Coupon { id?: number; code: string; type: string; value: number; minPurchase?: number; maxUses?: number; usedCount: number; active: boolean; }
export interface Campaign { id: string; name: string; type: string; status: string; budget: number; }
export interface Client { id: string; name: string; company?: string; email: string; type: string; status: string; }
export interface StockItem { id: number; productId?: string; variantId?: string; warehouseId: number; quantity: number; reserved: number; }
export interface Warehouse { id: number; name: string; code: string; city: string; type: string; }
export interface Shipment { id: string; waybill: string; orderId: string; carrier: string; status: string; }
export interface Content { id: string; title: string; slug: string; type: string; status: string; publishedAt?: string; }
export interface HeroSlide { id: number; title: string; subtitle?: string; image?: string; ctaText?: string; order: number; active: boolean; }
export interface Testimonial { id: number; author: string; text: string; rating?: number; featured: boolean; }
export interface GalleryImage { id: number; url: string; altText?: string; caption?: string; category?: string; order: number; visible: boolean; }
export interface FaqItem { id: number; question: string; answer: string; order: number; }
export interface FaqCategory { id: number; name: string; slug: string; icon?: string; order: number; items: FaqItem[]; }
export interface Benefit { id: number; title: string; description?: string; icon?: string; image?: string; order: number; active: boolean; }
export interface ArtisanProcess { id: number; title: string; description?: string; icon?: string; image?: string; stepOrder: number; active: boolean; }
export interface Notification { id: number; title: string; message: string; type: string; read: boolean; createdAt: string; }
export interface PaginatedResponse<T> { data: T[]; total: number; page: number; perPage: number; totalPages: number; }
// Alias: count está deprecado, usar total para alinearse con backend
/** @deprecated Use PaginatedResponse con `total` */
export type PaginatedResponseDeprecated<T> = PaginatedResponse<T>;
