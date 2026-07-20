export const PaymentsEndpoints = {
  transactions: () => '/transactions',
  createIntent: () => '/create-payment-intent',
  refund: (id) => `/transactions/${id}/refund`,
};
