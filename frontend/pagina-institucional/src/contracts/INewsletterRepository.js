/**
 * @typedef {Object} INewsletterRepository
 * @property {(email: string, source?: string) => Promise<Object>} subscribe
 */
export const INewsletterRepository = Symbol('INewsletterRepository');
