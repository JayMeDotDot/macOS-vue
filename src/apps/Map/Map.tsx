import { computed, defineComponent, inject, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const mapProps = {}

export type mapProps = ExtractPropTypes<typeof mapProps>

export default defineComponent({
  name: 'map',
  props: mapProps,
  setup() {
    const { updateOpacity } = inject('winState') as { [key: string]: Function }

    onMounted(() => {
      updateOpacity(false)
    })
  },
  render() {

    return (
      <div class="map">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  },
})