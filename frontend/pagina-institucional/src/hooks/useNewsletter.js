import { useState, useCallback } from 'react';
import { newsletterService } from '@/services/api';

export function useNewsletter() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const subscribe = useCallback(async (email, source) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await newsletterService.subscribe(email, source);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSuccess(false);
    setError(null);
  }, []);

  return { subscribe, loading, success, error, reset };
}
