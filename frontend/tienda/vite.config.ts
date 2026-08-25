import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// En produccion las tres apps comparten un solo dominio y se separan por ruta:
// la institucional en la raiz, esta en /tienda y el panel en /panel. `base` es
// lo que hace que los assets se pidan a /tienda/assets/... y no a /assets/...,
// donde vive la institucional.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Solo al compilar: `base` tambien aplica al servidor de desarrollo, y ahi
  // moveria la app a localhost:3200/tienda/, que no es lo que documenta ESTADO.md.
  base: command === 'build' ? '/tienda/' : '/',
  server: { port: 3200 },
  preview: { port: 3200 },
}));
