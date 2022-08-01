import {
  computed,
  defineComponent,
} from 'vue'

import type { PropType } from 'vue'

export const buttonTypes = {
  circle: {
    type: Boolean as PropType<boolean>,
  },
  icon: {
    type: String as PropType<string>,
  }
}

export type ButtonTypes = typeof buttonTypes

export default defineComponent({
  name: 'Button',
  props: buttonTypes,
  setup(props, ctx) {
    const {
      circle,
    } = props

    const buttonStyle = computed(() => {
      let isCircle = circle ? 'rounded-1/2' : ''
      return `jbutton ${isCircle} p-1`
    })

    const IsIcon = computed(() => {
      return (icon, ctx) => {
        if (icon) {
          return <div class={icon}></div>
        }
        return <span>{ctx.slots.default && ctx.slots.default()[0].children}</span>
      }
    })
    
    return {
      buttonStyle,
      ctx,
      IsIcon,
      ctx,
    }
  },
  render() {
    const {
      buttonStyle,
      ctx,
      icon,
      IsIcon,
    } = this

    return (
      <button class={buttonStyle}>
        {IsIcon(icon, ctx)}
      </button>
    )
  },
})