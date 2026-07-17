/**
 * @typedef {Object} ICmsRepository
 * @property {() => Promise<Array>} getHeroSlides
 * @property {() => Promise<Array>} getFaq
 * @property {() => Promise<Array>} getGallery
 * @property {() => Promise<Array>} getTestimonials
 * @property {() => Promise<Array>} getBenefits
 * @property {() => Promise<Array>} getArtisanProcesses
 * @property {() => Promise<Array>} getContents
 */
export const ICmsRepository = Symbol('ICmsRepository');
