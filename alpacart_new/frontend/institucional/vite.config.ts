import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// 3101 es el puerto histórico de la institucional y uno de los orígenes que
// CORS_ORIGINS ya acepta en el backend; moverlo obliga a tocar el .env.
export default defineConfig({
  plugins: [react()],
  server: { port: 3101 },
  preview: { port: 3101 },
});
