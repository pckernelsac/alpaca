/**
 * @typedef {Object} ICatalogRepository
 * @property {(params?: Object) => Promise<Array>} getAll
 * @property {(id: string) => Promise<Object>} getById
 * @property {() => Promise<Array>} getCategories
 * @property {() => Promise<Array>} getCollections
 */
export const ICatalogRepository = Symbol('ICatalogRepository');
