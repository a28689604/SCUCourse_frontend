import tailwindcss from "@tailwindcss/postcss";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx,js,ts}",
    }),
    tailwindcss(),
  ],
  publicDir: "public",
  // If you need path aliases like CRA's `NODE_PATH=src`, add:
  resolve: {
    alias: { "@": "/src" },
  },
  server: {
    port: 3000, // Use port 3000 to match CRA default
    open: true, // Automatically open browser
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  build: {
    // Optimize build for performance
    target: "es2015",
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ["react", "react-dom"],
          firebase: ["firebase/app", "firebase/analytics"],
          mui: ["@mui/material", "@mui/icons-material"],
          router: ["react-router-dom"],
          charts: ["recharts"],
          ui: ["react-select", "swiper"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@mui/material",
      "@mui/icons-material",
      "firebase/app",
      "firebase/analytics",
      "react-router-dom",
    ],
  },
});
