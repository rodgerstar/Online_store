import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5713,
    proxy: {
      "paypal": "https://127.0.0.1:3000",
    },
  },
})
