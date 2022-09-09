import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, type Rule } from 'unocss'

import { shortcuts, rules } from './src/theme'

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
        ...rules as Rule<Record<string, unknown>>[]
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
