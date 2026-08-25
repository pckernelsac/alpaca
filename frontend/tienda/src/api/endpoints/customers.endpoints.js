export const CustomersEndpoints = {
  profile:       () => '/account/profile',
  password:      () => '/account/password',
  addresses:     () => '/account/addresses',
  addressById:   (id) => `/account/addresses/${id}`,
  wishlist:      () => '/wishlist',
  wishlistItems: () => '/wishlist/items',
  cart:          () => '/cart',
  cartItems:     () => '/cart/items',
  cartItemById:  (id) => `/cart/items/${id}`,
  checkout:      () => '/checkout',
};
