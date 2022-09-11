import { computed, defineComponent, h, inject, onMounted, onUnmounted, provide, reactive, toRefs, } from 'vue'
import type { ExtractPropTypes, PropType, SetupContext, StyleValue } from 'vue'

import { drag, flip } from '../../utils'
import type { dragType } from '../../utils'

import { useAppStore } from "@/store/appStore"
import { storeToRefs } from 'pinia'
import type { CompStateProvideType } from '@/pages/Home'

export const windowProps = {
  id: {
    type: String as PropType<string>,
    default: 'window',
  },
  title: {
    type: String as PropType<string>,
    default: 'Window',
  },
} as const

export type WindowProps = ExtractPropTypes<typeof windowProps>

export interface WinInfoType {
  id: string
  title: string
  fullScreen: boolean
  minScreen: boolean
  show: boolean
  position?: {left: number, top: number, width: number, height: number}
  miniPosition?: {left: number, top: number, width: number, height: number}
  fullPosition?: {left: number, top: number, width: number, height: number}
}

export default defineComponent({
  name: 'JWindow',
  props: windowProps,
  emit: ['closeWin'],
  setup(props, ctx) {
    const {
      id,
      title,
    } = toRefs(props)

    const { compState } = inject('compState') as CompStateProvideType
    const appStore = useAppStore()
    const { getActiveComp } = storeToRefs(appStore)

    let winElement : HTMLElement
    let excludeElement : HTMLElement | null
    let dragWin : dragType
    
    const winState: WinInfoType = reactive({
      id,
      title,
      show: false,
      fullScreen: false,
      minScreen: false,
    })
    provide('winState', { centerWin })

    const classList = computed(() => {
      return [
        'window dark:window-dark theme-transition',
        winState.show ? '' : 'opacity-0',
        getActiveComp.value === id.value ? 'z-1' : '',
        ]
    })

    function centerWin() {
      const winElement = document.querySelector(`#${winState.id}Win`) as HTMLElement
      const winRect = winElement.getBoundingClientRect()
      winElement.style.position = 'absolute'
      winElement.style.left = `${(window.innerWidth - winRect.width) / 2}px`
      winElement.style.top = `${(window.innerHeight - winRect.height) / 2}px`
      winState.show = true
    }

    function setWinPosition() {
      if (!winState.position || !(winState.fullScreen || winState.minScreen)) {
        const winRect = winElement.getBoundingClientRect()
        winState.position = {
          width: winRect.width,
          height: winRect.height,
          left: winRect.left,
          top: winRect.top,
        }
      }
      if (winState.fullScreen) {
        const winRect = winElement.getBoundingClientRect()
        winState.fullPosition = {
          width: winRect.width,
          height: winRect.height,
          left: winRect.left,
          top: winRect.top,
        }
      }
    }

    function reSetFullPosition() {
      const appbar = document.querySelector('#app-bar') as HTMLElement
      const menubar = document.querySelector('#menu-bar') as HTMLElement
      const appbarRect = appbar.getBoundingClientRect()
      const menubarRect = menubar.getBoundingClientRect()
      const winRect = winElement.getBoundingClientRect()
      const scale = (appbarRect.top - menubarRect.height) / winRect.height
      winState.fullPosition = {
        width: winRect.width * scale,
        height: winRect.height * scale,
        top: menubarRect.height,
        left: (window.innerWidth - winRect.width * scale) / 2,
      }
    }

    function fullWin() {
      setWinPosition()
      if (winState.fullScreen) {
        const options: StyleValue = {
          width: winState.position!.width + 'px',
          height: winState.position!.height + 'px',
          left: winState.position!.left + 'px',
          top: winState.position!.top + 'px',
        }
        flip(winElement, options)
      } else {
        if (!winState.fullPosition) { reSetFullPosition() }

        const options: StyleValue = {
          width: winState.fullPosition!.width + 'px',
          height: winState.fullPosition!.height + 'px',
          left: winState.fullPosition!.left + 'px',
          top: winState.fullPosition!.top  + 'px',
        }
        flip(winElement, options)
      }
      winState.fullScreen = !winState.fullScreen
    }

    function minWin(e: MouseEvent) {
      setWinPosition()
      if (winState.minScreen) {
        flip(winElement, { transform: '', opacity: '' })
      } else {
        let options: StyleValue = {}
        if (winState.fullScreen) {
          const scaleX = compState[id.value].iconPosition!.width / winState.fullPosition!.width
          const scaleY = compState[id.value].iconPosition!.height / winState.fullPosition!.height
          
          const deltaX = compState[id.value].iconPosition!.left + compState[id.value].iconPosition!.width / 2 - (winState.fullPosition!.left + winState.fullPosition!.width / 2)
          const deltaY = compState[id.value].iconPosition!.top + compState[id.value].iconPosition!.height / 2 - (winState.fullPosition!.top + winState.fullPosition!.height / 2)
          options = {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
            opacity: 0,
          }
        } else {
          const scaleX = compState[id.value].iconPosition!.width / winState.position!.width
          const scaleY = compState[id.value].iconPosition!.height / winState.position!.height
          
          const deltaX = compState[id.value].iconPosition!.left + compState[id.value].iconPosition!.width / 2 - (winState.position!.left + winState.position!.width / 2)
          const deltaY = compState[id.value].iconPosition!.top + compState[id.value].iconPosition!.height / 2 - (winState.position!.top + winState.position!.height / 2)
          options = {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
            opacity: 0,
          }
        }
        flip(winElement, options)
        appStore.setActiveComp('desktop')
        e.stopPropagation()
      }
      winState.minScreen = !winState.minScreen
    }

    function closeWin(e: MouseEvent) {
      ctx.emit('closeWin', id.value )
      e.stopPropagation()
    }

    function handleMouseDown() {
      appStore.setActiveComp(id.value)
    }

    function handleDbClick() {
      reSetFullPosition()
      fullWin()
    }

    onMounted(() => {
      winElement = document.querySelector(`#${id.value}Win`) as HTMLElement
      excludeElement = document.querySelector(`#${id.value}Content`) as HTMLElement

      excludeElement ? dragWin = drag(winElement, [excludeElement]) : dragWin = drag(winElement)

      dragWin.install()
    })

    onUnmounted(() => {
      dragWin.uninstall()
    })

    return {
      ctx,
      classList,
      id,
      title,
      winState,
      fullWin,
      minWin,
      closeWin,
      handleMouseDown,
      handleDbClick,
    }
  },
  render() {
    const {
      ctx,
      classList,
      id,
      title,
      winState,
      closeWin,
      fullWin,
      minWin,
      handleMouseDown,
      handleDbClick,
    } = this

    function renderComp(ctx: SetupContext) {
      if (ctx.slots.default) {
        return h('div', {
          id: `${id}Content`,
          class: 'window-content',
        }, ctx.slots.default())
      }
    }

    function renderCover() {
      return (
        <div class="absolute left-0 right-0 w-100% h-100%" onClick={minWin}>
        </div>
      )
    }

    return (
      <div 
        id={id + 'Win'} 
        class={classList.join(' ')}
        onMousedown={handleMouseDown}
      >
        <div class="window-bar" onDblclick={handleDbClick}>
          <span class="children:children:hover:opacity-100">
            <button
              class="bg-red rounded-1/2 text-size-3 border-none m-1"
            >
              <div class="i-ic-baseline-close opacity-0 transition-opacity duration-300" onClick={closeWin}></div>
            </button>
            <button
              class="bg-yellow rounded-1/2 text-size-3 border-none m-1"
            >
              <div class="i-ic-baseline-minus opacity-0 transition-opacity duration-300" onClick={minWin}></div>
            </button>
            <button
              class="bg-green rounded-1/2 text-size-3 border-none m-1"
            >
              <div class="i-ic-round-open-in-full opacity-0 transition-opacity duration-300" onClick={fullWin}></div>
            </button>
          </span>

          <div class="window-title item-center">{title}</div>
        </div>
        {renderComp(ctx)}
        {winState.minScreen ? renderCover() : ''}
      </div>
    )
  },
})