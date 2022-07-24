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
} as const

export type MenuBarTypes = typeof menuBarTypes

export default defineComponent({
  name: 'MenuBar',
  props: menuBarTypes,
  // setup(props) {
  //   // return () => (
  //   //   <div>
  //   //     <div>Logo</div>
  //   //     <div>AppName</div>
  //   //     <div>AppMenu</div>
  //   //   </div>
  //   // )
  // },
  render() {
    const {
      appName,
      appMenu,
    } = this

    return (
      <div class="menu-bar dark:menu-bar-dark">
        <span >
          <div>Logo111</div>
          <div>{appName}</div>
          {appMenu.map((item) => {
            return (
              <div>{item}</div>
            )
          })}
        </span>
        <span>
          <div>tail</div>
        </span>
    </div>
    )
  },
})