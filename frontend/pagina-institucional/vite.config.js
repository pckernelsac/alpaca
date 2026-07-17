import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
const packagesDir = path.resolve(__dirname, '../../packages');


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@alpacart/shared-types': path.resolve(packagesDir, 'shared-types/src'),
      '@alpacart/shared-utils': path.resolve(packagesDir, 'shared-utils/src'),
      '@alpacart/shared-constants': path.resolve(packagesDir, 'shared-constants/src'),
      '@alpacart/shared-api-client': path.resolve(packagesDir, 'shared-api-client/src'),
      '@alpacart/shared-ui': path.resolve(packagesDir, 'shared-ui/src'),
      '@alpacart/shared-hooks': path.resolve(packagesDir, 'shared-hooks/src'),
      '@alpacart/shared-domain': path.resolve(packagesDir, 'shared-domain/src'),
      '@alpacart/shared-observability': path.resolve(packagesDir, 'shared-observability/src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3101,
  },
});

