export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export class ValidationError extends Error {
  constructor(errors) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message || 'Error de conexión');
    this.name = 'NetworkError';
  }
}

export class BusinessError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'BusinessError';
    this.code = code;
  }
}

export class NotFoundError extends Error {
  constructor(resource = 'Recurso') {
    super(`${resource} no encontrado`);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'No autorizado') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
