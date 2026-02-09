import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3099,
    allowedHosts: ['99techtest.gopost.vn', 'www.99techtest.gopost.vn'],
  },
})
