import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 新增：服务器配置，指定端口
  server: {
    // port: 5174, // 修改端口号，vue默认端口是5173，这里修改为5174；当设置为0时，vite会自动分配一个可用端口
    port: process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 5174, // 优先读取环境变量
    strictPort: true, // true:如果端口被占用，vite 报错强制退出，而不是自动切换端口
  }
})
