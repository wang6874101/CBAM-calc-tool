import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 这一行是最关键的，强行纠正国内浏览器的访问路径！
})
