import { defineComponent, inject } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'

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
  }
} as const

export type RightMenuProps = ExtractPropTypes<typeof rightMenuProps>

export default defineComponent({
  name: 'JRightMenu',
  props: rightMenuProps,
  setup(props) {
    const { toggleRightMenu, updateRMPosition } = inject('rightMenu') as {
      [key: string]: (x?: number, y?: number) => void
    }
    const desktopRightMenu: AppMenu[] = props.menuLists.length
      ? props.menuLists
      : [{ title: '更换桌面背景' }]

    function handleClickOutSider(e: MouseEvent) {
      if (e.button === 0) {
        toggleRightMenu()
      }
      if (e.button === 2) {
        updateRMPosition(e.x, e.y)
      }
    }

    return {
      desktopRightMenu,
      handleClickOutSider
    }
  },
  render() {
    const { desktopRightMenu, x, y, handleClickOutSider } = this

    return (
      <div class="back-layer" onMouseup={handleClickOutSider}>
        <JMenu menuLists={desktopRightMenu} x={x} y={y}></JMenu>
      </div>
    )
  }
})
