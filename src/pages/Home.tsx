import {
  h,
  defineComponent,
  onMounted,
  reactive,
  ref,
  onUnmounted,
  provide
} from 'vue'

import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/appStore'

import { gSC } from '@/utils'
import type { gSCTypes } from '@/utils'

import { JMenuBar } from '@/components/MenuBar'
import { JAppBar } from '@/components/AppBar'
import { JButton } from '@/components/Button'
import { JSearchBar } from '@/components/SearchBar'
import { JWindow } from '@/components/Window'
import { JRightMenu } from '@/components/RightMenu'

import apps from '@/apps'

export interface CompInfoType {
  id: string
  title: string
  display: boolean
  iconPosition?: { left: number; top: number; width: number; height: number }
}

export interface CompStateProvideType {
  compState: { [key: string]: CompInfoType }
  handleCloseWin: (id: string) => void
}

export interface RightMenuProvideType {
  toggleRightMenu: () => void
  updateRMPosition: (x: number, y: number) => void
}

export default defineComponent({
  name: 'JHome',
  setup() {
    let gSCInstance: gSCTypes
    let appIntance: HTMLElement

    let darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeIcon = ref('i-ic-baseline-light-mode')

    const searchbar = reactive({
      display: false
    })

    const appStore = useAppStore()
    const { getAppBar, getActiveAppMenu } = storeToRefs(appStore)

    const compState: { [key: string]: CompInfoType } = reactive({})
    provide('compState', { compState, handleCloseWin })
    const rightMenu = reactive({ show: false, x: 0, y: 0 })
    function toggleRightMenu(): void {
      rightMenu.show = false
    }
    function updateRMPosition(x: number, y: number): void {
      rightMenu.x = x
      rightMenu.y = y
    }
    provide('rightMenu', { toggleRightMenu, updateRMPosition })

    function toggleTheme() {
      if (!darkTheme) {
        document.documentElement.classList.add('dark')
        themeIcon.value = 'i-ic-baseline-dark-mode color-warmgray-200'
        darkTheme = !darkTheme
      } else {
        document.documentElement.classList.remove('dark')
        themeIcon.value = 'i-ic-baseline-light-mode'
        darkTheme = !darkTheme
      }
    }

    function toggleSearchBar() {
      searchbar.display = !searchbar.display
    }

    function initComp(comp: string, name: string) {
      const iconRect = document
        .querySelector(`#${comp}Appbar`)
        ?.getBoundingClientRect()
      compState[comp] = {
        id: comp,
        title: name,
        display: false,
        iconPosition: {
          left: iconRect?.left || 0,
          top: iconRect?.top || 0,
          width: iconRect?.width || 0,
          height: iconRect?.height || 0
        }
      }
    }

    function handleOpenApp(comp: keyof CompInfoType, name: string) {
      initComp(comp, name)
      compState[comp].display = true
    }

    function handleCloseWin(id: string) {
      compState[id].display = false
    }

    function handleClick(e: MouseEvent) {
      if (e.button === 0) {
        appStore.setActiveComp('desktop')
      }
      if (e.button === 2) {
        rightMenu.show = true
        rightMenu.x = e.x
        rightMenu.y = e.y
      }
    }

    onMounted(() => {
      appIntance = document.querySelector('#app') as HTMLElement
      gSCInstance = gSC(appIntance)
      appIntance.addEventListener('search-bar-toggle', toggleSearchBar)
      gSCInstance.install()
    })

    onUnmounted(() => {
      gSCInstance.uninstall()
      appIntance.removeEventListener('search-bar-toggle', toggleSearchBar)
    })

    return {
      compState,
      getActiveAppMenu,
      getAppBar,
      searchbar,
      rightMenu,
      themeIcon,
      handleOpenApp,
      handleCloseWin,
      handleClick,
      toggleTheme
    }
  },
  render() {
    const {
      compState,
      getActiveAppMenu,
      getAppBar,
      searchbar,
      rightMenu,
      themeIcon,
      handleOpenApp,
      handleCloseWin,
      handleClick,
      toggleTheme
    } = this

    function renderComp(comp: CompInfoType) {
      const { id, title, display } = comp
      if (display) {
        return (
          <JWindow id={id} title={title} onCloseWin={handleCloseWin}>
            {h(apps[`J${id}`])}
          </JWindow>
        )
      }
    }

    return (
      <div>
        <div class="desktop" onMouseup={handleClick}></div>
        {rightMenu.show ? (
          <JRightMenu x={rightMenu.x} y={rightMenu.y}></JRightMenu>
        ) : null}

        <JMenuBar app-menu={getActiveAppMenu}></JMenuBar>

        <JAppBar
          class="fixed bottom-2 right-0 left-0 ma"
          app-list={getAppBar}
          onOpenApp={handleOpenApp}
        ></JAppBar>

        <JButton
          class="fixed bottom-10 right-10"
          circle
          onClick={toggleTheme}
          icon={themeIcon}
        ></JButton>

        {searchbar.display ? <JSearchBar></JSearchBar> : null}

        {Object.keys(compState).map(key => {
          const value = compState[key]
          return renderComp(value)
        })}
      </div>
    )
  }
})
