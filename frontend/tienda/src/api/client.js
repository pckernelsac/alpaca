import axios from 'axios';
import { createApiClient } from '@alpacart/shared-api-client';
import { appConfig } from '@/config';
import { getToken, removeToken } from '@/services/auth';

export const api = createApiClient(axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
}), {
  getToken,
  onUnauthorized: () => {
    removeToken();
    // No redirect aquí — los hooks manejan 401 (ej: carrito usa localStorage como fallback)
  },
});
