import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';

// Build every top-level HTML page (index + cleaning-services-*.html location pages).
const pages = readdirSync(new URL('.', import.meta.url))
  .filter((file) => file.endsWith('.html'))
  .map((file) => [file.replace(/\.html$/, ''), fileURLToPath(new URL(file, import.meta.url))]);

export default defineConfig({
  // Hostinger / custom domain root. Use '/repo-name/' only for GitHub project Pages.
  base: '/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages),
    },
  },
});
