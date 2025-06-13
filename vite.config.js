import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx,js,ts}',
    }),
    tailwindcss(),
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
