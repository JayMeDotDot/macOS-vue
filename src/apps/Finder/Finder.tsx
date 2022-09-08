import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
} from 'vue'

import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

import { useAppStore } from '@/store/appStore'

export default defineComponent({
  name: 'Finder',
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: Function }

    const menuList: AppMenu[] = [
      {
        title: '访达',
        options: [
          { title: '关于访达', fn: () => {}, },
        ]
      },
      { title: '文件', }, 
      { title: '编辑', }, 
      { title: '显示', }, 
      { title: '前往', }, 
      { title: '窗口', }, 
      { title: '帮助', },
    ]

    const appStore = useAppStore()
    appStore.mountApp('Finder', menuList)

    onMounted(() => {
      centerWin()
    })

    onUnmounted(() => {
      appStore.unmountApp()
    })
  },
  render() {
    return (
      <div class="finder">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  },
})