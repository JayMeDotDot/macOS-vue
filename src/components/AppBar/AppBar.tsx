import { defineComponent, onMounted } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'

export interface AppProps {
  name: string
  iconLocation: string
  comp: string
}

export const appBarProps = {
  appList: {
    type: Array as PropType<Array<AppProps>>,
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
      },
    ],
  }
}

export type AppBarProps = ExtractPropTypes<typeof appBarProps>

export default defineComponent({
  name: 'AppBar',
  props: appBarProps,
  emits: ['openApp'],
  setup(props, ctx) {

    function openApp(e: MouseEvent) {
      const element = e.target as HTMLElement
      const comp = element.getAttribute('comp')
      const name = element.getAttribute('alt')
      ctx.emit('openApp', comp, name)
    }

    return {
      openApp,
    }
  },
  render() {
    const {
      appList,
      openApp,
    } = this

    return (
      <div id='app-bar' class="app-bar dark:app-bar-dark theme-transition">
        {appList.map((item) => {
          return (
            <div class="app-bar-item scale-transition hover:app-scale">
              <img 
                id={item.comp + 'Appbar'}
                comp={item.comp}
                class="w-13"
                src={"/appicon/" + item.iconLocation} alt={item.name} 
                onClick={openApp}
              />
            </div>
          )
        })}
      </div>
    )
  },
})