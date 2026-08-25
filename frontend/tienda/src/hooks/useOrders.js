import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const raw = await serviceProvider.orders.getAll(params);
      const list = raw?.data ?? raw?.rows ?? raw ?? [];
      setOrders(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { orders, loading, error, fetch };
}
