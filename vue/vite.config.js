// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config
export default defineConfig({
  optimizeDeps: {
    exclude: ['@apsonex-email-builder/core'], // add to remove error: Outdated Optimize Dep
  },
  plugins: [
    tailwindcss(),
    vue(),
  ],
  esbuild: {
    jsx: 'automatic',
  },
  define: {
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
  },
});
