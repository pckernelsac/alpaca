import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';
import { mapArtisanProcesses } from '@/mappers/artisan.mapper';

export function useArtisanProcesses() {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceProvider.cms.getArtisanProcesses();
      setProcesses(mapArtisanProcesses(data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { processes, loading, error, fetch };
}
