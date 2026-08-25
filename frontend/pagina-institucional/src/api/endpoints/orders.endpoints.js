export const OrdersEndpoints = {
  orders:       () => '/orders',
  orderById:    (id) => `/orders/${id}`,
  orderStatus:  (id) => `/orders/${id}/status`,
  orderNotes:   (id) => `/orders/${id}/notes`,
  orderEvents:  (id) => `/orders/${id}/events`,
};
