# R7.1BV — Hooks Validation

> **Verificación de consistencia en todos los hooks**

---

## Estado Final

| Hook | ServiceProvider | Loading | Error | Empty State | Refetch | 
|------|----------------|---------|-------|-------------|---------|
| useHero | ✅ | ✅ | ✅ | ✅ (empty array) | ✅ fetch() |
| useFaq | ✅ | ✅ | ✅ | ✅ (empty array) | ✅ fetch() |
| useGallery | ✅ | ✅ | ✅ | ✅ (empty array) | ✅ fetch() |
| useBenefits | ✅ | ✅ | ✅ | ✅ (empty array) | ✅ fetch() |
| useArtisanProcesses | ✅ | ✅ | ✅ | ✅ (empty array) | ✅ fetch() |
| useTestimonials | ✅ | ✅ | ✅ | ✅ (empty array) | ✅ fetch() |
| useContact | ✅ | ✅ | ✅ | N/A (mutation) | ✅ send() |
| useNewsletter | ✅ | ✅ | ✅ | N/A (mutation) | ✅ subscribe() |

## Patrón Unificado

```js
export function useDomainData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceProvider.service.method();
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

## Pendiente (baja prioridad)

- AbortController para cancelar requests en desmontaje
- useCallback con dependencias explícitas (actualmente `[]` es correcto porque fetch no depende de props)
