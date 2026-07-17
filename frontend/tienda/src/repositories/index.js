import { api } from '@/api/client';
import { AuthEndpoints } from '@/api/endpoints/auth.endpoints';
import { CatalogEndpoints } from '@/api/endpoints/catalog.endpoints';
import { CustomersEndpoints } from '@/api/endpoints/customers.endpoints';
import { OrdersEndpoints } from '@/api/endpoints/orders.endpoints';
import { MarketingEndpoints } from '@/api/endpoints/marketing.endpoints';

function get(ep, params) { return api.get(ep(), { params }); }
function getById(ep, id, params) { return api.get(ep(id), { params }); }
function post(ep, data) { return api.post(ep(), data); }

export const authRepository = {
  login:         (email, password) => post(AuthEndpoints.customerLogin, { email, password }),
  register:      (data) => post(AuthEndpoints.register, data),
  getProfile:    () => get(AuthEndpoints.me),
};

export const catalogRepository = {
  getAll:        (params) => get(CatalogEndpoints.products, params),
  getById:       (id) => getById(CatalogEndpoints.productById, id),
  getCategories: () => get(CatalogEndpoints.categories),
  getCollections: () => get(CatalogEndpoints.collections),
};

export const cartRepository = {
  getCart:         () => get(CustomersEndpoints.cart),
  addItem:         (data) => post(CustomersEndpoints.cartItems, data),
  updateItem:      (id, data) => api.patch(CustomersEndpoints.cartItemById(id), data),
  removeItem:      (id) => api.delete(CustomersEndpoints.cartItemById(id)),
  clearCart:       () => api.delete(CustomersEndpoints.cart()),
};

export const wishlistRepository = {
  getItems:    () => get(CustomersEndpoints.wishlist),
  toggleItem:  (data) => post(CustomersEndpoints.wishlistItems, data),
};

export const checkoutRepository = {
  checkout: (data, idempotencyKey) => api.post(CustomersEndpoints.checkout(), data, {
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {},
  }),
};

export const ordersRepository = {
  getAll:    (params) => get(OrdersEndpoints.orders, params),
  getById:   (id) => getById(OrdersEndpoints.orderById, id),
  getEvents: (id) => getById(OrdersEndpoints.orderEvents, id),
};

export const couponRepository = {
  validate: (data) => post(MarketingEndpoints.validateCoupon, data),
};
