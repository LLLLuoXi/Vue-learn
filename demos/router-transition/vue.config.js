/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-09 21:22:56
 * @LastEditors: your name
 * @Description: 
 */

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },

  transpileDependencies: true
})
