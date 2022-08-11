<script lang="ts" setup>
  import {
    defineAsyncComponent,
    onMounted,
    reactive,
    ref,
    onUnmounted,
  } from 'vue'

  import type {
    StyleValue,
  } from 'vue'

  import {
    flip,
    gSC,
  } from './utils'

  import type {
    gSCTypes,
  } from './utils'

  import { JMenuBar } from './components/MenuBar'
  import { JAppBar } from './components/AppBar'
  import type { AppBarTypes } from './components/AppBar'
  import { JButton } from './components/Button'
  import { JSearchBar } from './components/SearchBar'
  import { JWindow } from './components/Window'
  // import { JCalculator } from './components/Calculator'

  const JCalculator = defineAsyncComponent(() => 
    import('./components/Calculator').then(({ JCalculator }) => JCalculator)
  )

  let gSCInstance : gSCTypes
  let appIntance : HTMLElement

  interface CompInfoType {
    id: string
    display: boolean
    fullScreen?: boolean
    position?: [number, number, number, number]
  }

  let theme = true
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  const themeIcon = ref('i-ic-baseline-light-mode')

  const state: { [key: string]: CompInfoType } = reactive({
    SearchBar: {
      id: 'SearchBar',
      display: false,
    },
  })
  let appList = reactive([
    { name: '计算机', iconLocation: 'Calculator.webp', comp: 'Calculator'},
  ])

  function switchTheme() {
    if (themeMedia.matches) {
      document.documentElement.classList.add('dark')
      themeIcon.value = 'i-ic-baseline-dark-mode color-warmgray-200'
      theme = false
    } else {
      document.documentElement.classList.remove('dark')
      themeIcon.value = 'i-ic-baseline-light-mode'
      theme = true
    }
  }

  function toggleTheme() {
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
    state.SearchBar.display = !state.SearchBar.display
  }

  function initComp(comp: string) {
    state[comp] = {
      id: comp,
      display: true,
      fullScreen: false,
      position: [0,0,0,0],
    }
  }

  function handleAppEvent(comp: keyof Object) {
    state[comp] ? state[comp].display = true : initComp(comp)
  }

  function handleWinEvent(event: {windowID:string, type:string}) {
    const { windowID, type } = event
    const target = document.querySelector(`#${windowID}`) as HTMLElement
    if (type === 'fullWin') {
      if (state.Calculator.fullScreen) {
        const options = { width: '', height: '', top: '' , left: '' }

        flip(target, options)
      } else {
        const appbar = document.querySelector('#app-bar') as HTMLElement
        const menubar = document.querySelector('#menu-bar') as HTMLElement

        const winRect = target.getBoundingClientRect()
        const appbarRect = appbar.getBoundingClientRect()
        const menubarRect = menubar.getBoundingClientRect()

        const options: StyleValue = {}
        const scale = (appbarRect.top - menubarRect.height) / winRect.height

        options.width = `${winRect.width * scale}px`
        options.height = `${winRect.height * scale}px`
        options.top = `${menubarRect.height}px`
        options.left = `${(window.innerWidth - winRect.width * scale) / 2}px`

        flip(target, options)
      }

      state.Calculator.fullScreen = !state.Calculator.fullScreen
    }
    if (type === 'closeWin') {
      state.Calculator.display = false
    }
    if (type === 'minWin') { console.log('min') }
  }

  onMounted(() => {
    if (themeMedia.matches) {
      theme = true
      switchTheme()
    }

    appIntance = document.querySelector('#app') as HTMLElement
    gSCInstance = gSC(appIntance)
    appIntance.addEventListener('search-bar-toggle', toggleSearchBar)
    themeMedia.addEventListener('change', switchTheme)
    gSCInstance.install()

  })

  onUnmounted(() => {
    gSCInstance.uninstall()
    appIntance.removeEventListener('search-bar-toggle', toggleSearchBar)
    themeMedia.removeEventListener('change', switchTheme)
  })

</script>

<template>
<div>
    <JMenuBar></JMenuBar>

    <JAppBar
      class="fixed bottom-2 right-0 left-0 ma" 
      :app-list = "appList"
      @open-app="handleAppEvent"
    ></JAppBar>

    <JButton 
      circle
      :icon="themeIcon"
      @click="toggleTheme"
      class="fixed bottom-10 right-10"
    ></JButton>



    <!-- <JWindow 
      v-if="state.Calculator.display"
      id="Calculator" 
      title="计算器"
      @window="handleWinEvent"
    >
      <JCalculator></JCalculator>
    </JWindow> -->

    <JSearchBar v-if="state.SearchBar.display"></JSearchBar>
</div>
</template>