import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/westernwhere/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
