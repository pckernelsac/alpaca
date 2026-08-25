import { useState, useCallback } from 'react';
import { contactService } from '@/services/api';

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await contactService.send(data);
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

  return { send, loading, success, error, reset };
}
