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
      const data = await serviceProvider.orders.getAll(params);
      setOrders(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { orders, loading, error, fetch };
}
