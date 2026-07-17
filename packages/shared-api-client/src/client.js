import { mapHttpError } from './errors';

export function createApiClient(axiosInstance, options = {}) {
  const { getToken = () => null, onUnauthorized = () => {} } = options;

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) onUnauthorized();
      return Promise.reject(mapHttpError(error));
    },
  );

  function extractData(response) {
    const body = response.data;
    if (body && typeof body === 'object' && 'success' in body) {
      return body.data !== undefined ? body.data : body;
    }
    return body;
  }

  return {
    get:      async (url, cfg) => extractData(await axiosInstance.get(url, cfg)),
    post:     async (url, data, cfg) => extractData(await axiosInstance.post(url, data, cfg)),
    put:      async (url, data, cfg) => extractData(await axiosInstance.put(url, data, cfg)),
    patch:    async (url, data, cfg) => extractData(await axiosInstance.patch(url, data, cfg)),
    delete:   async (url, cfg) => extractData(await axiosInstance.delete(url, cfg)),
    getMeta:  async (url, cfg) => {
      const res = await axiosInstance.get(url, cfg);
      const body = res.data;
      return body && typeof body === 'object' && 'success' in body
        ? { data: body.data, meta: body.meta }
        : { data: body };
    },
  };
}
