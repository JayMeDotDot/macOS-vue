import { 
  defineComponent, 
  reactive,
  ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import { JMenu } from '../Menu'
import type { AppMenu } from '../Menu'

export const rightMenuProps = {
  menuLists: {
    type: Array as PropType<Array<AppMenu>>,
    default: []
  },
  x: { 
    type: Number as PropType<number>, 
    default: 0
  },
  y: { 
    type: Number as PropType<number>, 
    default: 0
  },
} as const

export type RightMenuProps = ExtractPropTypes<typeof rightMenuProps>

export default defineComponent({
  name: 'RightMenu',
  props: rightMenuProps,
  setup(props) {
    const position: {x: number, y: number} = reactive({x: 0, y: 0})
    const show = ref(false)
    const desktopRightMenu: AppMenu[] =
      props.menuLists.length 
        ? props.menuLists
        : [ { title: '更换桌面背景', } ]

    function handleClick(e: MouseEvent) {
      if (e.button === 0) {
        show.value = false
      }
      if (e.button === 2) {
        show.value = true
        position.x = e.x
        position.y = e.y
      }
    }

    return {
      desktopRightMenu,
      position,
      show,
      handleClick,
    }
  },
  render() {
    const {
      desktopRightMenu,
      position,
      show,
      handleClick,
    } = this

    return (
      <div
        class="right-menu-layer"
        onMouseup={handleClick}
      >
        { show 
            ? <JMenu
                menuLists={desktopRightMenu}
                x={position.x}
                y={position.y}
              ></JMenu>
            : null
        }
      </div>
    )
  },
})