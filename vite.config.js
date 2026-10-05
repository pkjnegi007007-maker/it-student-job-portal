import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets resolution on GitHub Pages & custom domains
  server: {
    port: 5173,
    host: true
  }
})
