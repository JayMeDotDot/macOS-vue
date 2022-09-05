import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

import { shortcuts } from './theme'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],
      shortcuts: [
        {...shortcuts}
      ],
      rules: [
        ['search-bar-shadow', { 'box-shadow': '18px 18px 30px rgba(0, 0, 0, 0.2), -18px 18px 30px rgba(0, 0, 0, 0.2)'}]
      ]
    }),
    vue(),
    vueJsx(), 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr: true,
  }
})
