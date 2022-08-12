<script lang="ts" setup>
  import { defineAsyncComponent, onMounted, reactive, ref, onUnmounted } from 'vue'
  import type { StyleValue } from 'vue'

  import { flip, gSC } from './utils'
  import type { gSCTypes } from './utils'

  import { JMenuBar } from './components/MenuBar'
  import { JAppBar } from './components/AppBar'
  import type { AppBarProps } from './components/AppBar'
  import { JButton } from './components/Button'
  import { JSearchBar } from './components/SearchBar'
  import { JWindow } from './components/Window'

  const JCalculator = defineAsyncComponent(() => 
    import('./components/Calculator').then(({ JCalculator }) => JCalculator)
  )

  let gSCInstance : gSCTypes
  let appIntance : HTMLElement

  interface CompInfoType {
    id: string
    title?: string
    display: boolean
    fullScreen?: boolean
    position: { top: number, left: number, width: number, height: number}
    minPosition: { top: number, left: number, width: number, height: number}
  }

  let theme = true
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  const themeIcon = ref('i-ic-baseline-light-mode')

  const searchbar = reactive({
    display: false,
  })
  const compState: { [key: string]: CompInfoType } = reactive({})
  let appList: AppBarProps['appList'] = reactive([
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
    compState.SearchBar.display = !compState.SearchBar.display
  }

  function initComp(comp: string, name?: string) {
    compState[comp] = {
      id: comp,
      title: name,
      display: true,
      fullScreen: false,
      position: {width: 0, height: 0, left: 0, top: 0},
      minPosition: {width: 0, height: 0, left: 0, top: 0},
    }
  }

  function handleAppEvent(comp: keyof Object, name: string) {
    compState[comp] ? compState[comp].display = true : initComp(comp, name)

    const icon = document.querySelector(`#${comp}Appbar`) as HTMLElement
    const iconRect = icon.getBoundingClientRect()
    compState[comp].minPosition = {
      width: iconRect.width,
      height: iconRect.height,
      top: iconRect.top,
      left: iconRect.left,
    }

  }

  function handleWinEvent(event:{windowID: string, type: string }) {
    const { windowID, type } = event
    const target = document.querySelector(`#${windowID}Win`) as HTMLElement
    if (type === 'fullWin') {
      if (compState[windowID].fullScreen) {
        const options: StyleValue = {
          width: compState[windowID].position.width + 'px',
          height: compState[windowID].position.height + 'px',
          left: compState[windowID].position.left + 'px',
          top: compState[windowID].position.top + 'px',
        }

        flip(target, options)
      } else {
        const appbar = document.querySelector('#app-bar') as HTMLElement
        const menubar = document.querySelector('#menu-bar') as HTMLElement

        const winRect = target.getBoundingClientRect()
        const appbarRect = appbar.getBoundingClientRect()
        const menubarRect = menubar.getBoundingClientRect()

        const scale = (appbarRect.top - menubarRect.height) / winRect.height

        const options: StyleValue = {
          width: `${winRect.width * scale}px`,
          height: `${winRect.height * scale}px`,
          top: `${menubarRect.height}px`,
          left: `${(window.innerWidth - winRect.width * scale) / 2}px`,
        }

        compState[windowID].position = {
          width: winRect.width,
          height: winRect.height,
          left: winRect.left,
          top: winRect.top,
        }

        flip(target, options)
      }

      compState.Calculator.fullScreen = !compState.Calculator.fullScreen
    }
    if (type === 'closeWin') {
      compState[windowID].display = false
    }
    if (type === 'minWin') {
      const options = {

      }
    }
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

    <JSearchBar v-if="searchbar.display"></JSearchBar>


    <div v-for="comp of compState">
      <JWindow
        v-if="comp.display"
        :id="comp.id"
        :title="comp.title"
        @window="handleWinEvent"
      >
        <JCalculator></JCalculator>
      </JWindow>
    </div>

</div>
</template>