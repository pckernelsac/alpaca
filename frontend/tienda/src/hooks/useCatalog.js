import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const raw = await serviceProvider.catalog.getAll(params);
      const list = raw?.data ?? raw?.rows ?? raw ?? [];
      setProducts(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error, fetch };
}
