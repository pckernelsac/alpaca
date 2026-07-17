import { api } from '@/api/client';
import { AuthEndpoints } from '@/api/endpoints/auth.endpoints';
import { CmsEndpoints } from '@/api/endpoints/cms.endpoints';
import { CatalogEndpoints } from '@/api/endpoints/catalog.endpoints';
import { CustomersEndpoints } from '@/api/endpoints/customers.endpoints';
import { OrdersEndpoints } from '@/api/endpoints/orders.endpoints';
import { PaymentsEndpoints } from '@/api/endpoints/payments.endpoints';
import { InventoryEndpoints } from '@/api/endpoints/inventory.endpoints';
import { MarketingEndpoints } from '@/api/endpoints/marketing.endpoints';
import { SettingsEndpoints } from '@/api/endpoints/settings.endpoints';
import { UploadEndpoints } from '@/api/endpoints/upload.endpoints';
import { AnalyticsEndpoints } from '@/api/endpoints/analytics.endpoints';
import { AuditEndpoints } from '@/api/endpoints/audit.endpoints';
import { CrmEndpoints } from '@/api/endpoints/crm.endpoints';
import { TextileEndpoints } from '@/api/endpoints/textile.endpoints';

function all() { return api; }

function get(ep, params) { return api.get(ep(), { params }); }
function getById(ep, id, params) { return api.get(ep(id), { params }); }
function post(ep, data) { return api.post(ep(), data); }
function put(ep, id, data) { return api.put(ep(id), data); }
function patch(ep, id, data) { return api.patch(ep(id), data); }
function del(ep, id) { return api.delete(ep(id)); }

export const authRepository = {
  login:         (email, password) => post(AuthEndpoints.login, { email, password }),
  customerLogin: (email, password) => post(AuthEndpoints.customerLogin, { email, password }),
  register:      (data) => post(AuthEndpoints.register, data),
  getProfile:    () => get(AuthEndpoints.me),
};

export const cmsRepository = {
  getHeroSlides:       () => get(CmsEndpoints.hero),
  getFaq:              () => get(CmsEndpoints.faq),
  getGallery:          () => get(CmsEndpoints.gallery),
  getTestimonials:     () => get(CmsEndpoints.testimonials),
  getBenefits:         () => get(CmsEndpoints.benefits),
  getArtisanProcesses: () => get(CmsEndpoints.artisanProcesses),
  getContents:         () => get(CmsEndpoints.contents),
};

export const contactRepository = {
  send: (data) => post(SettingsEndpoints.contact, data),
};

export const newsletterRepository = {
  subscribe: (email, source) => post(MarketingEndpoints.subscribe, { email, source }),
};

export const catalogRepository = {
  getAll:       (params) => get(CatalogEndpoints.products, params),
  getById:      (id) => getById(CatalogEndpoints.productById, id),
  getCategories: () => get(CatalogEndpoints.categories),
  getCollections: () => get(CatalogEndpoints.collections),
};

export const customersRepository = {
  getProfile:      () => get(CustomersEndpoints.profile),
  updateProfile:   (data) => put(CustomersEndpoints.profile, null, data),
  getAddresses:    () => get(CustomersEndpoints.addresses),
  createAddress:   (data) => post(CustomersEndpoints.addresses, data),
  deleteAddress:   (id) => del(CustomersEndpoints.addressById, id),
  getWishlist:     () => get(CustomersEndpoints.wishlist),
  toggleWishlist:  (data) => post(CustomersEndpoints.wishlistItems, data),
  getCart:         () => get(CustomersEndpoints.cart),
  addCartItem:     (data) => post(CustomersEndpoints.cartItems, data),
  updateCartItem:  (id, data) => patch(CustomersEndpoints.cartItemById, id, data),
  removeCartItem:  (id) => del(CustomersEndpoints.cartItemById, id),
  clearCart:       () => api.delete(CustomersEndpoints.cart()),
  checkout:        (data) => post(CustomersEndpoints.checkout, data),
};

