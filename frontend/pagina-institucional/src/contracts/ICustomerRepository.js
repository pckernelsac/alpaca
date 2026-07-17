/**
 * @typedef {Object} ICustomerRepository
 * @property {() => Promise<Object>} getProfile
 * @property {(data: Object) => Promise<Object>} updateProfile
 * @property {() => Promise<Array>} getAddresses
 * @property {(data: Object) => Promise<Object>} createAddress
 * @property {(id: number) => Promise<void>} deleteAddress
 * @property {() => Promise<Array>} getWishlist
 * @property {(data: Object) => Promise<Object>} toggleWishlist
 * @property {() => Promise<Object>} getCart
 * @property {(data: Object) => Promise<Object>} addCartItem
 * @property {(id: number, data: Object) => Promise<Object>} updateCartItem
 * @property {(id: number) => Promise<void>} removeCartItem
 * @property {() => Promise<void>} clearCart
 * @property {(data: Object) => Promise<Object>} checkout
 */
export const ICustomerRepository = Symbol('ICustomerRepository');
