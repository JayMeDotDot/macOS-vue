import { defineComponent } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'

interface MenuList {
  title: string
  disabled: boolean
  link: string
  children: Array<MenuList>
}

export const menuProps = {
  menuLists: {
    type: Array as PropType<Array<MenuList>>,
    default: () => [
      {
        title: '关于本机',
        disabled: false,
        link: '',
        children: [],
      },
      {
        title: '系统偏好',
        disabled: true,
        link: '',
        children: [],
      },
      {
        title: '锁定屏幕',
        disabled: false,
        link: '',
        children: [],
      },
      {
        title: '退出登录',
        disabled: false,
        link: '',
        children: [{
          title: '退出登录1',
          disabled: false,
          link: '',
          children: [],
        }],
      },
    ]
  }
} as const

export type MenuProps = ExtractPropTypes<typeof menuProps>

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup() {},
  render() {
    const {
      menuLists,
    }  = this

    function renderMenu(items: MenuList[]) {
      return (
        items.map((item) => {
          return (
            <div>
              <div class="siblings:hover:text-red">{item.title}</div>
              {item.children.length ? renderMenu(item.children) : null}
            </div>
          )
        })
      )
    }

    return (
      <div class="text-white">
        {renderMenu(menuLists)}
      </div>
    )
  },
})