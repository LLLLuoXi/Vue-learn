/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-03 00:44:15
 * @LastEditors: your name
 * @Description: 
 */
// tailwind.config.js
module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    width: ["responsive", "hover", "focus"]
  },
  plugins: [],
}

