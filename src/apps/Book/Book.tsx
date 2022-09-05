import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { AppMenu } from '@/components/Menu'

import { appStore } from '@/store/appStore'

export const bookProps = {}

export type BookProps = ExtractPropTypes<typeof bookProps>

export default defineComponent({
  name: 'Book',
  props: bookProps,
  setup() {},
  render() {

    return (
      <div>Book Page</div>
    )
  },
})