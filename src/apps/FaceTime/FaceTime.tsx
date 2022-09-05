import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'

import { appStore } from '@/store/appStore'

export const faceTimeProps = {}

export type FaceTimeProps = ExtractPropTypes<typeof faceTimeProps>

export default defineComponent({
  name: 'AppStore',
  props: faceTimeProps,
  setup() {},
  render() {

    return (
      <div>FaceTime Page</div>
    )
  },
})