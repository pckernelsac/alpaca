/**
 * @typedef {Object} IPaymentRepository
 * @property {(params?: Object) => Promise<Object>} getAll
 * @property {(data: Object) => Promise<Object>} createPaymentIntent
 * @property {(id: string, data: Object) => Promise<Object>} refund
 */
export const IPaymentRepository = Symbol('IPaymentRepository');
