import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


// A regular Vite app: the page imports compositions from ../src and plays them with <ScrollPlayer>.
export default defineConfig({
  plugins: [react()],
  publicDir: '../public',
});
