import { computed, defineComponent, inject, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const appleTVProps = {}

export type AppleTVProps = ExtractPropTypes<typeof appleTVProps>

export default defineComponent({
  name: 'AppleTV',
  props: appleTVProps,
  setup() {
    const { updateOpacity } = inject('winState') as { [key: string]: Function }

    onMounted(() => {
      updateOpacity(false)
    })
  },
  render() {

    return (
      <div class="apptv">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  },
})