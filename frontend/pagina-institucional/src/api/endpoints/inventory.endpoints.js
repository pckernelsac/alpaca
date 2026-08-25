export const InventoryEndpoints = {
  stock:     () => '/stock',
  adjust:    (id) => `/stock/${id}/adjust`,
  movements: () => '/movements',
  transfers: () => '/transfers',
};
