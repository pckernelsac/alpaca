import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';

export function useFetch(url, options = {}) {
  const { immediate = true, ...config } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (overrideConfig) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(url, { ...config, ...overrideConfig });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data || err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { data, loading, error, execute, setData };
}
