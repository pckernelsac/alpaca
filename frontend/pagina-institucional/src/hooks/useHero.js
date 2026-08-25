import { useState, useEffect, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';
import { mapHeroSlides } from '@/mappers/hero.mapper';

export function useHero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceProvider.cms.getHeroSlides();
      setSlides(mapHeroSlides(data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { slides, loading, error, fetch };
}
