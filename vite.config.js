import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // IMPORTANT: The base path must match your GitHub Repository name exactly for assets to load.
  // Repository: https://github.com/Shiminize/pollmaster -> Base: '/pollmaster/'
  base: '/pollmaster/',
})
