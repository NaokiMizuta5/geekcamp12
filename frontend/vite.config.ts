import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import Pages from 'vite-plugin-pages';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    proxy: command === 'serve' ? {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    } : undefined
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}));
