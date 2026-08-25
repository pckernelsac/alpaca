/** El contenido editorial ahora lo sirve el backend nuevo (FastAPI), que
 *  agrupa el CMS bajo /cms. Los nombres de campo son los mismos que devolvía
 *  el backend viejo, así que los mappers no cambian. */
export const CmsEndpoints = {
  hero:            () => '/cms/hero',
  faq:             () => '/faq',
  gallery:         () => '/cms/gallery',
  testimonials:    () => '/cms/testimonials',
  benefits:        () => '/cms/benefits',
  artisanProcesses: () => '/cms/processes',
  contents:        () => '/contents',
};
