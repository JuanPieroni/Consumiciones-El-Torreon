import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true, // se abre solo en el navegador al terminar el build
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    chunkSizeWarningLimit: 500, // opcional: lo dejás igual si querés
  }
});
