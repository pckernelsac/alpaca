/**
 * @typedef {Object} IOrderRepository
 * @property {(params?: Object) => Promise<Object>} getAll
 * @property {(id: string) => Promise<Object>} getById
 * @property {(data: Object) => Promise<Object>} create
 * @property {(id: string, data: Object) => Promise<Object>} updateStatus
 * @property {(id: string, data: Object) => Promise<Object>} addNote
 * @property {(id: string) => Promise<Array>} getEvents
 */
export const IOrderRepository = Symbol('IOrderRepository');
