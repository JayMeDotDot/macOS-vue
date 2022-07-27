import {
  defineComponent
} from 'vue'

import type { PropType } from 'vue'

export const menuBarTypes = {
  appName: {
    type: String as PropType<string>,
    default: '访达',
  },
  appMenu: {
    type: Array as PropType<Array<string>>,
    default: () => ['文件', '编辑', '显示', '前往', '窗口', '帮助'],
  },
  systemState: {
    type: Array as PropType<Array<string>>,
    default: () => [
      'i-ic-round-volume-up',
      'i-ic-baseline-bluetooth',
      'i-ic-outline-battery-charging-90 rotate-90',
      'i-ic-baseline-wifi',
    ],
  }
} as const

export type MenuBarTypes = typeof menuBarTypes

export default defineComponent({
  name: 'MenuBar',
  props: menuBarTypes,
  setup(props) {

  },
  render() {
    const {
      appName,
      appMenu,
      systemState,
    } = this

    return (
      <div class="menu-bar">
        <div class="menu-subbar">
          <div class="menu-subbar-item i-ic-baseline-apple text-size-5"></div>
          <div class="menu-subbar-item">{appName}</div>
          {appMenu.map((item) => {
            return (
              <div class="menu-subbar-item">{item}</div>
            )
          })}
        </div>

        <div class="menu-subbar">
          {systemState.map((item) => {
            return (
              <div class={item + " menu-subbar-item text-size-5"}></div>
            )
          })}
          <div
            class="menu-subbar-item"
          >7月24日 12:00</div>
        </div>
    </div>
    )
  },
})