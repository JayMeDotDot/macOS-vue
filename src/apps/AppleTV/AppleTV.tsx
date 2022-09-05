import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'

import { appStore } from '@/store/appStore'

export const appleTVProps = {}

export type AppleTVProps = ExtractPropTypes<typeof appleTVProps>

export default defineComponent({
  name: 'AppleTV',
  props: appleTVProps,
  setup() {},
  render() {

    return (
      <div>AppleTV Page</div>
    )
  },
})