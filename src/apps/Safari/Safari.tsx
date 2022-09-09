import { defineComponent, inject, onMounted, } from 'vue'
import type { ExtractPropTypes, } from 'vue'

// import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const safariProps = {}

export type SafariProps = ExtractPropTypes<typeof safariProps>

export default defineComponent({
  name: 'JSafari',
  props: safariProps,
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: () => void }

    onMounted(() => {
      centerWin()
    })
  },
  render() {

    return (
      <div class="safari">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  },
})