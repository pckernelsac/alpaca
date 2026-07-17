/**
 * @typedef {Object} IInventoryRepository
 * @property {(params?: Object) => Promise<Object>} getStock
 * @property {(id: number, data: Object) => Promise<Object>} adjust
 * @property {(params?: Object) => Promise<Object>} getMovements
 * @property {(params?: Object) => Promise<Object>} getTransfers
 */
export const IInventoryRepository = Symbol('IInventoryRepository');
