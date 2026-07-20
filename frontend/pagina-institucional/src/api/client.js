import axios from 'axios';
import { createApiClient } from '@alpacart/shared-api-client';
import { appConfig } from '@/config';
import { getToken, removeToken } from '@/services/auth';

const axiosInstance = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const api = createApiClient(axiosInstance, {
  getToken,
  onUnauthorized: () => {
    removeToken();
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  },
});
