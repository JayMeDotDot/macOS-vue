import { defineComponent, h, onMounted, onUnmounted, } from 'vue'
import type { ExtractPropTypes, PropType, } from 'vue'

import type { AppMenu } from '@/components/Menu'
import { JCoder, JScientific, JStandard } from './index'


import { useAppStore } from '@/store/appStore'

export const calculatorProps = {
  calType: {
    type: String as PropType<'standard' | 'scientific' | 'coder'>,
    default: 'standard',
  }
}

export type CalculatorProps = ExtractPropTypes<typeof calculatorProps>

export default defineComponent({
  name: 'Calculator',
  props: calculatorProps,
  setup() {
    const menuList: AppMenu[] = [
      {
        title: '计算机',
        disabled: false,
        options: [
          { title: '关于计算机', },
          { title: '退出计算机', }
        ],
      },
      {
        title: '显示',
        disabled: false,
        options: [
          { title: '标准型', },
          { title: '科学型', disabled: false, },
          { title: '程序员型', disabled: false, },
        ],
      }
    ]
    const appStore = useAppStore()
    appStore.mountApp('Calculator', menuList)

    onMounted(() => {
      const winElement = document.querySelector('#CalculatorWin') as HTMLElement
      const winRect = winElement.getBoundingClientRect()
      winElement.style.position = 'absolute'
      winElement.style.left = `${(window.innerWidth - winRect.width) / 2}px`
      winElement.style.top = `${(window.innerHeight - winRect.height) / 2}px`
    })

    onUnmounted(() => {
      appStore.unmountApp()
    })

    return {}
  },
  render() {
    const {
      calType,
    } = this
    
    return (
      <div class='calculator'>
        {calType === 'standard' ? h(JStandard) : null}
        {calType === 'scientific' ? h(JScientific) : null}
        {calType === 'coder' ? h(JCoder) : null}
      </div>
    )
  },
})