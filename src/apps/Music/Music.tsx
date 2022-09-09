import { defineComponent, inject, onMounted, } from 'vue'
import type { ExtractPropTypes } from 'vue'

// import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const musicProps = {}

export type MusicProps = ExtractPropTypes<typeof musicProps>

export default defineComponent({
  name: 'Music',
  props: musicProps,
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: () => void }

    onMounted(() => {
      centerWin()
    })
  },
  render() {

    return (
      <div class="music">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  },
})