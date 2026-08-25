# R7.1A — ApiClient

> **Shared HTTP client package**

---

## Package: `@alpacart/shared-api-client`

**Location:** `packages/shared-api-client/`

### Files

| File | Purpose |
|------|---------|
| `src/index.js` | Public exports |
| `src/client.js` | `createApiClient()` factory |
| `src/errors.js` | Error classes + mapper |

### `createApiClient(baseURL, options)`

```js
const api = createApiClient('http://localhost:8000/api/v1', {
  timeout: 15000,
  getToken: () => localStorage.getItem('auth_token'),
  onUnauthorized: () => { window.location.href = '/login'; },
});
```

### Extracted Response Shape

ApiClient automatically unwraps the NestJS `{ success, data }` envelope:

```js
// Backend returns:
{ "success": true, "data": { "id": 1, "title": "Slide" } }

// ApiClient returns:
{ "id": 1, "title": "Slide" }
```

### Methods

| Method | Description |
|--------|-------------|
| `api.get(url, config?)` | GET request, returns unwrapped data |
| `api.post(url, data, config?)` | POST request, returns unwrapped data |
| `api.put(url, data, config?)` | PUT request |
| `api.patch(url, data, config?)` | PATCH request |
| `api.delete(url, config?)` | DELETE request |
| `api.getMeta(url, config?)` | GET returns `{ data, meta }` for paginated endpoints |

### Instance (Institucional)

**File:** `src/api/client.js`

```js
import { createApiClient } from '@alpacart/shared-api-client';
import { appConfig } from '@/config';
import { getToken, removeToken } from '@/services/auth';

export const api = createApiClient(appConfig.apiUrl, {
  getToken,
  onUnauthorized: () => { removeToken(); window.location.href = '/login'; },
});
```
