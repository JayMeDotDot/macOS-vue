import { computed, defineComponent, h } from 'vue'
import type { ExtractPropTypes, PropType, SetupContext } from 'vue'

export const buttonProps = {
  circle: {
    type: Boolean as PropType<boolean>,
  },
  icon: {
    type: String as PropType<string>,
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  setup(props, ctx) {
    const {
      circle,
    } = props

    const buttonStyle = computed(() => {
      let isCircle = circle ? 'rounded-1/2' : ''
      return `jbutton ${isCircle} p-1`
    })

    const IsIcon = computed(() => {
      return (icon: String|undefined, ctx: SetupContext) => {
        if (icon) {
          return <div class={icon}></div>
        }
        if (ctx.slots.default) {
          return h('div', {class: 'flex'}, ctx.slots.default())
        }
      }
    })
    
    return {
      buttonStyle,
      ctx,
      IsIcon,
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