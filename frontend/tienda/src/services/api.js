import { catalogRepository, cartRepository, wishlistRepository, checkoutRepository, ordersRepository, couponRepository, authRepository } from '@/repositories';

export class CatalogService {
  constructor(repo) { this.repo = repo; }
  getAll(params)        { return this.repo.getAll(params); }
  getById(id)           { return this.repo.getById(id); }
  getCategories()       { return this.repo.getCategories(); }
  getCollections()      { return this.repo.getCollections(); }
}

export class CartService {
  constructor(repo) { this.repo = repo; }
  getCart()         { return this.repo.getCart(); }
  addItem(data)     { return this.repo.addItem(data); }
  updateItem(id, d) { return this.repo.updateItem(id, d); }
  removeItem(id)    { return this.repo.removeItem(id); }
  clearCart()       { return this.repo.clearCart(); }
}

export class WishlistService {
  constructor(repo) { this.repo = repo; }
  getItems()        { return this.repo.getItems(); }
  toggleItem(data)  { return this.repo.toggleItem(data); }
}

export class CheckoutService {
  constructor(repo) { this.repo = repo; }
  checkout(data, key) { return this.repo.checkout(data, key); }
}

export class OrdersService {
  constructor(repo) { this.repo = repo; }
  getAll(params)    { return this.repo.getAll(params); }
  getById(id)       { return this.repo.getById(id); }
  getEvents(id)     { return this.repo.getEvents(id); }
}

export class CouponService {
  constructor(repo) { this.repo = repo; }
  validate(data)    { return this.repo.validate(data); }
}

export class AuthService {
  constructor(repo) { this.repo = repo; }
  login(email, pwd)    { return this.repo.login(email, pwd); }
  register(data)       { return this.repo.register(data); }
  getProfile()         { return this.repo.getProfile(); }
}
