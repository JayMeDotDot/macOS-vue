import { 
  computed,
  defineComponent, 
  reactive, 
} from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'

export interface AppMenu {
  title: string
  disabled?: boolean
  options?: Array<AppMenu>
}

export const menuProps = {
  menuLists: {
    type: Array as PropType<Array<AppMenu>>,
    default: () => []
  },
  x: { 
    type: Number as PropType<number>, 
    default: 0
  },
  y: { 
    type: Number as PropType<number>, 
    default: 0
  },
} as const

export type MenuProps = ExtractPropTypes<typeof menuProps>

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup() {
    const showSubMenu: {
      [key: string]: boolean
    } = reactive({})

    const subMenuPosition: {x: number, y: number} = reactive({x: 0, y: 0})

    function handleMouseEnter(e: MouseEvent) {
      const target = e.target as HTMLElement
      const { width } = target.getBoundingClientRect()
      subMenuPosition.x = width + 4
      showSubMenu[target.getAttribute('data-key')!] = true
    }

    function handleMouseLeave(e: MouseEvent) {
      const target = e.target as HTMLElement
      showSubMenu[target.getAttribute('data-key')!] = false
    }

    return {
      showSubMenu,
      subMenuPosition,
      handleMouseEnter,
      handleMouseLeave,
    }
  },
  render() {
    const {
      menuLists,
      x,
      y,
      showSubMenu,
      subMenuPosition,
      handleMouseLeave,
      handleMouseEnter,
    }  = this

    function calPositionClass(x?: number, y?: number): string {
      if (x && y) return `left:${x}px; top:${y}px`
      if (x) return `left:${x}px`
      if (y) return `top:${y}px`
      return ''
    }

    function renderSubMenu(item: AppMenu, x: number, y: number) {
      if (showSubMenu[item.title]) {
        return (
          <div class="absolute left-0">
            {renderMenu(item.options!, x, y)}
          </div>
        )
      }
    }

    function renderMenu(items: AppMenu[], x?: number, y?: number) {
      const menuPosition = calPositionClass(x, y)

      return (
        <div class="absolute" style={menuPosition}>
          <div class="menu dark:menu-dark theme-transition">
            {items.map((item) => {
              if (item.disabled) {
                return (
                  <div class="menu-item">
                    <span class="text-disabled">{item.title}</span>
                  </div>
                )
              }
              if (item.options?.length) {
                return (
                    <div 
                    class="menu-item hover:item-hover" 
                    data-key={item.title}
                    onMouseenter={handleMouseEnter}
                    onMouseleave={handleMouseLeave}
                    >
                      <span>{item.title}</span>
                      <div class="i-ic-round-keyboard-arrow-right text-size-5"></div>
                      {renderSubMenu(item, subMenuPosition.x, subMenuPosition.y)}
                    </div>
                )
              }
              return (
                <div class="menu-item hover:item-hover">
                  <span>{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div class="menu-layer">
        {renderMenu(menuLists, x, y)}
      </div>
    )
  },
})