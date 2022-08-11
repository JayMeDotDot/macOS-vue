import {
  defineComponent
} from 'vue'

import type { PropType } from 'vue'

interface AppList {
  name: string
  iconLocation: string
  comp: string
}

export const appBarTypes = {
  appList: {
    type: Array as PropType<Array<AppList>>,
    default: () => [
      {
        name: '访达',
        iconLocation: 'Finder.webp',
        comp: 'Finder',
      },
      {
        name: '信息',
        iconLocation: 'Message.webp',
        comp: 'Message',
      },
      {
        name: 'FaceTime',
        iconLocation: 'FaceTime.webp',
        comp: 'FaceTime',
      },{
        name: '邮件',
        iconLocation: 'Email.webp',
        comp: 'Email',
      },{
        name: '地图',
        iconLocation: 'Map.webp',
        comp: 'Map',
      },{
        name: '音乐',
        iconLocation: 'Music.webp',
        comp: 'Music',
      },{
        name: '浏览器',
        iconLocation: 'Safari.webp',
        comp: 'Safari',
      },{
        name: '计算器',
        iconLocation: 'Calculator.webp',
        comp: 'Calculator',
      },{
        name: 'App Store',
        iconLocation: 'AppStore.webp',
        comp: 'AppStore',
      },{
        name: 'Siri',
        iconLocation: 'Siri.webp',
        comp: 'Siri',
      },{
        name: 'Final Cut',
        iconLocation: 'FinalCut.webp',
        comp: 'FinalCut',
      },
    ],
  }
}

export type AppBarTypes = typeof appBarTypes

export default defineComponent({
  name: 'AppBar',
  props: appBarTypes,
  emits: ['openApp'],
  setup(props, ctx) {

    return {
      ctx,
    }
  },
  render() {
    const {
      appList,
      ctx,
    } = this

    function renderApp(event: MouseEvent) {
      const element = event.target as HTMLElement
      const comp = element.getAttribute('comp')
      ctx.emit('openApp', comp)
    }

    return (
      <div id='app-bar' class="app-bar dark:app-bar-dark theme-transition">
        {appList.map((item) => {
          return (
            <div class="app-bar-item scale-transition hover:app-scale">
              <img 
                id={item.comp}
                comp={item.comp}
                class="w-13"
                src={"/appicon/" + item.iconLocation} alt={item.name} 
                onClick={renderApp}
              />
            </div>
          )
        })}
      </div>
    )
  },
})