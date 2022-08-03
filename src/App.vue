<script lang="ts" setup>
  import {
    onMounted,
    reactive,
    ref,
    onUnmounted,
  } from 'vue'

  import gSC from './utils/globalShortCuts'
  import type { gSCTypes } from './utils/globalShortCuts'

  import { JMenuBar } from './components/MenuBar'
  import { JAppBar } from './components/AppBar'
  import { JButton } from './components/Button'
  import { JSearchBar } from './components/SearchBar'
  import { JWindow } from './components/Window'
  import { JCalculator } from './components/Calculator'

  let gSCInstance : gSCTypes
  let appIntance : HTMLElement

  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches
  let themeIcon = ref('i-ic-baseline-light-mode')
  let state = reactive({
    searchBar: false,
  })

  function switchTheme() {
    if (theme) {
      document.documentElement.classList.add('dark')
      themeIcon.value = 'i-ic-baseline-dark-mode color-warmgray-200'
      theme = false
    } else {
      document.documentElement.classList.remove('dark')
      themeIcon.value = 'i-ic-baseline-light-mode'
      theme = true
    }
  }

  function toggleSearchBar() {
    state.searchBar = !state.searchBar
  }

  onMounted(() => {
    switchTheme()

    appIntance = document.querySelector('#app') as HTMLElement
    gSCInstance = gSC(appIntance)
    appIntance.addEventListener('search-bar-toggle', toggleSearchBar)
    gSCInstance.install()

  })

  onUnmounted(() => {
    gSCInstance.uninstall()
    appIntance.removeEventListener('search-bar-toggle', toggleSearchBar)
  })

</script>

<template>
<div>
    <JMenuBar></JMenuBar>

    <JAppBar class="fixed bottom-2 right-0 left-0 ma"></JAppBar>

    <JButton 
      circle
      :icon="themeIcon"
      @click="switchTheme"
      class="fixed bottom-10 right-10"
    ></JButton>

    <JWindow>
      
    </JWindow>

    <JSearchBar v-if="state.searchBar"></JSearchBar>
</div>
</template>