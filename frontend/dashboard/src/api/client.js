import axios from 'axios';
import { createApiClient } from '@alpacart/shared-api-client';
import { getToken, removeToken } from '@/services/auth';

export const api = createApiClient(axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
}), {
  getToken,
  onUnauthorized: () => { removeToken(); window.location.href = '/login'; },
});
