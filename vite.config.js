import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 100000000000, // Adjust the chunk size limit to 1000 KB
    assetsInlineLimit: 0
  },
})
