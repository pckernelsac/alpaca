export const CrmEndpoints = {
  clients:     () => '/crm/clients',
  clientById:  (id) => `/crm/clients/${id}`,
  clientNotes: (id) => `/crm/clients/${id}/notes`,
};
