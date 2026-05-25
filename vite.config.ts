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
        cookieDomainRewrite: {
          "api.expresscareteam.com": "localhost",
        },
        // Strip the Secure flag so cookies work over HTTP in dev
        cookiePathRewrite: {
          "*": "/",
        },
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('[proxy error]', err);
          });

          proxy.on('proxyReq', (_, req) => {
            console.log('[proxy req]', req.method, req.url);
          });

          // Strip Secure flag from all Set-Cookie headers
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[proxy res]', proxyRes.statusCode, req.url);

            const setCookieHeader = proxyRes.headers['set-cookie'];

            if (setCookieHeader) {
              proxyRes.headers['set-cookie'] = setCookieHeader.map(
                (cookie: string) =>
                  cookie
                    .replace(/;\s*Secure/gi, '')     // remove Secure flag
                    .replace(/;\s*SameSite=None/gi, '; SameSite=Lax') // fix SameSite
              );
            }
          });
        },
      },
    },
  },
});