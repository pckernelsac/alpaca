import { CatalogService, CartService, WishlistService, CheckoutService, OrdersService, CouponService, AuthService, PaymentsService } from '@/services/api';
import { catalogRepository, cartRepository, wishlistRepository, checkoutRepository, ordersRepository, couponRepository, authRepository, paymentsRepository } from '@/repositories';

export const serviceProvider = {
  catalog:  new CatalogService(catalogRepository),
  cart:     new CartService(cartRepository),
  wishlist: new WishlistService(wishlistRepository),
  checkout: new CheckoutService(checkoutRepository),
  orders:   new OrdersService(ordersRepository),
  coupon:   new CouponService(couponRepository),
  auth:      new AuthService(authRepository),
  payments:  new PaymentsService(paymentsRepository),
};
