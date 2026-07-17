# R7.1A — Hooks

> **React hooks consuming services**

---

## Location: `src/hooks/`

### Query Pattern (GET)

```js
import { useState, useEffect, useCallback } from 'react';

export function useDomainData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.get();
      setData(mapper(result));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
}
```

### Mutation Pattern (POST)

```js
export function useMutation() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await service.execute(payload);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => { setSuccess(false); setError(null); }, []);

  return { execute, loading, success, error, reset };
}
```

### Available Hooks

| Hook | Returns | Service Used | Mapper |
|------|---------|-------------|--------|
| `useHero()` | `{ slides, loading, error, fetch }` | cmsService.getHeroSlides | mapHeroSlides |
| `useFaq()` | `{ categories, loading, error, fetch }` | cmsService.getFaq | mapFaq |
| `useGallery()` | `{ images, loading, error, fetch }` | cmsService.getGallery | mapGallery |
| `useBenefits()` | `{ benefits, loading, error, fetch }` | cmsService.getBenefits | mapBenefits |
| `useTestimonials()` | `{ testimonials, loading, error, fetch }` | cmsService.getTestimonials | mapTestimonials |
| `useContact()` | `{ send, loading, success, error, reset }` | contactService.send | — |
| `useNewsletter()` | `{ subscribe, loading, success, error, reset }` | newsletterService.subscribe | — |
