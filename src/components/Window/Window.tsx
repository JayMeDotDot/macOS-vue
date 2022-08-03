import {
  defineComponent,
  onMounted,
  onUnmounted,
} from 'vue'

import type { PropType } from 'vue'

import drag from '../../utils/drag'

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
  setup(props, ctx) {
    const {
      id,
      title,
    } = props

    let window : HTMLElement | null

    onMounted(() => {
      window = document.querySelector(`#${id}`) as HTMLElement
      window ? drag(window).install() : null
    })

    onUnmounted(() => {
      window ? drag(window).uninstall() : null
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

    return (
      <div id={id} class="window dark:window-dark item-center global-transition" draggable>
        <div class="window-bar">
          <button
            class="bg-red rounded-1/2 text-size-3 border-none m-1"
          >
            <div class="i-ic-baseline-close opacity-0 hover:opacity-100"></div>
          </button>
          <button
            class="bg-yellow rounded-1/2 text-size-3 border-none m-1"
          >
            <div class="i-ic-baseline-minus opacity-0 hover:opacity-100"></div>
          </button>
          <button
            class="bg-green rounded-1/2 text-size-3 border-none m-1"
          >
            <div class="i-ic-round-open-in-full opacity-0 hover:opacity-100"></div>
          </button>

          <div class="window-title">{title}</div>
        </div>
        <div class="window-content">
          123456
        </div>
      </div>
    )
  },
})