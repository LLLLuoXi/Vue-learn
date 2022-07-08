/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 16:27:40
 * @LastEditors: your name
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  proxy: {
    "/api": {
      target: "http://localhost:3000/api/gdp.json ",
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
})
