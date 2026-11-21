import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Required for GitHub Pages project site: https://mubashir-akz.github.io/crystal-web/
  base: '/crystal-web/',
  plugins: [tailwindcss()],
});
