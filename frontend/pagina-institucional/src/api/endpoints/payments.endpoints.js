export const PaymentsEndpoints = {
  transactions:       () => '/transactions',
  createPaymentIntent: () => '/create-payment-intent',
  refund:             (id) => `/transactions/${id}/refund`,
  webhook:            () => '/stripe/webhook',
  releaseExpired:     () => '/reservations/release-expired',
};
