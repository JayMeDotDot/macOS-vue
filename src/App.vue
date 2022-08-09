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
    calculator: {
      display: false,
      fullScreen: false,
    }
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

  function handleAppEvent(event: string) {
    state.calculator.display = true
  }

  function handleWinEvent(event: {windowID:string, type:string}) {
    const target = document.querySelector(`#${event.windowID}`) as HTMLElement
    if (event.type === 'fullWin') {
      if (state.calculator.fullScreen) {
        target.style.transformOrigin = ''
        target.style.transform = ''
        target.style.top = ''
      } else {
        const appbar = document.querySelector('#app-bar') as HTMLElement
        const menubar = document.querySelector('#menu-bar') as HTMLElement
        const scale = (appbar.offsetTop - menubar.offsetHeight) / target.offsetHeight

        target.style.transformOrigin = 'left top'
        target.style.transform = `scale(${scale}) translate(-50%)`
        target.style.top = `${menubar.offsetHeight}px`
        target.style.transitionDuration = '1s'
      }
      state.calculator.fullScreen = !state.calculator.fullScreen
    }
    if (event.type === 'closeWin') {
      state.calculator.display = false
    }
    if (event.type === 'minWin') { console.log('min') }
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

    <JAppBar class="fixed bottom-2 right-0 left-0 ma" @open-app="handleAppEvent"></JAppBar>

    <JButton 
      circle
      :icon="themeIcon"
      @click="switchTheme"
      class="fixed bottom-10 right-10"
    ></JButton>

    <JWindow 
      v-if="state.calculator.display"
      id="Calculator" 
      title="计算器"
      @window="handleWinEvent"
    >
      <JCalculator></JCalculator>
    </JWindow>

    <JSearchBar v-if="state.searchBar"></JSearchBar>
</div>
</template>