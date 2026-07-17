import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useCoupon() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const validate = useCallback(async (code, cartSubtotal) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await serviceProvider.coupon.validate({ code, cartSubtotal });
      setResult(data);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => { setResult(null); setError(null); }, []);

  return { validate, loading, error, result, reset };
}
