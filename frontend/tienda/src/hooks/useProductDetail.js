import { useState, useEffect, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await serviceProvider.catalog.getById(id);
      setProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { product, loading, error, refetch: fetch };
}
