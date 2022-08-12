import { defineComponent, h, onMounted, onUnmounted } from 'vue'
import type { ExtractPropTypes, PropType, SetupContext } from 'vue'

import { drag } from '../../utils'
import type { dragType } from '../../utils'
// import resize from '../../utils/resize'
// import type { resizeType } from '../../utils/resize'

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

export default defineComponent({
  name: 'Window',
  props: windowProps,
  emit: ['window'],
  setup(props, ctx) {
    const {
      id,
      title,
    } = props

    let winElement : HTMLElement | null
    let excludeElement : HTMLElement | null
    let dragWin : dragType
    // let resizeWin : resizeType

    onMounted(() => {
      winElement = document.querySelector(`#${id}Win`) as HTMLElement
      excludeElement = document.querySelector(`#${id}Content`) as HTMLElement

      excludeElement ? dragWin = drag(winElement, [excludeElement]) : dragWin = drag(winElement)
      // resizeWin = resize(window)

      dragWin.install()
      // resizeWin.install()

      const winRect = winElement.getBoundingClientRect()
      winElement.style.position = 'absolute'
      winElement.style.left = `${(window.innerWidth - winRect.width) / 2}px`
      winElement.style.top = `${(window.innerHeight - winRect.height) / 2}px`
    })

    onUnmounted(() => {
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

    function fullWin() {
      ctx.emit('window', {windowID: id, type: 'fullWin'})
    }

    function closeWin() {
      ctx.emit('window', {windowID : id, type: 'closeWin'})
    }

    function minWin() {
      ctx.emit('window', {windowID: id, type: 'minWin'})
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
      <div id={id + 'Win'} class="window dark:window-dark theme-transition">
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