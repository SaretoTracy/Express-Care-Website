import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
   proxy: {
  "/api": {
    target: "https://api.expresscareteam.com",
    changeOrigin: true,
    secure: true,
    cookieDomainRewrite: "localhost",
  },
}
  },
});