export const ordersRepository = {
  getAll:       (params) => get(OrdersEndpoints.orders, params),
  getById:      (id) => getById(OrdersEndpoints.orderById, id),
  create:       (data) => post(OrdersEndpoints.orders, data),
  updateStatus: (id, data) => put(OrdersEndpoints.orderStatus, id, data),
  addNote:      (id, data) => post(OrdersEndpoints.orderNotes, id, data),
  getEvents:    (id) => getById(OrdersEndpoints.orderEvents, id),
};

export const paymentsRepository = {
  getAll:              (params) => get(PaymentsEndpoints.transactions, params),
  createPaymentIntent: (data) => post(PaymentsEndpoints.createPaymentIntent, data),
  refund:              (id, data) => post(PaymentsEndpoints.refund, id, data),
};

export const inventoryRepository = {
  getStock:      (params) => get(InventoryEndpoints.stock, params),
  adjust:        (id, data) => post(InventoryEndpoints.adjust, id, data),
  getMovements:  (params) => get(InventoryEndpoints.movements, params),
  getTransfers:  (params) => get(InventoryEndpoints.transfers, params),
};

export const marketingRepository = {
  getCampaigns:    (params) => get(MarketingEndpoints.campaigns, params),
  getCampaign:     (id) => getById(MarketingEndpoints.campaignById, id),
  createCampaign:  (data) => post(MarketingEndpoints.campaigns, data),
  updateCampaign:  (id, data) => put(MarketingEndpoints.campaignById, id, data),
  deleteCampaign:  (id) => del(MarketingEndpoints.campaignById, id),
  getCoupons:      () => get(MarketingEndpoints.coupons),
  getCoupon:       (id) => getById(MarketingEndpoints.couponById, id),
  createCoupon:    (data) => post(MarketingEndpoints.coupons, data),
  updateCoupon:    (id, data) => put(MarketingEndpoints.couponById, id, data),
  deleteCoupon:    (id) => del(MarketingEndpoints.couponById, id),
  validateCoupon:  (data) => post(MarketingEndpoints.validateCoupon, data),
  getPromotions:   () => get(MarketingEndpoints.promotions),
  getPromotion:    (id) => getById(MarketingEndpoints.promotionById, id),
  createPromotion: (data) => post(MarketingEndpoints.promotions, data),
  updatePromotion: (id, data) => put(MarketingEndpoints.promotionById, id, data),
  deletePromotion: (id) => del(MarketingEndpoints.promotionById, id),
};

export const settingsRepository = {
  getCompany: () => get(SettingsEndpoints.company),
  updateCompany: (data) => api.put(SettingsEndpoints.company(), data),
};

export const uploadRepository = {
  upload:       (file) => { const fd = new FormData(); fd.append('file', file); return api.post(UploadEndpoints.upload(), fd, { headers: { 'Content-Type': 'multipart/form-data' } }); },
  uploadPublic: (file) => { const fd = new FormData(); fd.append('file', file); return api.post(UploadEndpoints.uploadPublic(), fd, { headers: { 'Content-Type': 'multipart/form-data' } }); },
  delete:       (key) => api.delete(UploadEndpoints.delete(key)),
};

export const analyticsRepository = {
  getKpis: () => get(AnalyticsEndpoints.kpis),
};

export const auditRepository = {
  getLogs: (params) => get(AuditEndpoints.logs, params),
};

export const crmRepository = {
  getClients:  (params) => get(CrmEndpoints.clients, params),
  getClient:   (id) => getById(CrmEndpoints.clientById, id),
  createClient: (data) => post(CrmEndpoints.clients, data),
  updateClient: (id, data) => put(CrmEndpoints.clientById, id, data),
  addNote:     (id, data) => post(CrmEndpoints.clientNotes, id, data),
};

export const textileRepository = {
  getMaterials: () => get(TextileEndpoints.materials),
  getColors:    () => get(TextileEndpoints.colors),
  getSizes:     () => get(TextileEndpoints.sizes),
  getSeasons:   () => get(TextileEndpoints.seasons),
};
