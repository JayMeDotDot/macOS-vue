import { defineComponent, onMounted, onUnmounted } from "vue"

import { RouterView } from "vue-router"

export default defineComponent({
  name: 'App',
  setup() {
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')

    function switchTheme() {
      if (themeMedia.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    onMounted(() => {
      switchTheme()
      themeMedia.addEventListener('change', switchTheme)
    })
    onUnmounted(() => {
      themeMedia.removeEventListener('change', switchTheme)
    })
  },
  render() {
    return (
      <RouterView></RouterView>
    )
  },
})