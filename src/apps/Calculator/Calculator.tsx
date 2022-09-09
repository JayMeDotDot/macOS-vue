import { defineComponent, inject, onMounted, onUnmounted, ref } from 'vue'
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
  name: 'JCalculator',
  props: calculatorProps,
  setup(props) {
    const calType = ref(props.calType)
    const { centerWin } = inject('winState') as { [key: string]: () => void }
    const { handleCloseWin } = inject('compState') as { [key: string]: (id: string) => void }

    const menuList: AppMenu[] = [
      {
        title: '计算机',
        disabled: false,
        options: [
          { title: '关于计算机', },
          { title: '退出计算机', fn: () => handleCloseWin('Calculator'), },
        ],
      },
      {
        title: '显示',
        disabled: false,
        options: [
          { title: '标准型', fn: () => { calType.value = 'standard' }, },
          { title: '科学型', fn: () => { calType.value = 'scientific' }, },
          { title: '程序员型', fn: () => { calType.value = 'coder' }, },
        ],
      }
    ]
    const appStore = useAppStore()
    appStore.mountApp('Calculator', menuList)

    onMounted(() => {
      centerWin()
    })

    onUnmounted(() => {
      appStore.unmountApp()
    })

    return {
      calType,
    }
  },
  render() {
    const {
      calType,
    } = this
    
    return (
      <div class='calculator'>
        {calType === 'standard' ? <JStandard></JStandard> : null}
        {calType === 'scientific' ? <JScientific></JScientific> : null}
        {calType === 'coder' ? <JCoder></JCoder> : null}
      </div>
    )
  },
})