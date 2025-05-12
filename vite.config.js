import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  // 👇 esta parte es la importante
  resolve: {
    alias: {
      // tus alias si tenés
    },
  },
  // 👇 esto es lo que permite rutas con React Router en producción
  base: '/',
});

