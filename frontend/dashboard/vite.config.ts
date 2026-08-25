import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// En produccion las tres apps comparten un solo dominio y se separan por ruta:
// la institucional en la raiz, la tienda en /tienda y esta en /panel. `base` es
// lo que hace que los assets se pidan a /panel/assets/... En desarrollo el
// puerto 3300 sigue siendo el origen que el backend acepta en CORS_ORIGINS.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Solo al compilar: `base` tambien aplica al servidor de desarrollo, y ahi
  // moveria el panel a localhost:3300/panel/, que no es lo que documenta ESTADO.md.
  base: command === 'build' ? '/panel/' : '/',
  server: { port: 3300 },
  preview: { port: 3300 },
}));
