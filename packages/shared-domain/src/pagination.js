export function mapPaginatedResponse(raw) {
  if (!raw) return { data: [], meta: { page: 1, perPage: 25, total: 0, totalPages: 0 } };
  return {
    data: raw.data || [],
    meta: raw.meta || { page: 1, perPage: 25, total: 0, totalPages: 0 },
  };
}
