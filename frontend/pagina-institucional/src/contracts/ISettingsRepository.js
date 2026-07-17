/**
 * @typedef {Object} ISettingsRepository
 * @property {() => Promise<Object>} getCompany
 * @property {(data: Object) => Promise<Object>} updateCompany
 */
export const ISettingsRepository = Symbol('ISettingsRepository');
