import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Hostinger / custom domain root. Use '/repo-name/' only for GitHub project Pages.
  base: '/',
  plugins: [tailwindcss()],
});
