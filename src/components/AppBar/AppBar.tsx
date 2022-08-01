import {
  defineComponent
} from 'vue'

import type { PropType } from 'vue'

interface AppList {
  name: string
  iconLocation: string
}

export const appBarTypes = {
  appList: {
    type: Array as PropType<Array<AppList>>,
    default: () => [
      {
        name: '访达',
        iconLocation: 'Finder.webp',
      },
      {
        name: '信息',
        iconLocation: 'Message.webp',
      },
      {
        name: 'FaceTime',
        iconLocation: 'FaceTime.webp',
      },{
        name: '邮件',
        iconLocation: 'Email.webp',
      },{
        name: '地图',
        iconLocation: 'Map.webp',
      },{
        name: '音乐',
        iconLocation: 'Music.webp',
      },{
        name: '浏览器',
        iconLocation: 'Safari.webp',
      },{
        name: '计算器',
        iconLocation: 'Caculator.webp',
      },{
        name: 'App Store',
        iconLocation: 'AppStore.webp',
      },{
        name: 'Siri',
        iconLocation: 'Siri.webp',
      },{
        name: 'Final Cut',
        iconLocation: 'FinalCut.webp',
      },
    ],
  }
}

export type AppBarTypes = typeof appBarTypes

export default defineComponent({
  name: 'AppBar',
  props: appBarTypes,
  setup(props) {

  },
  render() {
    const {
      appList,
    } = this

    return (
      <div class="app-bar dark:app-bar-dark global-transition">
        {appList.map((item) => {
          return (
            <div class="app-bar-item scale-transition hover:global-scale">
              <img 
                class="w-13"
                src={"/appicon/" + item.iconLocation} alt={item.name} />
            </div>
          )
        })}
      </div>
    )
  },
})