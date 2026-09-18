import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        book: resolve(__dirname, 'book.html'),
        links: resolve(__dirname, 'links.html'),
        worksIndex: resolve(__dirname, 'works/index.html'),
      }
    }
  }
});
