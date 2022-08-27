import { 
  defineAsyncComponent,
  defineComponent, 
  onMounted,
  reactive,
  ref,
  onUnmounted
} from "vue"
import type { CSSProperties, StyleValue } from "vue"

import { storeToRefs } from "pinia"
import { appStore } from "@/store/appStore"

import { flip, gSC } from '@/utils'
import type { gSCTypes } from "@/utils"

import { JMenuBar } from '@/components/MenuBar'
import { JAppBar } from '@/components/AppBar'
import { JButton } from '@/components/Button'
import { JSearchBar } from '@/components/SearchBar'
import { JWindow } from '@/components/Window'
import type { WindowProps } from '@/components/Window'
import { JRightMenu } from '@/components/RightMenu'

const JFinder = defineAsyncComponent(() => 
  import('@/app/Finder').then(({ JFinder }) => JFinder)
)
const JCalculator = defineAsyncComponent(() => 
  import('@/app/Calculator').then(({ JCalculator }) => JCalculator)
)

interface CompInfoType {
  id: string
  title?: string
  display: boolean
  fullScreen: boolean
  minScreen: boolean
  position?: CSSProperties
  minPosition?: CSSProperties
  fullPosition?: CSSProperties
}

export default defineComponent({
  name: 'Home',
  setup() {
    let gSCInstance : gSCTypes
    let appIntance : HTMLElement

    let theme = true
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
    const themeIcon = ref('i-ic-baseline-light-mode')

    const searchbar = reactive({
      display: false,
    })

    const apps = appStore()
    const compState: { [key: string]: CompInfoType } = reactive({})
    const { getAppBar, getActiveAppMenu } = storeToRefs(apps)

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
      searchbar.display = !searchbar.display
    }

    function initComp(comp: string, name?: string) {
      compState[comp] = {
        id: comp,
        title: name,
        display: false,
        fullScreen: false,
        minScreen: false,
      }
    }

    function handleAppEvent(comp: keyof Object, name: string) {
      if (compState[comp]) {
        if (compState[comp].minScreen) {
          handleWinEvent({type: 'minWin', winProps: {id:comp, title:name}})
        }
      } else {
        initComp(comp, name)
      }
      compState[comp].display = true
    }

    function handleWinEvent(event:{ type: string, winProps: WindowProps }) {
      const { type, winProps } = event
      const target = document.querySelector(`#${winProps.id}Win`) as HTMLElement

      if (!compState[winProps.id].position) {
        const winRect = target.getBoundingClientRect()

        compState[winProps.id].position = {
              width: winRect.width + 'px',
              height: winRect.height + 'px',
              left: winRect.left + 'px',
              top: winRect.top + 'px',
            }
      }

      if (type === 'fullWin') {
        if (compState[winProps.id].fullScreen) {
          const options: StyleValue = {
            width: compState[winProps.id].position?.width,
            height: compState[winProps.id].position?.height,
            left: compState[winProps.id].position?.left,
            top: compState[winProps.id].position?.top,
          }

          flip(target, options)
        } else {
          if (!compState[winProps.id].fullScreen) {
            const appbar = document.querySelector('#app-bar') as HTMLElement
            const menubar = document.querySelector('#menu-bar') as HTMLElement
            const appbarRect = appbar.getBoundingClientRect()
            const menubarRect = menubar.getBoundingClientRect()
            const winRect = target.getBoundingClientRect()
            const scale = (appbarRect.top - menubarRect.height) / winRect.height
            compState[winProps.id].fullPosition = {
              width: winRect.width * scale + 'px',
              height: winRect.height * scale + 'px',
              top: menubarRect.height + 'px',
              left: (window.innerWidth - winRect.width * scale) / 2  + 'px',
            }
          }

          const options: StyleValue = {
            width: compState[winProps.id].fullPosition?.width,
            height: compState[winProps.id].fullPosition?.height,
            left: compState[winProps.id].fullPosition?.left,
            top: compState[winProps.id].fullPosition?.top,
          }

          flip(target, options)
        }

        compState.Calculator.fullScreen = !compState.Calculator.fullScreen
      }
      if (type === 'closeWin') {
        initComp(winProps.id, winProps.title)
      }
      if (type === 'minWin') {
        if (compState[winProps.id].minScreen) {
          const options: StyleValue = {}
          if (compState[winProps.id].fullScreen) {
            options.top = compState[winProps.id].fullPosition?.top
          } else {
            options.top = compState[winProps.id].position?.top
          }

          flip(target, options)
        } else {
          if (!compState[winProps.id].minPosition) {
            compState[winProps.id].minPosition = {
              top: window.innerHeight + 10 + 'px'
            }
          }

          const options: StyleValue = {
            top: compState[winProps.id].minPosition?.top
          }

          flip(target, options)
        }
        compState[winProps.id].minScreen = !compState[winProps.id].minScreen
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

    return {
      compState,
      getActiveAppMenu,
      getAppBar,
      searchbar,
      themeIcon,
      handleAppEvent,
      handleWinEvent,
      toggleTheme,
    }
  },
  render() {
    const {
      compState,
      getActiveAppMenu,
      getAppBar,
      searchbar,
      themeIcon,
      handleAppEvent,
      handleWinEvent,
      toggleTheme,
    } = this

    function renderComp(comps: { [key: string]: CompInfoType }) {
      for (let comp in comps) {
        if (comps[comp].display) {
          return (
            <JWindow
              id={comps[comp].id}
              title={comps[comp].title}
              onWindow={handleWinEvent}
            >
              <JCalculator></JCalculator>
            </JWindow>
          )
        }
      }
    }

    return (
      <div>
        <JRightMenu></JRightMenu>

        <JMenuBar app-menu={getActiveAppMenu}></JMenuBar>

        <JAppBar
          class="fixed bottom-2 right-0 left-0 ma"
          app-list={getAppBar}
          onOpenApp={handleAppEvent}
        ></JAppBar>

        <JButton
          class="fixed bottom-10 right-10"
          circle
          onClick={toggleTheme}
          icon={themeIcon}
        ></JButton>

        {searchbar.display ? <JSearchBar></JSearchBar> : null}

        {renderComp(compState)}

      </div>
    )
  },
})