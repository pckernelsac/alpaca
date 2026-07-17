import { useState, useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll({ threshold = 200, initialPage = 1, onLoadMore } = {}) {
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const sentinelRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            setPage((p) => p + 1);
          }
        },
        { rootMargin: `${threshold}px` },
      );
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, threshold],
  );

  useEffect(() => {
    if (page > initialPage && hasMore && onLoadMore) {
      setLoading(true);
      Promise.resolve(onLoadMore(page)).then((more) => {
        if (more === false) setHasMore(false);
      }).finally(() => setLoading(false));
    }
  }, [page]);

  return { page, loading, hasMore, sentinelRef };
}
