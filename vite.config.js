import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 确保这个路径是正确的
      '@dataview/datav-vue3': fileURLToPath(new URL('./node_modules/@dataview/datav-vue3/es/index.mjs', import.meta.url)), // 使用动态解析路径
    }
  },
});

