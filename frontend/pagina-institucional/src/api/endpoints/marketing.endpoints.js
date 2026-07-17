export const MarketingEndpoints = {
  campaigns:       () => '/campaigns',
  campaignById:    (id) => `/campaigns/${id}`,
  coupons:         () => '/coupons',
  couponById:      (id) => `/coupons/${id}`,
  validateCoupon:  () => '/coupons/validate',
  promotions:      () => '/promotions',
  promotionById:   (id) => `/promotions/${id}`,
  subscribe:       () => '/newsletter/subscribe',
};
