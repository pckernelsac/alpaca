import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// El puerto 3300 no es decorativo: es el origen que el backend tiene en
// CORS_ORIGINS. Cambiarlo obliga a tocar backend/.env.
export default defineConfig({
  plugins: [react()],
  server: { port: 3300 },
  preview: { port: 3300 },
});
