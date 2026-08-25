import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const placeOrder = useCallback(async (data, idempotencyKey) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceProvider.checkout.checkout(data, idempotencyKey);
      setOrder(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { placeOrder, loading, error, order };
}
