import { defineComponent, inject, onMounted } from 'vue'
import type { ExtractPropTypes } from 'vue'

// import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const appStoreProps = {}

export type AppStoreProps = ExtractPropTypes<typeof appStoreProps>

export default defineComponent({
  name: 'JAppStore',
  props: appStoreProps,
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: () => void }

    onMounted(() => {
      centerWin()
    })
  },
  render() {
    return (
      <div class="appstore">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  }
})
