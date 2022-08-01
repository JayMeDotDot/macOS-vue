import {
  defineComponent
} from 'vue'

import type { PropType } from 'vue'

interface MenuList {
  title: string
  disabled: boolean
  link: string
  children: Array<ItemList>
}

export const menuTypes = {
  menuList: {
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
        disabled: false,
        link: '',
        children: [],
      },
      {
        title: '最近使用',
        disabled: false,
        link: '',
        children: [],
      },
      {
        title: '重新启动',
        disabled: false,
        link: '',
        children: [],
      },
      {
        title: '关机',
        disabled: false,
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
        children: [],
      },
    ]
  }
}

export type menuTypes = typeof menuTypes

export default defineComponent({})