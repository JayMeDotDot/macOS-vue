import { defineComponent, ref } from "vue"
import type { ExtractPropTypes, PropType } from "vue"



export const popProps = {
  trigger: {
    type: String as PropType<'click' | 'hover' | 'manual'>,
    default: 'hover',
  },
  options: {},
  show: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
} as const

export type PopProps = ExtractPropTypes<typeof popProps>

export default defineComponent({
  name: 'PopOver',
  props: popProps,
  setup(props) {

    const showMenu = ref(props.show)

    function handleMouseLeave() {
      showMenu.value = false
    }
    function handleMouseEnter() {
      showMenu.value = true
    }
    function handleClick() {}
    function handleClickOutside() {}

    return {
      showMenu,
      handleClick,
      handleClickOutside,
      handleMouseLeave,
      handleMouseEnter,
    }
  },
  render() {
    const {
      showMenu,
      handleClick,
      handleClickOutside,
      handleMouseEnter,
      handleMouseLeave,
    } = this

    function renderContent() {
      if (showMenu) {
        return (<div>Ime</div>)
      } 
      return null
    }

    return (
    <div
      onMouseenter={handleMouseEnter}
      onMouseleave={handleMouseLeave}
    >
      {this.$slots.default?.()}
      {renderContent()}
    </div>
    )
  },
})