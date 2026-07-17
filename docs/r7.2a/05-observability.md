# R7.2A — Observability

> **Logger y métricas de rendimiento compartidos**

---

## Package: `@alpacart/shared-observability`

**Ubicación:** `packages/shared-observability/src/`

### Logger

```js
import { logger } from '@alpacart/shared-observability';

logger.debug('Fetching products', { page: 1 });
logger.info('User logged in');
logger.warn('Rate limit approaching', { hits: 95 });
logger.error('API request failed', { status: 500 });
```

**Formato:** `[ALPACART] [2026-07-17T12:00:00.000Z] [INFO] message`

**Niveles controlados por:** `VITE_LOG_LEVEL` env var

### Performance

```js
import { startPerformanceMark } from '@alpacart/shared-observability';

const end = startPerformanceMark('product-list-render');
// ... expensive operation
end(); // logs: ⏱ product-list-render: 45.2ms
```

Usa `performance.mark()` y `performance.measure()` del browser.
