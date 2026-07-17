import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const packagesDir = path.resolve(__dirname, '../../packages');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@alpacart/shared-types': path.resolve(packagesDir, 'shared-types/src'),
      '@alpacart/shared-utils': path.resolve(packagesDir, 'shared-utils/src'),
      '@alpacart/shared-constants': path.resolve(packagesDir, 'shared-constants/src'),
      '@alpacart/shared-api-client': path.resolve(packagesDir, 'shared-api-client/src'),
      '@alpacart/shared-ui': path.resolve(packagesDir, 'shared-ui/src'),
      '@alpacart/shared-hooks': path.resolve(packagesDir, 'shared-hooks/src'),
      '@alpacart/shared-domain': path.resolve(packagesDir, 'shared-domain/src'),
      '@alpacart/shared-observability': path.resolve(packagesDir, 'shared-observability/src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@context': path.resolve(__dirname, './src/context'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@guards': path.resolve(__dirname, './src/guards'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@config': path.resolve(__dirname, './src/config'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
});