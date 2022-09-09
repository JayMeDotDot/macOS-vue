import { computed, defineComponent, inject, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const bookProps = {}

export type BookProps = ExtractPropTypes<typeof bookProps>

export default defineComponent({
  name: 'Book',
  props: bookProps,
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: Function }

    onMounted(() => {
      centerWin(false)
    })
  },
  render() {

    return (
      <div class='book'>
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  },
})