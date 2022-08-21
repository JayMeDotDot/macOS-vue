import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import 'uno.css'

createApp(App)
  .use(createPinia())
  .mount('#app')
