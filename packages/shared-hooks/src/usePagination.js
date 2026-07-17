import { useMemo, useCallback } from 'react';

export function usePagination({ totalItems, pageSize = 25, currentPage = 1 }) {
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize]);

  const pages = useMemo(() => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }, [currentPage, totalPages]);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return { totalPages, pages, hasPrev, hasNext, page: currentPage, perPage: pageSize };
}
