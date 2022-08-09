import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
} from 'vue'

import type { 
  PropType,
  SetupContext,
} from 'vue'

import drag from '../../utils/drag'
import type { dragType } from '../../utils/drag'
// import resize from '../../utils/resize'
// import type { resizeType } from '../../utils/resize'

export const windowTypes = {
  id: {
    type: String as PropType<string>,
    default: 'window',
  },
  title: {
    type: String as PropType<string>,
    default: 'Window',
  },
} as const

export type WindowTypes = typeof windowTypes

export default defineComponent({
  name: 'Window',
  props: windowTypes,
  emit: ['window'],
  setup(props, ctx) {
    const {
      id,
      title,
    } = props

    let window : HTMLElement | null
    let excludeElement : HTMLElement | null
    let dragWin : dragType
    // let resizeWin : resizeType

    onMounted(() => {
      console.log('mounted')
      window = document.querySelector(`#${id}Win`) as HTMLElement
      excludeElement = document.querySelector(`#${id}Content`) as HTMLElement

      excludeElement ? dragWin = drag(window, [excludeElement]) : dragWin = drag(window)
      // resizeWin = resize(window)

      dragWin.install()
      // resizeWin.install()
    })

    onUnmounted(() => {
      console.log('unmounted')
      dragWin.uninstall()
      // resizeWin.uninstall()
    })

    return {
      ctx,
      id,
      title,
    }
  },
  render() {
    const {
      ctx,
      id,
      title,
    } = this

    const windowID = `${id}Win`

    function fullWin() {
      ctx.emit('window', {windowID, type: 'fullWin'})
    }

    function closeWin() {
      ctx.emit('window', {windowID, type: 'closeWin'})
    }

    function minWin() {
      ctx.emit('window', {windowID, type: 'minWin'})
    }

    function renderComp(ctx: SetupContext) {
      if (ctx.slots.default) {
        return h('div', {
          id: `${id}Content`,
          class: 'window-content',
        }, ctx.slots.default())
      }
    }

    return (
      <div id={id + 'Win'} class="window dark:window-dark item-center theme-transition">
        <div class="window-bar">
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
      </div>
    )
  },
})