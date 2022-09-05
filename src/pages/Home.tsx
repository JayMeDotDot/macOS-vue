import { 
  h,
  defineComponent, 
  onMounted,
  reactive,
  ref,
  onUnmounted,
  provide,
} from "vue"

import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/appStore"

import { gSC } from '@/utils'
import type { gSCTypes } from "@/utils"

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
  iconPosition?: {left: number, top: number, width: number, height: number}
}

export default defineComponent({
  name: 'Home',
  setup() {
    let gSCInstance : gSCTypes
    let appIntance : HTMLElement

    let darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeIcon = ref('i-ic-baseline-light-mode')

    const searchbar = reactive({
      display: false,
    })

    const appStore = useAppStore()
    const { getAppBar, getActiveAppMenu } = storeToRefs(appStore)

    const compState: { [key: string]: CompInfoType } = reactive({})
    provide('compState', { compState })

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
      const iconRect = document.querySelector(`#${comp}Appbar`)!.getBoundingClientRect()
      compState[comp] = {
        id: comp,
        title: name,
        display: false,
        iconPosition: {
          left: iconRect.left,
          top: iconRect.top,
          width: iconRect.width,
          height: iconRect.height,
        }
      }
    }

    function handleOpenApp(comp: keyof Object, name: string) {
      initComp(comp, name)
      compState[comp].display = true
    }

    function handleCloseWin(id: string) {
      compState[id].display = false
    }

    function handleClick(e: MouseEvent) {
      console.log(e.button)
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
      themeIcon,
      handleOpenApp,
      handleCloseWin,
      handleClick,
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
      handleOpenApp,
      handleCloseWin,
      handleClick,
      toggleTheme,
    } = this

    function renderComp(comp: CompInfoType ) {
      const { id, title, display } = comp
      if (display) {
        return (
          <JWindow
            id={id}
            title={title}
            onCloseWin={handleCloseWin}
          >
            {h(apps[`J${id}`])}
          </JWindow>
        )
      }
    }

    return (
      <div onClick={handleClick}>
        <JRightMenu></JRightMenu>

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
  },
})