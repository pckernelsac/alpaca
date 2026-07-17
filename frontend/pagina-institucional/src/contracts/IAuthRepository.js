/**
 * @typedef {Object} IAuthRepository
 * @property {(email: string, password: string) => Promise<Object>} login
 * @property {(email: string, password: string) => Promise<Object>} customerLogin
 * @property {(data: Object) => Promise<Object>} register
 * @property {() => Promise<Object>} getProfile
 */
export const IAuthRepository = Symbol('IAuthRepository');
