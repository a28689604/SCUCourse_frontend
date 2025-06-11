import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx,js,ts}',
    }),
  ],
  publicDir: 'public',
  // If you need path aliases like CRA's `NODE_PATH=src`, add:
  resolve: {
    alias: { '@': '/src' },
  },
  server: {
    port: 3000, // Use port 3000 to match CRA default
    open: true, // Automatically open browser
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
});
