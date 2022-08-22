import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'

import { appStore } from '@/store/appStore'

export const appStoreProps = {}

export type AppStoreProps = ExtractPropTypes<typeof appStoreProps>

export default defineComponent({
  name: 'AppStore',
  props: appStoreProps,
  setup() {},
  render() {

    return (
      <div>AppStore Page</div>
    )
  },
})