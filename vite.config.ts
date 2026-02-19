import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set to '/your-repo-name/' or '/' for custom domain
  base: '/',
  build: {
    sourcemap: true,
    minify: 'terser',
    cssMinify: true,
  },
  optimizeDeps: {
    include: ['@chakra-ui/react', 'framer-motion']
  }
})