import { defineComponent } from 'vue'

import { RouterView } from 'vue-router'

import { usePreferredDark } from '@vueuse/core'

export default defineComponent({
  name: 'App',
  setup() {
    const isDark = usePreferredDark()

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  render() {
    return <RouterView></RouterView>
  }
})
