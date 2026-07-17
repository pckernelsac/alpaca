import { createApiClient } from '@alpacart/shared-api-client';
import { appConfig } from '@/config';
import { getToken, removeToken } from '@/services/auth';

export const api = createApiClient(appConfig.apiUrl, {
  timeout: 15000,
  getToken,
  onUnauthorized: () => {
    removeToken();
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  },
});
