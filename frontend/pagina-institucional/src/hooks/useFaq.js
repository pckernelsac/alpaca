import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';
import { mapFaq } from '@/mappers/faq.mapper';

export function useFaq() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceProvider.cms.getFaq();
      setCategories(mapFaq(data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading, error, fetch };
}
