import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'

import { appStore } from '@/store/appStore'

export const musicProps = {}

export type MusicProps = ExtractPropTypes<typeof musicProps>

export default defineComponent({
  name: 'Music',
  props: musicProps,
  setup() {},
  render() {

    return (
      <div>Music Page</div>
    )
  },
})