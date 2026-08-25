# R7.1A — Interceptors

> **Request/response pipeline**

---

## Request Interceptor

```js
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
```

**Behavior:**
- Injects Bearer token from `getToken()` callback
- Passes through if no token
- Non-blocking for public endpoints (backend will return 401)

## Response Interceptor

```js
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      onUnauthorized();
    }
    return Promise.reject(mapHttpError(error));
  },
);
```

**Behavior:**
- 401 status triggers `onUnauthorized()` (token cleanup + redirect)
- All errors are mapped via `mapHttpError()` before rejection
- Components receive typed `ApiError` / `NetworkError` / `ValidationError`

## Envelope Extraction

The ApiClient automatically unwraps `{ success, data }` responses:

```js
// Backend: { "success": true, "data": { "id": 1 } }
// ApiClient.get() returns: { "id": 1 }

// Backend (paginated): { "success": true, "data": [...], "meta": {...} }
// ApiClient.get() returns: [...]  (data only)
// ApiClient.getMeta() returns: { data: [...], meta: {...} }
```
