export const CatalogEndpoints = {
  products:    () => '/products',
  productById: (id) => `/products/${id}`,
  categories:  () => '/categories',
  collections: () => '/collections',
  variants:    () => '/variants',
  variantById: (id) => `/variants/${id}`,
  productMedia: (id) => `/products/${id}/media`,
};
