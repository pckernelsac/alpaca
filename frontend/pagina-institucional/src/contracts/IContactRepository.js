/**
 * @typedef {Object} IContactRepository
 * @property {(data: {name:string, email:string, subject:string, message:string}) => Promise<Object>} send
 */
export const IContactRepository = Symbol('IContactRepository');
