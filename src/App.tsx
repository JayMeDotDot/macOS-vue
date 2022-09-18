import { defineComponent, onMounted } from 'vue'

import { RouterView } from 'vue-router'

import { usePreferredDark } from '@vueuse/core'

export default defineComponent({
  name: 'App',
  setup() {
    const isDark = usePreferredDark()

    onMounted(() => {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  },
  render() {
    return <RouterView></RouterView>
  }
})
