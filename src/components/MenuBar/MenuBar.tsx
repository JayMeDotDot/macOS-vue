import { defineComponent, onUnmounted, reactive, ref, render } from 'vue'
import type {  ExtractPropTypes, PropType } from 'vue'

import router from '@/router'
import { useSysState } from '@/store/sysState'

import JMenu from '../Menu/Menu'
import type { AppMenu } from '../Menu/Menu'

import { formatDay } from '@/utils'

export const menuBarProps = {
  appMenu: {
    type: Array as PropType<Array<AppMenu>>,
    default: () => [
      { title: '访达', },
      { title: '文件', }, 
      { title: '编辑', }, 
      { title: '显示', }, 
      { title: '前往', }, 
      { title: '窗口', }, 
      { title: '帮助', },
    ],
  },
  systemState: {
    type: Array as PropType<Array<string>>,
    default: () => [
      'i-ic-round-volume-up',
      'i-ic-baseline-bluetooth',
      'i-ic-outline-battery-charging-90 rotate-90',
      'i-ic-baseline-wifi',
    ],
  },
} as const

export type MenuBarProps = ExtractPropTypes<typeof menuBarProps>

export default defineComponent({
  name: 'MenuBar',
  props: menuBarProps,
  setup(props) {
    const sysState = useSysState()
    const currentTime = ref(formatDay())
    const trigger = ref('click')
    const showMenu: { [key: string]: boolean } = reactive({})
    const position: {x: number, y: number} = reactive({x: 0, y: 0})
    let preActiveMenu = ''

    const logoMenu: AppMenu[] = [
      { title: '关于本机', fn: () => {}, },
      { title: '系统偏好', fn: () => {}, },
      { title: '最近使用', fn: () => {}, },
      { title: '锁定屏幕', fn: () => { logoutAndRoutTo('login') }, },
      { title: '升级系统', fn: () => { logoutAndRoutTo('update') }, },
      { title: '退出登录', fn: () => { logoutAndRoutTo('login') }, },
    ]

    function logoutAndRoutTo(target: string) {
      sysState.logout
      router.replace({ path: `/${target}`})
    }

    function handleClick(e: MouseEvent) {
      if (trigger.value === 'hover') {
        trigger.value = 'click'
        showMenu[preActiveMenu] = false
        return 
      }
      trigger.value = 'hover'
      handleMouseEnter(e)
    }

    function handleMouseEnter(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (trigger.value === 'hover') {
        const activeMenu = target.getAttribute('data-key')!
        const { left, top } = target.getBoundingClientRect()
        position.x = left
        position.y = top
        showMenu[preActiveMenu] = false
        showMenu[activeMenu] = true
        preActiveMenu = activeMenu
      }
    }

    const intervalID = setInterval(() => {
      currentTime.value = formatDay()
    }, 60000)

    onUnmounted(() => {
      clearInterval(intervalID)
    })

    return {
      currentTime,
      logoMenu,
      position,
      showMenu,
      handleClick,
      handleMouseEnter,
    }
  },
  render() {
    const {
      appMenu,
      currentTime,
      logoMenu,
      position,
      showMenu,
      systemState,
      handleClick,
      handleMouseEnter,
    } = this

    function renderMenu(menulist: AppMenu[], position: {x: number, y: number}) {
      return(
        <div class="absolute left-0">
          <JMenu
            menu-lists={menulist}
            x={position.x}
            y={position.y}
          ></JMenu>
        </div>
      )
    }

    return (
      <div id="menu-bar" class="menu-bar">
        <div 
          class="menu-subbar"
          onClick={handleClick}
        >

          <div>
            <div 
              class="menu-subbar-item i-ic-baseline-apple"
              onMouseenter={handleMouseEnter}
              data-key='logo'
            ></div>
            {showMenu.logo ? renderMenu(logoMenu, position) : null}
          </div>

          {appMenu.map((item) => {
            if (item.options) {
              if (showMenu[item.title]) {
                return (
                  <div>
                    <div 
                      class="menu-subbar-item"
                      data-key={item.title}
                      onMouseenter={handleMouseEnter}
                    >
                      {item.title}
                    </div>
                    {renderMenu(item.options, position)}
                  </div>
                )
              }
              return (
                <div>
                  <div 
                    class="menu-subbar-item" 
                    data-key={item.title}
                    onMouseenter={handleMouseEnter}
                  >{item.title}</div>
                </div>
              )
            }
            return (
              <div class="menu-subbar-item">{item.title}</div>
            )
          })}
        </div>

        <div class="menu-subbar">
          {systemState.map((item) => {
            return (
              <div class={item + " menu-subbar-item"}></div>
            )
          })}
          <div
            class="menu-subbar-item"
          >{currentTime}</div>
        </div>
      </div>
    )
  },
})