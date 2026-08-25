# ICC-01 — Integration Contract Certification
# Auth Contract — ALPACART

> **Certificación del contrato de autenticación**

---

## 1. Endpoints de Auth

### POST /auth/login (Staff)
| Aspecto | Valor |
|---------|-------|
| Ruta | `POST /api/v1/auth/login` |
| Request | `{ email: string, password: string, remember?: boolean }` |
| Response | `{ success: true, data: { accessToken: string, user: User } }` |
| Auth | @Public (sin token) |
| JWT type | `staff` |
| JWT payload | `{ sub: user.id, type: 'staff', role: user.role.name }` |
| Expiración | 24h (default) o 7d (remember) |

### POST /auth/customer-login (Customer)
| Aspecto | Valor |
|---------|-------|
| Ruta | `POST /api/v1/auth/customer-login` |
| Request | `{ email: string, password: string }` |
| Response | `{ success: true, data: { accessToken: string, customer: Customer } }` |
| Auth | @Public (sin token) |
| JWT type | `customer` |
| JWT payload | `{ sub: customer.id, type: 'customer' }` |
| Expiración | 7d |

### GET /auth/me
| Aspecto | Valor |
|---------|-------|
| Ruta | `GET /api/v1/auth/me` |
| Auth | Bearer token (staff o customer) |
| Response (staff) | `{ success: true, data: { id, name, email, role, status, ... } }` |
| Response (customer) | `{ success: true, data: { id, firstName, lastName, email, ... } }` |
| 401 | `{ statusCode: 401, message: "Unauthorized" }` |

### POST /auth/register
| Aspecto | Valor |
|---------|-------|
| Ruta | `POST /api/v1/auth/register` |
| Request | body:any (sin DTO conectado) |
| Auth | @Public |

---

## 2. JWT Tokens

| Propiedad | Staff | Customer |
|-----------|-------|----------|
| type | `'staff'` | `'customer'` |
| sub | user.id (UUID) | customer.id (UUID) |
| role | admin/manager/staff | N/A |
| iat | timestamp | timestamp |
| exp | 24h (7d con remember) | 7d |

### Decodificado:
```json
// Staff
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "type": "staff",
  "role": "admin",
  "iat": 1721174400,
  "exp": 1721260800
}

// Customer
{
  "sub": "660e8400-e29b-41d4-a716-446655440001",
  "type": "customer",
  "iat": 1721174400,
  "exp": 1721779200
}
```

---

## 3. Authorization

### Header:
```
Authorization: Bearer <jwt_token>
```

### Guards:
```typescript
// Global (app.module.ts):
{ provide: APP_GUARD, useClass: ActorGuard }     // Roles por tipo de usuario
{ provide: APP_GUARD, useClass: ThrottlerGuard }  // Rate limiting

// Decorators:
@Public()                    // Bypass total de auth
@StaffOnly()                 // Solo type='staff'
@CustomerOnly()              // Solo type='customer'
@Actor('staff', 'customer') // Ambos tipos
```

---

## 4. Refresh Token y Logout

| Funcionalidad | Estado | Clasificación para R7 |
|--------------|--------|----------------------|
| Refresh Token | ❌ No implementado | **NON-BLOCKING** para R7.1, R7.2, R7.3 |
| Logout (token revocation) | ❌ No implementado | **NON-BLOCKING** para R7.1, R7.2, R7.3 |
| Forgot Password | ❌ No implementado | **NON-BLOCKING** (funcionalidad adicional) |
| Reset Password | ❌ No implementado | **NON-BLOCKING** (funcionalidad adicional) |

**Justificación NON-BLOCKING:**
- El token JWT tiene expiración finita (24h/7d)
- Sin refresh token, el usuario debe reloguearse al expirar
- Aceptable para MVP, mejora post-MVP
- Tabla `sessions` y `password_resets` existen pero no tienen endpoints

---

## 5. Frontend Auth Integration

### Servicio de Auth común (los 3 frontends):
```javascript
// services/auth/index.js
export const auth = {
  getToken: () => localStorage.getItem('auth_token'),
  setToken: (token) => localStorage.setItem('auth_token', token),
  removeToken: () => localStorage.removeItem('auth_token'),
  getUser: () => JSON.parse(localStorage.getItem('auth_user') || '{}'),
  setUser: (user) => localStorage.setItem('auth_user', JSON.stringify(user)),
  isAuthenticated: () => !!localStorage.getItem('auth_token'),
  logout: () => { removeToken(); removeUser(); redirect('/login'); }
};
```

### Interceptor 401:
```javascript
// Interceptor compartido (inst y tienda):
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      auth.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 6. Auth Contract Score

| Dimensión | Score | Observación |
|-----------|-------|-------------|
| Staff login | ✅ 100% | LoginDto conectado, validado |
| Customer login | ✅ 100% | LoginDto reutilizado, validado |
| GET /me (staff) | ✅ 100% | Funcional |
| GET /me (customer) | ✅ 100% | Funcional |
| JWT dual type | ✅ 100% | staff/customer diferenciado |
| Bearer scheme | ✅ 100% | Estándar |
| 401 response | ✅ 100% | Consistente |
| 403 (actor mismatch) | ✅ 100% | ForbiddenException |
| Rate limiting | ✅ 100% | 3 perfiles + Redis |
| Register (customer) | ⚠️ 50% | DTO existe, no conectado |
| Refresh Token | ❌ 0% | NON-BLOCKING |
| Logout | ❌ 0% | NON-BLOCKING |
| Frontend 401 redirect | ✅ 100% | Interceptor en inst + tienda |

**Auth Contract Score:** **85/100**
