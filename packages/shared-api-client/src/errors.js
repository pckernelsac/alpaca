export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(errors) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export function mapHttpError(error) {
  if (!error.response) {
    return new NetworkError('No se pudo conectar con el servidor');
  }
  const { status, data } = error.response;
  const message = data?.message || error.message;
  if (status === 400) return new ValidationError(data?.message || []);
  if (status === 401) return new ApiError(401, 'Sesión expirada. Inicia sesión nuevamente.');
  if (status === 403) return new ApiError(403, 'No tienes permisos para esta acción.');
  if (status === 404) return new ApiError(404, 'Recurso no encontrado.');
  if (status === 409) return new ApiError(409, data?.message || 'Conflicto al procesar la solicitud.');
  if (status === 429) return new ApiError(429, 'Demasiadas solicitudes. Intenta más tarde.');
  return new ApiError(status, message || 'Error del servidor');
}
