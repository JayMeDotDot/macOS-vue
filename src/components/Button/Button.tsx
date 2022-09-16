import { computed, defineComponent, h } from 'vue'
import type { ExtractPropTypes, PropType, SetupContext } from 'vue'

export const buttonProps = {
  circle: {
    type: Boolean as PropType<boolean>
  },
  icon: {
    type: String as PropType<string>
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export default defineComponent({
  name: 'JButton',
  props: buttonProps,
  setup(props, ctx) {
    const buttonStyle = computed(() => {
      const isCircle = props.circle ? 'rounded-1/2' : ''
      return `jbutton ${isCircle} p-1 theme-transition`
    })

    const IsIcon = computed(() => {
      return (icon: string | undefined, ctx: SetupContext) => {
        if (icon) {
          return <div class={icon}></div>
        }
        if (ctx.slots.default) {
          return h('div', { class: 'flex' }, ctx.slots.default())
        }
      }
    })

    return {
      buttonStyle,
      ctx,
      IsIcon
    }
  },
  render() {
    const { buttonStyle, ctx, icon, IsIcon } = this

    return <button class={buttonStyle}>{IsIcon(icon, ctx)}</button>
  }
})
