import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',       // 讓外部裝置或 IP 可訪問
    port: 3333,            // 你要的 port
    strictPort: true,      // 若 3333 被佔用則報錯
    cors: true             // 可選，若已處理 CORS 可以不加
  }
});